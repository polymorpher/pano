import React, { useCallback, useContext, useState } from 'react'
import { getPositionIdList } from 'src/db.js'
import { useWallet } from 'src/wallet.js'
import { useWalletClient } from 'src/client.js'
import { usePoolStats } from 'src/pools/hooks.js'
import { NotificationContext } from 'src/notification.js'
import {
  calculateTokenId,
  type Leg, type Position,
  SectionTitle, type ValidatedPair
} from 'src/common.js'
import { Box } from 'ink'
import { PoolSelector } from 'src/pools/selector.js'
import { getContract } from 'viem'
import { LegMaker, TradeStage } from './trade.js'
import { useTrade } from './hooks.js'
import { defaultEffectiveLiquidityRatio, defaultSlippageTolerance } from '../config.js'
import { priceToTick } from '../util.js'
import { getTickRange } from './calc.js'
import { usePositions } from '../positions/hooks.js'

export const BuyControl = () => {
  const { stage, setStage, chosenPairInfo, client, wallet, addMessage, onPoolSelected } = useTrade()
  const { positions, addPosition } = usePositions(chosenPairInfo.uniswapPool?.address)
  const onLegConfirm = useCallback(async (leg: Leg, positionSize: bigint) => {
    const position: Position = { uniswapPoolAddress: chosenPairInfo.uniswapPool!.address, tickSpacing: chosenPairInfo.tickSpacing, legs: [leg, undefined, undefined, undefined] }
    const id = calculateTokenId(position)
    const positionIdList = [...positions.map(p => p.id), id]
    const effectiveLiquidityLimitX32 = BigInt(Math.round(defaultEffectiveLiquidityRatio * 2 ** 32))
    const [tickLowerLimit, tickUpperLimit] = getTickRange(chosenPairInfo.priceTick, defaultSlippageTolerance, chosenPairInfo.tickSpacing)
    const c = getContract({
      abi: chosenPairInfo.panopticPool!.abi,
      address: chosenPairInfo.panopticPool!.address,
      client: client!
    })
    try {
      const hash = await c.write.mintOptions([positionIdList, positionSize, effectiveLiquidityLimitX32, tickLowerLimit, tickUpperLimit])
      await addPosition(position)
      addMessage(`Executed transaction ${hash}. Option purchased!`, { color: 'green' })
    } catch (ex: any) {
      addMessage((ex as Error).toString(), { color: 'red' })
      addMessage((ex as Error).stack ?? 'Unknown stacktrace', { color: 'red' })
    }
  }, [addPosition, positions, addMessage, chosenPairInfo, client, wallet])

  return <Box flexDirection={'column'}>
    <SectionTitle>Buying simple options</SectionTitle>
    {stage === TradeStage.PoolSelection && <PoolSelector onSelected={onPoolSelected}/>}
    <LegMaker chosenPairInfo={chosenPairInfo} onLegConfirm={onLegConfirm} position={'long'} setStage={setStage} stage={stage}/>
  </Box>
}
