import React, { useCallback, useContext, useState, useEffect, useRef } from 'react'
import {
  AmountSelector,
  calculateTokenId,
  ConfirmationSelector,
  type Leg,
  MultiChoiceSelector,
  type Position,
  type PutCallType,
  type Token01,
  type ValidatedPair
} from '../common.js'
import {
  flipPutCall,
  getOptionRange,
  priceToTick,
  tickToPrice,
  toFixed,
  tryParseUnits
} from '../util.js'
import { Box, Text } from 'ink'
import { type PanopticPoolInfo } from '../pools/hooks/common.js'
import { NotificationContext } from '../notification.js'
import { formatUnits } from 'viem'
import { type MarginUsage, useMarginEstimator } from './calc.js'
import { CommandKeys, useCli, useOption } from 'src/commands.tsx'
import CommandArgs from 'src/command-args.tsx'
import { commandOptions } from 'src/options.ts'
import { usePools } from 'src/pools/hooks/panoptic.ts'

export enum TradeStage {
  Empty = 0,
  PoolSelection = 1,
  QuoteAsset = 2,
  PutCall = 3,
  StrikeAmount = 4,
  Width = 5,
  Quantity = 6,
  Confirm = 7
}

interface LegMakerProps {
  chosenPair?: ValidatedPair
  chosenPairInfo: PanopticPoolInfo
  onLegConfirm: (
    leg: Leg,
    positionSize: bigint,
    atTick: number
  ) => Promise<void>
  stage: TradeStage
  setStage: (stage: TradeStage) => any
  position: 'short' | 'long'
  onPoolSelected: (pair: ValidatedPair) => void
}

