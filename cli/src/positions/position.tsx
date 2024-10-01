import React, { useCallback, useContext, useEffect, useState } from 'react'
import { type Leg, type PositionWithData } from '../common.js'
import { Box, Text } from 'ink'
import { type UniswapPoolBasicInfo } from '../pools/hooks/common.js'
import { usePoolContract, useUniswapPoolBasicInfo } from '../pools/hooks/uniswap.js'
import { findBaseAsset, tickToPrice, toFixed } from '../util.js'
import { type Address, formatUnits } from 'viem'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'
import { type PoolValues, useCalculatePortfolioValue, usePoolStats, usePoolStatsByContracts } from '../pools/hooks/panoptic.js'

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
  const decimals = poolInfo.token1.decimals - poolInfo.token0.decimals
  const quoteSymbol = leg.asset === 'token0' ? poolInfo.token1.symbol : poolInfo.token0.symbol
  const radius = tickToPrice((leg.tickUpper - leg.tickLower) / 2, 0) - 1.0
  const price = tickToPrice((leg.tickUpper + leg.tickLower) / 2, decimals)
  const baseAsset = findBaseAsset(poolInfo.token0.symbol, poolInfo.token1.symbol) ?? 'token0'
  const strike = baseAsset === 'token0' ? price : 1 / price
  const lowerPrice = tickToPrice(leg.tickLower, decimals)
  const upperPrice = tickToPrice(leg.tickUpper, decimals)
  const lower = baseAsset === 'token0' ? lowerPrice : 1 / upperPrice
  const upper = baseAsset === 'token0' ? upperPrice : 1 / lowerPrice
  return <Box>
    {showRatio ? <Text>[{leg.optionRatio} options per contract] </Text> : <></>}
    <Text>{leg.position === 'long' ? 'Long' : 'Short' } </Text>
    <Text>{leg.tokenType === 'token0' ? 'PUT' : 'CALL' } </Text>
    <Text>@ {toFixed(strike)} {quoteSymbol} </Text>
    <Text>±{(radius * 100).toFixed(2)}% </Text>
    <Text>| accruing premium in range [{toFixed(lower)}, {toFixed(upper)}]</Text>
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
    {poolInfo.ready && <PoolValue uniswapPoolAddress={uniswapPoolAddress} poolPositions={poolPositions} />}
  </Box>
}

type PoolValue = PoolPositionsProps

export const PoolValue = ({ uniswapPoolAddress, poolPositions }: PoolValue) => {
  const { addMessage } = useContext(NotificationContext)
  const { panopticPool, uniswapPool } = usePoolContract(uniswapPoolAddress)
  const { c0Info, c1Info, priceTick } = usePoolStatsByContracts({ panopticPool, uniswapPool })
  const { calculatePortfolioValue } = useCalculatePortfolioValue({ panopticPool })
  const [values, setPoolValues] = useState<PoolValues>()

  useEffect(() => {
    async function init () {
      const positionIds = poolPositions.map(p => BigInt(p.id))
      const values = await calculatePortfolioValue(positionIds, priceTick)
      setPoolValues(values)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [priceTick, poolPositions, calculatePortfolioValue, addMessage])
  if (!values) {
    return <Box flexDirection={'column'} marginY={1}>
      <Text>Pool Portfolio Value</Text>
      <Text color={'yellow'}>[Loading...]</Text>
    </Box>
  }
  const color0 = values.value0 === 0n ? 'yellow' : values.value0 > 0n ? 'green' : 'red'
  const color1 = values.value1 === 0n ? 'yellow' : values.value1 > 0n ? 'green' : 'red'
  const pnl0 = formatUnits(values.value0, c0Info.decimals)
  const pnl1 = formatUnits(values.value1, c1Info.decimals)

  return <Box flexDirection={'column'} marginY={1}>
    <Text>Pool Portfolio Value</Text>
    <Box><Text>{c0Info.symbol} Profit/Loss: </Text><Text color={color0}>{pnl0}</Text></Box>
    <Box><Text>{c1Info.symbol} Profit/Loss: </Text><Text color={color1}>{pnl1}</Text></Box>
  </Box>
}
