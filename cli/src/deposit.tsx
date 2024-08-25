import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from './wallet.js'
import { useWalletClient } from './client.js'
import { Box, Text, Newline } from 'ink'
import { SectionTitle, type ValidatedPair } from './common.js'
import { type CollateralFullInfo, usePools, usePoolStats } from './pools.js'
import { NotificationContext } from './notification.js'
import TextInput from 'ink-text-input'
import { UserInputContext } from './commands.js'
import { formatUnits } from 'viem'

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
  const { wallet } = useContext(WalletContext)
  const { client } = useWalletClient()
  const { pairs } = usePools()
  const { addMessage } = useContext(NotificationContext)
  const [textInput, setTextInput] = useState<string>('')
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [chosenCollateral, setChosenCollateral] = useState<CollateralFullInfo>()
  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
  const [c0Balance, setC0Balance] = useState<bigint>(0n)
  const [c1Balance, setC1Balance] = useState<bigint>(0n)
  const [c0TokenBalance, setC0TokenBalance] = useState<bigint>(0n)
  const [c1TokenBalance, setC1TokenBalance] = useState<bigint>(0n)
  const choseC0 = chosenCollateral?.address === chosenPairInfo?.c0Info?.address
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } = useContext(UserInputContext)

  useEffect(() => {
    setUserCommandDisabled(true)
  }, [setUserCommandDisabled])

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
      <Text>[1] {chosenPairInfo?.c0Info?.symbol} (Your deposit balance: {formatUnits(c0Balance, chosenPairInfo.c0Info.decimals)} | Token balance: {formatUnits(c0TokenBalance, chosenPairInfo.c0Info.decimals)})</Text>
      <Text>[2] {chosenPairInfo?.c1Info?.symbol} (Your deposit balance: {formatUnits(c1Balance, chosenPairInfo.c1Info.decimals)} | Token balance: {formatUnits(c1TokenBalance, chosenPairInfo.c1Info.decimals)})</Text>
      <Text color={'red'}>[x] Back to pool selection</Text>
      <Box>
        <Text>Choose a collateral: </Text>
        <TextInput showCursor value={textInput} onChange={setTextInput} onSubmit={onCollateralSelection} />
      </Box>
    </Box>}
    {stage === Stage.CollateralSelection && <Box marginTop={1} flexDirection={'column'}>
      <Box marginY={1} flexDirection={'column'}>
        <Text>Pool balance: {formatUnits(chosenCollateral?.poolAssets ?? 0n, chosenCollateral?.decimals ?? 0)} | Utilization: {chosenCollateral?.utilization}</Text>
        <Text>Your current deposit balance: {formatUnits(choseC0 ? c0Balance : c1Balance, chosenPairInfo.c0Info.decimals)} </Text>
        <Text>Your token total balance: {formatUnits(choseC0 ? c0TokenBalance : c1TokenBalance, chosenPairInfo.c1Info.decimals)} </Text>
      </Box>
      <Box>
        <Text>How much do you want to deposit? (Enter 0 or x to go back)</Text>
        <TextInput showCursor value={textInput} onChange={setTextInput} onSubmit={onAmountSubmiited} />
      </Box>
    </Box>}

  </Box>
}
