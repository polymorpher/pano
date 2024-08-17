export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_factory',
        type: 'address',
        internalType: 'contract IUniswapV3Factory'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'addrToPoolId',
    inputs: [
      {
        name: 'pool',
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
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'balanceOf',
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
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'balanceOfBatch',
    inputs: [
      {
        name: 'owners',
        type: 'address[]',
        internalType: 'address[]'
      },
      {
        name: 'ids',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [
      {
        name: 'balances',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'burnTokenizedPosition',
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
        name: 'slippageTickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'slippageTickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'totalCollected',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'totalSwapped',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'newTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getAccountFeesBase',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
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
        name: 'feesBase0',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'feesBase1',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getAccountLiquidity',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
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
        name: 'accountLiquidities',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getAccountPremium',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
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
        name: 'atTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'isLong',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'premiumToken0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'premiumToken1',
        type: 'uint128',
        internalType: 'uint128'
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
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getUniswapV3PoolFromId',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [
      {
        name: 'UniswapV3Pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'initializeAMMPool',
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'operator',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'approvedForAll',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'mintTokenizedPosition',
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
        name: 'slippageTickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'slippageTickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'totalCollected',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'totalSwapped',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'newTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
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
    name: 'poolContext',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct SemiFungiblePositionManager.PoolAddressAndLock',
        components: [
          {
            name: 'pool',
            type: 'address',
            internalType: 'contract IUniswapV3Pool'
          },
          {
            name: 'locked',
            type: 'bool',
            internalType: 'bool'
          }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'rollTokenizedPositions',
    inputs: [
      {
        name: 'oldTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'newTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSize',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'slippageTickLimitLow',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'slippageTickLimitHigh',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'totalCollectedBurn',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'totalSwappedBurn',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'totalCollectedMint',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'totalSwappedMint',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'newTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'safeBatchTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'ids',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'amounts',
        type: 'uint256[]',
        internalType: 'uint256[]'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'approved',
        type: 'bool',
        internalType: 'bool'
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'uniswapV3MintCallback',
    inputs: [
      {
        name: 'amount0Owed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1Owed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'uniswapV3SwapCallback',
    inputs: [
      {
        name: 'amount0Delta',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount1Delta',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'PoolInitialized',
    inputs: [
      {
        name: 'uniswapPool',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TokenizedPositionBurnt',
    inputs: [
      {
        name: 'recipient',
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
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TokenizedPositionMinted',
    inputs: [
      {
        name: 'caller',
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
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TokenizedPositionRolled',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
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
        name: 'positionSize',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TransferBatch',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'ids',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      },
      {
        name: 'amounts',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TransferSingle',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
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
    name: 'InvalidUniswapCallback',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotATokenRoll',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotAuthorized',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotEnoughLiquidity',
    inputs: []
  },
  {
    type: 'error',
    name: 'OptionsBalanceZero',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionTooLarge',
    inputs: []
  },
  {
    type: 'error',
    name: 'PriceBoundFail',
    inputs: []
  },
  {
    type: 'error',
    name: 'ReentrantCall',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'TransferFailed',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnderOverFlow',
    inputs: []
  },
  {
    type: 'error',
    name: 'UniswapPoolNotInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnsafeRecipient',
    inputs: []
  }
] as const
