export default [
  {
    type: 'function',
    name: 'getPool',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'uint24',
        internalType: 'uint24'
      }
    ],
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
    name: 'increment',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const
