export default [
  {
    type: 'function',
    name: 'collectProtocol',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
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
    name: 'setFeeProtocol',
    inputs: [
      {
        name: 'feeProtocol0',
        type: 'uint8',
        internalType: 'uint8'
      },
      {
        name: 'feeProtocol1',
        type: 'uint8',
        internalType: 'uint8'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const
