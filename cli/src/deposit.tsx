import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { Box, Text } from 'ink'
import {
  AmountSelector,
  ConfirmationSelector,
  MultiChoiceSelector,
  SectionTitle,
  type ValidatedPair
} from './common.js'
import { useCollateralBalance } from './pools/hooks/collateral.js'
import { usePools, usePoolStats } from './pools/hooks/panoptic.js'
import { type CollateralFullInfo } from './pools/hooks/common.js'
import { NotificationContext } from './notification.js'
import { CommandKeys, useCli, useOption, UserInputContext } from './commands.js'
import { formatUnits, getContract } from 'viem'
import { useERC20Balance } from './token.js'
import { type AnnotatedTransaction, tryParseUnits } from './util.js'
import { PoolSelector } from './pools/selector.js'
import CommandArgs from './command-args.tsx'
import { commandOptions } from './options.ts'

enum Stage {
  PoolSelection = 1,
  CollateralSelection = 2,
  AmountInput = 3,
  Confirm = 4,
  Empty = 5
}

export const DepositControl = () => {
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { addMessage } = useContext(NotificationContext)
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [chosenCollateral, setChosenCollateral] = useState<CollateralFullInfo>()
  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
  const { shares: shareBalance0, value: valueBalance0 } = useCollateralBalance(
    chosenPairInfo.c0Info.tracker
  )
  const { shares: shareBalance1, value: valueBalance1 } = useCollateralBalance(
    chosenPairInfo.c1Info.tracker
  )
  const { balance: tokenBalance0, allowanceOf: allowanceOf0 } = useERC20Balance(
    chosenPairInfo.c0Info.tokenContract
  )
  const { balance: tokenBalance1, allowanceOf: allowanceOf1 } = useERC20Balance(
    chosenPairInfo.c1Info.tokenContract
  )
  const choseC0 = chosenCollateral?.address === chosenPairInfo?.c0Info?.address
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } =
    useContext(UserInputContext)
  const sharesDenominator = chosenCollateral?.shares
    ? chosenCollateral?.shares
    : 1n
  const equity =
    Number(
      ((choseC0 ? shareBalance0 : shareBalance1) * 1_000_000n) /
        sharesDenominator
    ) / 1_000_000
  const [amount, setAmount] = useState<bigint>(0n)
  const [newShares, setNewShares] = useState<bigint>(0n)
  const [maxWithdrawable, setMaxWithdrawable] = useState<bigint>(0n)
  const [numOpenPositions, setNumOpenPositions] = useState<number>(0)

  const allowanceOf = choseC0 ? allowanceOf0 : allowanceOf1

  useEffect(() => {
    setUserCommandDisabled(true)
  }, [setUserCommandDisabled])

  useEffect(() => {
    if (userCommandDisabled) {
      setStage(Stage.PoolSelection)
    }
  }, [userCommandDisabled])

  const onPoolSelected = ({ pair }: { text: string; pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(Stage.CollateralSelection)
  }

  const onCollateralSelected = useCallback(
    async (choice: number) => {
      if (!wallet.address) {
        return
      }
      const cc = choice === 1 ? chosenPairInfo.c0Info : chosenPairInfo.c1Info
      setChosenCollateral(cc)
      addMessage(`You selected [${choice}] ${cc.symbol}`, { color: 'grey' })
      setStage(Stage.AmountInput)
      const mw = await cc.tracker!.read.maxWithdraw([wallet.address])
      setMaxWithdrawable(mw)
      const op = await chosenPairInfo.panopticPool!.read.numberOfPositions([
        wallet.address
      ])
      setNumOpenPositions(Number(op))
    },
    [wallet.address, chosenPairInfo, addMessage]
  )

  const onAmountSubmitted = useCallback(
    async (input: string) => {
      if (!chosenCollateral?.tracker) {
        return
      }
      // input is decimal amount, convert to atomic amount in bigint
      const atomicAmount = tryParseUnits(input, chosenCollateral.decimals)
      if (!atomicAmount) {
        addMessage(`Malformed value [${input}]`, { color: 'red' })
        return
      }
      if (atomicAmount < 0n && numOpenPositions > 0) {
        addMessage(
          `Cannot withdraw when there are still open positions [${numOpenPositions} left]`,
          { color: 'red' }
        )
        return
      }
      if (atomicAmount < 0n && -atomicAmount > maxWithdrawable) {
        addMessage(
          `Amount [${formatUnits(-atomicAmount, chosenCollateral.decimals)}] exceeds maximum withdrawable amount [${formatUnits(maxWithdrawable, chosenCollateral.decimals)}]`,
          { color: 'red' }
        )
        return
      }
      setStage(Stage.Confirm)
      setAmount(atomicAmount)
      if (atomicAmount > 0n) {
        const ns = await chosenCollateral?.tracker?.read.previewDeposit([
          atomicAmount
        ])
        setNewShares(ns)
      } else {
        const ns = await chosenCollateral?.tracker?.read.previewWithdraw([
          -atomicAmount
        ])
        setNewShares(ns)
      }
    },
    [numOpenPositions, maxWithdrawable, addMessage, chosenCollateral]
  )

  const onConfirm = useCallback(
    async (yes?: boolean) => {
      if (yes === false) {
        setStage(Stage.AmountInput)
      } else if (yes === undefined) {
        setStage(Stage.PoolSelection)
        setUserCommandDisabled(false)
        addMessage('Deposit operation aborted', { color: 'red' })
      } else if (yes) {
        if (
          !chosenCollateral?.tokenContract ||
          !chosenCollateral.tracker?.abi ||
          !chosenCollateral.address
        ) {
          addMessage(
            'Unexpected error: collateral or token contract is uninitialized',
            { color: 'red' }
          )
          return
        }
        if (!client || !wallet.address) {
          addMessage('Unexpected error: wallet is uninitialized', {
            color: 'red'
          })
          return
        }

        const tokenContractWritable = getContract({
          address: chosenCollateral.tokenContract.address,
          abi: chosenCollateral?.tokenContract?.abi,
          client
        })

        const allowance = await allowanceOf(chosenCollateral.address)
        const transactions: AnnotatedTransaction[] = []

        if (amount > 0n && allowance < amount) {
          // TODO: use max int?
          const h1 = await tokenContractWritable.write.approve([
            chosenCollateral.address,
            amount
          ])
          transactions.push({
            hash: h1,
            annotation: `Approve collateral contract to move your ${formatUnits(amount, chosenCollateral.decimals)} ${chosenCollateral.symbol} (asset contract ${chosenCollateral.tokenAddress})`
          })
        }
        // collateralContractWritable
        const ccw = getContract({
          address: chosenCollateral.address,
          abi: chosenCollateral.tracker?.abi,
          client
        })
        if (amount > 0n) {
          const h2 = await ccw.write.deposit([amount, wallet.address])
          transactions.push({
            hash: h2,
            annotation: `Deposit ${formatUnits(amount, chosenCollateral.decimals)} ${chosenCollateral.symbol} to collateral contract ${chosenCollateral.address}. Received new pool shares ${newShares.toLocaleString()}`
          })
        } else {
          const h2 = await ccw.write.withdraw([
            -amount,
            wallet.address,
            wallet.address
          ])
          transactions.push({
            hash: h2,
            annotation: `Withdraw ${formatUnits(-amount, chosenCollateral.decimals)} ${chosenCollateral.symbol} from collateral contract ${chosenCollateral.address}. Burned pool shares ${newShares.toLocaleString()}`
          })
        }
        transactions.forEach((t) => {
          addMessage(`Executed transaction [${t.hash}]: ${t.annotation}`, {
            color: 'green'
          })
        })
        addMessage('Deposit operation completed!', { color: 'green' })
        setUserCommandDisabled(false)
        setChosenCollateral(undefined)
        setChosenPair(undefined)
        setStage(Stage.Empty)
      }
    },
    [
      newShares,
      wallet.address,
      allowanceOf,
      amount,
      client,
      chosenCollateral,
      setUserCommandDisabled,
      addMessage
    ]
  )

  const cli = useCli()

  const pool = useOption('pool')

  const asset = useOption('asset')

  const amountArg = useOption('amount')

  const { pairs } = usePools()

  useEffect(() => {
    if (!cli || !pool || !pairs || stage !== Stage.PoolSelection) {
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
      setStage(Stage.Empty)
      return
    }

    setChosenPair(pair)
    setStage(Stage.CollateralSelection)
  }, [cli, addMessage, pairs, pool, stage])

  useEffect(() => {
    if (
      !cli ||
      !asset ||
      !chosenPair ||
      !chosenPairInfo.ready ||
      stage !== Stage.CollateralSelection
    ) {
      return
    }

    let choice = 0

    if (chosenPair.token0.toLowerCase() === asset.toLowerCase()) {
      choice = 1
    } else if (chosenPair.token1.toLowerCase() === asset.toLowerCase()) {
      choice = 2
    }

    if (choice === 0) {
      addMessage(`Invalid collateral: ${asset.toUpperCase()}`, { color: 'red' })
      setStage(Stage.Empty)
      return
    }

    onCollateralSelected(choice)
  }, [
    cli,
    stage,
    chosenPair,
    asset,
    onCollateralSelected,
    addMessage,
    chosenPairInfo.ready
  ])

  useEffect(() => {
    if (!cli || amountArg === undefined || stage !== Stage.AmountInput) {
      return
    }

    if (isNaN(Number(amountArg))) {
      addMessage(`Invalid amount: ${amountArg}`, { color: 'red' })
      setStage(Stage.Empty)
    }

    onAmountSubmitted(String(amountArg))
  }, [onAmountSubmitted, amountArg, cli, stage, addMessage])

  useEffect(() => {
    if (stage === Stage.Confirm) {
      onConfirm(true)
    }
  }, [stage, onConfirm])

  if (cli) {
    if (pool && asset && amountArg !== undefined) {
      return <></>
    }

    return (
      <CommandArgs
        title="Use the following options to deposit"
        args={commandOptions[CommandKeys.Deposit]!}
      />
    )
  }

  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Deposit Collateral</SectionTitle>
      {stage === Stage.PoolSelection && (
        <PoolSelector onSelected={onPoolSelected} />
      )}
      {stage === Stage.CollateralSelection && (
        <MultiChoiceSelector
          intro={
            'Which collateral are you depositing into or withdrawing from?'
          }
          prompt={'Choose a collateral'}
          options={[
            `${chosenPairInfo?.c0Info?.symbol} (Your deposit balance: ${formatUnits(valueBalance0, chosenPairInfo.c0Info.decimals)} | Token balance: ${formatUnits(tokenBalance0, chosenPairInfo.c0Info.decimals)})`,
            `${chosenPairInfo?.c1Info?.symbol} (Your deposit balance: ${formatUnits(valueBalance1, chosenPairInfo.c1Info.decimals)} | Token balance: ${formatUnits(tokenBalance1, chosenPairInfo.c1Info.decimals)})`
          ]}
          onExit={() => {
            setChosenPair(undefined)
            setChosenCollateral(undefined)
            setStage(Stage.PoolSelection)
          }}
          onSelected={onCollateralSelected}
        />
      )}
      {stage === Stage.AmountInput && (
        <AmountSelector
          intro={
            <>
              <Text>
                Pool balance:{' '}
                {formatUnits(
                  chosenCollateral?.poolAssets ?? 0n,
                  chosenCollateral?.decimals ?? 0
                )}{' '}
                {chosenCollateral?.symbol} | Utilization:{' '}
                {chosenCollateral?.utilization}
              </Text>
              <Text>
                Pool issued shares: {chosenCollateral?.shares.toLocaleString()}{' '}
              </Text>
              <Text>---------------</Text>
              <Text>
                Your current deposit balance:{' '}
                {formatUnits(
                  choseC0 ? valueBalance0 : valueBalance1,
                  chosenCollateral?.decimals ?? 0
                )}{' '}
                {chosenCollateral?.symbol}
              </Text>
              <Text>
                Your token total balance:{' '}
                {formatUnits(
                  choseC0 ? tokenBalance0 : tokenBalance1,
                  chosenCollateral?.decimals ?? 0
                )}{' '}
                {chosenCollateral?.symbol}
              </Text>
              <Text>
                Your shares:{' '}
                {choseC0
                  ? shareBalance0.toLocaleString()
                  : shareBalance1.toLocaleString()}{' '}
                ({(equity * 100).toFixed(4)}%){' '}
              </Text>
              <Text>
                Your maximum withdrawable amount:{' '}
                {formatUnits(maxWithdrawable, chosenCollateral?.decimals ?? 0)}{' '}
                {chosenCollateral?.symbol}
              </Text>
              <Text>Your open positions: {numOpenPositions}</Text>
              <Text>---------------</Text>
              <Text>
                Withdraw is only allowed when there is no open position. Deposit
                has no restriction{' '}
              </Text>
            </>
          }
          prompt={
            'How much do you want to deposit / withdraw? (Use negative value for withdraw. To go back, enter 0 or x)'
          }
          onBack={() => {
            setStage(Stage.CollateralSelection)
            setChosenCollateral(undefined)
          }}
          onRawSubmit={onAmountSubmitted}
        />
      )}
      {stage === Stage.Confirm && (
        <ConfirmationSelector
          intro={
            <>
              <Box marginY={1}>
                <Text>Please verify and confirm</Text>
              </Box>
              <Text>
                {amount > 0 ? 'Deposit' : 'Withdraw'} Amount:{' '}
                {formatUnits(
                  amount > 0 ? amount : -amount,
                  chosenCollateral?.decimals ?? 0
                )}{' '}
                {chosenCollateral?.symbol}
              </Text>
              <Text>
                {amount > 0 ? 'Earning' : 'Burning'} Pool Shares:{' '}
                {newShares.toLocaleString()}
              </Text>
              <Text>Collateral contract: {chosenCollateral?.address}</Text>
              <Text>Token contract: {chosenCollateral?.tokenAddress}</Text>
            </>
          }
          onConfirm={onConfirm}
        />
      )}
    </Box>
  )
}
