export default [
  {
    type: 'function',
    name: 'burn',
    inputs: [
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
        name: 'amount0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'collect',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
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
        name: 'amount0Requested',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'amount1Requested',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'amount1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'flash',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'amount0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1',
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
    name: 'increaseObservationCardinalityNext',
    inputs: [
      {
        name: 'observationCardinalityNext',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
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
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'swap',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'zeroForOne',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: 'amountSpecified',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceLimitX96',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount1',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'nonpayable'
  }
] as const
