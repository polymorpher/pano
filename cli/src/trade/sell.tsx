import React, { useCallback, useContext, useState } from 'react'
import { getPositionIdList } from 'src/db.js'
import { useWallet } from 'src/wallet.js'
import { useWalletClient } from 'src/client.js'
import { usePoolStats } from 'src/pools/hooks.js'
import { NotificationContext } from 'src/notification.js'
import {
  calculateTokenId,
  type Leg,
  SectionTitle, type ValidatedPair
} from 'src/common.js'
import { Box } from 'ink'
import { PoolSelector } from 'src/pools/selector.js'
import { getContract } from 'viem'
import { LegMaker, TradeStage } from './trade.js'

export const SellControl = () => {
  // TODO: make below statements a single hook
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { addMessage } = useContext(NotificationContext)
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [stage, setStage] = useState<TradeStage>(TradeStage.PoolSelection)

  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(TradeStage.QuoteAsset)
  }

  const onLegConfirm = useCallback(async (leg: Leg, positionSize: bigint) => {
    // TODO: check collateral requirement first
    const currentPositions = await getPositionIdList(wallet.address!, chosenPairInfo.uniswapPool!.address)
    const id = calculateTokenId(chosenPairInfo.uniswapPool!.address, chosenPairInfo.tickSpacing, [leg, undefined, undefined, undefined])
    const positionIdList = [...currentPositions, id]
    // TODO: this might only be useful for multi-leg positions. need to figure out how to set it appropriately later
    const effectiveLiquidityLimitX32 = 0n
    // TODO: we do not use slippage or let user configure slippage right now.
    //  Setting 0 to both values essentially skips slippage check.
    //  This needs to be fixed later
    const tickLowerLimit = 0
    const tickUpperLimit = 0
    const c = getContract({
      abi: chosenPairInfo.panopticPool!.abi,
      address: chosenPairInfo.panopticPool!.address,
      client: client!
    })
    try {
      const hash = await c.write.mintOptions([positionIdList, positionSize, effectiveLiquidityLimitX32, tickLowerLimit, tickUpperLimit])
      addMessage(`Executed transaction ${hash}. Option minted!`, { color: 'green' })
      // TODO: reset state, go back to pool selection / main menu
    } catch (ex: any) {
      addMessage((ex as Error).toString(), { color: 'red' })
      addMessage((ex as Error).stack ?? 'Unknown stacktrace', { color: 'red' })
    }
  }, [addMessage, chosenPairInfo, client, wallet])

  return <Box flexDirection={'column'}>
    <SectionTitle>Selling options</SectionTitle>
    {stage === TradeStage.PoolSelection && <PoolSelector onSelected={onPoolSelected}/>}
    <LegMaker chosenPairInfo={chosenPairInfo} onLegConfirm={onLegConfirm} position={'short'} setStage={setStage} stage={stage}/>
  </Box>
}
