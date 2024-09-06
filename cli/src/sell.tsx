import React, { useCallback, useContext, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import {usePoolStats } from './pools/hooks.js'
import { NotificationContext } from './notification.js'
import {
  AmountSelector,
  ConfirmationSelector,
  getOptionRange,
  MultiChoiceSelector,
  SectionTitle,
  type ValidatedPair
} from './common.js'
import { Box, Text } from 'ink'
import { PoolSelector } from './pools/selector.js'
import { formatUnits } from 'viem'
import { priceToTick, tickToPrice, tryParseUnits } from './util.js'

enum Stage {
  PoolSelection = 1,
  PutCall = 2,
  StrikeFormat = 3,
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
  const [putCall, setPutCall] = useState<'token0' | 'token1'>()
  const [inversePrice, setInversePrice] = useState<boolean>(false)
  const priceFormatSuffix = `${chosenPairInfo.c1Info.symbol}/${chosenPairInfo.c0Info.symbol}: Number of ${chosenPairInfo.c1Info.symbol} for each ${chosenPairInfo.c0Info.symbol} (current price: ${chosenPairInfo.price})`
  const inversePriceFormatSuffix = `${chosenPairInfo.c0Info.symbol}/${chosenPairInfo.c1Info.symbol}: Number of ${chosenPairInfo.c0Info.symbol} for each ${chosenPairInfo.c1Info.symbol} (current price: ${chosenPairInfo.priceInverse})`

  const [strikeTick, setStrikeTick] = useState<number>(0)
  const strikePrice = tickToPrice(strikeTick, inversePrice ? chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals : chosenPairInfo.c0Info.decimals - chosenPairInfo.c1Info.decimals)
  const [width, setWidth] = useState<number>(0)
  const [lower, upper] = getOptionRange(strikePrice, width, chosenPairInfo.tickSpacing)
  const [positionSize, setPositionSize] = useState<bigint>(0n)

  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(Stage.PutCall)
  }
  const onPutCallSelected = useCallback((choice: number) => {
    setPutCall(choice === 1 ? 'token0' : 'token1')
    addMessage(`Selected ${choice === 1 ? 'PUT' : 'CALL'} option`, { color: 'green' })
    setStage(Stage.StrikeFormat)
  }, [addMessage])

  const onStrikeAmountSubmit = useCallback((price: number) => {
    const priceTerms = inversePrice ? `${chosenPairInfo.c0Info.symbol} for 1 ${chosenPairInfo.c1Info.symbol}` : `${chosenPairInfo.c1Info.symbol} for 1 ${chosenPairInfo.c0Info.symbol}`
    addMessage(`Strike price set to ${price} ${priceTerms}`, { color: 'green' })
    const decimals = inversePrice ? chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals : chosenPairInfo.c0Info.decimals - chosenPairInfo.c1Info.decimals
    const tick = priceToTick(inversePrice ? 1 / price : price, decimals)
    setStrikeTick(tick)
    setStage(Stage.Width)
  }, [inversePrice, addMessage, chosenPairInfo])

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
    const atomicAmount = tryParseUnits(amount.toString(), decimals)
    if (!atomicAmount) {
      addMessage(`Invalid amount: ${amount}`, { color: 'red' })
      return
    }
    setPositionSize(atomicAmount)
    addMessage(`Position size set to ${amount}, measured in ${putCall === 'token0' ? chosenPairInfo.c0Info.symbol : chosenPairInfo.c1Info.symbol}`, { color: 'green' })
    setStage(Stage.Confirm)
  }, [addMessage, chosenPairInfo, putCall])

  const onConfirm = useCallback(async (yes?: boolean) => {
    if (yes === false) {
      setStage(Stage.Quantity)
    } else if (yes === undefined) {
      setStage(Stage.PoolSelection)
      addMessage('Deposit operation aborted', { color: 'red' })
    } else if (yes) {
      // TODO
    }
  }, [wallet.address, client, chosenPairInfo, addMessage])

  return <Box flexDirection={'column'}>
    <SectionTitle>Selling (minting) options</SectionTitle>
    {stage === Stage.PoolSelection && <PoolSelector onSelected={onPoolSelected}/>}
    {stage === Stage.PutCall && <MultiChoiceSelector options={[
      'Put: incurs loss if price {chosenPairInfo?.c0Info?.symbol} goes down, i.e. price of {chosenPairInfo?.c1Info?.symbol} goes up',
      'Call: incurs loss if {chosenPairInfo?.c1Info?.symbol} goes down, i.e. price of {chosenPairInfo?.c0Info?.symbol} goes up'
    ]} onSelected={onPutCallSelected} onExit={() => {
      setPutCall(undefined)
      setStage(Stage.PoolSelection)
    }} prompt={'Choose a collateral'} intro={'Choose a strike price format'}/>}
    {stage === Stage.StrikeFormat && <MultiChoiceSelector options={[
      priceFormatSuffix,
      inversePriceFormatSuffix
    ]} onSelected={onPutCallSelected} onExit={() => {
      setInversePrice(false)
      setStage(Stage.PutCall)
    }} prompt={'Choose a collateral'} intro={'Put or call?'}/>}
    {stage === Stage.StrikeAmount && <AmountSelector
        intro={`Strike price for the option? In terms of number of ${inversePrice ? chosenPairInfo.c1Info.symbol : chosenPairInfo.c0Info.symbol} per ${inversePrice ? chosenPairInfo.c1Info.symbol : chosenPairInfo.c0Info.symbol}`}
       prompt={'Enter the price'}
        onSubmit={onStrikeAmountSubmit}
        onBack={() => {
          setStage(Stage.PutCall)
          setStrikeTick(0)
        }}
    />}
    {stage === Stage.Width && <AmountSelector
        intro={<>
          <Text>Price range of the option?</Text>
          <Text>Price range is defined in terms of percentage around strike price, for which the option is considered as in-range and accrues premium. See https://panoptic.xyz/docs/product/streamia</Text>
          <Text>Strike price: {strikePrice} | {inversePrice ? inversePriceFormatSuffix : priceFormatSuffix} </Text>
        </>}
        prompt={'Enter the desired percentage'}
        onRawSubmit={onWidthSubmit}
        onBack={() => {
          setStage(Stage.StrikeAmount)
          setWidth(0)
        }}
    />}
    {stage === Stage.Quantity && <AmountSelector
        intro={`Number of options? In terms of number of ${putCall === 'token0' ? chosenPairInfo.c0Info.symbol : chosenPairInfo.c1Info.symbol}`}
        prompt={'Enter the amount'}
        onSubmit={onQuantitySubmit}
    />}
    {stage === Stage.Confirm && <ConfirmationSelector
        intro={<>
          <Box marginY={1}><Text>Please verify and confirm</Text></Box>
          <Text>- Pool: {chosenPairInfo.c0Info.symbol}/{chosenPairInfo.c1Info.symbol}</Text>
          <Text>- Selling {putCall === 'token0' ? 'PUT' : 'CALL'}</Text>
          <Text>- Strike Price {strikePrice} {inversePrice ? inversePriceFormatSuffix : priceFormatSuffix}</Text>
          <Text>- Premium Price Range: [{lower}, {upper}] </Text>
          <Text>- Position Size: [{formatUnits(positionSize, putCall === 'token0' ? chosenPairInfo.c0Info.decimals : chosenPairInfo.c1Info.decimals) }] </Text>
        </>}
        onConfirm={onConfirm}
    />}
  </Box>
}
