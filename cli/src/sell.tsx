import React, { useCallback, useContext, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { usePoolStats } from './pools/hooks.js'
import { NotificationContext } from './notification.js'
import {
  AmountSelector,
  ConfirmationSelector,
  getOptionRange,
  MultiChoiceSelector,
  SectionTitle, type Token01,
  type ValidatedPair
} from './common.js'
import { Box, Text } from 'ink'
import { PoolSelector } from './pools/selector.js'
import { formatUnits } from 'viem'
import { priceToTick, tickToPrice, tryParseUnits } from './util.js'

enum Stage {
  PoolSelection = 1,
  QuoteAsset = 2,
  PutCall = 3,
  StrikeAmount = 4,
  Width = 5,
  Quantity = 6,
  Confirm = 7,
}

export const SellControl = () => {
  // TODO: make below statements a single hook
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { addMessage } = useContext(NotificationContext)
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
  const [putCall, setPutCall] = useState<Token01>()
  const [quoteAsset, setQuoteAsset] = useState<Token01>('token0')
  const baseAssetInfo = quoteAsset === 'token0' ? chosenPairInfo.c1Info : chosenPairInfo.c0Info
  const quoteAssetInfo = quoteAsset === 'token0' ? chosenPairInfo.c0Info : chosenPairInfo.c1Info

  const currentPrice = quoteAsset === 'token0' ? chosenPairInfo.priceInverse : chosenPairInfo.price

  const [strikeTick, setStrikeTick] = useState<number>(0)
  const strikePrice01 = tickToPrice(strikeTick, chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals)
  const strikePrice = quoteAsset === 'token0' ? 1 / strikePrice01 : strikePrice01
  const [width, setWidth] = useState<number>(0)
  const [lower, upper] = getOptionRange(strikePrice, width, chosenPairInfo.tickSpacing)
  const [positionSize, setPositionSize] = useState<bigint>(0n)

  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(Stage.QuoteAsset)
  }

  const onQuoteAssetSubmit = useCallback((choice: number) => {
    setQuoteAsset(choice === 1 ? 'token0' : 'token1')
    addMessage(`Quoting price in terms of ${quoteAssetInfo.symbol}`, { color: 'green' })
    setStage(Stage.PutCall)
  }, [quoteAssetInfo, addMessage])

  const onPutCallSelected = useCallback((choice: number) => {
    setPutCall(choice === 1 ? 'token0' : 'token1')
    addMessage(`Selected ${choice === 1 ? 'PUT' : 'CALL'} option on ${baseAssetInfo.symbol} (quoted in ${quoteAssetInfo.symbol})`, { color: 'green' })
    setStage(Stage.StrikeAmount)
  }, [baseAssetInfo, quoteAssetInfo, addMessage])

  const onStrikeAmountSubmit = useCallback((price: number) => {
    addMessage(`Strike price set to ${price} ${quoteAssetInfo.symbol}`, { color: 'green' })
    const decimals = chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals
    const tick = priceToTick(quoteAsset === 'token0' ? 1 / price : price, decimals)
    addMessage(`tick: ${tick}`)
    setStrikeTick(tick)
    setStage(Stage.Width)
  }, [quoteAsset, chosenPairInfo, quoteAssetInfo, addMessage])

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
    const width = Math.round(ticks / chosenPairInfo.tickSpacing)
    const [l, u] = getOptionRange(strikePrice, width, chosenPairInfo.tickSpacing)
    addMessage(`Range set to ${percent.toFixed(2)}% (${l}, ${u})`, { color: 'green' })
    setWidth(width)
    setStage(Stage.Quantity)
  }, [strikePrice, addMessage, chosenPairInfo])

  const onQuantitySubmit = useCallback((amount: number) => {
    const decimals = putCall === 'token0' ? chosenPairInfo.c0Info.decimals : chosenPairInfo.c1Info.decimals
    if (quoteAsset === 'token0' && putCall === 'token0') {
      // quoteAsset === 'token0'  =>  amount=1 means 1 base asset (ETH) worth of quote asset (USDC)
      // so if we are moving token0 (ETH) (i.e.put), actual amount must be multiplied by strikePrice
      amount = amount * strikePrice
    } else if (quoteAsset === 'token1' && putCall === 'token1') {
      // quoteAsset === 'token1'  =>  amount=1 means 1 USDC worth of asset
      // so if we are moving token1 (ETH), actual amount should be divided by strikePrice
      amount = amount / strikePrice
    }
    // for the other two cases, actual amount equals to amount

    const atomicAmount = tryParseUnits(amount.toString(), decimals)
    if (!atomicAmount) {
      addMessage(`Invalid amount: ${amount}`, { color: 'red' })
      return
    }
    setPositionSize(atomicAmount)
    addMessage(`Position size set to ${amount} ${baseAssetInfo.symbol}`, { color: 'green' })
    setStage(Stage.Confirm)
  }, [baseAssetInfo, quoteAsset, strikePrice, addMessage, chosenPairInfo, putCall])

  const onConfirm = useCallback(async (yes?: boolean) => {
    if (yes === false) {
      setStage(Stage.Quantity)
    } else if (yes === undefined) {
      setStage(Stage.PoolSelection)
      addMessage('Option minting aborted', { color: 'red' })
    } else if (yes) {
      addMessage('TODO!', { color: 'green' })
      // TODO
    }
  // }, [wallet.address, client, chosenPairInfo, addMessage])
  }, [addMessage])

  return <Box flexDirection={'column'}>
    <SectionTitle>Selling (minting) options</SectionTitle>
    {stage === Stage.PoolSelection && <PoolSelector onSelected={onPoolSelected}/>}

    {stage === Stage.QuoteAsset && <MultiChoiceSelector options={[
      chosenPairInfo.c0Info.symbol,
      chosenPairInfo.c1Info.symbol
    ]} onSelected={onQuoteAssetSubmit} onExit={() => {
      setQuoteAsset('token0')
      setStage(Stage.PoolSelection)
    }} prompt={'Choose your quote asset'}
       intro={<Box marginY={1} flexDirection={'column'}>
         <Text>Select quote asset</Text>
         <Text>- prices is quoted in that asset, against the other asset (i.e. base asset)</Text>
         <Text>- e.g. If quote asset is USDC, base asset is ETH, price is the number of USDC needed to buy 1 ETH</Text>
       </Box>}
    />}

    {stage === Stage.PutCall && <MultiChoiceSelector options={[
      `Put: you profit when ${baseAssetInfo.symbol} does not go down much, incurs loss otherwise`,
      `Call: you profit when ${baseAssetInfo.symbol} does not go up much, incurs loss otherwise`
    ]} onSelected={onPutCallSelected} onExit={() => {
      setPutCall(undefined)
      setStage(Stage.QuoteAsset)
    }} prompt={'Choose the type of option to sell'} intro={'Selling put or call?'}/>}

    {stage === Stage.StrikeAmount && <AmountSelector
        intro={`Strike price for the option? Median spot price of last 10 minute is ${currentPrice}`}
       prompt={`Enter price for 1 ${baseAssetInfo.symbol} (in ${quoteAssetInfo.symbol})`}
        onSubmit={onStrikeAmountSubmit}
        onBack={() => {
          setStage(Stage.PutCall)
          setStrikeTick(0)
        }}
    />}

    {stage === Stage.Width && <AmountSelector
        intro={<>
          <Text>Price range of the option?</Text>
          <Text>- Option accrues premium in-range after it is bought. See https://panoptic.xyz/docs/product/streamia</Text>
          <Text>- Strike price: {strikePrice} {quoteAssetInfo.symbol} </Text>
        </>}
        prompt={'Enter the desired percentage'}
        onRawSubmit={onWidthSubmit}
        onBack={() => {
          setStage(Stage.StrikeAmount)
          setWidth(0)
        }}
    />}
    {stage === Stage.Quantity && <AmountSelector
        intro={'Number of options to be sold?'}
        prompt={`Enter in the number of ${baseAssetInfo.symbol}`}
        onSubmit={onQuantitySubmit}
    />}
    {stage === Stage.Confirm && <ConfirmationSelector
        intro={<>
          <Box marginY={1}><Text>Please verify and confirm</Text></Box>
          <Text>- Pool: {chosenPairInfo.c0Info.symbol}/{chosenPairInfo.c1Info.symbol}</Text>
          <Text>- Selling {putCall === 'token0' ? 'PUT' : 'CALL'} on {baseAssetInfo.symbol}</Text>
          <Text>- Strike Price: {strikePrice} {quoteAssetInfo.symbol}</Text>
          <Text>- Premium Earning Price Range: [{lower}, {upper}] {quoteAssetInfo.symbol} </Text>
          <Text>- Position Size: {formatUnits(positionSize, baseAssetInfo.decimals)} {baseAssetInfo.symbol} </Text>
        </>}
        onConfirm={onConfirm}
    />}
  </Box>
}
