// arg positionSize is in putCall asset
import { type TickSpacing, type Token01 } from '../common.js'
import { formatUnits, parseUnits } from 'viem'
import { priceToTick } from '../util.js'
export function getPositionSizeInBaseAsset (positionSize: bigint,
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

export function getTickRange (priceTick: number, slippage: number, tickSpacing: TickSpacing): [number, number] {
  const slippageTickPlus = priceToTick(1 + slippage, 0)
  // note: this is a negative number
  const slippageTickMinus = priceToTick(1 - slippage, 0)
  const tickLowerLimit = priceTick + slippageTickMinus
  const tickUpperLimit = priceTick + slippageTickPlus
  const rl = Math.ceil(tickLowerLimit / tickSpacing) * tickSpacing
  const ru = Math.floor(tickUpperLimit / tickSpacing) * tickSpacing
  return [rl, ru]
}
