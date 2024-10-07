import React, { useContext, useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { extractPoolId, type Leg, type PositionWithData, tokenIdToLeg, tokenIdToPosition } from '../common.js'
import { Box, Text } from 'ink'
import { type UniswapPoolBasicInfo } from '../pools/hooks/common.js'
import { usePoolContract, useUniswapPoolBasicInfo } from '../pools/hooks/uniswap.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findBaseAsset, hasLeg, isITM, stringify, tickToPrice, toFixed, toITMLegs } from '../util.js'
import { type Address, formatUnits } from 'viem'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'
import {
  type PoolValues,
  type PremiumValuesWithBalanceAndUtilization,
  useAccountPoolFunctions,
  usePoolStatsByContracts
} from '../pools/hooks/panoptic.js'
import { type AccountCollateralMarginDetails, useAccountCollateralFunctions } from '../pools/hooks/collateral.js'

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
  const premiumState = leg.position === 'short' ? 'Earning' : 'Paying'
  return <Box>
    {showRatio ? <Text>[{leg.optionRatio} options per contract] </Text> : <></>}
    <Text>{leg.position === 'long' ? 'Long' : 'Short' } </Text>
    <Text>{leg.tokenType === 'token0' ? 'PUT' : 'CALL' } </Text>
    <Text>@ {toFixed(strike)} {quoteSymbol} </Text>
    <Text>±{(radius * 100).toFixed(2)}% </Text>
    <Text>| {premiumState} premium in range [{toFixed(lower)}, {toFixed(upper)}]</Text>
  </Box>
}

interface IndexedLeg {
  leg: Leg
  index: number
}

