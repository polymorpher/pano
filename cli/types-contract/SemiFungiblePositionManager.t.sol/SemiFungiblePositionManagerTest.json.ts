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
    name: 'testSuccess_afterTokenTransfer_Batch',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'testSuccess_afterTokenTransfer_Single',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_afterTokenTransfer_NotAllLiquidityTransferred',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'transferSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_afterTokenTransfer_RecipientAlreadyOwns',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeeds',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'transferSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_burnTokenizedPosition_ReentrancyLock',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSizeBurnSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_initializeAMMPool_uniswapPoolNotInitialized',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_mintTokenizedPosition_OutsideRangeShortCallLongCallCombinedInsufficientLiq',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'shortRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'longRatio',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_mintTokenizedPosition_PoolNotInitialized',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_mintTokenizedPosition_PriceBoundFail',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'lowerBound',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'upperBound',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_mintTokenizedPosition_ReentrancyLock',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_mintTokenizedPosition_positionSize0',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_rollTokenizedPosition_ReentrancyLock',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeed2',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'strikeSeed2',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_uniswapV3MintCallback_Unauthorized',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_uniswapV3SwapCallback_Unauthorized',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Sanity_ITMSwapApprox',
    inputs: [
      {
        name: 'price',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'itm0',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'itm1',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_burnTokenizedPosition_InRangeShortPutSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSizeBurnSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_burnTokenizedPosition_OutsideRangeShortCall',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSizeBurnSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_burnTokenizedPosition_OutsideRangeShortCallLongCallCombined',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionSizeBurnSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'shortRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'longRatio',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_getAccountPremium_getAccountFeesBase_ShortOnly',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'swapSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_initializeAMMPool_HandleCollisions',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_initializeAMMPool_Multiple',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_initializeAMMPool_Single',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_ITMShortPutLongCallCombinedSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeeds',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'strikeSeeds',
        type: 'int256[2]',
        internalType: 'int256[2]'
      },
      {
        name: 'positionSizeSeed',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_ITMShortPutShortCallCombinedSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeeds',
        type: 'uint256[2]',
        internalType: 'uint256[2]'
      },
      {
        name: 'strikeSeeds',
        type: 'int256[2]',
        internalType: 'int256[2]'
      },
      {
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_InRangeShortCallSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_InRangeShortPutNoSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_InRangeShortPutSwap',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_OutOfRangeShortCallLongCallCombined',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'shortRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'longRatio',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_OutsideRangeShortCall',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_OutsideRangeShortPut',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_PriceBound',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'lowerBound',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'upperBound',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_mintTokenizedPosition_minorPosition',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_premiaSpreadMechanism',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'effectiveLiqRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'swapSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_rollTokenizedPosition_2xOutsideRangeShortCall',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'widthSeed2',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'strikeSeed2',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'positionSizeSeed',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_rollTokenizedPosition_OutsideRangeShortCallPoolChange',
    inputs: [
      {
        name: 'x',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'x2',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'positionSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'twoWaySwap',
    inputs: [
      {
        name: 'swapSize',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updatePositionDataLong',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updatePositionLiqSingleLong',
    inputs: [],
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
  }
] as const