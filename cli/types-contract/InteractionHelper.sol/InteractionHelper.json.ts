export default [
  {
    type: 'function',
    name: 'computeDecimals',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'computeName',
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
        name: 'isToken0',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: 'prefix',
        type: 'string',
        internalType: 'string'
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
    type: 'function',
    name: 'computeSymbol',
    inputs: [
      {
        name: 'token',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'prefix',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [
      {
        name: '_symbol',
        type: 'string',
        internalType: 'string'
      }
    ],
    stateMutability: 'view'
  }
] as const
