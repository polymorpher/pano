import React, { useCallback, useContext, useEffect, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { usePools, usePoolStats } from './pools/pools.js'
import { NotificationContext } from './notification.js'
import { MultiChoiceSelector, SectionTitle, type ValidatedPair } from './common.js'
import TextInput from 'ink-text-input'
import { Box, Text } from 'ink'
import { UserInputContext } from './commands.js'
import { SimplePoolInfo } from './pools/info.js'
import { PoolSelector } from './pools/selector.js'
import { formatUnits } from 'viem'

enum Stage {
  PoolSelection = 1,
  PutCall = 2,
  Strike = 3,
  Width = 4,
  Quantity = 5,
  Confirm = 6,
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

  })
  return <Box flexDirection={'column'}>
    <SectionTitle>Selling (minting) options</SectionTitle>
    {stage === Stage.PoolSelection && <PoolSelector onSelected={onPoolSelected}/>}
    {stage === Stage.PutCall && <MultiChoiceSelector options={[
      'Put: incurs loss if price {chosenPairInfo?.c0Info?.symbol} goes down, i.e. price of {chosenPairInfo?.c1Info?.symbol} goes up',
      'Call: incurs loss if {chosenPairInfo?.c1Info?.symbol} goes down, i.e. price of {chosenPairInfo?.c0Info?.symbol} goes up'
    ]} onSelected={onPutCallSelected} onExit={() => {
      setPutCall(undefined)
      setStage(Stage.PoolSelection)
    }} prompt={'Choose a collateral'} intro={'Put or call?'}/>}
    
  </Box>
}
