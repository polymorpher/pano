export default [
  {
    type: 'function',
    name: 'uniswapV3SwapCallback',
    inputs: [
      {
        name: 'amount0Delta',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount1Delta',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const
