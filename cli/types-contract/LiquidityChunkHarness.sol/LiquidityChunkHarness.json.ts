export default [
  {
    type: 'function',
    name: 'BITMASK_INT24',
    inputs: [],
    outputs: [
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
    name: 'addLiquidity',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
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
    name: 'addTickLower',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickLower',
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'addTickUpper',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
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
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'copyTickRange',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'from',
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'createChunk',
    inputs: [
      {
        name: 'self',
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
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
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
    name: 'liquidity',
    inputs: [
      {
        name: 'self',
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'tickLower',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'tickUpper',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'updateTickLower',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickLower',
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
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'updateTickUpper',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
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
      }
    ],
    stateMutability: 'pure'
  }
] as const
