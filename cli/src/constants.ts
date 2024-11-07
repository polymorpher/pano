import UniswapFactoryAbi from '../types-contract/IUniswapV3Factory.sol/IUniswapV3Factory.json.js'
import UniswapPoolAbi from '../types-contract/IUniswapV3Pool.sol/IUniswapV3Pool.json.js'
import PanopticFactoryAbi from '../types-contract/PanopticFactory.sol/PanopticFactory.json.js'
import PanopticPoolAbi from '../types-contract/PanopticPool.sol/PanopticPool.json.js'
import SFPMAbi from '../types-contract/SemiFungiblePositionManager.sol/SemiFungiblePositionManager.json.js'
import CollateralTrackerAbi from '../types-contract/CollateralTracker.sol/CollateralTracker.json.js'
import IERC20Abi from '../types-contract/IERC20.sol/IERC20.json.js'
import IERC20MetadataAbi from '../types-contract/IERC20Metadata.sol/IERC20Metadata.json.js'
import PanopticHelperAbi from '../types-contract/PanopticHelper.sol/PanopticHelper.json.js'

export {
  UniswapFactoryAbi,
  UniswapPoolAbi,
  PanopticFactoryAbi,
  PanopticPoolAbi,
  SFPMAbi,
  CollateralTrackerAbi,
  IERC20Abi,
  IERC20MetadataAbi,
  PanopticHelperAbi
}

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

export const DECIMALS = 10_000

export const MAX_V3POOL_TICK = 887272
export const MIN_V3POOL_TICK = -887272
