import React from 'react'
import { Box, Text } from 'ink'
import { SectionTitle, type ValidatedPair } from './common.js'
import { usePools, usePoolStats } from './pools/hooks/panoptic.js'
import { type CollateralFullInfo } from './pools/hooks/common.js'
import { formatUnits } from 'viem'
import { toFixed } from './util.js'

const DisplayCollateralStats = ({
  address,
  name,
  symbol,
  decimals,
  tokenAddress,
  poolAssets,
  inAmm,
  utilization,
  shares,
  totalAssets
}: CollateralFullInfo) => {
  return (
    <Box marginTop={1} flexDirection="column">
      <Text>
        Collateral: {symbol} ({name}) ({decimals} decimals){' '}
      </Text>
      <Text>
        - Total Collateral: {formatUnits(totalAssets, decimals).toString()}{' '}
        {symbol}
      </Text>
      <Text>
        -- In Pool: {formatUnits(poolAssets, decimals).toString()} {symbol}
      </Text>
      <Text>
        -- In Uniswap: {formatUnits(inAmm, decimals).toString()} {symbol}
      </Text>
      <Text>- Utilization {(utilization * 100).toFixed(2)}%</Text>
      <Text>- Issued LP Shares: {shares?.toLocaleString()}</Text>
      <Text>
        - Contract Address: {address} (Underlying asset contract address:{' '}
        {tokenAddress})
      </Text>
    </Box>
  )
}

const PoolStats = ({ pair }: { pair: ValidatedPair }): React.JSX.Element => {
  const { c0Info, c1Info, price, priceInverse } = usePoolStats(pair)
  return (
    <Box flexDirection="column">
      <Text>
        Pair: {c0Info.symbol}/{c1Info.symbol}
      </Text>
      {pair.baseAsset === 'token0' && (
        <Text>
          - Price per 1 {c0Info.symbol}: {toFixed(price)} {c1Info.symbol}{' '}
          (inverse: {toFixed(priceInverse)})
        </Text>
      )}
      {pair.baseAsset === 'token1' && (
        <Text>
          - Price per 1 {c1Info.symbol}: {toFixed(priceInverse)} {c0Info.symbol}{' '}
          (inverse: {toFixed(price)})
        </Text>
      )}
      {/* <Text>Recent prices: [{recentPrices.join(', ')}] | Inverse: [{recentPricesInverse.join(', ')}]</Text> */}
      <DisplayCollateralStats {...c0Info} />
      <DisplayCollateralStats {...c1Info} />
    </Box>
  )
}

const Stats = () => {
  const { pairs } = usePools()
  return (
    <Box flexDirection="column">
      <SectionTitle>Available Option Trading Pools</SectionTitle>
      {pairs.length === 0 && <Text>No pools</Text>}
      {pairs.map((pair) => {
        return <PoolStats key={pair.panopticPoolAddress} pair={pair} />
      })}
    </Box>
  )
}

export default Stats
