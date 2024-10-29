import type { Address, GetContractReturnType, PublicClient } from 'viem'
import {
  type CollateralTrackerAbi,
  type PanopticPoolAbi,
  type UniswapPoolAbi,
  type SFPMAbi
} from '../../constants.js'
import type { ERC20Info, ERC20Metadata, IERC20 } from '../../token.js'
import type { PairedPoolAddresses, TickSpacing } from '../../common.js'

export interface UniswapPoolBasicInfo {
  token0: ERC20Info
  token1: ERC20Info
  tickSpacing: TickSpacing
  sqrtPriceX96: bigint
  tick: number
  ready: boolean
}

export interface PoolContracts {
  panopticPool?: PanopticPool
  uniswapPool?: UniswapPool
}

export type PanopticPool = GetContractReturnType<
  typeof PanopticPoolAbi,
  PublicClient
>
export type UniswapPool = GetContractReturnType<
  typeof UniswapPoolAbi,
  PublicClient
>
export type CollateralTracker = GetContractReturnType<
  typeof CollateralTrackerAbi,
  PublicClient
>

export interface CollateralPoolState {
  poolAssets: bigint
  inAmm: bigint
  utilization: number
}

export interface CollateralInfo {
  totalAssets: bigint
  shares: bigint
  tokenAddress?: Address
  tokenContract?: IERC20
}

export type CollateralFullInfo = CollateralInfo &
  CollateralPoolState &
  ERC20Metadata & {
    tracker?: CollateralTracker
    address?: Address
    ready: boolean
  }

export const EmptyTokenPair: [Address | undefined, Address | undefined] = [
  undefined,
  undefined
]

export interface CollateralAddresses {
  collateral0?: Address
  collateral1?: Address
}

export const EmptyPriceTick = 1e-36

export const EmptyPriceTickInfo = {
  priceTick: EmptyPriceTick,
  recentPriceTicks: []
}

export interface PanopticPoolInfo extends PoolContracts {
  c0Info: CollateralFullInfo
  c1Info: CollateralFullInfo
  price: number
  priceTick: number
  priceInverse: number
  recentPrices: number[]
  recentPricesInverse: number[]
  tickSpacing: TickSpacing
  ready: boolean
}

export function getPoolAddress({
  panopticPool,
  uniswapPool
}: PoolContracts): PairedPoolAddresses | undefined {
  if (!panopticPool || !uniswapPool) {
    return undefined
  }
  return {
    panopticPoolAddress: panopticPool.address,
    uniswapPoolAddress: uniswapPool.address
  }
}
