import * as dotenv from 'dotenv'
import * as process from 'process'
import { DefaultAssets } from './constants.js'
import { merge } from 'lodash-es'
dotenv.config()

export const DEBUG = Boolean(process.env.DEBUG === 'true' || process.env.DEBUG === '1')

export const knownAssets = process.env.KNOWN_ASSETS ? merge(DefaultAssets, JSON.parse(process.env.KNOWN_ASSETS)) : DefaultAssets

export interface Network {
  name: string
  rpc: string
  chainId: number
  nativeCurrency: { name: string, symbol: string, decimals: number }
}

export const networks: Record<string, Network> = {
  local: {
    name: 'Local (Forked Ethereum Mainnet)',
    rpc: 'http://127.0.0.1:8545',
    chainId: 1,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  anvil: {
    name: 'Local Anvil',
    rpc: 'http://127.0.0.1:8545',
    chainId: 31337,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  harmony: {
    name: 'Harmony Mainnet',
    rpc: 'https://api.harmony.one',
    chainId: 0x63564C40,
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18
    }
  }
}

// each tuple is [token0, token1, fee in bps]. Order of token0 and token1 does not matter
// token0 and token1 must exist from address lookup table
export const pairs: Array<[string, string, number]> = process.env.PAIRS
  ? JSON.parse(process.env.PAIRS)
  : [
      ['USDC', 'WETH', 500]
    ]

// local ETH fork's deployment address, using test/junk mnemonic
export const factoryAddress = process.env.FACTORY_ADDRESS ?? '0x00436c9f57dffd96cecd129c04d9e488c57266cf'
