export default [
  {
    type: 'function',
    name: 'feeGrowthGlobal0X128',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'feeGrowthGlobal1X128',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'liquidity',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'observations',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'blockTimestamp',
        type: 'uint32',
        internalType: 'uint32'
      },
      {
        name: 'tickCumulative',
        type: 'int56',
        internalType: 'int56'
      },
      {
        name: 'secondsPerLiquidityCumulativeX128',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'initialized',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'positions',
    inputs: [
      {
        name: 'key',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [
      {
        name: 'liquidity',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tokensOwed0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'tokensOwed1',
        type: 'uint128',
        internalType: 'uint128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'protocolFees',
    inputs: [],
    outputs: [
      {
        name: 'token0',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'token1',
        type: 'uint128',
        internalType: 'uint128'
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
    name: 'tickBitmap',
    inputs: [
      {
        name: 'wordPosition',
        type: 'int16',
        internalType: 'int16'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ticks',
    inputs: [
      {
        name: 'tick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'liquidityGross',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'liquidityNet',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickCumulativeOutside',
        type: 'int56',
        internalType: 'int56'
      },
      {
        name: 'secondsPerLiquidityOutsideX128',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'secondsOutside',
        type: 'uint32',
        internalType: 'uint32'
      },
      {
        name: 'initialized',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    stateMutability: 'view'
  }
] as const
