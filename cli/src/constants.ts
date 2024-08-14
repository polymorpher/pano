import UniswapFactoryAbiJson from '../../panoptic-v1-core/artifacts/contracts/IUniswapV3Factory.sol/IUniswapV3Factory.json'
import UniswapPoolAbiJson from '../../panoptic-v1-core/artifacts/contracts/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import PanopticFactoryAbiJson from '../../panoptic-v1-core/artifacts/contracts/PanopticFactory.sol/PanopticFactory.json'
import PanopticPoolAbiJson from '../../panoptic-v1-core/artifacts/contracts/PanopticPool.sol/PanopticPool.json'
import SFPMAbiJson from '../../panoptic-v1-core/artifacts/contracts/SemiFungiblePositionManager.sol/SemiFungiblePositionManager.json'
import CollateralTrackerAbiJson from '../../panoptic-v1-core/artifacts/contracts/CollateralTracker.sol/CollateralTracker.json'
import { parseAbi, type Abi } from 'viem'

const UniswapFactoryAbi = UniswapFactoryAbiJson.abi as Abi
export type UniswapFactoryAbiType = typeof UniswapFactoryAbi

const UniswapPoolAbi = UniswapPoolAbiJson.abi as Abi
export type UniswapPoolAbiType = typeof UniswapPoolAbi

const PanopticFactoryAbi = PanopticFactoryAbiJson.abi as Abi
export type PanopticFactoryAbiType = typeof PanopticFactoryAbi

const PanopticPoolAbi = PanopticPoolAbiJson.abi as Abi
export type PanopticPoolAbiType = typeof PanopticPoolAbi

const SFPMAbi = SFPMAbiJson.abi as Abi
export type SFPMAbiType = typeof SFPMAbi

const CollateralTrackerAbi = CollateralTrackerAbiJson.abi as Abi
export type CollateralTrackerAbiType = typeof CollateralTrackerAbi

export { UniswapFactoryAbi, UniswapPoolAbi, PanopticFactoryAbi, PanopticPoolAbi, SFPMAbi, CollateralTrackerAbi }

export const DefaultAssets: Record<string, Record<string, string>> = {
  ethereum: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  },
  harmony: {
    USDC: '0xBC594CABd205bD993e7FfA6F3e9ceA75c1110da5',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  },
  anvil: {
    '': ''
    // by default, nothing is deployed on a fresh local network
  }
}
DefaultAssets.local = DefaultAssets.ethereum
