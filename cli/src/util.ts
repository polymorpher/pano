import { knownAssets, type Network } from './config.js'
import { type Address, type Hex, isAddress, zeroAddress } from 'viem'
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

export const tryPrivateKeyToAccount = (pk: Hex): PrivateKeyAccount | undefined => {
  try {
    return privateKeyToAccount(pk)
  } catch (ex: any) {
    console.error(ex)
    return undefined
  }
}

export const tryParseBigInt = (s: string): bigint | undefined => {
  try {
    return BigInt(s)
  } catch (ex: any) {
    return undefined
  }
}
