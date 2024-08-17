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
    name: 'test_Fail_asTicks_TicksNotInitializable',
    inputs: [
      {
        name: 'width',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_asTicks_aboveMinTick',
    inputs: [
      {
        name: 'width',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_asTicks_belowMinTick',
    inputs: [
      {
        name: 'width',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_constructRollTokenIdWith',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_ensureIsOTM_optionsNotOTM',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validateIsExercisable_inRange',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validateIsExercisable_shortPos',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_emptyLegIndexZero',
    inputs: [
      {
        name: 'poolId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidPartnerAsset',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidPartnerRatio',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidRiskPartner',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidStrikeMax',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidStrikeMin',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_invalidWidth',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_legsWithGaps',
    inputs: [
      {
        name: 'indexToClear',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_riskRegularPos',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Fail_validate_synthPos',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddAsset',
    inputs: [
      {
        name: 'y',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'z',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'u',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'v',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddIsLong',
    inputs: [
      {
        name: 'y',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'z',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'u',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'v',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddLeg',
    inputs: [
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
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
        name: 'riskPartner',
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
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddOptionRatio',
    inputs: [
      {
        name: 'y',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'z',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'u',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'v',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddRiskPartner',
    inputs: [
      {
        name: 'y',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'z',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'u',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'v',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddStrike',
    inputs: [
      {
        name: 'y',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'z',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'u',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'v',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddTokenType',
    inputs: [
      {
        name: 'y',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'z',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'u',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'v',
        type: 'uint16',
        internalType: 'uint16'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddUniv3Pool',
    inputs: [
      {
        name: 'y',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_AddWidth',
    inputs: [
      {
        name: 'y',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'z',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'u',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'v',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_asTicks_normalTickRange',
    inputs: [
      {
        name: 'width',
        type: 'uint16',
        internalType: 'uint16'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_clearLeg_Four',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_clearLeg_Null',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_clearLeg_One',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_clearLeg_Three',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_clearLeg_Two',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_constructRollTokenIdWith',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLegs_emptyLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLegs_fourLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLegs_oneLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLegs_threeLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLegs_twoLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_countLongs',
    inputs: [
      {
        name: 'totalLegs',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_ensureIsOTM',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_flipToBurnToken_OneLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_flipToBurnToken_emptyLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_flipToBurnToken_fourLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_flipToBurnToken_threeLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_flipToBurnToken_twoLegs',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_rollTokenInfo',
    inputs: [
      {
        name: 'src',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'dst',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_rolledTokenIsValid',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_validate',
    inputs: [
      {
        name: 'totalLegs',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_validateIsExercisable_aboveTick',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'test_Success_validateIsExercisable_belowTick',
    inputs: [
      {
        name: 'poolId',
        type: 'uint64',
        internalType: 'uint64'
      },
      {
        name: 'optionRatioSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'assetSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLongSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokenTypeSeed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'strikeSeed',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthSeed',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'poolStatusSeed',
        type: 'int24',
        internalType: 'int24'
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
  }
] as const
