import { knownAssets, type Network } from './config.js'
import {
  type Address, type Hex,
  isAddress, parseUnits,
  zeroAddress
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import type { PrivateKeyAccount } from 'viem/accounts'

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
