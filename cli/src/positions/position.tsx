import React, { useCallback, useContext, useEffect, useState } from 'react'
import { type Leg, type PositionWithData } from '../common.js'
import { Box, Text } from 'ink'
import { type PoolInfo } from '../pools/hooks.js'
import { tickToPrice } from '../util.js'
import { formatUnits } from 'viem'

interface PositionProps {
  position: PositionWithData
  poolInfo: PoolInfo
}

interface LegProps {
  leg: Leg
  poolInfo: PoolInfo
  showRatio?: boolean
}

const SingleLeg = ({ leg, poolInfo, showRatio }: LegProps) => {
  const decimals = leg.asset === 'token0' ? poolInfo.c1Info.decimals : poolInfo.c0Info.decimals
  const quoteSymbol = leg.asset === 'token0' ? poolInfo.c0Info.symbol : poolInfo.c1Info.symbol
  const radius = tickToPrice((leg.tickUpper - leg.tickLower) / 2, 0)
  return <Box>
    {showRatio ? <Text>[{leg.optionRatio} options per contract] </Text> : <></>}
    <Text>{leg.position === 'long' ? 'Long' : 'Short' }</Text>
    <Text>{leg.tokenType === 'token0' ? 'PUT' : 'CALL' }</Text>
    <Text>@ {tickToPrice((leg.tickUpper + leg.tickLower) / 2, decimals)} {quoteSymbol}</Text>
    <Text>± ({(radius * 100).toFixed(2)}% </Text>
    <Text>(accruing premium from {tickToPrice(leg.tickLower, decimals)} to {tickToPrice(leg.tickUpper, decimals)})</Text>
  </Box>
}

interface IndexedLeg {
  leg: Leg
  index: number
}

export const Position = ({ position, poolInfo }: PositionProps) => {
  // const balanceFormatted = formatUnits(position.balance, poolInfo.)
  if (!position.legs[0]) {
    return <></>
  }
  if (position.legs.filter(l => !!l).length === 1) {
    return <Box>
      <Text>{formatUnits(position.balance ?? 0n, position.legs[0].tokenType === 'token0' ? poolInfo.c1Info.decimals : poolInfo.c0Info.decimals)} contracts of </Text>
      <SingleLeg leg={position.legs[0]} poolInfo={poolInfo} />
    </Box>
  }
  const token0Legs: IndexedLeg[] = position.legs.filter(e => !!e).map((leg, index) => ({ leg, index } satisfies IndexedLeg)).filter(({ leg, index }) => leg.asset === 'token0')
  const token1Legs: IndexedLeg[] = position.legs.filter(e => !!e).map((leg, index) => ({ leg, index } satisfies IndexedLeg)).filter(({ leg, index }) => leg.asset === 'token1')
  return <Box flexDirection={'column'}>
    <Text>{formatUnits(position.balance ?? 0n, poolInfo.c1Info.decimals)} contracts of </Text>
    {token0Legs.map(({ leg, index }) => {
      return <SingleLeg key={`leg-${index}`} leg={leg} poolInfo={poolInfo} showRatio />
    })}
    <Text>{formatUnits(position.balance ?? 0n, poolInfo.c0Info.decimals)} contracts of </Text>
    {token1Legs.map(({ leg, index }) => {
      return <SingleLeg key={`leg-${index}`} leg={leg} poolInfo={poolInfo} showRatio />
    })}
    <Text>{position.balance?.toString()} contracts of </Text>
    {position.legs.filter(l => !!l).length === 1
      ? <SingleLeg leg={position.legs[0]} poolInfo={poolInfo} />
      : position.legs.map((leg, index) => {
        if (!leg) {
          return <></>
        }
        return <React.Fragment key={`leg-${index}`}>
          <Text>(TODO))</Text>
        </React.Fragment>
      })}
  </Box>
}
