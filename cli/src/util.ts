import { knownAssets, type Network, pairs } from './config.js'
import { type Address, type Hex, isAddress, parseUnits, zeroAddress } from 'viem'
import type { PrivateKeyAccount } from 'viem/accounts'
import { privateKeyToAccount } from 'viem/accounts'
import {
  type AssetType,
  type BigInt01,
  type Leg,
  LegIndex, type Position,
  type PositionData, type PositionWithData,
  PutCall,
  type Token01,
  Zero01
} from './common.js'

export const getTokenAddress = (token: string, network: Network): Address | undefined => {
  return knownAssets[network?.id ?? '']?.[token]
}

export const pairToStr = (token0: string, token1: string, fee: number, network: Network) => {
  const token0Address = getTokenAddress(token0, network)
  const token1Address = getTokenAddress(token1, network)
  return `[${token0}, ${token1}] fee level: ${fee} (${token0}: ${token0Address}, ${token1}: ${token1Address})`
}

export const isReadableAddress = (address?: Address) => address && address !== zeroAddress && isAddress(address)

export const TickBase = 1.0001

export const ScalingFactor = 10_000

export const tickToPrice = (tick: number, decimals: number, precision: number = 7): number => {
  const raw = TickBase ** tick
  const scaled = raw / (10 ** decimals)
  if (scaled < 10 ** -precision) {
    return 0
  }
  if (scaled > 10 ** precision) {
    return Infinity
  }
  return scaled
}

export function tickToPriceBigInt (tick: number): bigint {
  // TODO: use the uniswap math lib later to make more accurate
  const raw = TickBase ** tick
  return BigInt(Math.round(raw))
}

export const priceToTick = (price: number, decimals: number): number => {
  const tick = Math.log(price * (10 ** decimals)) / Math.log(TickBase)
  return Math.round(tick)
}

export const tryPrivateKeyToAccount = (pk: Hex): PrivateKeyAccount | undefined => {
  try {
    return privateKeyToAccount(pk)
  } catch (ex: any) {
    console.error(ex)
    return undefined
  }
}

export const tryParseBigInt = (s: string | number): bigint | undefined => {
  try {
    return BigInt(s)
  } catch (ex: any) {
    return undefined
  }
}

export interface AnnotatedTransaction {
  hash: Hex
  annotation: string
}

export const ClientPrecision: number = 8

export const toFixed = (n: number, a: number = ClientPrecision / 2, b: number = ClientPrecision): string => {
  if (n > 1) {
    return n.toFixed(a)
  }
  if (n > 10 ** (-a / 2)) {
    return String(Math.round(n * (10 ** a)) / (10 ** a))
  }
  return String(Math.round(n * (10 ** b)) / (10 ** b))
}

export const tryParseUnits = (s: string, decimals: number): bigint | undefined => {
  try {
    return parseUnits(s, decimals)
  } catch (ex: any) {
    return undefined
  }
}

// Not relying on viem, gives more precise control if needed
export const tryParseDecimalInput = (input: string, decimals: number): bigint | undefined => {
  const decimalAmount = Number(input)
  if (!decimalAmount) {
    return undefined
  }
  const decimalAmountXPrecision = tryParseBigInt(Math.round(decimalAmount * (10 ** ClientPrecision)))
  if (!decimalAmountXPrecision) {
    return undefined
  }
  return decimalAmountXPrecision * (10n ** BigInt(decimals)) / (10n ** BigInt(ClientPrecision))
}

export function stringify (o: any, expand?: boolean): string {
  return JSON.stringify(o, (_, v) => typeof v === 'bigint' ? (v).toString(16) : v, expand ? 2 : undefined)
}

export function findBaseAsset (token0Symbol: string, token1Symbol: string): Token01 | undefined {
  for (const pair of pairs) {
    if (pair.token0 === token0Symbol && pair.token1 === token1Symbol) {
      return pair.baseAsset
    }
  }
}

export function parseBalanceWithUtilization (balanceWithUtilization: bigint): PositionData {
  const balance = balanceWithUtilization & 0xffffffffffffffffffffffffffffffffn
  const u1 = (balanceWithUtilization >> 128n) & 0xffffffffffffffffn
  const utilization1 = Number(u1) / ScalingFactor
  const u0 = (balanceWithUtilization >> 192n) & 0xffffffffffffffffn
  const utilization0 = Number(u0) / ScalingFactor
  return { balance, utilization0, utilization1 }
}

export function packBalanceWithUtilization (data: PositionData): bigint {
  let out = BigInt(Math.round((data.utilization1 ?? 0) * ScalingFactor)) << 128n
  out += BigInt(Math.round((data.utilization0 ?? 0) * ScalingFactor)) << 192n
  out += data.balance ?? 0n
  return out
}