export const LegMaker: React.FC<LegMakerProps> = ({
  chosenPair,
  chosenPairInfo,
  onLegConfirm,
  position,
  onPoolSelected,
  stage,
  setStage
}) => {
  const { addMessage } = useContext(NotificationContext)
  const [putCall, setPutCall] = useState<PutCallType>('token0')
  const [quoteAsset, setQuoteAsset] = useState<Token01>('token0')
  const baseAssetInfo =
    quoteAsset === 'token0' ? chosenPairInfo.c1Info : chosenPairInfo.c0Info
  const quoteAssetInfo =
    quoteAsset === 'token0' ? chosenPairInfo.c0Info : chosenPairInfo.c1Info
  const currentPrice =
    quoteAsset === 'token0' ? chosenPairInfo.priceInverse : chosenPairInfo.price

  const [strikeTick, setStrikeTick] = useState<number>(0)
  const strikePrice01 = tickToPrice(
    strikeTick,
    chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals
  )
  const strikePrice =
    quoteAsset === 'token0' ? 1 / strikePrice01 : strikePrice01
  const [range, setRange] = useState<number>(0)
  const [lower, upper] = getOptionRange(
    strikePrice,
    range,
    chosenPairInfo.tickSpacing
  )

  const [marginUsage, setMarginUsage] = useState<MarginUsage | undefined>()

  const { computeMarginUsage } = useMarginEstimator(chosenPairInfo)

  // in number of atomic units of the token selected by putCall
  // for safety and to keep things consistent, we do not store a separate "position size in terms of base asset" for display purposes.
  // Instead we use a function to convert the value back and ask the user to confirm
  const [positionSize, setPositionSize] = useState<bigint>(0n)
  // const positionSizeInBaseAsset = getPositionSizeInBaseAsset(positionSize, putCall, quoteAsset, strikePrice, chosenPairInfo.c0Info.decimals, chosenPairInfo.c1Info.decimals)

  const onQuoteAssetSubmit = useCallback(
    (choice: number) => {
      setQuoteAsset(choice === 1 ? 'token0' : 'token1')
      addMessage(`Quoting price in terms of ${quoteAssetInfo.symbol}`, {
        color: 'green'
      })
      setStage(TradeStage.PutCall)
    },
    [setStage, quoteAssetInfo, addMessage]
  )

  const onPutCallSelected = useCallback(
    (choice: number) => {
      setPutCall(choice === 1 ? 'token0' : 'token1')
      addMessage(
        `Selected ${choice === 1 ? 'PUT' : 'CALL'} option on ${baseAssetInfo.symbol} (quoted in ${quoteAssetInfo.symbol})`,
        { color: 'green' }
      )
      setStage(TradeStage.StrikeAmount)
    },
    [setStage, baseAssetInfo, quoteAssetInfo, addMessage]
  )

  const onStrikeAmountSubmit = useCallback(
    (price: number) => {
      // must round to nearest tick divisible by tickSpacing
      const decimals =
        chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals
      const tick = priceToTick(
        quoteAsset === 'token0' ? 1 / price : price,
        decimals
      )
      const roundedTick =
        Math.round(tick / chosenPairInfo.tickSpacing) *
        chosenPairInfo.tickSpacing
      const roundedPrice = tickToPrice(roundedTick, decimals)
      const displayRoundedPrice =
        quoteAsset === 'token0' ? 1 / roundedPrice : roundedPrice
      addMessage(
        `Strike price set to ${displayRoundedPrice} ${quoteAssetInfo.symbol}`,
        { color: 'green' }
      )
      // addMessage(`tick: ${tick} | decimals=${decimals}`)
      setStrikeTick(roundedTick)
      setStage(TradeStage.Width)
    },
    [setStage, quoteAsset, chosenPairInfo, quoteAssetInfo, addMessage]
  )

  const onWidthSubmit = useCallback(
    (input: string) => {
      if (input.endsWith('%')) {
        input = input.slice(0, input.length - 1)
      }
      const percent = Number(input)
      if (!percent) {
        addMessage(`Invalid percentage: ${input}`, { color: 'red' })
        return false
      }
      const multiplier = percent / 100 + 1
      const ticks = priceToTick(multiplier, 0)
      const radius = Math.round(ticks / chosenPairInfo.tickSpacing)
      const [l, u] = getOptionRange(
        strikePrice,
        radius,
        chosenPairInfo.tickSpacing
      )
      addMessage(
        `Range set to ${percent.toFixed(2)}% (${toFixed(l)}, ${toFixed(u)})`,
        { color: 'green' }
      )
      setRange(radius)
      setStage(TradeStage.Quantity)
      return true
    },
    [setStage, strikePrice, addMessage, chosenPairInfo]
  )

  const buildLeg = useCallback((): Leg => {
    const tickLower = strikeTick - range * chosenPairInfo.tickSpacing
    const tickUpper = strikeTick + range * chosenPairInfo.tickSpacing
    // price is displayed as inverse, so when the user perceives the price goes up, it is in fact that 1/price going up, which means actual price goes down, and the tick goes down
    // therefore, put should be transformed to calls, and calls should be transformed to puts
    const parsedPutCall =
      quoteAsset === 'token0' ? flipPutCall(putCall) : putCall

    const leg: Leg = {
      asset: quoteAsset === 'token0' ? 'token1' : 'token0',
      optionRatio: 1,
      position,
      tokenType: parsedPutCall,
      riskPartnerIndex: 0,
      tickLower,
      tickUpper
    }
    return leg
  }, [strikeTick, range, chosenPairInfo, putCall, quoteAsset, position])
  const onQuantitySubmit = useCallback(
    async (amount: number) => {
      // Update: temporarily commenting out, as no conversion seems to be needed,
      // as the smart contract appears to be correctly converting the notional values to be moved, given "asset" field of the leg is set
      // const decimals = putCall === 'token0' ? chosenPairInfo.c0Info.decimals : chosenPairInfo.c1Info.decimals
      // // putCall === 'token0'
      // if (quoteAsset === 'token0' && putCall === 'token0') {
      //   // quoteAsset === 'token0'  =>  amount=1 means 1 base asset (ETH) worth of quote asset (USDC)
      //   // so if we are moving token0 (ETH) (i.e.put), actual amount must be multiplied by strikePrice
      //   amount = amount * strikePrice
      // } else if (quoteAsset === 'token1' && putCall === 'token1') {
      //   // quoteAsset === 'token1'  =>  amount=1 means 1 USDC worth of asset
      //   // so if we are moving token1 (ETH), actual amount should be divided by strikePrice
      //   amount = amount / strikePrice
      // }
      // // for the other two cases, actual amount equals to amount

      const decimals =
        quoteAsset === 'token0'
          ? chosenPairInfo.c1Info.decimals
          : chosenPairInfo.c0Info.decimals
      const atomicAmount = tryParseUnits(amount.toString(), decimals)
      if (!atomicAmount) {
        addMessage(`Invalid amount: ${amount}`, { color: 'red' })
        return false
      }
      setPositionSize(atomicAmount)
      addMessage(`Position size set to ${amount} ${baseAssetInfo.symbol}`, {
        color: 'green'
      })
      const leg = buildLeg()
      const position: Position = {
        uniswapPoolAddress: chosenPairInfo.uniswapPool!.address,
        tickSpacing: chosenPairInfo.tickSpacing,
        legs: [leg, undefined, undefined, undefined]
      }
      const id = calculateTokenId(position)

      const marginUsage = await computeMarginUsage(id, atomicAmount)
      setMarginUsage(marginUsage)
      setStage(TradeStage.Confirm)
      return true
    },
    [
      setStage,
      baseAssetInfo,
      quoteAsset,
      addMessage,
      chosenPairInfo,
      computeMarginUsage,
      buildLeg
    ]
  )

  const onConfirm = useCallback(
    async (yes?: boolean) => {
      if (yes === false) {
        setStage(TradeStage.Quantity)
      } else if (yes === undefined) {
        setStage(TradeStage.PoolSelection)
        addMessage('Option minting aborted', { color: 'red' })
      } else if (yes) {
        const leg = buildLeg()
        onLegConfirm(leg, positionSize, chosenPairInfo.priceTick)
        // addMessage(`leg=${JSON.stringify(leg)} tickSpacing=${chosenPairInfo.tickSpacing} radius=${range}`)
      }
    },
    [buildLeg, setStage, onLegConfirm, addMessage, chosenPairInfo, positionSize]
  )

  const cli = useCli()
  const pool = useOption('pool')
  const asset = useOption('asset')
  const trade = useOption('trade')
  const sp = useOption('sp')
  const priceRange = useOption('range')
  const amount = useOption('amount')
  const { pairs } = usePools()

  useEffect(() => {
    if (!cli || !pool || !pairs) {
      return
    }

    if (stage !== TradeStage.PoolSelection) {
      return
    }

    const pair = pairs.find((p) =>
      [
        `${p.token0}/${p.token1}`.toLowerCase(),
        `${p.token1}/${p.token0}`.toLowerCase()
      ].includes(pool.toLowerCase())
    )

    if (pair === undefined) {
      addMessage(`Pool not found: ${pool.toUpperCase()}`, { color: 'red' })
      setStage(TradeStage.Empty)
      return
    }

    onPoolSelected(pair)
  }, [cli, addMessage, pairs, pool, stage, setStage, onPoolSelected])

  useEffect(() => {
    if (
      !cli ||
      !asset ||
      !chosenPairInfo.ready ||
      stage !== TradeStage.QuoteAsset
    ) {
      return
    }

    let choice = 0

    if (chosenPairInfo.c0Info.symbol.toLowerCase() === asset.toLowerCase()) {
      choice = 1
    } else if (
      chosenPairInfo.c1Info.symbol.toLowerCase() === asset.toLowerCase()
    ) {
      choice = 2
    }

    if (choice === 0) {
      addMessage(`Invalid asset: ${asset.toUpperCase()}`, { color: 'red' })
      setStage(TradeStage.Empty)
      return
    }

    onQuoteAssetSubmit(choice)
  }, [
    addMessage,
    asset,
    chosenPairInfo,
    cli,
    onQuoteAssetSubmit,
    setStage,
    stage
  ])

  useEffect(() => {
    if (!cli || stage !== TradeStage.PutCall) {
      return
    }

    let choice = 0

    if (trade?.toLowerCase() === 'put') {
      choice = 1
    } else if (trade?.toLowerCase() === 'call') {
      choice = 2
    }

    if (choice === 0) {
      addMessage(
        `Invalid trade (should be PUT or CALL): ${trade?.toUpperCase()}`,
        { color: 'red' }
      )
      setStage(TradeStage.Empty)
      return
    }

    onPutCallSelected(choice)
  }, [addMessage, cli, onPutCallSelected, stage, setStage, trade])

  useEffect(() => {
    if (!cli || stage !== TradeStage.StrikeAmount) {
      return
    }

    if (isNaN(Number(sp))) {
      addMessage(`Invalid striker price: ${sp}`, { color: 'red' })
      setStage(TradeStage.Empty)
      return
    }

    onStrikeAmountSubmit(Number(sp))
  }, [addMessage, cli, stage, sp, setStage, onStrikeAmountSubmit])

  useEffect(() => {
    if (!cli || stage !== TradeStage.Width) {
      return
    }

    if (!onWidthSubmit(String(priceRange))) {
      setStage(TradeStage.Empty)
    }
  }, [addMessage, cli, stage, priceRange, setStage, onWidthSubmit])

  const stageRef = useRef<TradeStage>(TradeStage.Quantity)

  useEffect(() => {
    if (
      !cli ||
      stage !== TradeStage.Quantity ||
      stageRef.current !== TradeStage.Quantity
    ) {
      return
    }

    stageRef.current = TradeStage.Confirm
    onQuantitySubmit(Number(amount)).then((result) => {
      if (!result) {
        setStage(TradeStage.Empty)
      }
    })
  }, [addMessage, cli, stage, amount, setStage, onQuantitySubmit])

  useEffect(() => {
    if (
      !cli ||
      stage !== TradeStage.Confirm ||
      stageRef.current !== TradeStage.Confirm
    ) {
      return
    }

    stageRef.current = TradeStage.Empty
    setStage(TradeStage.Empty)
    onConfirm(true)
  }, [addMessage, cli, onConfirm, stage, setStage])

  if (
    cli &&
    (!pool ||
      !asset ||
      !trade ||
      sp === undefined ||
      priceRange === undefined ||
      amount === undefined)
  ) {
    return (
      <CommandArgs
        title={`Use the following options to ${chosenPair ? 'sell' : 'buy'}`}
        args={commandOptions[CommandKeys.Sell]!}
      />
    )
  }

  if (cli) {
    return <></>
  }

  return (
    <Box flexDirection={'column'}>
      {stage === TradeStage.QuoteAsset && (
        <MultiChoiceSelector
          options={[
            chosenPairInfo.c0Info.symbol +
              (chosenPair?.baseAsset === 'token1' ? ' (Recommended)' : ''),
            chosenPairInfo.c1Info.symbol +
              (chosenPair?.baseAsset === 'token0' ? ' (Recommended)' : '')
          ]}
          onSelected={onQuoteAssetSubmit}
          onExit={() => {
            setQuoteAsset('token0')
            setStage(TradeStage.PoolSelection)
          }}
          prompt={'Choose your quote asset'}
          intro={
            <Box marginY={1} flexDirection={'column'}>
              <Text>Select quote asset</Text>
              <Text>
                - prices is quoted in that asset, against the other asset (i.e.
                base asset)
              </Text>
              <Text>
                - e.g. If quote asset is USDC, base asset is ETH, price is the
                number of USDC needed to buy 1 ETH
              </Text>
            </Box>
          }
        />
      )}

      {stage === TradeStage.PutCall && (
        <MultiChoiceSelector
          options={[
            `Put: you profit when ${baseAssetInfo.symbol} does not go down much, incurs loss otherwise`,
            `Call: you profit when ${baseAssetInfo.symbol} does not go up much, incurs loss otherwise`
          ]}
          onSelected={onPutCallSelected}
          onExit={() => {
            setPutCall('token0')
            setStage(TradeStage.QuoteAsset)
          }}
          prompt={'Choose the type of option to trade'}
          intro={'Trading put or call?'}
        />
      )}

      {stage === TradeStage.StrikeAmount && (
        <AmountSelector
          intro={`Strike price for the option? Median spot price of last 10 minute is ${toFixed(currentPrice)}`}
          prompt={`Enter price for 1 ${baseAssetInfo.symbol} (in ${quoteAssetInfo.symbol})`}
          onSubmit={onStrikeAmountSubmit}
          onBack={() => {
            setStage(TradeStage.PutCall)
            setStrikeTick(0)
          }}
        />
      )}

      {stage === TradeStage.Width && (
        <AmountSelector
          intro={
            <>
              <Text>Price range for the option?</Text>
              <Text>
                - Premium (profit) is accrued when ${baseAssetInfo.symbol} price
                stays within range around strike price
              </Text>
              <Text>
                - Strike price: {toFixed(strikePrice)} {quoteAssetInfo.symbol}{' '}
              </Text>
              <Text>
                - Learn more at https://panoptic.xyz/docs/product/streamia{' '}
              </Text>
            </>
          }
          prompt={`Enter the desired percentage range (e.g. 10% means +-10% around ${toFixed(strikePrice)}])`}
          onRawSubmit={onWidthSubmit}
          onBack={() => {
            setStage(TradeStage.StrikeAmount)
            setRange(0)
          }}
        />
      )}
      {stage === TradeStage.Quantity && (
        <AmountSelector
          intro={`Number of options to be ${chosenPair ? 'sold' : 'bought'}`}
          prompt={`Enter in the number of ${baseAssetInfo.symbol}`}
          onSubmit={onQuantitySubmit}
        />
      )}
      {stage === TradeStage.Confirm && (
        <ConfirmationSelector
          intro={
            <>
              <Box marginY={1}>
                <Text>Please verify and confirm</Text>
              </Box>
              <Text>- {position === 'short' ? 'SELL' : 'BUY'} an option</Text>
              <Text>
                - Pool: {chosenPairInfo.c0Info.symbol}/
                {chosenPairInfo.c1Info.symbol}
              </Text>
              <Text>
                - Trading {putCall === 'token0' ? 'PUT' : 'CALL'} on{' '}
                {baseAssetInfo.symbol}
              </Text>
              <Text>
                - Strike Price: {toFixed(strikePrice)} {quoteAssetInfo.symbol}
              </Text>
              <Text>
                - Premium Earning Price Range: [{toFixed(lower)},{' '}
                {toFixed(upper)}] {quoteAssetInfo.symbol}{' '}
              </Text>
              <Text>
                - Position Size:{' '}
                {formatUnits(positionSize, baseAssetInfo.decimals)}{' '}
                {baseAssetInfo.symbol}{' '}
              </Text>
              <Text>
                - Margin Requirement Increase:{' '}
                {toFixed(
                  Number(
                    formatUnits(
                      marginUsage?.marginIncrease0 ?? 0n,
                      chosenPairInfo.c0Info.decimals
                    )
                  )
                )}{' '}
                {chosenPairInfo.c0Info.symbol} (+
                {toFixed(
                  (marginUsage?.marginIncrease0Ratio ?? 0) * 100
                )}%),{' '}
                {toFixed(
                  Number(
                    formatUnits(
                      marginUsage?.marginIncrease1 ?? 0n,
                      chosenPairInfo.c1Info.decimals
                    )
                  )
                )}{' '}
                {chosenPairInfo.c1Info.symbol} (+
                {toFixed((marginUsage?.marginIncrease1Ratio ?? 0) * 100)}%)
              </Text>
              <Text>
                - Free Margin Remaining:{' '}
                {toFixed(
                  Number(
                    formatUnits(
                      marginUsage?.marginFree0After ?? 0n,
                      chosenPairInfo.c0Info.decimals
                    )
                  )
                )}{' '}
                {chosenPairInfo.c0Info.symbol} (
                {toFixed((marginUsage?.marginFree0AfterRatio ?? 0) * 100)}%),{' '}
                {toFixed(
                  Number(
                    formatUnits(
                      marginUsage?.marginFree1After ?? 0n,
                      chosenPairInfo.c1Info.decimals
                    )
                  )
                )}{' '}
                {chosenPairInfo.c1Info.symbol} (+
                {toFixed((marginUsage?.marginFree1AfterRatio ?? 0) * 100)}%)
              </Text>
              {/* <Text>- Position Size: {formatUnits(positionSizeInBaseAsset, baseAssetInfo.decimals)} {baseAssetInfo.symbol} </Text> */}
            </>
          }
          onConfirm={onConfirm}
        />
      )}
    </Box>
  )
}
