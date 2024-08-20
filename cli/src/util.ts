import { knownAssets, type Network } from './config.js'
import { type Address, isAddress, zeroAddress } from 'viem'

export const getTokenAddress = (token: string, network: Network): Address | undefined => {
  return knownAssets[network?.id ?? '']?.[token]
}

export const pairToStr = (token0: string, token1: string, fee: number, network: Network) => {
  const token0Address = getTokenAddress(token0, network)
  const token1Address = getTokenAddress(token1, network)
  return `[${token0}, ${token1}] fee level: ${fee} (${token0}: ${token0Address}, ${token1}: ${token1Address})`
}

export const isReadableAddress = (address?: Address) => address && address !== zeroAddress && isAddress(address)
