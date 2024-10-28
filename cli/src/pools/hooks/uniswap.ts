import { type Address, getContract } from 'viem'
import { useContext, useEffect, useState } from 'react'
import { NotificationContext } from '../../notification.js'
import { usePublicClient } from '../../client.js'
import { useFactories } from './factory.js'
import { PanopticPoolAbi, UniswapPoolAbi } from '../../constants.js'
import { isReadableAddress } from '../../util.js'
import { type PanopticPool, type PoolContracts, type UniswapPool, type UniswapPoolBasicInfo } from './common.js'
import type { TickSpacing } from '../../common.js'
import { useERC20 } from '../../token.js'

export const usePoolContract = (uniswapPoolAddress?: Address): PoolContracts => {
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
    // addMessage('usePoolContract')
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [client, addMessage, panopticFactory, uniswapPoolAddress])
  return { panopticPool, uniswapPool }
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
  }, [poolReady, token0.ready, token1.ready])

  return { token0, token1, tickSpacing, tick, sqrtPriceX96, ready }
}
