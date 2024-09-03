import React, { type PropsWithChildren } from 'react'
import { Box, Text } from 'ink'
import type { Pair } from './config.js'
import type { Address } from 'viem'
import type { Tuple } from 'reverse-mirage'

export const SectionTitle = ({ children }: PropsWithChildren) => {
  return <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1}><Text color={'yellow'}>{children}</Text></Box>
}

export interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

export interface Leg {
  asset: 'token0' | 'token1'
  optionRatio: number
  position: 'long' | 'short'
  tokenType: 'token0' | 'token1'
  riskPartnerIndex: 0 | 1 | 2 | 3
  tickLower: number
  tickUpper: number
}

export type FeeTier = 100 | 500 | 3_000 | 10_000

export type TickSpacing = 1 | 10 | 60 | 200

// adapted from Panoptic SDK
export const calculateLegId = (leg: Leg, tickSpacing: TickSpacing) => {
  let id = 0n
  id |= leg.asset === 'token0' ? 0n : 1n
  id |= BigInt(leg.optionRatio) << 1n
  id |= (leg.position === 'short' ? 0n : 1n) << 8n
  id |= (leg.tokenType === 'token0' ? 0n : 1n) << 9n
  id |= BigInt(leg.riskPartnerIndex) << 10n
  id |= BigInt((leg.tickUpper + leg.tickLower) / 2) << 12n
  id |= BigInt((leg.tickUpper - leg.tickLower) / tickSpacing) << 36n
  return id
}

export interface Position {
  uniswapPoolAddress: Address
  tickSpacing: TickSpacing
  legs: Tuple<Leg | undefined, 4>
}

export function getPoolId (pool: Address): bigint {
  return (BigInt(pool) >> 96n) & 0xffffffffffffffffn
}

export function extractPoolId (tokenId: bigint): bigint {
  return tokenId & 0xffffffffffffffffn
}

// adapted from Panoptic SDK
export const calculateTokenId = (
  uniswapPoolAddress: Address,
  tickSpacing: TickSpacing,
  legs: Tuple<Leg | undefined, 4>
): bigint => {
  let id = 0n
  id |= (BigInt(uniswapPoolAddress) >> 96n) & 0xffffffffffffffffn
  id |= legs[0] ? calculateLegId(legs[0], tickSpacing) << 64n : 0n
  id |= legs[1]
    ? calculateLegId(legs[1], tickSpacing) << (64n + 48n)
    : 0n
  id |= legs[2]
    ? calculateLegId(legs[2], tickSpacing) << (64n + 48n + 48n)
    : 0n
  id |= legs[3]
    ? calculateLegId(legs[3], tickSpacing) <<
      (64n + 48n + 48n + 48n)
    : 0n

  return id
}
