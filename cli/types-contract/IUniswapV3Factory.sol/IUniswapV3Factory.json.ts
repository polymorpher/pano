export default [
  {
    type: 'function',
    name: 'createPool',
    inputs: [
      {
        name: 'tokenA',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenB',
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
        name: 'pool',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'enableFeeAmount',
    inputs: [
      {
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'feeAmountTickSpacing',
    inputs: [
      {
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPool',
    inputs: [
      {
        name: 'tokenA',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'tokenB',
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
        name: 'pool',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'owner',
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
    name: 'setOwner',
    inputs: [
      {
        name: '_owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'FeeAmountEnabled',
    inputs: [
      {
        name: 'fee',
        type: 'uint24',
        indexed: true,
        internalType: 'uint24'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
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
    name: 'PoolCreated',
    inputs: [
      {
        name: 'token0',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'token1',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'fee',
        type: 'uint24',
        indexed: true,
        internalType: 'uint24'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      },
      {
        name: 'pool',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  }
] as const
