import React, { useEffect, useState } from 'react'
import { Box, Text, useStdout, useStderr } from 'ink'
import { usePublicClient } from './client.js'
import { type Pair, pairs as initPairs } from './config.js'
import { type Address, getContract, type GetContractReturnType, type PublicClient, zeroAddress } from 'viem'
import { useFactories } from './uniswap.js'
import { getTokenAddress, pairToStr, tickToPrice } from './util.js'
import { CollateralTrackerAbi, DECIMALS, PanopticPoolAbi } from './constants.js'
import { type ERC20Metadata, useERC20 } from './token.js'

interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

type PanopticPool = GetContractReturnType<typeof PanopticPoolAbi, PublicClient>
type CollateralTracker = GetContractReturnType<typeof CollateralTrackerAbi, PublicClient>

interface CollateralPoolState {
  poolAssets: bigint
  inAmm: bigint
  utilization: number
}

interface CollateralInfo {
  totalAssets: bigint
  shares: bigint
  tokenAddress?: Address
}

type CollateralFullInfo = CollateralInfo & CollateralPoolState & ERC20Metadata & { tracker?: CollateralTracker, address?: Address }
const useCollateralInfo = ({ address }: { address?: Address }): CollateralFullInfo => {
  const { network, client } = usePublicClient()
  const [shares, setShares] = useState<bigint>(0n)
  const [totalAssets, setTotalAssets] = useState<bigint>(0n)
  const [tracker, setTracker] = useState<CollateralTracker>()
  const [{ poolAssets, inAmm, utilization }, setPoolState] = useState<CollateralPoolState>({ poolAssets: 0n, inAmm: 0n, utilization: 0 })
  const [tokenAddress, setTokenAddress] = useState<Address | undefined>()
  const { name, symbol, decimals } = useERC20({ address: tokenAddress })
  const { write: writeErr } = useStderr()
  useEffect(() => {
    async function init () {
      if (!client || !address) {
        return
      }
      const tracker = getContract({ address, abi: CollateralTrackerAbi, client })
      setTracker(tracker)
    }
    init().catch(writeErr)
  }, [writeErr, network, client, address])
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
    getStats().catch(writeErr)
  }, [writeErr, tracker])
  return { address, name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, tracker, shares, totalAssets }
}

const DisplayCollateralStats = (
  { address, name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, shares, totalAssets }: CollateralFullInfo
) => {
  return <Box marginTop={1} flexDirection='column'>
    <Text>Collateral: {address}</Text>
    <Text>Underlying: {name} | {symbol} | {decimals} | {tokenAddress}</Text>
    <Text>Collateral In Pool: {poolAssets.toString()}</Text>
    <Text>Collateral In Uniswap: {inAmm.toString()}</Text>
    <Text>Total Collateral: {totalAssets?.toString()}</Text>
    <Text>Utilization {(utilization * 100).toFixed(2)}%</Text>
    <Text># LP Shares: {shares?.toString()}</Text>
  </Box>
}

const PoolStats = ({ pair }: { pair: ValidatedPair }): React.JSX.Element => {
  const { network, client } = usePublicClient()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [[token0, token1], setTokens] = useState<[Address | undefined, Address | undefined]>([undefined, undefined])
  const [{ priceTick, recentPriceTicks }, setPriceTickInfo] = useState<{ priceTick: number, recentPriceTicks: number[] }>({
    priceTick: 1e-36,
    recentPriceTicks: []
  })
  const c0Info = useCollateralInfo({ address: token0 })
  const c1Info = useCollateralInfo({ address: token1 })
  const price = tickToPrice(priceTick, c1Info.decimals - c0Info.decimals)
  const priceInverse = price ? 1 / price : 0
  const recentPrices = recentPriceTicks.map(t => tickToPrice(t, c1Info.decimals - c0Info.decimals))
  const recentPricesInverse = recentPrices.map(p => p ? 1 / p : 0)

  const { write: writeErr } = useStderr()
  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const pp = getContract({ address: pair.panopticPoolAddress, abi: PanopticPoolAbi, client })
      setPanopticPool(pp)
      const t0 = await pp.read.collateralToken0()
      if (t0 === zeroAddress) {
        writeErr('Bad collateral token0 tracker address')
        return
      }
      const t1 = await pp.read.collateralToken1()
      if (t1 === zeroAddress) {
        writeErr('Bad collateral token0 tracker address')
        return
      }
      setTokens([t0, t1])
    }
    init().catch(writeErr)
  }, [network, client, pair, writeErr])

  useEffect(() => {
    async function getStats () {
      if (!panopticPool) {
        return
      }
      const [priceArray, medianTick] = await panopticPool.read.getPriceArray()
      setPriceTickInfo({ priceTick: medianTick as number, recentPriceTicks: priceArray as number[] })
    }
    getStats().catch(writeErr)
  }, [panopticPool, writeErr])

  return <Box flexDirection='column'>
    <Text>Pair: {c0Info.symbol}/{c1Info.symbol}</Text>
    <Text>Price</Text>
    <Text>- {c1Info.symbol} per 1 {c0Info.symbol}: {price}</Text>
    <Text>- {c0Info.symbol} per 1 {c1Info.symbol}: {priceInverse}</Text>
    {/* <Text>Recent prices: [{recentPrices.join(', ')}] | Inverse: [{recentPricesInverse.join(', ')}]</Text> */}
    <DisplayCollateralStats {...c0Info}/>
    <DisplayCollateralStats {...c1Info}/>
  </Box>
}

const Stats = () => {
  const { network, client } = usePublicClient()
  const { panopticFactory, uniswapFactory } = useFactories()
  const [pairs, setPairs] = useState<ValidatedPair[]>([])
  const { write } = useStdout()
  const { write: writeErr } = useStderr()
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
          writeErr(`Unknown asset ${token0} on network ${network?.name}`)
          continue
        }
        if (!token1Address) {
          writeErr(`Unknown asset ${token1} on network ${network?.name}`)
          continue
        }
        const uniswapPoolAddress = await uniswapFactory.read.getPool([token0Address, token1Address, fee])
        if (uniswapPoolAddress === zeroAddress) {
          writeErr(`Cannot find Uniswap pool address for pair ${pairToStr(token0, token1, fee, network)} `)
          continue
        }
        const panopticPoolAddress = await panopticFactory.read.getPanopticPool([uniswapPoolAddress]) as Address
        if (panopticPoolAddress === zeroAddress) {
          writeErr(`Panoptic pool is not created for pair ${pairToStr(token0, token1, fee, network)}`)
          continue
        }
        write(`Validated pair: ${pairToStr(token0, token1, fee, network)}`)
        validatedPairs.push({ ...pair, token0Address, token1Address, uniswapPoolAddress, panopticPoolAddress })
      }
      setPairs(validatedPairs)
      write(`${validatedPairs.length} pairs validated. Initial pair validation completed.`)
    }
    init().catch(writeErr)
  }, [write, writeErr, client, panopticFactory, uniswapFactory, network])
  return <Box flexDirection='column'>
    <Text>Pairs</Text>
    {pairs.map(pair => {
      return <PoolStats key={pair.panopticPoolAddress} pair={pair}/>
    })}
  </Box>
}

export default Stats
