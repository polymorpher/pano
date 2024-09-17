// arg positionSize is in putCall asset
import { type Token01 } from '../common.js'
import { formatUnits, parseUnits } from 'viem'
export const getPositionSizeInBaseAsset = (positionSize: bigint,
  putCall: Token01,
  quoteAsset: Token01,
  strikePrice: number,
  token0Decimals: number,
  token1Decimals: number
): bigint => {
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
