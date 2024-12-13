import React, { useContext, useEffect, useState } from 'react'
import {
  type BigInt01,
  type Leg,
  type PositionWithData,
  Zero01
} from '../common.js'
import { Box, Text } from 'ink'
import {
  type CollateralFullInfo,
  type UniswapPoolBasicInfo
} from '../pools/hooks/common.js'
import {
  usePoolContract,
  useUniswapPoolBasicInfo
} from '../pools/hooks/uniswap.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  addBigInt01,
  countLegs,
  findBaseAsset,
  flipPutCall,
  hasLeg,
  negate01,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify,
  tickToPrice,
  toFixed,
  toITMLegs
} from '../util.js'
import { type Address, formatUnits, type Hex } from 'viem'
import { NotificationContext } from '../notification.js'
import {
  type PremiumValues,
  type PremiumValuesWithBalanceAndUtilization,
  useAccountPoolFunctions,
  usePoolStatsByContracts
} from '../pools/hooks/panoptic.js'
import {
  type AccountCollateralMarginDetails,
  useAccountCollateralFunctions
} from '../pools/hooks/collateral.js'
import { useSFPM } from '../pools/sfpm.js'

interface PositionProps {
  position: PositionWithData
  poolInfo: UniswapPoolBasicInfo
  intrinsicValue: BigInt01
  isItm: boolean
}

interface LegProps {
  leg: Leg
  poolInfo: UniswapPoolBasicInfo
  showRatio?: boolean
}

const SingleLeg = ({ leg, poolInfo, showRatio }: LegProps) => {
  const decimals = poolInfo.token1.decimals - poolInfo.token0.decimals
  const quoteSymbol =
    leg.asset === 'token0' ? poolInfo.token1.symbol : poolInfo.token0.symbol
  const radius = tickToPrice((leg.tickUpper - leg.tickLower) / 2, 0) - 1.0
  const price = tickToPrice((leg.tickUpper + leg.tickLower) / 2, decimals)
  const baseAsset =
    findBaseAsset(poolInfo.token0.symbol, poolInfo.token1.symbol) ?? 'token0'
  const strike = baseAsset === 'token0' ? price : 1 / price
  const lowerPrice = tickToPrice(leg.tickLower, decimals)
  const upperPrice = tickToPrice(leg.tickUpper, decimals)
  const lower = baseAsset === 'token0' ? lowerPrice : 1 / upperPrice
  const upper = baseAsset === 'token0' ? upperPrice : 1 / lowerPrice
  const premiumState = leg.position === 'short' ? 'Earning' : 'Paying'
  const putCall =
    leg.asset === 'token1' ? flipPutCall(leg.tokenType) : leg.tokenType
  return (
    <Box>
      {showRatio ? (
        <Text>[{leg.optionRatio} options per contract] </Text>
      ) : (
        <></>
      )}
      <Text>{leg.position === 'long' ? 'Long' : 'Short'} </Text>
      <Text>{putCall === 'token0' ? 'PUT' : 'CALL'} </Text>
      <Text>
        @ {toFixed(strike)} {quoteSymbol}{' '}
      </Text>
      <Text>±{(radius * 100).toFixed(2)}% </Text>
      <Text>
        | {premiumState} premium in range [{toFixed(lower)}, {toFixed(upper)}]
      </Text>
    </Box>
  )
}

interface IndexedLeg {
  leg: Leg
  index: number
}

interface IntrinsicValueBlockProps {
  poolInfo: UniswapPoolBasicInfo
  intrinsicValue: BigInt01
}

const IntrinsicValueBlock = ({
  intrinsicValue,
  poolInfo
}: IntrinsicValueBlockProps) => {
  if (intrinsicValue.token0 === 0n && intrinsicValue.token1 === 0n) {
    return <></>
  }
  const token0ValueFormatted = formatUnits(
    intrinsicValue.token0,
    poolInfo.token0.decimals
  )
  const token1ValueFormatted = formatUnits(
    intrinsicValue.token1,
    poolInfo.token1.decimals
  )
  return (
    <Text>
      Net value (when closed / burned, excluding premium):{' '}
      {toFixed(Number(token0ValueFormatted))} {poolInfo.token0.symbol},{' '}
      {toFixed(Number(token1ValueFormatted))} {poolInfo.token1.symbol}
    </Text>
  )
}

