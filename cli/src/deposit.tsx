import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useWallet, WalletContext } from './wallet.js'
import { useWalletClient } from './client.js'
import { Box, Text, Newline } from 'ink'
import { SectionTitle, type ValidatedPair } from './common.js'
import { type CollateralFullInfo, useCollateralBalance, usePools, usePoolStats } from './pools.js'
import { NotificationContext } from './notification.js'
import TextInput from 'ink-text-input'
import { UserInputContext } from './commands.js'
import { formatUnits } from 'viem'
import { useERC20Balance } from './token.js'

const SimplePoolInfo = ({ pair }: { pair?: ValidatedPair }) => {
  const { c0Info, c1Info, price, priceInverse } = usePoolStats(pair)
  if (!pair) {
    return <Box><Text>Loading...</Text></Box>
  }
  return <Box>
    <Text>{c0Info.symbol}/{c1Info.symbol} | price: ${price.toFixed()} | inverse: ${priceInverse})</Text>
  </Box>
}

enum Stage {
  PoolSelection = 1,
  CollateralSelection = 2,
  AmountInput = 3
}

export const DepositControl = () => {
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { pairs } = usePools()
  const { addMessage } = useContext(NotificationContext)
  const [textInput, setTextInput] = useState<string>('')
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [chosenCollateral, setChosenCollateral] = useState<CollateralFullInfo>()
  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
  const { shares: shareBalance0, value: valueBalance0 } = useCollateralBalance(chosenPairInfo.c0Info.tracker)
  const { shares: shareBalance1, value: valueBalance1 } = useCollateralBalance(chosenPairInfo.c1Info.tracker)
  const { balance: tokenBalance0, allowanceOf: allowanceOf0 } = useERC20Balance(chosenPairInfo.c0Info.tokenContract)
  const { balance: tokenBalance1, allowanceOf: allowanceOf1 } = useERC20Balance(chosenPairInfo.c1Info.tokenContract)
  const choseC0 = chosenCollateral?.address === chosenPairInfo?.c0Info?.address
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const equity = Number((choseC0 ? shareBalance0 : shareBalance1) * 1_000_000n / (chosenCollateral?.shares ?? 1n)) / 1_000_000

  useEffect(() => {
    setUserCommandDisabled(true)
  }, [setUserCommandDisabled])

  useEffect(() => {
    if (userCommandDisabled) {
      setTextInput('')
      setStage(Stage.PoolSelection)
    }
  }, [userCommandDisabled])

  const onPoolSelection = useCallback((input: string) => {
    if (!input) {
      return
    }
    if (input.toLowerCase() === 'x') {
      setTextInput('')
      setChosenPair(undefined)
      setUserCommandDisabled(false)
      return
    }
    const index = Number(input)
    if (!index || !(index < pairs.length)) {
      addMessage(`Unrecognized selection [${input}]`, { color: 'red' })
      return
    }
    const p = pairs[index]
    setChosenPair(p)
    setStage(Stage.CollateralSelection)
    setTextInput('')
    addMessage(`Your selected [${input}]`, { color: 'grey' })
  }, [setUserCommandDisabled, pairs, addMessage])

  const onCollateralSelection = useCallback((input: string) => {
    if (!input) {
      return
    }
    if (input.toLowerCase() === 'x') {
      setTextInput('')
      setChosenPair(undefined)
      setChosenCollateral(undefined)
      setStage(Stage.PoolSelection)
      return
    }
    if (input !== '1' && input !== '2') {
      setTextInput('')
      addMessage(`Unrecognized selection [${input}]`, { color: 'red' })
      return
    }
    const cc = input === '1' ? chosenPairInfo.c0Info : chosenPairInfo.c1Info
    setChosenCollateral(cc)
    addMessage(`You selected [${input}] ${cc.symbol}`, { color: 'grey' })
    setStage(Stage.AmountInput)
    setTextInput('')
  }, [chosenPairInfo, addMessage])

  const onAmountSubmiited = useCallback((input: string) => {
    if (input === '0' || input.toLowerCase() === 'x') {
      setStage(Stage.CollateralSelection)
      setTextInput('')
      return
    }
    // TODO: approve contract to use asset, then call deposit on contract, catch error
    setStage(Stage.PoolSelection)
    setTextInput('')
  }, [])

  return <Box flexDirection={'column'}>
    <SectionTitle>Deposit Collateral</SectionTitle>
    {stage === Stage.PoolSelection && <Box marginTop={1} flexDirection={'column'}>
      <Box marginBottom={1}>
        <Text>Choose from an existing pool</Text>
      </Box>
      {pairs.map((pair, i) => <Box key={`pair-${i}`}><Text>[{i}] </Text><SimplePoolInfo pair={pair}/></Box>)}
      <Text color={'red'}>[x] Back to main menu</Text>
      <Box marginTop={1}>
        <Text>Select a pool: </Text>
        <TextInput showCursor value={textInput} onChange={setTextInput} onSubmit={onPoolSelection} />
      </Box>
    </Box>}
    {stage === Stage.CollateralSelection && <Box marginTop={1} flexDirection={'column'}>
      <Box marginY={1}><Text>You selected: </Text><SimplePoolInfo pair={chosenPair}/></Box>
      <Text>Which collateral are you depositing into?</Text>
      <Text>[1] {chosenPairInfo?.c0Info?.symbol} (Your deposit balance: {formatUnits(valueBalance0, chosenPairInfo.c0Info.decimals)} | Token balance: {formatUnits(tokenBalance0, chosenPairInfo.c0Info.decimals)})</Text>
      <Text>[2] {chosenPairInfo?.c1Info?.symbol} (Your deposit balance: {formatUnits(valueBalance1, chosenPairInfo.c1Info.decimals)} | Token balance: {formatUnits(tokenBalance1, chosenPairInfo.c1Info.decimals)})</Text>
      <Text color={'red'}>[x] Back to pool selection</Text>
      <Box>
        <Text>Choose a collateral: </Text>
        <TextInput showCursor value={textInput} onChange={setTextInput} onSubmit={onCollateralSelection} />
      </Box>
    </Box>}
    {stage === Stage.CollateralSelection && <Box marginTop={1} flexDirection={'column'}>
      <Box marginY={1} flexDirection={'column'}>
        <Text>Pool balance: {formatUnits(chosenCollateral?.poolAssets ?? 0n, chosenCollateral?.decimals ?? 0)} {chosenCollateral?.symbol} | Utilization: {chosenCollateral?.utilization}</Text>
        <Text>Pool issued shares: {chosenCollateral?.shares.toString()}  </Text>
        <Text>Your current deposit balance: {formatUnits(choseC0 ? valueBalance0 : valueBalance1, chosenPairInfo.c0Info.decimals)} </Text>
        <Text>Your token total balance: {formatUnits(choseC0 ? tokenBalance0 : tokenBalance1, chosenPairInfo.c1Info.decimals)} </Text>
        <Text>Your shares: {choseC0 ? shareBalance0.toString() : shareBalance1.toString()} ({(equity * 100).toFixed(4)}) </Text>
      </Box>
      <Box>
        <Text>How much do you want to deposit? (Enter 0 or x to go back)</Text>
        <TextInput showCursor value={textInput} onChange={setTextInput} onSubmit={onAmountSubmiited} />
      </Box>
    </Box>}

  </Box>
}
