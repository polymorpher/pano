export default [
  {
    type: 'function',
    name: 'IS_TEST',
    inputs: [],
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
    name: '_calculateIOAmounts',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
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
    name: '_convertNotional',
    inputs: [
      {
        name: 'contractSize',
        type: 'uint128',
        internalType: 'uint128'
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
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: '_getAmountsMoved',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
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
    name: 'calculateIOAmounts',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
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
    name: 'computeExercisedAmounts',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'oldTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
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
    name: 'convert0to1',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convert0to1',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convert1to0',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convert1to0',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convertCollateralData',
    inputs: [
      {
        name: 'tokenData0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenData1',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tick',
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convertCollateralData',
    inputs: [
      {
        name: 'tokenData0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenData1',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'convertNotional',
    inputs: [
      {
        name: 'contractSize',
        type: 'uint128',
        internalType: 'uint128'
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
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'excludeArtifacts',
    inputs: [],
    outputs: [
      {
        name: 'excludedArtifacts_',
        type: 'string[]',
        internalType: 'string[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'excludeContracts',
    inputs: [],
    outputs: [
      {
        name: 'excludedContracts_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'excludeSenders',
    inputs: [],
    outputs: [
      {
        name: 'excludedSenders_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'failed',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getAmountsMoved',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
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
    name: 'getFinalPoolId',
    inputs: [
      {
        name: 'basePoolId',
        type: 'uint64',
        internalType: 'uint64'
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'getLiquidityChunk',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
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
    name: 'getPoolId',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'numberOfLeadingHexZeros',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'targetArtifactSelectors',
    inputs: [],
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        type: 'tuple[]',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        components: [
          {
            name: 'addr',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'selectors',
            type: 'bytes4[]',
            internalType: 'bytes4[]'
          }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetArtifacts',
    inputs: [],
    outputs: [
      {
        name: 'targetedArtifacts_',
        type: 'string[]',
        internalType: 'string[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetContracts',
    inputs: [],
    outputs: [
      {
        name: 'targetedContracts_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetSelectors',
    inputs: [],
    outputs: [
      {
        name: 'targetedSelectors_',
        type: 'tuple[]',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        components: [
          {
            name: 'addr',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'selectors',
            type: 'bytes4[]',
            internalType: 'bytes4[]'
          }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetSenders',
    inputs: [],
    outputs: [
      {
        name: 'targetedSenders_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'twapFilter',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'twapWindow',
        type: 'uint32',
        internalType: 'uint32'
      }
    ],
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
    name: 'updatePositionsHash',
    inputs: [
      {
        name: 'existingHash',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'addFlag',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    outputs: [
      {
        name: 'newHash',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'event',
    name: 'log',
    inputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_address',
    inputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'int256[]',
        indexed: false,
        internalType: 'int256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_bytes',
    inputs: [
      {
        name: '',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_bytes32',
    inputs: [
      {
        name: '',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_int',
    inputs: [
      {
        name: '',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_address',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256[]',
        indexed: false,
        internalType: 'int256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_bytes',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_bytes32',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_decimal_int',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'decimals',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_decimal_uint',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'decimals',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_int',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_string',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_uint',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_string',
    inputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_uint',
    inputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'logs',
    inputs: [
      {
        name: '',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
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
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnderOverFlow',
    inputs: []
  }
] as const
