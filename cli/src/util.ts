import { knownAssets, type Network, pairs } from './config.js'
import { type Address, type Hex, isAddress, parseUnits, zeroAddress } from 'viem'
import type { PrivateKeyAccount } from 'viem/accounts'
import { privateKeyToAccount } from 'viem/accounts'
import { type PositionData, PutCall, type Token01 } from './common.js'

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