export const Position = ({
  position,
  poolInfo,
  isItm,
  intrinsicValue
}: PositionProps) => {
  const iv = negate01(intrinsicValue)
  // const { addMessage } = useContext(NotificationContext)
  // useEffect(() => {
  //   addMessage(`Position:position ${stringify(position)}`)
  //   addMessage(`Position:intrinsicValue ${stringify(intrinsicValue)}`)
  // }, [position, addMessage, intrinsicValue])

  if (!position.legs[0]) {
    return <></>
  }
  const itmBlock = isItm ? <Text color={'red'}>[ITM]</Text> : ''
  // addMessage(`countLegs(position) ${countLegs(position)} ${stringify(position.legs)}`)
  if (countLegs(position) === 1) {
    const numContracts = formatUnits(
      position.balance ?? 0n,
      position.legs[0].asset === 'token1'
        ? poolInfo.token1.decimals
        : poolInfo.token0.decimals
    )
    return (
      <Box>
        <Text>
          - {itmBlock} {numContracts} contracts of{' '}
        </Text>
        <SingleLeg leg={position.legs[0]} poolInfo={poolInfo} />
        <Text> | </Text>
        <IntrinsicValueBlock intrinsicValue={iv} poolInfo={poolInfo} />
      </Box>
    )
  }

  const token0Legs: IndexedLeg[] = position.legs
    .filter((e) => !!e)
    .map((leg, index) => ({ leg, index }) satisfies IndexedLeg)
    .filter(({ leg, index }) => leg.asset === 'token0')

  const token1Legs: IndexedLeg[] = position.legs
    .filter((e) => !!e)
    .map((leg, index) => ({ leg, index }) satisfies IndexedLeg)
    .filter(({ leg, index }) => leg.asset === 'token1')

  return (
    <Box flexDirection={'column'}>
      <Text>
        - {itmBlock}{' '}
        {formatUnits(position.balance ?? 0n, poolInfo.token1.decimals)}{' '}
        contracts of{' '}
      </Text>
      {token0Legs.map(({ leg, index }) => {
        return (
          <SingleLeg
            key={`leg-${index}`}
            leg={leg}
            poolInfo={poolInfo}
            showRatio
          />
        )
      })}
      <Text>
        - {itmBlock}{' '}
        {formatUnits(position.balance ?? 0n, poolInfo.token0.decimals)}{' '}
        contracts of{' '}
      </Text>
      {token1Legs.map(({ leg, index }) => {
        return (
          <SingleLeg
            key={`leg-${index}`}
            leg={leg}
            poolInfo={poolInfo}
            showRatio
          />
        )
      })}
    </Box>
  )
}
interface PoolPositionsProps {
  uniswapPoolAddress: Address
  poolPositions: PositionWithData[]
}
export const PoolPositions = ({
  uniswapPoolAddress,
  poolPositions
}: PoolPositionsProps) => {
  const { addMessage } = useContext(NotificationContext)
  const poolInfo = useUniswapPoolBasicInfo(uniswapPoolAddress)
  const name = `${poolInfo.token0.symbol}/${poolInfo.token1.symbol}`

  const { panopticPool, uniswapPool } = usePoolContract(uniswapPoolAddress)
  const {
    c0Info,
    c1Info,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priceInverse,
    price,
    priceTick,
    ready: poolStatsReady,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tickSpacing
  } = usePoolStatsByContracts({ panopticPool, uniswapPool })

  const { calculateAccumulatedFeesBatch } = useAccountPoolFunctions({
    panopticPool
  })
  const { computeIntrinsicValue } = useSFPM()
  const { getAccountMarginDetails: getAccountMarginDetails0 } =
    useAccountCollateralFunctions(c0Info.tracker)
  const { getAccountMarginDetails: getAccountMarginDetails1 } =
    useAccountCollateralFunctions(c1Info.tracker)
  const [totalIntrinsicValue, setTotalIntrinsicValue] = useState<BigInt01>()
  const [intrinsicValues, setIntrinsicValues] = useState<Record<Hex, BigInt01>>(
    {}
  )
  const [itmLookup, setItmLookup] = useState<Record<Hex, boolean>>({})
  const [premiums, setPoolPremiums] =
    useState<PremiumValuesWithBalanceAndUtilization>()
  const [accountMargin0, setAccountMargin0] =
    useState<AccountCollateralMarginDetails>()
  const [accountMargin1, setAccountMargin1] =
    useState<AccountCollateralMarginDetails>()

  // useEffect(() => {
  //   addMessage(`poolPositions: ${stringify(poolPositions)}`)
  // }, [poolPositions, addMessage])

  useEffect(() => {
    async function init() {
      if (!poolStatsReady || !panopticPool) {
        return
      }

      const itmLookup: Record<Hex, boolean> = {}
      for (const p of poolPositions) {
        const id = BigInt(p.id)
        const newId = toITMLegs(id, priceTick)
        itmLookup[p.id] = hasLeg(newId)
      }
      setItmLookup(itmLookup)

      // NOTE: alternatively if we need to store itmPositions and compute something based on it...
      // const itmPositions = poolPositions.filter(p => {
      //   const id = BigInt(p.id)
      //   const newId = toITMLegs(id, priceTick)
      //   return hasLeg(newId)
      // })
      // Another implementation which drops all positions' non-itm legs. This is probably too complex to be useful, and needs more debugging and testing later, when we have multi-leg positions. Pay extra attention to risk partners
      // const itmPositions = poolPositions.map(p => {
      //   const id = BigInt(p.id)
      //   const newId = toITMLegs(id, priceTick)
      //   const legs = tokenIdToPosition(newId, p.tickSpacing, { [extractPoolId(id).toString(16)]: p.uniswapPoolAddress }).legs
      //   return { ...p, legs, id: `0x${newId.toString(16)}` } satisfies PositionWithData
      // }).filter(p => hasLeg(BigInt(p.id)))

      const intrinsicValues = await computeIntrinsicValue(
        panopticPool.address,
        poolPositions
      )
      // addMessage(`intrinsicValues=${stringify(intrinsicValues)}`)
      // NOTE: the values being calculated are actually values to the pool, not values to the user, i.e. the values represents debt owed by the user to the pool. The values to the user should be exactly the opposite
      setIntrinsicValues(intrinsicValues)
      let totalIntrinsicValue = Zero01
      for (const intrinsicValue of Object.values(intrinsicValues)) {
        totalIntrinsicValue = addBigInt01(totalIntrinsicValue, intrinsicValue)
      }
      setTotalIntrinsicValue(negate01(totalIntrinsicValue))
      const positionIds = poolPositions.map((p) => BigInt(p.id))
      const premiums = await calculateAccumulatedFeesBatch(positionIds)
      if (!premiums) {
        return
      }
      const { premium0, premium1, balanceMap, balancesAndUtilizations } =
        premiums
      setPoolPremiums({
        premium0,
        premium1,
        balanceMap,
        balancesAndUtilizations
      })
      // const balancesAndUtilizationsDebug = premiums.balancesAndUtilizations.slice(2, 3)
      // addMessage(`pos0=${stringify(tokenIdToLeg(balancesAndUtilizationsDebug[0][0], 0, tickSpacing))} balancesAndUtilizationsDebug ${stringify(balancesAndUtilizationsDebug)}`)
      // const margin0 = await getAccountMarginDetails0(priceTick, balancesAndUtilizationsDebug, premiums.premium0)
      const margin0 = await getAccountMarginDetails0(
        priceTick,
        premiums.balancesAndUtilizations,
        premiums.premium0
      )
      if (!margin0) {
        return
      }
      setAccountMargin0(margin0)
      // const margin1 = await getAccountMarginDetails1(priceTick, balancesAndUtilizationsDebug, premiums.premium0)
      const margin1 = await getAccountMarginDetails1(
        priceTick,
        premiums.balancesAndUtilizations,
        premiums.premium1
      )
      if (!margin1) {
        return
      }
      setAccountMargin1(margin1)
    }
    // addMessage('PoolPositions')
    init().catch((ex) => {
      addMessage((ex as Error).toString(), { color: 'red' })
    })
  }, [
    panopticPool,
    getAccountMarginDetails0,
    getAccountMarginDetails1,
    calculateAccumulatedFeesBatch,
    computeIntrinsicValue,
    poolStatsReady,
    priceTick,
    poolPositions,
    addMessage
  ])

  const ready: boolean =
    poolInfo.ready &&
    poolStatsReady &&
    premiums !== undefined &&
    totalIntrinsicValue !== undefined &&
    accountMargin0 !== undefined &&
    accountMargin1 !== undefined

  return (
    <Box flexDirection={'column'} marginY={1}>
      <Text>
        Pool {name} {/* ({uniswapPoolAddress}) */}
      </Text>
      {!ready && <Text>- Loading pool data...</Text>}
      {ready &&
        poolPositions.map((position) => {
          return (
            <Position
              key={position.id}
              position={position}
              poolInfo={poolInfo}
              isItm={itmLookup[position.id]}
              intrinsicValue={intrinsicValues[position.id]}
            />
          )
        })}
      {ready && (
        <PoolValue
          premiums={premiums!}
          totalIntrinsicValue={totalIntrinsicValue!}
          c0Info={c0Info}
          c1Info={c1Info}
          accountMargin0={accountMargin0!}
          accountMargin1={accountMargin1!}
          price={price}
        />
      )}
    </Box>
  )
}

