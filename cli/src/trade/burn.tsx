import React, { useCallback, useEffect, useState } from 'react'
import { Box, Text } from 'ink'
import { usePositions } from '../positions/hooks.js'
import { useTrade } from './hooks.js'
import {
  type PositionWithData,
  PositionWithId,
  SectionTitle,
  type ValidatedPair
} from '../common.js'
import { PoolSelector } from '../pools/selector.js'

enum BurnStage {
  PoolSelection = 1,
  PositionSelection = 2,
  Confirm = 3
}

export const BurnControl = () => {
  const { positions, reloadPositions } = usePositions()
  const [positionsInPool, setPositionsInPool] = useState<PositionWithData[]>()
  const [stage, setStage] = useState<BurnStage>(BurnStage.PoolSelection)
  const {
    chosenPair,
    chosenPairInfo,
    client,
    addMessage,
    onPoolSelected,
    exit
  } = useTrade()
  const onPoolSelectedOverride = useCallback(
    ({ text, pair }: { text: string; pair?: ValidatedPair }) => {
      onPoolSelected({ text, pair })
      if (!pair) {
        return
      }
      setStage(BurnStage.PositionSelection)
    },
    [onPoolSelected]
  )

  useEffect(() => {}, [stage])

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
          <Text>You do not have any position in this pool</Text>
        )}
      {stage === BurnStage.PositionSelection && positionsInPool?.length && (
        <PoolSelector onSelected={onPoolSelectedOverride} />
      )}
    </Box>
  )
}
