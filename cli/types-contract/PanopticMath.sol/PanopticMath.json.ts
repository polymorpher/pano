export default [
  {
    type: 'function',
    name: 'numberOfLeadingHexZeros',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address'
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
    name: 'twapFilter',
    inputs: [
      {
        name: 'univ3pool',
        type: 'IUniswapV3Pool',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'twapWindow',
        type: 'uint32',
        internalType: 'uint32'
      }
    ],
    outputs: [
      {
        name: 'twapTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  }
] as const
