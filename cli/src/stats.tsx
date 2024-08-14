import React, { useEffect, useState } from 'react'
import { Box, Text, render } from 'ink'
import { usePublicClient } from './client.js'
import { type Pair, pairs as initPairs } from './config.js'
import { type Address, getContract, type GetContractReturnType, type PublicClient, zeroAddress } from 'viem'
import { useFactories } from './uniswap.js'
import { getTokenAddress, pairToStr } from './util.js'
import { CollateralTrackerAbi, type CollateralTrackerAbiType, PanopticPoolAbi, type PanopticPoolAbiType } from './constants.js'

interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

type PanopticPool = GetContractReturnType<PanopticPoolAbiType, PublicClient>
type CollateralTracker = GetContractReturnType<CollateralTrackerAbiType, PublicClient>

const PairStats = ({ pair }: { pair: ValidatedPair }): React.JSX.Element => {
  const { network, client } = usePublicClient()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [token0Tracker, setToken0Tracker] = useState<CollateralTracker>()
  const [token1Tracker, setToken1Tracker] = useState<CollateralTracker>()

  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const pp = getContract({ address: pair.panopticPoolAddress, abi: PanopticPoolAbi, client }) as PanopticPool
      setPanopticPool(pp)
      const collateralTracker0Address = await pp.read.collateralToken0() as Address
      const collateralTracker1Address = await pp.read.collateralToken1() as Address
      setToken0Tracker(getContract({ address: collateralTracker0Address, abi: CollateralTrackerAbi, client }))
      setToken1Tracker(getContract({ address: collateralTracker1Address, abi: CollateralTrackerAbi, client }))
    }
    init().catch(console.error)
  }, [network, client, pair])

  useEffect(() => {
    async function getStats () {

    }
    getStats().catch(console.error)
  }, [panopticPool, token0Tracker, token1Tracker])

  return <></>
}

const Stats = () => {
  const { network, client } = usePublicClient()
  const { panopticFactory, uniswapFactory } = useFactories()
  const [pairs, setPairs] = useState<ValidatedPair[]>([])

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
          console.error(`Unknown asset ${token0} on network ${network?.name}`)
          continue
        }
        if (!token1Address) {
          console.error(`Unknown asset ${token1} on network ${network?.name}`)
          continue
        }
        const uniswapPoolAddress = await uniswapFactory.read.getPool([token0Address, token1Address, fee]) as Address
        if (uniswapPoolAddress === zeroAddress) {
          console.error(`Cannot find Uniswap pool address for pair ${pairToStr(token0, token1, fee, network)} `)
          continue
        }
        const panopticPoolAddress = await panopticFactory.read.getPanopticPool([uniswapPoolAddress]) as Address
        if (panopticPoolAddress === zeroAddress) {
          console.error(`Panoptic pool is not created for pair ${pairToStr(token0, token1, fee, network)}`)
          continue
        }
        console.log(`Validated pair: ${pairToStr(token0, token1, fee, network)}`)
        validatedPairs.push({ ...pair, token0Address, token1Address, uniswapPoolAddress, panopticPoolAddress })
      }
      setPairs(validatedPairs)
      console.log(`${validatedPairs.length} pairs validated. Initial pair validation completed.`)
    }
    init().catch(console.error)
  }, [client, panopticFactory, uniswapFactory, network])
  return <Box>
    <Text>Pairs</Text>
    {pairs.map(pair => {
      return <PairStats key={pair.panopticPoolAddress} pair={pair}/>
    })}

    {/* <Text>{JSON.stringify(pairs, null, 2)}</Text> */}
  </Box>
}

const renderStats = () => {
  render(<Stats/>)
}

export default renderStats
