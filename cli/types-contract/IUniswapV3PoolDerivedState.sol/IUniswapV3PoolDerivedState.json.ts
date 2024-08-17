export default [
  {
    type: 'function',
    name: 'observe',
    inputs: [
      {
        name: 'secondsAgos',
        type: 'uint32[]',
        internalType: 'uint32[]'
      }
    ],
    outputs: [
      {
        name: 'tickCumulatives',
        type: 'int56[]',
        internalType: 'int56[]'
      },
      {
        name: 'secondsPerLiquidityCumulativeX128s',
        type: 'uint160[]',
        internalType: 'uint160[]'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'snapshotCumulativesInside',
    inputs: [
      {
        name: 'tickLower',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickUpper',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'tickCumulativeInside',
        type: 'int56',
        internalType: 'int56'
      },
      {
        name: 'secondsPerLiquidityInsideX128',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'secondsInside',
        type: 'uint32',
        internalType: 'uint32'
      }
    ],
    stateMutability: 'view'
  }
] as const
