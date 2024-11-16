import React, { useCallback } from 'react'
import {
  calculateTokenId,
  type Leg,
  type Position,
  SectionTitle
} from 'src/common.js'
import { Box } from 'ink'
import { PoolSelector } from 'src/pools/selector.js'
import { getContract } from 'viem'
import { LegMaker, TradeStage } from './trade.js'
import { useTrade } from './hooks.js'
import { defaultSlippageTolerance } from '../config.js'
import { getTickRange } from './calc.js'
import { usePositions } from '../positions/hooks.js'
import { useCli } from 'src/commands.js'

export const SellControl = () => {
  const {
    stage,
    setStage,
    chosenPair,
    chosenPairInfo,
    client,
    addMessage,
    onPoolSelected,
    exit
  } = useTrade()
  const { positionIds, addPosition } = usePositions(
    chosenPairInfo.uniswapPool?.address
  )

  const onLegConfirm = useCallback(
    async (leg: Leg, positionSize: bigint, atTick: number) => {
      // TODO: check collateral requirement first
      const position: Position = {
        uniswapPoolAddress: chosenPairInfo.uniswapPool!.address,
        tickSpacing: chosenPairInfo.tickSpacing,
        legs: [leg, undefined, undefined, undefined]
      }
      const id = calculateTokenId(position)
      const positionIdList = [...positionIds, id]
      const effectiveLiquidityLimitX32 = 0n
      const [tickLowerLimit, tickUpperLimit] = getTickRange(
        chosenPairInfo.priceTick,
        defaultSlippageTolerance,
        chosenPairInfo.tickSpacing
      )
      const c = getContract({
        abi: chosenPairInfo.panopticPool!.abi,
        address: chosenPairInfo.panopticPool!.address,
        client: client!
      })
      try {
        const hash = await c.write.mintOptions([
          positionIdList,
          positionSize,
          effectiveLiquidityLimitX32,
          tickLowerLimit,
          tickUpperLimit
        ])
        addMessage(`Executed transaction ${hash}. Option sold!`, {
          color: 'green'
        })
        await addPosition(position, atTick)
        exit()
        // TODO: reset state, go back to pool selection / main menu
      } catch (ex: any) {
        addMessage((ex as Error).toString(), { color: 'red' })
        addMessage((ex as Error).stack ?? 'Unknown stacktrace', {
          color: 'red'
        })
      }
    },
    [exit, addPosition, positionIds, addMessage, chosenPairInfo, client]
  )

  const cli = useCli()

  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Selling simple options</SectionTitle>
      {!cli && stage === TradeStage.PoolSelection && (
        <PoolSelector onSelected={onPoolSelected} />
      )}
      <LegMaker
        onPoolSelected={(pair) => {
          onPoolSelected({ pair, text: '' })
        }}
        chosenPair={chosenPair}
        chosenPairInfo={chosenPairInfo}
        onLegConfirm={onLegConfirm}
        position={'short'}
        setStage={setStage}
        stage={stage}
      />
    </Box>
  )
}
