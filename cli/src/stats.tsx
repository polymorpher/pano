import React, { useEffect, useState } from 'react'
import { Box, Text, render } from 'ink'
import { publicClient } from './client.js'
import { factoryAddress, pairs as initPairs } from './config.js'
import { getContract, type PublicClient } from 'viem'
import { PanopticFactoryAbi } from './constants.js'

const Stats = () => {
  const [client] = useState<PublicClient | undefined>(publicClient())
  const [pairs, setPairs] = useState(initPairs)

  useEffect(() => {
    if (!client) {
      return
    }
    const init = async () => {
      for (const pair of initPairs) {
        const [token0, token1, fee] = pair
        const panopticFactory = getContract({ address: factoryAddress, abi: PanopticFactoryAbi, client })
        const uniswapFactory = await panopticFactory.read.univ3Factory()
      }
    }
    init().catch(console.error)
  }, [])
  return <Box>
    <Text>Stats!</Text>
  </Box>
}

const renderStats = () => {
  render(<Stats/>)
}

export default renderStats
