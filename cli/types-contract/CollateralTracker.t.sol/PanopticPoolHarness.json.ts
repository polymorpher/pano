export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_SFPM',
        type: 'address',
        internalType: 'contract SemiFungiblePositionManager'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'burnOptions',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'burnOptions',
    inputs: [
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'tickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'calculateAccumulatedFeesBatch',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [
      {
        name: 'premium0',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'premium1',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'calculateAccumulatedPremia',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'collateralCalculation',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: 'atTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'premiaAll',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'positionBalanceArray',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'calculatePortfolioValue',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
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
        name: 'value0',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'value1',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'collateralToken0',
    inputs: [],
    outputs: [
      {
        name: 'collateralToken',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'collateralToken1',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'delegate',
    inputs: [
      {
        name: 'delegator',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'collateralToken',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'forceExercise',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'touchedId',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'idsToBurn',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getMedianHook',
    inputs: [],
    outputs: [
      {
        name: 'medianTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getPriceArray',
    inputs: [],
    outputs: [
      {
        name: 'priceArray',
        type: 'int24[]',
        internalType: 'int24[]'
      },
      {
        name: 'medianTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getTWAP',
    inputs: [],
    outputs: [
      {
        name: 'twapTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'liquidateAccount',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'mintOptions',
    inputs: [
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'effectiveLiquidityLimitX32',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'tickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'modifiedStartPool',
    inputs: [
      {
        name: 'token0',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'token1',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'uniswapPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        name: 'data',
        type: 'bytes[]',
        internalType: 'bytes[]'
      }
    ],
    outputs: [
      {
        name: 'results',
        type: 'bytes[]',
        internalType: 'bytes[]'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'numberOfPositions',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: '_numberOfPositions',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'onERC1155BatchReceived',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onERC1155Received',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'optionPositionBalance',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'poolUtilization0',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'poolUtilization1',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'optionsMap',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'leg',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'premiaGrowth',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'pokeMedian',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'positionBalance',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'balanceAndUtilizations',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'revoke',
    inputs: [
      {
        name: 'delegator',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'requestedAmount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'collateralToken',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'startPool',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'token0',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'token1',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'collateralTracker0',
        type: 'address',
        internalType: 'contract CollateralTracker'
      },
      {
        name: 'collateralTracker1',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'univ3pool',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'updateParametersHook',
    inputs: [
      {
        name: 'newParameters',
        type: 'tuple',
        internalType: 'struct CollateralTracker.Parameters',
        components: [
          {
            name: 'maintenanceMarginRatio',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'commissionFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'ITMSpreadFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'sellCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'buyCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'targetPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'saturatedPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'exerciseCost',
            type: 'int128',
            internalType: 'int128'
          }
        ]
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'AccountLiquidated',
    inputs: [
      {
        name: 'liquidator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'liquidatee',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'bonusAmounts',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'tickAt',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ForcedExercised',
    inputs: [
      {
        name: 'exercisor',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'exerciseFee',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'tickAt',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OptionBurnt',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'tickAtBurn',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      },
      {
        name: 'premia',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OptionMinted',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'tickAtMint',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      },
      {
        name: 'poolUtilizations',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OptionRolled',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'oldTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'newTokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'tickAtRoll',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      },
      {
        name: 'poolUtilizations',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'premia',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'CastingError',
    inputs: []
  },
  {
    type: 'error',
    name: 'EffectiveLiquidityAboveThreshold',
    inputs: []
  },
  {
    type: 'error',
    name: 'InputListFail',
    inputs: []
  },
  {
    type: 'error',
    name: 'InsufficientCollateralDecrease',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidNotionalValue',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTick',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTokenIdParameter',
    inputs: [
      {
        name: 'parameterType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'error',
    name: 'NoLegsExercisable',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotEnoughCollateral',
    inputs: []
  },
  {
    type: 'error',
    name: 'PoolAlreadyInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionAlreadyMinted',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'TooManyPositionsOpen',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnderOverFlow',
    inputs: []
  }
] as const
