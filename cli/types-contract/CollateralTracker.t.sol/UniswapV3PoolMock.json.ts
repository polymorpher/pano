export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'nonpayable'
  },
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
    name: 'setGlobal',
    inputs: [
      {
        name: '_feeGrowthGlobal0X128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_feeGrowthGlobal1X128',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setInfo',
    inputs: [
      {
        name: 'tick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: '_feeGrowthOutside0X128',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_feeGrowthOutside1X128',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setSlot0',
    inputs: [
      {
        name: '_tick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
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
    name: 'tickSpacing',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ticks',
    inputs: [
      {
        name: '',
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
  },
  {
    type: 'error',
    name: 'T',
    inputs: []
  }
] as const
