import React, { useCallback, useContext, useState } from 'react'
import {
  AmountSelector,
  ConfirmationSelector,
  type Leg,
  MultiChoiceSelector,
  type Token01, type ValidatedPair
} from '../common.js'
import { getOptionRange, priceToTick, tickToPrice, toFixed, tryParseUnits } from '../util.js'
import { Box, Text } from 'ink'
import { type PanopticPoolInfo } from '../pools/hooks/common.js'
import { NotificationContext } from '../notification.js'
import { formatUnits } from 'viem'

export enum TradeStage {
  PoolSelection = 1,
  QuoteAsset = 2,
  PutCall = 3,
  StrikeAmount = 4,
  Width = 5,
  Quantity = 6,
  Confirm = 7,
}

interface LegMakerProps {
  chosenPair?: ValidatedPair
  chosenPairInfo: PanopticPoolInfo
  onLegConfirm: (leg: Leg, positionSize: bigint, atTick: number) => any
  stage: TradeStage
  setStage: (stage: TradeStage) => any
  position: 'short' | 'long'
}

export const LegMaker = ({ chosenPair, chosenPairInfo, onLegConfirm, position, stage, setStage }: LegMakerProps) => {
  const { addMessage } = useContext(NotificationContext)
  const [putCall, setPutCall] = useState<Token01>('token0')
  const [quoteAsset, setQuoteAsset] = useState<Token01>('token0')
  const baseAssetInfo = quoteAsset === 'token0' ? chosenPairInfo.c1Info : chosenPairInfo.c0Info
  const quoteAssetInfo = quoteAsset === 'token0' ? chosenPairInfo.c0Info : chosenPairInfo.c1Info
  const currentPrice = quoteAsset === 'token0' ? chosenPairInfo.priceInverse : chosenPairInfo.price

  const [strikeTick, setStrikeTick] = useState<number>(0)
  const strikePrice01 = tickToPrice(strikeTick, chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals)
  const strikePrice = quoteAsset === 'token0' ? 1 / strikePrice01 : strikePrice01
  const [range, setRange] = useState<number>(0)
  const [lower, upper] = getOptionRange(strikePrice, range, chosenPairInfo.tickSpacing)

  // in number of atomic units of the token selected by putCall
  // for safety and to keep things consistent, we do not store a separate "position size in terms of base asset" for display purposes.
  // Instead we use a function to convert the value back and ask the user to confirm
  const [positionSize, setPositionSize] = useState<bigint>(0n)
  // const positionSizeInBaseAsset = getPositionSizeInBaseAsset(positionSize, putCall, quoteAsset, strikePrice, chosenPairInfo.c0Info.decimals, chosenPairInfo.c1Info.decimals)

  const onQuoteAssetSubmit = useCallback((choice: number) => {
    setQuoteAsset(choice === 1 ? 'token0' : 'token1')
    addMessage(`Quoting price in terms of ${quoteAssetInfo.symbol}`, { color: 'green' })
    setStage(TradeStage.PutCall)
  }, [setStage, quoteAssetInfo, addMessage])

  const onPutCallSelected = useCallback((choice: number) => {
    setPutCall(choice === 1 ? 'token0' : 'token1')
    addMessage(`Selected ${choice === 1 ? 'PUT' : 'CALL'} option on ${baseAssetInfo.symbol} (quoted in ${quoteAssetInfo.symbol})`, { color: 'green' })
    setStage(TradeStage.StrikeAmount)
  }, [setStage, baseAssetInfo, quoteAssetInfo, addMessage])

  const onStrikeAmountSubmit = useCallback((price: number) => {
    // must round to nearest tick divisible by tickSpacing
    const decimals = chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals
    const tick = priceToTick(quoteAsset === 'token0' ? 1 / price : price, decimals)
    const roundedTick = Math.round(tick / chosenPairInfo.tickSpacing) * chosenPairInfo.tickSpacing
    const roundedPrice = tickToPrice(roundedTick, decimals)
    const displayRoundedPrice = quoteAsset === 'token0' ? 1 / roundedPrice : roundedPrice
    addMessage(`Strike price set to ${displayRoundedPrice} ${quoteAssetInfo.symbol}`, { color: 'green' })
    // addMessage(`tick: ${tick} | decimals=${decimals}`)
    setStrikeTick(roundedTick)
    setStage(TradeStage.Width)
  }, [setStage, quoteAsset, chosenPairInfo, quoteAssetInfo, addMessage])

  const onWidthSubmit = useCallback((input: string) => {
    if (input.endsWith('%')) {
      input = input.slice(0, input.length - 1)
    }
    const percent = Number(input)
    if (!percent) {
      addMessage(`Invalid percentage: ${input}`, { color: 'red' })
      return
    }
    const multiplier = percent / 100 + 1
    const ticks = priceToTick(multiplier, 0)
    const radius = Math.round(ticks / chosenPairInfo.tickSpacing)
    const [l, u] = getOptionRange(strikePrice, radius, chosenPairInfo.tickSpacing)
    addMessage(`Range set to ${percent.toFixed(2)}% (${toFixed(l)}, ${toFixed(u)})`, { color: 'green' })
    setRange(radius)
    setStage(TradeStage.Quantity)
  }, [setStage, strikePrice, addMessage, chosenPairInfo])

  const onQuantitySubmit = useCallback((amount: number) => {
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

    const decimals = quoteAsset === 'token0' ? chosenPairInfo.c1Info.decimals : chosenPairInfo.c0Info.decimals
    const atomicAmount = tryParseUnits(amount.toString(), decimals)
    if (!atomicAmount) {
      addMessage(`Invalid amount: ${amount}`, { color: 'red' })
      return
    }
    setPositionSize(atomicAmount)
    addMessage(`Position size set to ${amount} ${baseAssetInfo.symbol}`, { color: 'green' })
    setStage(TradeStage.Confirm)
  }, [setStage, baseAssetInfo, quoteAsset, addMessage, chosenPairInfo])

  const onConfirm = useCallback(async (yes?: boolean) => {
    if (yes === false) {
      setStage(TradeStage.Quantity)
    } else if (yes === undefined) {
      setStage(TradeStage.PoolSelection)
      addMessage('Option minting aborted', { color: 'red' })
    } else if (yes) {
      const tickLower = strikeTick - range * chosenPairInfo.tickSpacing
      const tickUpper = strikeTick + range * chosenPairInfo.tickSpacing
      const leg: Leg = {
        asset: quoteAsset === 'token0' ? 'token1' : 'token0',
        optionRatio: 1,
        position,
        tokenType: putCall,
        riskPartnerIndex: 0,
        tickLower,
        tickUpper
      }
      onLegConfirm(leg, positionSize, chosenPairInfo.priceTick)
      // addMessage(`leg=${JSON.stringify(leg)} tickSpacing=${chosenPairInfo.tickSpacing} radius=${range}`)
    }
  }, [position, setStage, onLegConfirm, addMessage, chosenPairInfo, positionSize, putCall, quoteAsset, strikeTick, range])

  return <Box flexDirection={'column'}>
    { stage === TradeStage.QuoteAsset && <MultiChoiceSelector options={[
      chosenPairInfo.c0Info.symbol + (chosenPair?.baseAsset === 'token1' ? ' (Recommended)' : ''),
      chosenPairInfo.c1Info.symbol + (chosenPair?.baseAsset === 'token0' ? ' (Recommended)' : '')
    ]} onSelected={onQuoteAssetSubmit} onExit={() => {
      setQuoteAsset('token0')
      setStage(TradeStage.PoolSelection)
    }} prompt={'Choose your quote asset'}
        intro={<Box marginY={1} flexDirection={'column'}>
          <Text>Select quote asset</Text>
          <Text>- prices is quoted in that asset, against the other asset (i.e. base asset)</Text>
          <Text>- e.g. If quote asset is USDC, base asset is ETH, price is the number of USDC needed to buy 1 ETH</Text>
        </Box>}
    /> }

    { stage === TradeStage.PutCall && <MultiChoiceSelector options={[
        `Put: you profit when ${baseAssetInfo.symbol} does not go down much, incurs loss otherwise`,
        `Call: you profit when ${baseAssetInfo.symbol} does not go up much, incurs loss otherwise`
    ]} onSelected={onPutCallSelected} onExit={() => {
      setPutCall('token0')
      setStage(TradeStage.QuoteAsset)
    }} prompt={'Choose the type of option to trade'} intro={'Trading put or call?'}/> }

    { stage === TradeStage.StrikeAmount && <AmountSelector
      intro={`Strike price for the option? Median spot price of last 10 minute is ${toFixed(currentPrice)}`}
      prompt={`Enter price for 1 ${baseAssetInfo.symbol} (in ${quoteAssetInfo.symbol})`}
      onSubmit={onStrikeAmountSubmit}
      onBack={() => {
        setStage(TradeStage.PutCall)
        setStrikeTick(0)
      }}
    /> }

    { stage === TradeStage.Width && <AmountSelector
      intro={<>
        <Text>Price range for the option?</Text>
        <Text>- Premium (profit) is accrued when ${baseAssetInfo.symbol} price stays within range around strike price</Text>
        <Text>- Strike price: {toFixed(strikePrice)} {quoteAssetInfo.symbol} </Text>
        <Text>- Learn more at https://panoptic.xyz/docs/product/streamia </Text>
      </>}
      prompt={`Enter the desired percentage range (e.g. 10% means +-10% around ${toFixed(strikePrice)}])`}
      onRawSubmit={onWidthSubmit}
      onBack={() => {
        setStage(TradeStage.StrikeAmount)
        setRange(0)
      }}
    /> }
    { stage === TradeStage.Quantity && <AmountSelector
      intro={'Number of options to be sold?'}
      prompt={`Enter in the number of ${baseAssetInfo.symbol}`}
      onSubmit={onQuantitySubmit}
    /> }
    { stage === TradeStage.Confirm && <ConfirmationSelector
      intro={<>
        <Box marginY={1}><Text>Please verify and confirm</Text></Box>
        <Text>- {position === 'short' ? 'SELL' : 'BUY'} an option</Text>
        <Text>- Pool: {chosenPairInfo.c0Info.symbol}/{chosenPairInfo.c1Info.symbol}</Text>
        <Text>- Trading {putCall === 'token0' ? 'PUT' : 'CALL'} on {baseAssetInfo.symbol}</Text>
        <Text>- Strike Price: {toFixed(strikePrice)} {quoteAssetInfo.symbol}</Text>
        <Text>- Premium Earning Price Range: [{toFixed(lower)}, {toFixed(upper)}] {quoteAssetInfo.symbol} </Text>
        <Text>- Position Size: {formatUnits(positionSize, baseAssetInfo.decimals)} {baseAssetInfo.symbol} </Text>
        {/* <Text>- Position Size: {formatUnits(positionSizeInBaseAsset, baseAssetInfo.decimals)} {baseAssetInfo.symbol} </Text> */}
      </>}
      onConfirm={onConfirm}
    /> }
  </Box>
}
