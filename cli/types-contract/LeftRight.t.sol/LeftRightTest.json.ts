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
    name: 'setUp',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
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
    name: 'test_Fail_DivInts',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_toRightSlot',
    inputs: [
      {
        name: 'right',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddInts',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'z',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'u',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'v',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddUintInt',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'u',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'v',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddUints',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'u',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'v',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_BothSlots_int256',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'z',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_BothSlots_int256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_BothSlots_uint256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_DivInts',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'z',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'u',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'v',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_DivUints',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'u',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'v',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_LeftSlot_Int128_In_Int256',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_LeftSlot_Uint128_In_Int256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_LeftSlot_Uint128_In_Uint256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_MulInts',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'z',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'u',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'v',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_MulUints',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'u',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'v',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_RightSlot_Int128_In_Int256',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_RightSlot_Uint128_In_Int256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_RightSlot_Uint128_In_Uint256',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_SubInts',
    inputs: [
      {
        name: 'y',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'z',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'u',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'v',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_SubUints',
    inputs: [
      {
        name: 'y',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'z',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'u',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'v',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_ToInt128',
    inputs: [
      {
        name: 'x',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_ToInt256',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_ToUint128',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
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
  }
] as const
