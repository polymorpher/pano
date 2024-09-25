import React, { useCallback, useContext, useEffect, useState } from 'react'
import { type Leg, type PositionWithData } from '../common.js'
import { Box, Text } from 'ink'
import { type PanopticPoolInfo, type UniswapPoolBasicInfo, usePoolContract, useUniswapPoolBasicInfo } from '../pools/hooks.js'
import { tickToPrice, toFixed } from '../util.js'
import { type Address, formatUnits } from 'viem'

interface PositionProps {
  position: PositionWithData
  poolInfo: UniswapPoolBasicInfo
}

interface LegProps {
  leg: Leg
  poolInfo: UniswapPoolBasicInfo
  showRatio?: boolean
}

const SingleLeg = ({ leg, poolInfo, showRatio }: LegProps) => {
  const decimals = leg.asset === 'token0' ? poolInfo.token1.decimals : poolInfo.token0.decimals
  const quoteSymbol = leg.asset === 'token0' ? poolInfo.token1.symbol : poolInfo.token0.symbol
  const radius = tickToPrice((leg.tickUpper - leg.tickLower) / 2, 0) - 1.0
  return <Box>
    {showRatio ? <Text>[{leg.optionRatio} options per contract] </Text> : <></>}
    <Text>{leg.position === 'long' ? 'Long' : 'Short' } </Text>
    <Text>{leg.tokenType === 'token0' ? 'PUT' : 'CALL' } </Text>
    <Text>@ {toFixed(tickToPrice((leg.tickUpper + leg.tickLower) / 2, decimals), 4)} {quoteSymbol} </Text>
    <Text>±{(radius * 100).toFixed(2)}% </Text>
    <Text>| accruing premium in range [{toFixed(tickToPrice(leg.tickLower, decimals), 4)}, {toFixed(tickToPrice(leg.tickUpper, decimals), 2)}]</Text>
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
      <Text>- {formatUnits(position.balance ?? 0n, position.legs[0].tokenType === 'token0' ? poolInfo.token1.decimals : poolInfo.token0.decimals)} contracts of </Text>
      <SingleLeg leg={position.legs[0]} poolInfo={poolInfo} />
    </Box>
  }
  const token0Legs: IndexedLeg[] = position.legs.filter(e => !!e).map((leg, index) => ({ leg, index } satisfies IndexedLeg)).filter(({ leg, index }) => leg.asset === 'token0')
  const token1Legs: IndexedLeg[] = position.legs.filter(e => !!e).map((leg, index) => ({ leg, index } satisfies IndexedLeg)).filter(({ leg, index }) => leg.asset === 'token1')
  return <Box flexDirection={'column'}>
    <Text>- {formatUnits(position.balance ?? 0n, poolInfo.token1.decimals)} contracts of </Text>
    {token0Legs.map(({ leg, index }) => {
      return <SingleLeg key={`leg-${index}`} leg={leg} poolInfo={poolInfo} showRatio />
    })}
    <Text>- {formatUnits(position.balance ?? 0n, poolInfo.token0.decimals)} contracts of </Text>
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
interface PoolPositionsProps {
  uniswapPoolAddress: Address
  poolPositions: PositionWithData[]
}
export const PoolPositions = ({ uniswapPoolAddress, poolPositions }: PoolPositionsProps) => {
  const poolInfo = useUniswapPoolBasicInfo(uniswapPoolAddress)
  const name = `${poolInfo.token0.symbol}/${poolInfo.token1.symbol}`
  return <Box flexDirection={'column'} marginY={1}>
    <Text>Pool {name} ({uniswapPoolAddress})</Text>
    {!poolInfo.ready && <Text>- Loading pool data...</Text>}
    {poolInfo.ready && poolPositions.map(position => {
      return <Position key={position.id} position={position} poolInfo={poolInfo}/>
    })}
  </Box>
}
