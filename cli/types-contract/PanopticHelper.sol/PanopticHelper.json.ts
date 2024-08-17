export default [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_SFPM',
        type: 'address',
        internalType: 'contract SemiFungiblePositionManager'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'checkCollateral',
    inputs: [
      {
        name: 'pool',
        type: 'address',
        internalType: 'contract PanopticPool'
      },
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'atTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tokenType',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
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
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createBATS',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createBigLizard',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'straddleStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createCallCalendarSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'widthLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createCallDiagonalSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'widthLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createCallRatioSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createCallSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createCallZEBRASpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createIronButterfly',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'wingWidth',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createIronCondor',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'callStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'putStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'wingWidth',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createJadeLizard',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortPutStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createPutCalendarSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'widthLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createPutDiagonalSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'widthLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'widthShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createPutRatioSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createPutSpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeLong',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strikeShort',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createPutZEBRASpread',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createStraddle',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLong',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createStrangle',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'callStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'putStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'isLong',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'start',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createSuperBear',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longPutStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortPutStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createSuperBull',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortCallStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortPutStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'createZEEHBS',
    inputs: [
      {
        name: 'univ3pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'longStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'shortStrike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'ratio',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'findLiquidationPriceDown',
    inputs: [
      {
        name: 'pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [
      {
        name: 'liquidationTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'findLiquidationPriceUp',
    inputs: [
      {
        name: 'pool',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'positionIdList',
        type: 'uint256[]',
        internalType: 'uint256[]'
      }
    ],
    outputs: [
      {
        name: 'liquidationTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'unwrapTokenId',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct PanopticHelper.Leg[]',
        components: [
          {
            name: 'poolId',
            type: 'uint64',
            internalType: 'uint64'
          },
          {
            name: 'UniswapV3Pool',
            type: 'address',
            internalType: 'address'
          },
          {
            name: 'asset',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'optionRatio',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'tokenType',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'isLong',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'riskPartner',
            type: 'uint256',
            internalType: 'uint256'
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
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'error',
    name: 'InvalidTick',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTokenIdParameter',
    inputs: [
      {
        name: 'parameterType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ]
  }
] as const
