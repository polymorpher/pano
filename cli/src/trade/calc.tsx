// arg positionSize is in putCall asset
import { type TickSpacing, type Token01 } from '../common.js'
import { formatUnits, parseUnits } from 'viem'
import { packBalanceWithUtilization, priceToTick } from '../util.js'
import { usePositions } from '../positions/hooks.js'
import {
  type AccountCollateralMarginDetails,
  useAccountCollateralFunctions
} from '../pools/hooks/collateral.js'
import { useAccountPoolFunctions } from '../pools/hooks/panoptic.js'
import { useCallback } from 'react'
import type { PanopticPoolInfo } from '../pools/hooks/common.js'

export function getPositionSizeInBaseAsset(
  positionSize: bigint,
  putCall: Token01,
  quoteAsset: Token01,
  strikePrice: number,
  token0Decimals: number,
  token1Decimals: number
): bigint {
  if (quoteAsset === 'token0' && putCall === 'token0') {
    const size = Number(formatUnits(positionSize, token0Decimals))
    const sizeBaseAsset = size / strikePrice
    return parseUnits(sizeBaseAsset.toString(), token1Decimals)
  } else if (quoteAsset === 'token0' && putCall === 'token1') {
    return positionSize
  } else if (quoteAsset === 'token1' && putCall === 'token0') {
    return positionSize
  } else {
    const size = Number(formatUnits(positionSize, token1Decimals))
    const sizeBaseAsset = size * strikePrice
    return parseUnits(sizeBaseAsset.toString(), token0Decimals)
  }
}

export interface MarginUsage {
  marginDetails0?: AccountCollateralMarginDetails
  marginDetails1?: AccountCollateralMarginDetails
  marginIncrease0?: bigint
  marginIncrease1?: bigint
}
export function getTickRange(
  priceTick: number,
  slippage: number,
  tickSpacing: TickSpacing
): [number, number] {
  const slippageTickPlus = priceToTick(1 + slippage, 0)
  // note: this is a negative number
  const slippageTickMinus = priceToTick(1 - slippage, 0)
  const tickLowerLimit = priceTick + slippageTickMinus
  const tickUpperLimit = priceTick + slippageTickPlus
  const rl = Math.ceil(tickLowerLimit / tickSpacing) * tickSpacing
  const ru = Math.floor(tickUpperLimit / tickSpacing) * tickSpacing
  return [rl, ru]
}

export const useMarginEstimator = (chosenPairInfo: PanopticPoolInfo) => {
  const { positions } = usePositions()
  const { getAccountMarginDetails: getAccountMarginDetails0 } =
    useAccountCollateralFunctions(chosenPairInfo.c0Info.tracker)
  const { getAccountMarginDetails: getAccountMarginDetails1 } =
    useAccountCollateralFunctions(chosenPairInfo.c1Info.tracker)

  const { calculateAccumulatedFeesBatch } = useAccountPoolFunctions({
    panopticPool: chosenPairInfo.panopticPool
  })

  const computeMarginUsage = useCallback(
    async (
      newTokenId: bigint,
      positionSize: bigint
    ): Promise<MarginUsage | undefined> => {
      const results = await calculateAccumulatedFeesBatch(
        positions.map((p) => BigInt(p.id))
      )
      if (!results) {
        return
      }
      const { premium0, premium1, balancesAndUtilizations } = results
      const marginDetails0 = await getAccountMarginDetails0(
        chosenPairInfo.priceTick,
        balancesAndUtilizations,
        premium0
      )
      const marginDetails1 = await getAccountMarginDetails1(
        chosenPairInfo.priceTick,
        balancesAndUtilizations,
        premium1
      )
      const balanceWithUtilization = packBalanceWithUtilization({
        utilization0: 0,
        utilization1: 0,
        balance: positionSize
      })
      const newMarginDetails0 = await getAccountMarginDetails0(
        chosenPairInfo.priceTick,
        [...balancesAndUtilizations, [newTokenId, balanceWithUtilization]],
        premium0
      )
      const newMarginDetails1 = await getAccountMarginDetails1(
        chosenPairInfo.priceTick,
        [...balancesAndUtilizations, [newTokenId, balanceWithUtilization]],
        premium1
      )
      if (
        !(
          marginDetails0 &&
          marginDetails1 &&
          newMarginDetails0 &&
          newMarginDetails1
        )
      ) {
        return undefined
      }
      const marginIncrease0 =
        newMarginDetails0.requiredBalance - newMarginDetails0.requiredBalance
      const marginIncrease1 =
        newMarginDetails1.requiredBalance - newMarginDetails1.requiredBalance

      return {
        marginDetails0,
        marginDetails1,
        marginIncrease0,
        marginIncrease1
      }
    },
    [
      chosenPairInfo.priceTick,
      positions,
      calculateAccumulatedFeesBatch,
      getAccountMarginDetails0,
      getAccountMarginDetails1
    ]
  )
  return {
    computeMarginUsage,
    getAccountMarginDetails0,
    getAccountMarginDetails1,
    calculateAccumulatedFeesBatch
  }
}
