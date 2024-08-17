export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_WETH9',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '_SFPM',
        type: 'address',
        internalType: 'contract SemiFungiblePositionManager'
      },
      {
        name: '_univ3Factory',
        type: 'address',
        internalType: 'contract IUniswapV3Factory'
      },
      {
        name: '_poolReference',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '_collateralReference',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'nonpayable'
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
        name: 'id',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'balanceOfBatch',
    inputs: [
      {
        name: 'accounts',
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
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'deployNewPool',
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
      },
      {
        name: 'salt',
        type: 'uint96',
        internalType: 'uint96'
      }
    ],
    outputs: [
      {
        name: 'newPoolContract',
        type: 'address',
        internalType: 'contract PanopticPool'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'factoryOwner',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPanopticPool',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract PanopticPool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: 'account',
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
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'minePoolAddress',
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
      },
      {
        name: 'salt',
        type: 'uint96',
        internalType: 'uint96'
      },
      {
        name: 'deployer',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'loops',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'minTargetRarity',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'bestSalt',
        type: 'uint96',
        internalType: 'uint96'
      },
      {
        name: 'highestRarity',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
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
    name: 'setOwner',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address'
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
    name: 'uri',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'account',
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
    name: 'OwnerChanged',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'PoolDeployed',
    inputs: [
      {
        name: 'poolAddress',
        type: 'address',
        indexed: true,
        internalType: 'contract PanopticPool'
      },
      {
        name: 'uniswapPool',
        type: 'address',
        indexed: true,
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'collateralTracker0',
        type: 'address',
        indexed: false,
        internalType: 'contract CollateralTracker'
      },
      {
        name: 'collateralTracker1',
        type: 'address',
        indexed: false,
        internalType: 'contract CollateralTracker'
      },
      {
        name: 'rareNftId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'rarity',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
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
        name: 'values',
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
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'URI',
    inputs: [
      {
        name: 'value',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'InvalidUniswapCallback',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotOwner',
    inputs: []
  },
  {
    type: 'error',
    name: 'PoolAlreadyInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'TransferFailed',
    inputs: []
  },
  {
    type: 'error',
    name: 'UniswapPoolNotInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'UniswapPoolNotSupported',
    inputs: []
  }
] as const
