export default [
  {
    type: 'function',
    name: 'calculateAMMSwapFees',
    inputs: [
      {
        name: 'univ3pool',
        type: 'IUniswapV3Pool',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [
      {
        name: 'liquidityChunk',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'feesPerToken',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'calculateAMMSwapFeesLiquidityChunk',
    inputs: [
      {
        name: 'univ3pool',
        type: 'IUniswapV3Pool',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'startingLiquidity',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'liquidityChunk',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'feesEachToken',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'error',
    name: 'CastingError',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTick',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  }
] as const
