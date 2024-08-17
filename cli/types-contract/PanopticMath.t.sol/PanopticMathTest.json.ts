export default [
  {
    type: 'function',
    name: 'IS_TEST',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'accruePoolFeesInRange',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'posLiq',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'posFees0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'posFees1',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'excludeArtifacts',
    inputs: [],
    outputs: [
      {
        name: 'excludedArtifacts_',
        type: 'string[]',
        internalType: 'string[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'excludeContracts',
    inputs: [],
    outputs: [
      {
        name: 'excludedContracts_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'excludeSenders',
    inputs: [],
    outputs: [
      {
        name: 'excludedSenders_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'failed',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getAboveRangeSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getBelowRangeSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getContext',
    inputs: [
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'strikeOffset',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'minTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'maxTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getITMSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getInRangeSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getMinWidthInRangeSW',
    inputs: [
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getOTMOutOfRangeSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getOTMSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getOutOfRangeSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getValidSW',
    inputs: [
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'ts_',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'pools',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'setUp',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
    name: 'simulateSwap',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
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
        name: 'liquidity',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
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
        name: 'liquidity',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
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
        name: 'liquidity',
        type: 'uint128[2]',
        internalType: 'uint128[2]'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: 'zeroForOne',
        type: 'bool[2]',
        internalType: 'bool[2]'
      },
      {
        name: 'amountSpecified',
        type: 'int256[2]',
        internalType: 'int256[2]'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'amount1',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: 'zeroForOne',
        type: 'bool[2]',
        internalType: 'bool[2]'
      },
      {
        name: 'amountSpecified',
        type: 'int256[2]',
        internalType: 'int256[2]'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'amount1',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
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
        name: 'liquidity',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
      },
      {
        name: 'zeroForOne',
        type: 'bool[2]',
        internalType: 'bool[2]'
      },
      {
        name: 'amountSpecified',
        type: 'int256[2]',
        internalType: 'int256[2]'
      }
    ],
    outputs: [
      {
        name: 'amount0',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'amount1',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwap',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'tickLower',
        type: 'int24[2]',
        internalType: 'int24[2]'
      },
      {
        name: 'tickUpper',
        type: 'int24[2]',
        internalType: 'int24[2]'
      },
      {
        name: 'liquidity',
        type: 'uint128[2]',
        internalType: 'uint128[2]'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwapLong',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'tickLower',
        type: 'int24[2]',
        internalType: 'int24[2]'
      },
      {
        name: 'tickUpper',
        type: 'int24[2]',
        internalType: 'int24[2]'
      },
      {
        name: 'liquidity',
        type: 'int128[2]',
        internalType: 'int128[2]'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'simulateSwapSingleBurn',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'tickLower',
        type: 'int24[]',
        internalType: 'int24[]'
      },
      {
        name: 'tickUpper',
        type: 'int24[]',
        internalType: 'int24[]'
      },
      {
        name: 'liquidity',
        type: 'int128[]',
        internalType: 'int128[]'
      },
      {
        name: 'router',
        type: 'address',
        internalType: 'contract ISwapRouter'
      },
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
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24'
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
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'targetArtifactSelectors',
    inputs: [],
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        type: 'tuple[]',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        components: [
          {
            name: 'addr',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'selectors',
            type: 'bytes4[]',
            internalType: 'bytes4[]'
          }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetArtifacts',
    inputs: [],
    outputs: [
      {
        name: 'targetedArtifacts_',
        type: 'string[]',
        internalType: 'string[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetContracts',
    inputs: [],
    outputs: [
      {
        name: 'targetedContracts_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetSelectors',
    inputs: [],
    outputs: [
      {
        name: 'targetedSelectors_',
        type: 'tuple[]',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        components: [
          {
            name: 'addr',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'selectors',
            type: 'bytes4[]',
            internalType: 'bytes4[]'
          }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'targetSenders',
    inputs: [],
    outputs: [
      {
        name: 'targetedSenders_',
        type: 'address[]',
        internalType: 'address[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX128_Int_CastingError',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX128_Int_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX128_Uint_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX192_Int_CastingError',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX192_Int_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert0to1_PriceX192_Uint_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert1to0_PriceX192_Int_CastingError',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert1to0_PriceX192_Int_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_convert1to0_PriceX192_Uint_overflow',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_calculateIOAmounts_longTokenType0',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_calculateIOAmounts_longTokenType1',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_calculateIOAmounts_shortTokenType0',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_calculateIOAmounts_shortTokenType1',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_computeExercisedAmounts_emptyOldTokenId',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_computeExercisedAmounts_fullOldTokenId',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike2',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert0to1_PriceX128_Int',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert0to1_PriceX128_Uint',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert0to1_PriceX192_Int',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert0to1_PriceX192_Uint',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert1to0_PriceX128_Int',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert1to0_PriceX128_Uint',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert1to0_PriceX192_Int',
    inputs: [
      {
        name: 'amount',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convert1to0_PriceX192_Uint',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertCollateralData_Tick_tokenType0',
    inputs: [
      {
        name: 'atTickSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'balance0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'balance1',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertCollateralData_Tick_tokenType1',
    inputs: [
      {
        name: 'atTickSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'balance0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'balance1',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertCollateralData_sqrtPrice_tokenType0',
    inputs: [
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'balance0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'balance1',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertCollateralData_sqrtPrice_tokenType1',
    inputs: [
      {
        name: 'sqrtPriceSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'balance0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'balance1',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'required1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertNotional_asset0',
    inputs: [
      {
        name: 'tickLower',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'tickUpper',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertNotional_asset0_InvalidNotionalValue',
    inputs: [
      {
        name: 'tickLower',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'tickUpper',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertNotional_asset1',
    inputs: [
      {
        name: 'tickLower',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'tickUpper',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_convertNotional_asset1_InvalidNotionalValue',
    inputs: [
      {
        name: 'tickLower',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'tickUpper',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getAmountsMoved_asset0',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getAmountsMoved_asset1',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getFinalPoolId',
    inputs: [
      {
        name: 'basePoolId',
        type: 'uint64',
        internalType: 'uint64'
      },
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
        name: 'feeSeed',
        type: 'uint8',
        internalType: 'uint8'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getLiquidityChunk_asset0',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getLiquidityChunk_asset1',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionSize',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getPoolId',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_numberOfLeadingHexZeros',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_twapFilter',
    inputs: [
      {
        name: 'twapWindow',
        type: 'uint32',
        internalType: 'uint32'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_updatePositionsHash_add',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'existingHash',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_updatePositionsHash_update',
    inputs: [
      {
        name: 'optionRatio',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'isLong',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'asset',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'tokenType',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'existingHash',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'log',
    inputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_address',
    inputs: [
      {
        name: '',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'int256[]',
        indexed: false,
        internalType: 'int256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_array',
    inputs: [
      {
        name: 'val',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_bytes',
    inputs: [
      {
        name: '',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_bytes32',
    inputs: [
      {
        name: '',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_int',
    inputs: [
      {
        name: '',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_address',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256[]',
        indexed: false,
        internalType: 'uint256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256[]',
        indexed: false,
        internalType: 'int256[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_array',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'address[]',
        indexed: false,
        internalType: 'address[]'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_bytes',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_bytes32',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_decimal_int',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'decimals',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_decimal_uint',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'decimals',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_int',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_string',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_named_uint',
    inputs: [
      {
        name: 'key',
        type: 'string',
        indexed: false,
        internalType: 'string'
      },
      {
        name: 'val',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_string',
    inputs: [
      {
        name: '',
        type: 'string',
        indexed: false,
        internalType: 'string'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'log_uint',
    inputs: [
      {
        name: '',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'logs',
    inputs: [
      {
        name: '',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes'
      }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'CastingError',
    inputs: []
  },
  {
    type: 'error',
    name: 'T',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnderOverFlow',
    inputs: []
  }
] as const
