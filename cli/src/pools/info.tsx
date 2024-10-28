import type { ValidatedPair } from 'src/common.js'
import { usePoolStats } from 'src/pools/hooks/panoptic.js'
import { toFixed } from 'src/util.js'
import React from 'react'
import { Box, Text } from 'ink'

export const SimplePoolInfo = ({ pair }: { pair?: ValidatedPair }) => {
  const { c0Info, c1Info, price, priceInverse } = usePoolStats(pair)

  if (!pair) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    )
  }

  const baseAssetInfo = pair.baseAsset === 'token1' ? c1Info : c0Info
  const quoteAssetInfo = pair.baseAsset === 'token1' ? c0Info : c1Info
  const quotePrice = pair.baseAsset === 'token0' ? price : priceInverse
  const basePrice = pair.baseAsset === 'token0' ? priceInverse : price

  return (
    <Text>
      {c0Info.symbol}/{c1Info.symbol} | {baseAssetInfo.symbol} price:{' '}
      {toFixed(quotePrice)} {quoteAssetInfo.symbol} | inverse:{' '}
      {toFixed(basePrice)}
    </Text>
  )
  // return <>
  //   <Text>{c0Info.symbol}/{c1Info.symbol} </Text>
  //   <Text>{baseAssetInfo.symbol} price: {toFixed(quotePrice)} {quoteAssetInfo.symbol} </Text>
  //   <Text>inverse: {toFixed(basePrice)}</Text>
  // </>
}
