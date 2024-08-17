export default [
  {
    type: 'fallback',
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'construct',
    inputs: [
      {
        name: '_slot0',
        type: 'tuple',
        internalType: 'struct ReenterMint.Slot0',
        components: [
          {
            name: 'sqrtPriceX96',
            type: 'uint160',
            internalType: 'uint160'
          },
          {
            name: 'tick',
            type: 'int24',
            internalType: 'int24'
          },
          {
            name: 'observationIndex',
            type: 'uint16',
            internalType: 'uint16'
          },
          {
            name: 'observationCardinality',
            type: 'uint16',
            internalType: 'uint16'
          },
          {
            name: 'observationCardinalityNext',
            type: 'uint16',
            internalType: 'uint16'
          },
          {
            name: 'feeProtocol',
            type: 'uint8',
            internalType: 'uint8'
          },
          {
            name: 'unlocked',
            type: 'bool',
            internalType: 'bool'
          }
        ]
      },
      {
        name: '_token0',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '_token1',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '_fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: '_tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'fee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint24',
        internalType: 'uint24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'slot0',
    inputs: [],
    outputs: [
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'tick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'observationIndex',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'observationCardinality',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'observationCardinalityNext',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'feeProtocol',
        type: 'uint8',
        internalType: 'uint8'
      },
      {
        name: 'unlocked',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'tickSpacing',
    inputs: [],
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
    name: 'token0',
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
    name: 'token1',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'view'
  }
] as const