export function unpackLeftRight256 (data: bigint): [bigint, bigint] {
  const left = (data >> 128n) & 0xffffffffffffffffffffffffffffffffn
  const right = data & 0xffffffffffffffffffffffffffffffffn
  return [left, right]
}

export function unpack01 (data: bigint): BigInt01 {
  const [token0, token1] = unpackLeftRight256(data)
  return { token0, token1 }
}

export function isLegITM (tokenId: bigint, legIndex: number, tick: number): boolean {
  const masked = (tokenId >> 64n >> (48n * BigInt(legIndex))) & 0xffffffffffffn
  const strike = Number((masked >> 12n) & 0xffffffn)
  const tokenType = ((masked >> 9n) & 0x1n) === 0n ? PutCall.Put : PutCall.Call
  if (tokenType === PutCall.Put && tick < strike) {
    return true
  }
  return tokenType === PutCall.Call && tick > strike
}

export function isITM (tokenId: bigint, tick: number): boolean {
  for (let i = 0; i < 4; i++) {
    const itm = isLegITM(tokenId, i, tick)
    if (itm) {
      return true
    }
  }
  return false
}

const mask256 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn

export function toITMLegs (tokenId: bigint, tick: number): bigint {
  let newTokenId = tokenId
  for (let i = 0; i < 4; i++) {
    const itm = isLegITM(tokenId, i, tick)
    if (!itm) {
      const shiftBits = 48n * BigInt(i + 1) + 64n
      const leadingMask = shiftBits === 256n ? (((mask256 + 1n) >> shiftBits) << shiftBits) : ((mask256 >> shiftBits) << shiftBits)
      const trailingMask = mask256 >> (48n * BigInt(4 - i))
      const mask = leadingMask | trailingMask
      newTokenId = newTokenId & mask
    }
  }
  return newTokenId
}

export function hasLeg (tokenId: bigint): boolean {
  return (tokenId >> 64n) !== 0n
}

// don't need squared price here or X96 number, since we have infinite precision in js bigint
export function convert0to1 (amount: bigint, price: bigint): bigint {
  return amount * price
}

export function convert1to0 (amount: bigint, price: bigint): bigint {
  return amount / price
}

export function convertNotional (positionSize: bigint, tickLower: number, tickUpper: number, asset: AssetType) {
  const tick = (tickLower + tickUpper) / 2
  const price = tickToPriceBigInt(tick)
  if (asset === 'token0') {
    return convert0to1(positionSize, price)
  } else {
    return convert1to0(positionSize, price)
  }
}

export function getAmountMoved (leg: Leg, positionSize: bigint): BigInt01 {
  if (leg.asset === 'token0') {
    const token0 = positionSize * BigInt(leg.optionRatio)
    return {
      token0,
      token1: convertNotional(token0, leg.tickLower, leg.tickUpper, leg.asset)
    }
  } else {
    const token1 = positionSize * BigInt(leg.optionRatio)
    return {
      token0: convertNotional(token1, leg.tickLower, leg.tickUpper, leg.asset),
      token1
    }
  }
}

export interface IOAmount {
  longs: BigInt01
  shorts: BigInt01
}

export function calculateIOAmounts (leg: Leg, positionSize: bigint): IOAmount {
  const moved = getAmountMoved(leg, positionSize)
  const isShort = leg.position === 'short'
  const isPut = leg.tokenType === 'token0'
  if (isPut && isShort) {
    return {
      shorts: { token0: moved.token0, token1: 0n },
      longs: Zero01
    }
  } else if (isPut && !isShort) {
    return {
      longs: { token0: moved.token0, token1: 0n },
      shorts: Zero01
    }
  } else if (!isPut && isShort) {
    return {
      shorts: { token1: moved.token0, token0: 0n },
      longs: Zero01
    }
  } else {
    return {
      longs: { token1: moved.token0, token0: 0n },
      shorts: Zero01
    }
  }
}
export const ZeroIOAmount: IOAmount = { longs: Zero01, shorts: Zero01 }
export function addBigInt01 (a: BigInt01, b: BigInt01): BigInt01 {
  return { token0: a.token0 + b.token0, token1: a.token1 + b.token1 }
}
export function addIOAmounts (a: IOAmount, b: IOAmount): IOAmount {
  return { longs: addBigInt01(a.longs, b.longs), shorts: addBigInt01(a.shorts, b.shorts) }
}

export function computeExercisedAmounts (p: PositionWithData): IOAmount {
  let amounts = ZeroIOAmount
  for (const l of p.legs) {
    if (!l) {
      break
    }
    if (!p.balance || p.balance <= 0n) {
      continue
    }
    const legAmounts = calculateIOAmounts(l, p.balance)
    amounts = addIOAmounts(amounts, legAmounts)
  }
  return amounts
}

export function countLegs (p: Position): number {
  return p.legs.filter(e => e !== undefined).length
}
