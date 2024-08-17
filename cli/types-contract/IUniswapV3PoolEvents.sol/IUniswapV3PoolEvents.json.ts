export default [
  {
    type: 'event',
    name: 'Burn',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Collect',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'amount0',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'amount1',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'CollectProtocol',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount0',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'amount1',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Flash',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'paid0',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'paid1',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'IncreaseObservationCardinalityNext',
    inputs: [
      {
        name: 'observationCardinalityNextOld',
        type: 'uint16',
        indexed: false,
        internalType: 'uint16'
      },
      {
        name: 'observationCardinalityNextNew',
        type: 'uint16',
        indexed: false,
        internalType: 'uint16'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Initialize',
    inputs: [
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        indexed: false,
        internalType: 'uint160'
      },
      {
        name: 'tick',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Mint',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: false,
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: true,
        internalType: 'int24'
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'amount0',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'SetFeeProtocol',
    inputs: [
      {
        name: 'feeProtocol0Old',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8'
      },
      {
        name: 'feeProtocol1Old',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8'
      },
      {
        name: 'feeProtocol0New',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8'
      },
      {
        name: 'feeProtocol1New',
        type: 'uint8',
        indexed: false,
        internalType: 'uint8'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Swap',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount0',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'amount1',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        indexed: false,
        internalType: 'uint160'
      },
      {
        name: 'liquidity',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128'
      },
      {
        name: 'tick',
        type: 'int24',
        indexed: false,
        internalType: 'int24'
      }
    ],
    anonymous: false
  }
] as const