export const Position = ({ position, poolInfo }: PositionProps) => {
  // const { addMessage } = useContext(NotificationContext)
  // useEffect(() => {
  //   addMessage(stringify(position))
  // }, [position, addMessage])

  // const balanceFormatted = formatUnits(position.balance, poolInfo.)
  if (!position.legs[0]) {
    return <></>
  }
  if (position.legs.filter(l => !!l).length === 1) {
    const numContracts = formatUnits(position.balance ?? 0n, position.legs[0].asset === 'token1' ? poolInfo.token1.decimals : poolInfo.token0.decimals)
    return <Box>
      <Text>- {numContracts} contracts of </Text>
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
  // const { addMessage } = useContext(NotificationContext)
  // useEffect(() => {
  //   addMessage(`poolPositions: ${stringify(poolPositions)}`)
  // }, [poolPositions, addMessage])
  return <Box flexDirection={'column'} marginY={1}>
    <Text>Pool {name} ({uniswapPoolAddress})</Text>
    {!poolInfo.ready && <Text>- Loading pool data...</Text>}
    {poolInfo.ready && poolPositions.map(position => {
      return <Position key={position.id} position={position} poolInfo={poolInfo}/>
    })}
    {poolInfo.ready && <PoolValue uniswapPoolAddress={uniswapPoolAddress} poolPositions={poolPositions} />}
  </Box>
}

type PoolValueProps = PoolPositionsProps

export const PoolValue = ({ uniswapPoolAddress, poolPositions }: PoolValueProps) => {
  const { addMessage } = useContext(NotificationContext)
  const { panopticPool, uniswapPool } = usePoolContract(uniswapPoolAddress)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { c0Info, c1Info, priceTick, ready, tickSpacing } = usePoolStatsByContracts({ panopticPool, uniswapPool })
  const { calculatePortfolioValue, calculateAccumulatedFeesBatch } = useAccountPoolFunctions({ panopticPool })
  const { getAccountMarginDetails: getAccountMarginDetails0 } = useAccountCollateralFunctions(c0Info.tracker)
  const { getAccountMarginDetails: getAccountMarginDetails1 } = useAccountCollateralFunctions(c1Info.tracker)
  const [values, setPoolValues] = useState<PoolValues>()
  const [premiums, setPoolPremiums] = useState<PremiumValuesWithBalanceAndUtilization>()
  const [accountMargin0, setAccountMargin0] = useState<AccountCollateralMarginDetails>()
  const [accountMargin1, setAccountMargin1] = useState<AccountCollateralMarginDetails>()
  const { wallet } = useWallet()

  useEffect(() => {
    async function init () {
      if (!ready || !wallet.address) {
        return
      }

      // const [value0, value1] = await panopticPool.read.calculatePortfolioValue([wallet.address, priceTick, positionIds])
      // const positionIdsDebug = poolPositions.filter(p => p.legs[0]?.tokenType !== 'token0').map(p => BigInt(p.id))
      // const positionIdsDebug = poolPositions.slice(0, 1).map(p => BigInt(p.id))
      // const values = await calculatePortfolioValue(positionIdsDebug, priceTick)
      const itmPositions = poolPositions.filter(p => {
        const id = BigInt(p.id)
        const newId = toITMLegs(id, priceTick)
        return hasLeg(newId)
      })
      // TODO: this is quite complex, need more debugging and testing later, when we have multi-leg positions. Pay extra attention to risk partners
      // const itmPositions = poolPositions.map(p => {
      //   const id = BigInt(p.id)
      //   const newId = toITMLegs(id, priceTick)
      //   const legs = tokenIdToPosition(newId, p.tickSpacing, { [extractPoolId(id).toString(16)]: p.uniswapPoolAddress }).legs
      //   return { ...p, legs, id: `0x${newId.toString(16)}` } satisfies PositionWithData
      // }).filter(p => hasLeg(BigInt(p.id)))

      // NOTE: simply using all position ids for calculating portfolio value would result in incorrect portfolio value, since OTM options have no value upon exercisin (burning), but the uniswap position it represents still have value (see details of the smart contract code for clarification)
      const positionIds = poolPositions.map(p => BigInt(p.id))

      const itmPositionIds = itmPositions.map(p => BigInt(p.id))
      const values = await calculatePortfolioValue(itmPositionIds, priceTick)
      if (!values) {
        return
      }
      const { value0, value1 } = values
      // const price = tickToPrice(priceTick, c1Info.decimals - c0Info.decimals)
      // const priceInverse = 1 / price
      // // addMessage(`calculatePortfolioValue ${stringify({ values, positionIdsDebug, priceTick, price, priceInverse, decimalDiff: c1Info.decimals - c0Info.decimals })}`)
      // addMessage(`calculatePortfolioValue ${stringify({ values, positionIds, priceTick, price, priceInverse, decimalDiff: c1Info.decimals - c0Info.decimals })}`)

      // NOTE: the values being calculated are actually values to the pool, not values to the user, i.e. the values represents debt owed by the user to the pool. The values to the user should be exactly the opposite
      setPoolValues({ value0: -value0, value1: -value1 })
      const premiums = await calculateAccumulatedFeesBatch(positionIds)
      if (!premiums) {
        return
      }
      const { premium0, premium1, balanceMap, balancesAndUtilizations } = premiums
      setPoolPremiums({ premium0, premium1, balanceMap, balancesAndUtilizations })
      // const balancesAndUtilizationsDebug = premiums.balancesAndUtilizations.slice(2, 3)
      // addMessage(`pos0=${stringify(tokenIdToLeg(balancesAndUtilizationsDebug[0][0], 0, tickSpacing))} balancesAndUtilizationsDebug ${stringify(balancesAndUtilizationsDebug)}`)
      // const margin0 = await getAccountMarginDetails0(priceTick, balancesAndUtilizationsDebug, premiums.premium0)
      const margin0 = await getAccountMarginDetails0(priceTick, premiums.balancesAndUtilizations, premiums.premium0)
      if (!margin0) {
        return
      }
      setAccountMargin0(margin0)
      // const margin1 = await getAccountMarginDetails1(priceTick, balancesAndUtilizationsDebug, premiums.premium0)
      const margin1 = await getAccountMarginDetails1(priceTick, premiums.balancesAndUtilizations, premiums.premium1)
      if (!margin1) {
        return
      }
      setAccountMargin1(margin1)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  // }, [c0Info.decimals, c1Info.decimals, calculateAccumulatedFeesBatch, calculatePortfolioValue, ready, priceTick, poolPositions, wallet.address, addMessage])
  }, [getAccountMarginDetails0, getAccountMarginDetails1, calculateAccumulatedFeesBatch, calculatePortfolioValue, ready, priceTick, poolPositions, wallet.address, addMessage])

  // useEffect(() => {
  //   addMessage(`Collateral updated... ${c0Info.symbol} ${c1Info.symbol}`)
  // }, [c0Info, c1Info, addMessage])

  if (!values || !premiums) {
    return <Box flexDirection={'column'} marginY={1}>
      <Text>Pool Portfolio Value</Text>
      <Text color={'yellow'}>[Loading...]</Text>
    </Box>
  }
  const color0 = values.value0 === 0n ? 'yellow' : values.value0 > 0n ? 'green' : 'red'
  const color1 = values.value1 === 0n ? 'yellow' : values.value1 > 0n ? 'green' : 'red'
  const pnl0 = formatUnits(values.value0, c0Info.decimals)
  const pnl1 = formatUnits(values.value1, c1Info.decimals)
  const premium0f = formatUnits(premiums.premium0 ?? 0n, c0Info.decimals)
  const premium1f = formatUnits(premiums.premium1, c1Info.decimals)
  const color0p = premiums.premium0 === 0n ? 'yellow' : values.value0 > 0n ? 'green' : 'red'
  const color1p = premiums.premium1 === 0n ? 'yellow' : values.value1 > 0n ? 'green' : 'red'
  const margin0f = formatUnits(accountMargin0?.requiredBalance ?? 0n, c0Info.decimals)
  const balance0f = formatUnits(accountMargin0?.accountBalance ?? 0n, c0Info.decimals)
  const margin1f = formatUnits(accountMargin1?.requiredBalance ?? 0n, c1Info.decimals)
  const balance1f = formatUnits(accountMargin1?.accountBalance ?? 0n, c1Info.decimals)
  return <Box flexDirection={'column'} marginY={1}>
    <Text>Pool Portfolio Value</Text>
    <Text color={color0}>{c0Info.symbol} Profit/Loss: {toFixed(Number(pnl0))}</Text>
    <Text color={color0p}>{c0Info.symbol} Premium Balance: {toFixed(Number(premium0f))}</Text>
    <Text>{c0Info.symbol} Margin Requirement: {toFixed(Number(margin0f))}</Text>
    <Text>{c0Info.symbol} Deposit Balance: {toFixed(Number(balance0f))}</Text>

    <Text color={color1}>{c1Info.symbol} Profit/Loss: {toFixed(Number(pnl1))}</Text>
    <Text color={color1p}>{c1Info.symbol} Premium Balance: {toFixed(Number(premium1f))}</Text>
    <Text>{c1Info.symbol} Margin Requirement: {toFixed(Number(margin1f))}</Text>
    <Text>{c1Info.symbol} Deposit Balance: {toFixed(Number(balance1f))}</Text>
  </Box>
}
