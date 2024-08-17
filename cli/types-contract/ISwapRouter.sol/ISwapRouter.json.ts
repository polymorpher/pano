export default [
  {
    type: 'function',
    name: 'exactInput',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct ISwapRouter.ExactInputParams',
        components: [
          {
            name: 'path',
            type: 'bytes',
            internalType: 'bytes'
          },
          {
            name: 'recipient',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountOutMinimum',
            type: 'uint256',
            internalType: 'uint256'
          }
        ]
      }
    ],
    outputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'exactInputSingle',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        components: [
          {
            name: 'tokenIn',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'tokenOut',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'fee',
            type: 'uint24',
            internalType: 'uint24'
          },
          {
            name: 'recipient',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountOutMinimum',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'sqrtPriceLimitX96',
            type: 'uint160',
            internalType: 'uint160'
          }
        ]
      }
    ],
    outputs: [
      {
        name: 'amountOut',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'exactOutput',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct ISwapRouter.ExactOutputParams',
        components: [
          {
            name: 'path',
            type: 'bytes',
            internalType: 'bytes'
          },
          {
            name: 'recipient',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountInMaximum',
            type: 'uint256',
            internalType: 'uint256'
          }
        ]
      }
    ],
    outputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'exactOutputSingle',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct ISwapRouter.ExactOutputSingleParams',
        components: [
          {
            name: 'tokenIn',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'tokenOut',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'fee',
            type: 'uint24',
            internalType: 'uint24'
          },
          {
            name: 'recipient',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'deadline',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountOut',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'amountInMaximum',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'sqrtPriceLimitX96',
            type: 'uint160',
            internalType: 'uint160'
          }
        ]
      }
    ],
    outputs: [
      {
        name: 'amountIn',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'payable'
  },
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
