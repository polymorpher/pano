import React, { useCallback, useEffect, useRef } from 'react'
import {
  calculateTokenId,
  type Leg,
  type Position,
  SectionTitle
} from 'src/common.js'
import { Box } from 'ink'
import { PoolSelector } from 'src/pools/selector.js'
import { getContract } from 'viem'
import { LegMaker, type LegMakerRef, TradeStage } from './trade.js'
import { useTrade } from './hooks.js'
import { defaultSlippageTolerance } from '../config.js'
import { getTickRange } from './calc.js'
import { usePositions } from '../positions/hooks.js'
import { CommandKeys, useCli, useOption } from 'src/commands.tsx'
import CommandArgs from 'src/command-args.tsx'
import { commandOptions } from 'src/options.ts'
import { usePools } from 'src/pools/hooks/panoptic.ts'

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
  const pool = useOption('pool')
  const asset = useOption('asset')
  const trade = useOption('trade')
  const strikePrice = useOption('sp')
  const priceRange = useOption('range')
  const amount = useOption('amount')
  const { pairs } = usePools()
  const legMakerRef = useRef<LegMakerRef>()

  useEffect(() => {
    if (!cli || !pool || !pairs) {
      return
    }

    if (stage !== TradeStage.PoolSelection) {
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
      setStage(TradeStage.Empty)
      return
    }

    onPoolSelected({ pair, text: '' })
  }, [cli, addMessage, pairs, pool, stage, onPoolSelected, setStage])

  useEffect(() => {
    if (
      !cli ||
      !asset ||
      !chosenPair ||
      !chosenPairInfo.ready ||
      stage !== TradeStage.QuoteAsset
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
      addMessage(`Invalid asset: ${asset.toUpperCase()}`, { color: 'red' })
      setStage(TradeStage.Empty)
      return
    }

    legMakerRef.current?.onQuoteAssetSubmit(choice)
  }, [
    addMessage,
    asset,
    chosenPair,
    chosenPairInfo.ready,
    cli,
    setStage,
    stage
  ])

  useEffect(() => {
    if (!cli || stage !== TradeStage.PutCall) {
      return
    }

    let choice = 0

    if (trade?.toLowerCase() === 'put') {
      choice = 1
    } else if (trade?.toLowerCase() === 'call') {
      choice = 2
    }

    if (choice === 0) {
      addMessage(
        `Invalid trade (should be PUT or CALL): ${trade?.toUpperCase()}`,
        { color: 'red' }
      )
      return
    }

    legMakerRef.current?.onPutCallSelected(choice)
  }, [addMessage, cli, stage, trade])

  useEffect(() => {
    if (!cli || stage !== TradeStage.StrikeAmount) {
      return
    }

    if (isNaN(Number(strikePrice))) {
      addMessage(`Invalid striker price: ${strikePrice}`, { color: 'red' })
      return
    }

    legMakerRef.current?.onStrikeAmountSubmit(Number(strikePrice))
  }, [addMessage, cli, stage, strikePrice])

  useEffect(() => {
    if (!cli || stage !== TradeStage.Width) {
      return
    }

    legMakerRef.current?.onWidthSubmit(String(priceRange))
  }, [addMessage, cli, stage, priceRange])

  useEffect(() => {
    if (!cli || stage !== TradeStage.Quantity) {
      return
    }

    legMakerRef.current?.onQuantitySubmit(Number(amount))
  }, [addMessage, cli, stage, amount])

  useEffect(() => {
    if (!cli || stage !== TradeStage.Confirm) {
      return
    }

    legMakerRef.current?.onConfirm(true)
  }, [addMessage, cli, stage])

  if (
    cli &&
    (!pool ||
      !asset ||
      !trade ||
      strikePrice === undefined ||
      priceRange === undefined ||
      amount === undefined)
  ) {
    return (
      <CommandArgs
        title="Use the following options to sell"
        args={commandOptions[CommandKeys.Sell]!}
      />
    )
  }

  return (
    <Box flexDirection={'column'}>
      {!cli && (
        <>
          <SectionTitle>Selling simple options</SectionTitle>
          {stage === TradeStage.PoolSelection && (
            <PoolSelector onSelected={onPoolSelected} />
          )}
        </>
      )}
      <LegMaker
        ref={(ref) => ref && (legMakerRef.current = ref)}
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
