import React from 'react'
import { Box, Text } from 'ink'
import { SectionTitle, type ValidatedPair } from './common.js'
import { type CollateralFullInfo, usePools, usePoolStats } from './pools.js'

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
  const { c0Info, c1Info, price, priceInverse } = usePoolStats(pair)
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
  const { pairs } = usePools()
  return <Box flexDirection='column'>
    <SectionTitle>Option Trading Pools Listings</SectionTitle>
    {pairs.map(pair => {
      return <PoolStats key={pair.panopticPoolAddress} pair={pair}/>
    })}
  </Box>
}

export default Stats