interface PoolValueProps {
  premiums: PremiumValues
  totalIntrinsicValue: BigInt01
  c0Info: CollateralFullInfo
  c1Info: CollateralFullInfo
  accountMargin0: AccountCollateralMarginDetails
  accountMargin1: AccountCollateralMarginDetails
  price: number
}

export const PoolValue = ({
  totalIntrinsicValue,
  premiums,
  c0Info,
  c1Info,
  accountMargin0,
  accountMargin1,
  price
}: PoolValueProps) => {
  if (!totalIntrinsicValue || !premiums) {
    return (
      <Box flexDirection={'column'} marginY={1}>
        <Text>Pool Portfolio Value</Text>
        <Text color={'yellow'}>[Loading...]</Text>
      </Box>
    )
  }
  const color0 =
    totalIntrinsicValue.token0 === 0n
      ? 'yellow'
      : totalIntrinsicValue.token0 > 0n
        ? 'green'
        : 'red'
  const color1 =
    totalIntrinsicValue.token1 === 0n
      ? 'yellow'
      : totalIntrinsicValue.token1 > 0n
        ? 'green'
        : 'red'

  const iv0 = formatUnits(totalIntrinsicValue.token0, c0Info.decimals)
  const iv1 = formatUnits(totalIntrinsicValue.token1, c1Info.decimals)

  const premium0f = formatUnits(premiums.premium0 ?? 0n, c0Info.decimals)
  const premium1f = formatUnits(premiums.premium1, c1Info.decimals)
  const color0p =
    premiums.premium0 === 0n
      ? 'yellow'
      : premiums.premium0 > 0n
        ? 'green'
        : 'red'
  const color1p =
    premiums.premium1 === 0n
      ? 'yellow'
      : premiums.premium1 > 0n
        ? 'green'
        : 'red'

  const margin0f = formatUnits(
    accountMargin0?.requiredBalance ?? 0n,
    c0Info.decimals
  )
  const balance0f = formatUnits(
    accountMargin0?.accountBalance ?? 0n,
    c0Info.decimals
  )
  const margin1f = formatUnits(
    accountMargin1?.requiredBalance ?? 0n,
    c1Info.decimals
  )
  const balance1f = formatUnits(
    accountMargin1?.accountBalance ?? 0n,
    c1Info.decimals
  )
  const baseAsset = findBaseAsset(c0Info.symbol, c1Info.symbol)
  const displayPrice = baseAsset === 'token0' ? price : 1 / price
  const displayPriceSymbol =
    baseAsset === 'token0' ? c1Info.symbol : c0Info.symbol

  return (
    <Box flexDirection={'column'} marginY={1}>
      <Text>Pool Portfolio</Text>
      <Text>
        Current price: {toFixed(displayPrice)} {displayPriceSymbol}{' '}
      </Text>
      <Text> </Text>
      <Text color={color0}>
        {c0Info.symbol} Aggregated Intrinsic Value: {toFixed(Number(iv0))}
      </Text>
      <Text color={color0p}>
        {c0Info.symbol} Premium Balance: {toFixed(Number(premium0f))}
      </Text>
      <Text>
        {c0Info.symbol} Margin Requirement: {toFixed(Number(margin0f))}
      </Text>
      <Text>
        {c0Info.symbol} Deposit Balance: {toFixed(Number(balance0f))}
      </Text>

      <Text color={color1}>
        {c1Info.symbol} Aggregated Intrinsic Value: {toFixed(Number(iv1))}
      </Text>
      <Text color={color1p}>
        {c1Info.symbol} Premium Balance: {toFixed(Number(premium1f))}
      </Text>
      <Text>
        {c1Info.symbol} Margin Requirement: {toFixed(Number(margin1f))}
      </Text>
      <Text>
        {c1Info.symbol} Deposit Balance: {toFixed(Number(balance1f))}
      </Text>
    </Box>
  )
}
