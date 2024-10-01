import { usePublicClient } from '../../client.js'
import { useFactories } from './factory.js'
import { useCallback, useContext, useEffect, useState } from 'react'
import { EmptyTickSpacing, type PairedPoolAddresses, type TickSpacing, type ValidatedPair } from '../../common.js'
import { NotificationContext } from '../../notification.js'
import { pairs as initPairs } from '../../config.js'
import { getTokenAddress, pairToStr, tickToPrice } from '../../util.js'
import { getContract, zeroAddress } from 'viem'
import { useCollateralAddresses, useCollateralInfo } from './collateral.js'
import {
  EmptyPriceTick,
  EmptyPriceTickInfo,
  type PanopticPool,
  type PanopticPoolInfo,
  type PoolContracts,
  type UniswapPool
} from './common.js'
import { PanopticPoolAbi, UniswapPoolAbi } from '../../constants.js'
import { useWallet } from '../../wallet.js'

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

export const usePoolContractFromPair = (pair?: PairedPoolAddresses): PoolContracts => {
  const { addMessage } = useContext(NotificationContext)
  const { client } = usePublicClient()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [uniswapPool, setUniswapPool] = useState<UniswapPool>()
  useEffect(() => {
    async function init () {
      if (!client || !pair) {
        return
      }

      const up = getContract({ address: pair.uniswapPoolAddress, abi: UniswapPoolAbi, client })
      setUniswapPool(up)

      const pp = getContract({ address: pair.panopticPoolAddress, abi: PanopticPoolAbi, client })
      setPanopticPool(pp)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [client, addMessage, pair])
  return { panopticPool, uniswapPool }
}

export const usePoolStats = (pair?: PairedPoolAddresses): PanopticPoolInfo => {
  const { panopticPool, uniswapPool } = usePoolContractFromPair(pair)
  return usePoolStatsByContracts({ panopticPool, uniswapPool })
}

export const usePoolStatsByContracts = ({ panopticPool, uniswapPool }: PoolContracts): PanopticPoolInfo => {
  const { addMessage } = useContext(NotificationContext)
  const { collateral0, collateral1 } = useCollateralAddresses(panopticPool)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ priceTick, recentPriceTicks }, setPriceTickInfo] = useState<{ priceTick: number, recentPriceTicks: number[] }>(EmptyPriceTickInfo)
  const [tickSpacing, setTickSpacing] = useState<TickSpacing>(EmptyTickSpacing)
  const [ready, setReady] = useState<boolean>(false)
  const c0Info = useCollateralInfo(collateral0)
  const c1Info = useCollateralInfo(collateral1)
  const price = tickToPrice(priceTick, c1Info.decimals - c0Info.decimals)
  const priceInverse = price ? 1 / price : 0
  const recentPrices = recentPriceTicks.map(t => tickToPrice(t, c1Info.decimals - c0Info.decimals))
  const recentPricesInverse = recentPrices.map(p => p ? 1 / p : 0)

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

  useEffect(() => {
    if (!c0Info.ready || !c1Info.ready || priceTick === EmptyPriceTick || tickSpacing === EmptyTickSpacing) {
      return
    }
    setReady(true)
  }, [c0Info.ready, c1Info.ready, priceTick, tickSpacing])

  return { c0Info, c1Info, priceTick, price, priceInverse, recentPrices, recentPricesInverse, panopticPool, uniswapPool, tickSpacing, ready }
}

export interface PoolValues {
  value0: bigint
  value1: bigint
}

export const useCalculatePortfolioValue = ({ panopticPool }: PoolContracts) => {
  const { wallet } = useWallet()
  const calculatePortfolioValue = useCallback(async (positionIds: bigint[], tick: number): Promise<undefined | PoolValues> => {
    if (!panopticPool || !wallet.address) {
      return undefined
    }
    const [value0, value1] = await panopticPool.read.calculatePortfolioValue([wallet.address, tick, positionIds])
    return { value0, value1 }
  }, [wallet.address, panopticPool])
  return { calculatePortfolioValue }
}
