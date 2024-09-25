import { useContext, useEffect, useState } from 'react'
import { pairs as initPairs } from 'src/config.js'
import { getTokenAddress, isReadableAddress, pairToStr, tickToPrice } from 'src//util.js'
import { type Address, getContract, type GetContractReturnType, type PublicClient, zeroAddress } from 'viem'
import { usePublicClient } from 'src/client.js'
import { useFactories } from 'src/pools/uniswap.js'
import { NotificationContext } from 'src/notification.js'
import { type TickSpacing, type ValidatedPair } from 'src/common.js'
import { CollateralTrackerAbi, DECIMALS, PanopticPoolAbi, UniswapPoolAbi } from 'src/constants.js'
import { type ERC20Metadata, useERC20, type IERC20, type ERC20Info } from 'src/token.js'
import { useWallet } from 'src/wallet.js'

type PanopticPool = GetContractReturnType<typeof PanopticPoolAbi, PublicClient>
type UniswapPool = GetContractReturnType<typeof UniswapPoolAbi, PublicClient>
type CollateralTracker = GetContractReturnType<typeof CollateralTrackerAbi, PublicClient>

export interface CollateralPoolState {
  poolAssets: bigint
  inAmm: bigint
  utilization: number
}

export interface CollateralInfo {
  totalAssets: bigint
  shares: bigint
  tokenAddress?: Address
  tokenContract?: IERC20
}

export type CollateralFullInfo = CollateralInfo & CollateralPoolState & ERC20Metadata & { tracker?: CollateralTracker, address?: Address }

const useCollateralInfo = ({ address }: { address?: Address }): CollateralFullInfo => {
  const { network, client } = usePublicClient()
  const [shares, setShares] = useState<bigint>(0n)
  const [totalAssets, setTotalAssets] = useState<bigint>(0n)
  const [tracker, setTracker] = useState<CollateralTracker>()
  const [{ poolAssets, inAmm, utilization }, setPoolState] = useState<CollateralPoolState>({ poolAssets: 0n, inAmm: 0n, utilization: 0 })
  const [tokenAddress, setTokenAddress] = useState<Address | undefined>()
  const { name, symbol, decimals, contract: tokenContract } = useERC20(tokenAddress)
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    async function init () {
      if (!client || !address) {
        return
      }
      const tracker = getContract({ address, abi: CollateralTrackerAbi, client })
      setTracker(tracker)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, network, client, address])
  useEffect(() => {
    async function getStats () {
      if (!tracker) {
        return
      }
      const totalAssets = await tracker.read.totalAssets()
      setTotalAssets(totalAssets)
      const shares = await tracker.read.totalSupply()
      setShares(shares)
      const [poolAssets, inAmm, utilization] = await tracker.read.getPoolData()
      setPoolState({ poolAssets, inAmm, utilization: Number(utilization) / DECIMALS })
      const tokenAddress = await tracker.read.asset()
      setTokenAddress(tokenAddress)
      // console.log({ totalAssets, shares, poolAssets, inAmm, tokenAddress })
    }
    getStats().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, tracker])
  return { address, name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, tracker, shares, totalAssets, tokenContract }
}

