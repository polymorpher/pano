import React, { useCallback, useState } from 'react'
import { Box, Text } from 'ink'
import { usePositions } from '../positions/hooks.js'
import { useTrade } from './hooks.js'
import {
  ConfirmationSelector,
  MultiChoiceSelector,
  type PositionWithData,
  SectionTitle,
  type ValidatedPair,
  Zero01
} from '../common.js'
import { PoolSelector } from '../pools/selector.js'
import { getContract, isAddressEqual } from 'viem'
import { Position } from '../positions/position.js'
import { toUniswapPoolBasicInfo } from '../util.js'
import { getTickRange } from './calc.js'
import { defaultSlippageTolerance } from '../config.js'

enum BurnStage {
  PoolSelection = 1,
  PositionSelection = 2,
  Confirm = 3
}

export const BurnControl = () => {
  const { positions, deletePosition } = usePositions()
  const [positionsInPool, setPositionsInPool] = useState<PositionWithData[]>()
  const [selectedPosition, setSelectedPosition] = useState<PositionWithData>()
  const [stage, setStage] = useState<BurnStage>(BurnStage.PoolSelection)
  const {
    chosenPair,
    chosenPairInfo,
    client,
    addMessage,
    onPoolSelected,
    exit
  } = useTrade()
  const uniswapPoolInfo = toUniswapPoolBasicInfo(chosenPairInfo)
  const onPoolSelectedOverride = useCallback(
    ({ text, pair }: { text: string; pair?: ValidatedPair }) => {
      onPoolSelected({ text, pair })
      if (!pair) {
        setStage(BurnStage.PoolSelection)
        return
      }
      setStage(BurnStage.PositionSelection)
      const selectedPositions = positions.filter((p) =>
        isAddressEqual(pair.uniswapPoolAddress, p.uniswapPoolAddress)
      )
      setPositionsInPool(selectedPositions)
    },
    [positions, onPoolSelected]
  )

  const onPositionSelected = useCallback(
    (choice: number) => {
      const position = positionsInPool![choice - 1]
      setSelectedPosition(position)
      setStage(BurnStage.Confirm)
    },
    [positionsInPool]
  )
  const onConfirm = useCallback(
    async (yes?: boolean) => {
      if (yes === false) {
        setStage(BurnStage.PositionSelection)
        setSelectedPosition(undefined)
      } else if (yes === undefined) {
        setStage(BurnStage.PoolSelection)
        addMessage('Burning aborted', { color: 'red' })
      } else if (yes) {
        if (!selectedPosition) {
          setStage(BurnStage.PositionSelection)
          return
        }
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
          const hash = await c.write.burnOptions([
            BigInt(selectedPosition.id),
            tickLowerLimit,
            tickUpperLimit
          ])
          await deletePosition(selectedPosition)
          exit()
          addMessage(`Executed transaction ${hash}. Option burned!`, {
            color: 'green'
          })
        } catch (ex: any) {
          addMessage((ex as Error).toString(), { color: 'red' })
          addMessage((ex as Error).stack ?? 'Unknown stacktrace', {
            color: 'red'
          })
        }
      }
    },
    [addMessage, chosenPairInfo, exit, deletePosition, selectedPosition, client]
  )

  const title = <SectionTitle>Burn (closing) an existing position</SectionTitle>
  const subtitle = chosenPair ? (
    <SectionTitle secondary>
      Pool {chosenPairInfo.c0Info.symbol}/{chosenPairInfo.c1Info.symbol}
    </SectionTitle>
  ) : (
    <></>
  )
  if (!positions.length) {
    return (
      <Box flexDirection={'column'}>
        {title}
        <Text>(Loading positions...)</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection={'column'}>
      {title}
      {subtitle}
      {stage === BurnStage.PoolSelection && (
        <PoolSelector onSelected={onPoolSelectedOverride} />
      )}
      {stage === BurnStage.PositionSelection && !positionsInPool && (
        <>
          {title}
          {subtitle}
          <Text>(Loading positions in pool...)</Text>
        </>
      )}
      {stage === BurnStage.PositionSelection &&
        positionsInPool?.length === 0 && (
          <MultiChoiceSelector
            options={[]}
            onExit={() => {
              onPoolSelectedOverride({ text: '' })
            }}
            onSelected={() => {}}
            prompt={''}
            intro={'You do not have any position in this pool'}
          />
        )}
      {stage === BurnStage.PositionSelection && positionsInPool?.length && (
        <MultiChoiceSelector
          options={positionsInPool.map((p) => {
            return (
              <Position
                key={p.id}
                position={p}
                poolInfo={uniswapPoolInfo}
                isItm={false}
                intrinsicValue={Zero01}
              />
            )
          })}
          onExit={() => {
            onPoolSelectedOverride({ text: '' })
          }}
          onSelected={onPositionSelected}
          prompt={'Choose position to burn'}
          intro={'Your open positions'}
        />
      )}
      {stage === BurnStage.Confirm && (
        <ConfirmationSelector intro={'TODO'} onConfirm={onConfirm} />
      )}
    </Box>
  )
}
