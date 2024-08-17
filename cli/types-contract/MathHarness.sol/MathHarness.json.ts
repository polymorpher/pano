export default [
  {
    type: 'function',
    name: 'abs',
    inputs: [
      {
        name: 'x',
        type: 'int256',
        internalType: 'int256'
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
    name: 'getAmount0ForLiquidity',
    inputs: [
      {
        name: 'a',
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
    name: 'getAmount1ForLiquidity',
    inputs: [
      {
        name: 'a',
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
    name: 'getAmountsForLiquidity',
    inputs: [
      {
        name: 't',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'a',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'getLiquidityForAmount0',
    inputs: [
      {
        name: 'c',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'a0',
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
    name: 'getLiquidityForAmount1',
    inputs: [
      {
        name: 'c',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'a1',
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
    name: 'getSqrtRatioAtTick',
    inputs: [
      {
        name: 'a',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'max24',
    inputs: [
      {
        name: 'a',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'b',
        type: 'int24',
        internalType: 'int24'
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
    name: 'min24',
    inputs: [
      {
        name: 'a',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'b',
        type: 'int24',
        internalType: 'int24'
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
    name: 'mulDiv128',
    inputs: [
      {
        name: 'a',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'b',
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
    name: 'mulDiv192',
    inputs: [
      {
        name: 'a',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'b',
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
    name: 'mulDiv64',
    inputs: [
      {
        name: 'a',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'b',
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
    name: 'mulDiv96',
    inputs: [
      {
        name: 'a',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'b',
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
    name: 'sort',
    inputs: [
      {
        name: 'data',
        type: 'int24[]',
        internalType: 'int24[]'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int24[]',
        internalType: 'int24[]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'toInt128',
    inputs: [
      {
        name: 'toCast',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'toUint128',
    inputs: [
      {
        name: 'toDowncast',
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
    type: 'error',
    name: 'CastingError',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTick',
    inputs: []
  }
] as const
