import type { ValidatedPair } from 'src/common.js'
import { usePoolStats } from 'src/pools/hooks.js'
import { toFixed } from 'src/util.js'
import React from 'react'
import { Box, Text } from 'ink'

export const SimplePoolInfo = ({ pair }: { pair?: ValidatedPair }) => {
  const { c0Info, c1Info, price, priceInverse } = usePoolStats(pair)
  if (!pair) {
    return <Box><Text>Loading...</Text></Box>
  }
  return <Box>
    <Text>{c0Info.symbol}/{c1Info.symbol} | price: {toFixed(price)} {c1Info.symbol} for each {c0Info.symbol} | inverse: {toFixed(priceInverse)})</Text>
  </Box>
}
