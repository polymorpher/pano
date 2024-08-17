export default [
  {
    type: 'function',
    name: 'addBalance',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'balance',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'calculateAMMSwapFees',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
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
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
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
        type: 'address',
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
    type: 'function',
    name: 'getAMMSwapFeesPerLiquidityCollected',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLower',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickUpper',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPortfolioValue',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'atTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'userBalance',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  }
] as const
