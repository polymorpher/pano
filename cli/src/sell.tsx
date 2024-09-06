import React, { useCallback, useContext, useEffect, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { usePools, usePoolStats } from './pools/hooks.js'
import { NotificationContext } from './notification.js'
import { AmountSelector, MultiChoiceSelector, SectionTitle, type ValidatedPair } from './common.js'
import TextInput from 'ink-text-input'
import { Box, Text } from 'ink'
import { UserInputContext } from './commands.js'
import { SimplePoolInfo } from './pools/info.js'
import { PoolSelector } from './pools/selector.js'
import { formatUnits } from 'viem'
import { priceToTick, tickToPrice } from './util.js'

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
  const { pairs } = usePools()
  const { addMessage } = useContext(NotificationContext)
  const [textInput, setTextInput] = useState<string>('')
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
  const [putCall, setPutCall] = useState<'token0' | 'token1'>()
  const [inversePrice, setInversePrice] = useState<boolean>(false)
  const priceFormatSuffix = `${chosenPairInfo.c1Info.symbol}/${chosenPairInfo.c0Info.symbol}: Number of ${chosenPairInfo.c1Info.symbol} for each ${chosenPairInfo.c0Info.symbol} (current price: ${chosenPairInfo.price})`
  const inversePriceFormatSuffix = `${chosenPairInfo.c0Info.symbol}/${chosenPairInfo.c1Info.symbol}: Number of ${chosenPairInfo.c0Info.symbol} for each ${chosenPairInfo.c1Info.symbol} (current price: ${chosenPairInfo.priceInverse})`

  const [strikeTick, setStrikeTick] = useState<number>(0)
  const strikePrice = tickToPrice(strikeTick, inversePrice ? chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals : chosenPairInfo.c0Info.decimals - chosenPairInfo.c1Info.decimals)
  const [width, setWidth] = useState<number>(0)
  // const

  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    setTextInput('')
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

  const onAmountSubmit = useCallback((input: string) => {
    const price = Number(input)
    if (!price) {
      addMessage(`Invalid amount: ${input}`, { color: 'red' })
      return
    }
    const priceTerms = inversePrice ? `${chosenPairInfo.c0Info.symbol} for 1 ${chosenPairInfo.c1Info.symbol}` : `${chosenPairInfo.c1Info.symbol} for 1 ${chosenPairInfo.c0Info.symbol}`
    addMessage(`Strike price set to ${price} ${priceTerms}`, { color: 'green' })
    const decimals = inversePrice ? chosenPairInfo.c1Info.decimals - chosenPairInfo.c0Info.decimals : chosenPairInfo.c0Info.decimals - chosenPairInfo.c1Info.decimals
    const tick = priceToTick(inversePrice ? 1 / price : price, decimals)
    setStrikeTick(tick)
    setStage(Stage.Width)
  }, [inversePrice, addMessage, chosenPairInfo])

  const onWidthSelect = useCallback((input: string) => {
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
    setWidth(width)
    // chosenPairInfo.tickSpacing
  }, [addMessage, chosenPairInfo])

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
        intro={'Strike price for the option?'}
       prompt={`Enter the price in terms of number of ${inversePrice ? chosenPairInfo.c1Info.symbol : chosenPairInfo.c0Info.symbol} per ${inversePrice ? chosenPairInfo.c1Info.symbol : chosenPairInfo.c0Info.symbol}`}
        onSubmit={onAmountSubmit}
    />}
    {stage === Stage.Width && <AmountSelector
        intro={<>
          <Text>Price range of the option?</Text>
          <Text>Price range is defined in terms of percentage around strike price, for which the option is considered as in-range and accrues premium. See https://panoptic.xyz/docs/product/streamia</Text>
          <Text>Strike price: {strikePrice} | {inversePrice ? inversePriceFormatSuffix : priceFormatSuffix} </Text>
        </>}
        prompt={'Enter the desired percentage'}
        onSubmit={onWidthSelect}
    />}
  </Box>
}
