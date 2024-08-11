import React, { useEffect, useState } from 'react'
import { Box, Text, render } from 'ink'
import { usePublicClient } from './client.js'
import { type Pair, pairs as initPairs } from './config.js'
import { type Address, zeroAddress } from 'viem'
import { useFactories } from './uniswap.js'
import { getTokenAddress, pairToStr } from './util.js'

interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
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
    <Text>Pairs: ${JSON.stringify(pairs)}</Text>
  </Box>
}

const renderStats = () => {
  render(<Stats/>)
}

export default renderStats
