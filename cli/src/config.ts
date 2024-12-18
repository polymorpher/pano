import * as dotenv from 'dotenv'
import * as process from 'process'
import { DefaultAssets } from './constants.js'
import { merge } from 'remeda'
import { type Address, type Hex } from 'viem'
import { type Token01 } from './common.js'
dotenv.config()

export const DEBUG = Boolean(
  process.env.DEBUG === 'true' || process.env.DEBUG === '1'
)

export const knownAssets = process.env.KNOWN_ASSETS
  ? merge(DefaultAssets, JSON.parse(process.env.KNOWN_ASSETS))
  : DefaultAssets

export interface Network {
  id: string
  name: string
  rpc: string
  archive?: string
  chainId: number
  blockTime?: number
  nativeCurrency: { name: string; symbol: string; decimals: number }
}

export const networks: Record<string, Network> = {
  local: {
    id: 'local',
    name: 'Local (Forked Ethereum Mainnet)',
    rpc: 'http://127.0.0.1:8545',
    chainId: 1,
    blockTime: 0,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  anvil: {
    id: 'anvil',
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
    id: 'harmony',
    name: 'Harmony Mainnet',
    rpc: 'https://api.harmony.one',
    archive: 'https://a.api.s0.t.hmny.io/',
    blockTime: 2000,
    chainId: 0x63564c40,
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18
    }
  }
}

export interface Pair {
  token0: string
  token1: string
  fee: number
  baseAsset: Token01
}

// each tuple is [token0, token1, fee in bps]. Order of token0 and token1 does not matter
// token0 and token1 must exist from address lookup table
export const pairs: Pair[] = process.env.PAIRS
  ? JSON.parse(process.env.PAIRS)
  : [{ token0: 'USDC', token1: 'WETH', fee: 500, baseAsset: 'token1' }]

// local ETH fork's deployment address, using test/junk mnemonic
export const defaultPanopticfactoryAddress: Address = (process.env
  .PANOPTIC_FACTORY_ADDRESS ??
  '0x00436c9f57dffd96cecd129c04d9e488c57266cf') as Address

export const defaultUniswapFactoryAddress: Address = (process.env
  .UNISWAP_FACTORY_ADDRESS ??
  '0x1F98431c8aD98523631AE4a59f267346ea31F984') as Address

export const defaultPanopticHelperAddress: Address = (process.env
  .PANOPTIC_HELPER_ADDRESS ??
  '0x0bfc626b583e93a5f793bc2caa195bdbb2ed9f20') as Address

export const defaultSFPMAddress: Address = (process.env.PANOPTIC_SFPM_ADDRESS ??
  '0x9bdd64340d3ce0607f51bbc7508ca40d45849ab8') as Address

export const defaultEffectiveLiquidityRatio = Number(
  process.env.EFFECTIVE_LIQUIDITY_RATIO ?? 1.5
)

export const defaultSlippageTolerance = Number(
  process.env.SLIPPAGE_TOLERANCE ?? 0.01
)

export const defaultWalletPrivateKey: Hex | undefined = process.env.PK as Hex

export const defaultDbPath: string | undefined = process.env.DB ?? 'db'

export const archivePoolingInterval = Number(
  process.env.ARCHIVE_POOLING_INTERVAL ?? 500
)

export const archivePoolingBlockRangeSize = BigInt(
  process.env.ARCHIVE_POOLING_BLOCK_RANGE_SIZE ?? 1024n
)
