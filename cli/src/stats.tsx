import React, { useEffect, useState } from 'react'
import { Box, Text, render } from 'ink'
import { publicClient } from './client.js'
import { pairs as initPairs } from './config.js'

const Stats = () => {
  const [client, setClient] = useState(publicClient())
  const [pairs, setPairs] = useState(initPairs)

  useEffect(() => {
    const init = async () => {
      for (const pair of initPairs) {
        const [token0, token1, fee] = pair

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