export const usePools = () => {
  const { network, client } = usePublicClient()
  const { panopticFactory, uniswapFactory } = useFactories()
  const [pairs, setPairs] = useState<ValidatedPair[]>([])
  const { addMessage } = useContext(NotificationContext)

  useEffect(() => {
    if (!client || !uniswapFactory || !panopticFactory || !network) {
      return
    }
    const init = async () => {
      const validatedPairs: ValidatedPair[] = []
      for (const pair of initPairs) {
        const { token0, token1, fee } = pair
        const token0Address = getTokenAddress(token0, network)
        const token1Address = getTokenAddress(token1, network)
        if (!token0Address) {
          addMessage(`Unknown asset ${token0} on network ${network?.name}`, { color: 'red' })
          continue
        }
        if (!token1Address) {
          addMessage(`Unknown asset ${token1} on network ${network?.name}`, { color: 'red' })
          continue
        }
        const uniswapPoolAddress = await uniswapFactory.read.getPool([token0Address, token1Address, fee])
        if (uniswapPoolAddress === zeroAddress) {
          addMessage(`Cannot find Uniswap pool address for pair ${pairToStr(token0, token1, fee, network)} `, { color: 'red' })
          continue
        }
        const panopticPoolAddress = await panopticFactory.read.getPanopticPool([uniswapPoolAddress])
        if (panopticPoolAddress === zeroAddress) {
          addMessage(`Panoptic pool is not created for pair ${pairToStr(token0, token1, fee, network)}`, { color: 'red' })
          continue
        }
        addMessage(`Validated pair: ${pairToStr(token0, token1, fee, network)}`)
        validatedPairs.push({ ...pair, token0Address, token1Address, uniswapPoolAddress, panopticPoolAddress })
      }
      setPairs(validatedPairs)
      addMessage(`${validatedPairs.length} pairs validated. Initial pair validation completed.`)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, client, panopticFactory, uniswapFactory, network])
  return { pairs }
}

const EmptyPriceTickInfo = {
  priceTick: 1e-36,
  recentPriceTicks: []
}

const EmptyTokenPair: [Address | undefined, Address | undefined] = [undefined, undefined]

export interface PanopticPoolInfo {
  c0Info: CollateralFullInfo
  c1Info: CollateralFullInfo
  price: number
  priceTick: number
  priceInverse: number
  recentPrices: number[]
  recentPricesInverse: number[]
  panopticPool?: PanopticPool
  uniswapPool?: UniswapPool
  tickSpacing: TickSpacing
  pair?: ValidatedPair
}

export const usePoolContract = (uniswapPoolAddress?: Address) => {
  const { addMessage } = useContext(NotificationContext)
  const { client } = usePublicClient()
  const { panopticFactory } = useFactories()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [uniswapPool, setUniswapPool] = useState<UniswapPool>()
  useEffect(() => {
    async function init () {
      if (!client || !panopticFactory || !uniswapPoolAddress) {
        return
      }

      const up = getContract({ address: uniswapPoolAddress, abi: UniswapPoolAbi, client })
      setUniswapPool(up)

      const ppAddress = await panopticFactory.read.getPanopticPool([up.address])

      if (!isReadableAddress(ppAddress)) {
        return
      }
      const pp = getContract({ address: ppAddress, abi: PanopticPoolAbi, client })
      setPanopticPool(pp)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [client, addMessage, panopticFactory, uniswapPoolAddress])
  return { panopticPool, uniswapPool }
}

export interface UniswapPoolBasicInfo {
  token0: ERC20Info
  token1: ERC20Info
  tickSpacing: TickSpacing
  sqrtPriceX96: bigint
  tick: number
  ready: boolean
}
export const useUniswapPoolBasicInfo = (uniswapPoolAddress?: Address): UniswapPoolBasicInfo => {
  const { addMessage } = useContext(NotificationContext)
  const { uniswapPool } = usePoolContract(uniswapPoolAddress)
  const [token0Address, setToken0Address] = useState<Address>()
  const [token1Address, setToken1Address] = useState<Address>()
  const [tickSpacing, setTickSpacing] = useState<TickSpacing>(1)
  const [tick, setTick] = useState<number>(0)
  const [sqrtPriceX96, setSqrtPriceX96] = useState<bigint>(0n)
  const token0 = useERC20(token0Address)
  const token1 = useERC20(token1Address)
  const [poolReady, setPoolReady] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    async function init () {
      if (!uniswapPool) {
        return
      }
      const t0Address = await uniswapPool.read.token0()
      const t1Address = await uniswapPool.read.token1()
      setToken0Address(t0Address)
      setToken1Address(t1Address)
      const tickSpacing = await uniswapPool.read.tickSpacing() as TickSpacing
      const [sqrtPriceX96, tick] = await uniswapPool.read.slot0()
      setSqrtPriceX96(sqrtPriceX96)
      setTick(tick)
      setTickSpacing(tickSpacing)
      setPoolReady(true)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [uniswapPool, addMessage])

  useEffect(() => {
    if (token0.ready && token1.ready && poolReady) {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [token0.ready, token1.ready])

  return { token0, token1, tickSpacing, tick, sqrtPriceX96, ready }
}

export const usePoolStats = (pair?: ValidatedPair): PanopticPoolInfo => {
  const { addMessage } = useContext(NotificationContext)
  const { network, client } = usePublicClient()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [uniswapPool, setUniswapPool] = useState<UniswapPool>()
  const [[token0, token1], setTokens] = useState<[Address | undefined, Address | undefined]>(EmptyTokenPair)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ priceTick, recentPriceTicks }, setPriceTickInfo] = useState<{ priceTick: number, recentPriceTicks: number[] }>(EmptyPriceTickInfo)
  const [tickSpacing, setTickSpacing] = useState<TickSpacing>(1)
  const c0Info = useCollateralInfo({ address: token0 })
  const c1Info = useCollateralInfo({ address: token1 })
  const price = tickToPrice(priceTick, c1Info.decimals - c0Info.decimals)
  const priceInverse = price ? 1 / price : 0
  const recentPrices = recentPriceTicks.map(t => tickToPrice(t, c1Info.decimals - c0Info.decimals))
  const recentPricesInverse = recentPrices.map(p => p ? 1 / p : 0)

  useEffect(() => {
    async function init () {
      if (!client || !pair) {
        setTokens(EmptyTokenPair)
        setPriceTickInfo(EmptyPriceTickInfo)
        return
      }
      const pp = getContract({ address: pair.panopticPoolAddress, abi: PanopticPoolAbi, client })
      setPanopticPool(pp)
      const up = getContract({ address: pair.uniswapPoolAddress, abi: UniswapPoolAbi, client })
      setUniswapPool(up)
      const t0 = await pp.read.collateralToken0()
      if (t0 === zeroAddress) {
        addMessage('Bad collateral token0 tracker address', { color: 'red' })
        return
      }
      const t1 = await pp.read.collateralToken1()
      if (t1 === zeroAddress) {
        addMessage('Bad collateral token0 tracker address', { color: 'red' })
        return
      }
      setTokens([t0, t1])
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [network, client, pair, addMessage])

  useEffect(() => {
    async function getStats () {
      if (!panopticPool) {
        return
      }
      const [priceArray, medianTick] = await panopticPool.read.getPriceArray()
      setPriceTickInfo({ priceTick: medianTick, recentPriceTicks: priceArray as number[] })
    }
    getStats().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [panopticPool, addMessage])

  useEffect(() => {
    async function getStats () {
      if (!uniswapPool) {
        return
      }
      const tickSpacing = await uniswapPool.read.tickSpacing() as TickSpacing
      setTickSpacing(tickSpacing)
    }
    getStats().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [uniswapPool, addMessage])

  return { c0Info, c1Info, priceTick, price, priceInverse, recentPrices, recentPricesInverse, panopticPool, uniswapPool, tickSpacing, pair }
}

export const useCollateralBalance = (collateralTracker?: CollateralTracker) => {
  const [shares, setShares] = useState<bigint>(0n)
  const [value, setValue] = useState<bigint>(0n)
  const wallet = useWallet()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    async function init () {
      if (!collateralTracker || !wallet.wallet.address) {
        setShares(0n)
        setValue(0n)
        return
      }
      const balance = await collateralTracker.read.balanceOf([wallet.wallet.address])
      setShares(balance)
      const shareValue = await collateralTracker.read.convertToAssets([balance])
      setValue(shareValue)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, collateralTracker, wallet.wallet.address])
  return { shares, value }
}
