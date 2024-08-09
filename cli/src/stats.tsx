import React, { useEffect, useState } from 'react'
import { Box, Text, render } from 'ink'
import { publicClient } from './client.js'

const Stats = () => {
  const [client, setClient] = useState(publicClient())
  useEffect(() => {

  })
  return <Box>
    <Text>Stats!</Text>
  </Box>
}

const renderStats = () => {
  render(<Stats/>)
}

export default renderStats
