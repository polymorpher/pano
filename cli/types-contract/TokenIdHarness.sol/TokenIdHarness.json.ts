export default [
  {
    type: 'function',
    name: 'BITMASK_INT24',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'CLEAR_POOLID_MASK',
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
    name: 'LONG_MASK',
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
    name: 'MAX_LEG_WIDTH',
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
    name: 'OPTION_RATIO_MASK',
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
    name: 'RISK_PARTNER_MASK',
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
    name: 'ROLL_MASK',
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
    name: 'addAsset',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addIsLong',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_isLong',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addLeg',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_asset',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_isLong',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_tokenType',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_riskPartner',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: '_width',
        type: 'int24',
        internalType: 'int24'
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
    name: 'addOptionRatio',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_optionRatio',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addRiskPartner',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_riskPartner',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addStrike',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_strike',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addTokenType',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_tokenType',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'addUniv3pool',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_poolId',
        type: 'uint64',
        internalType: 'uint64'
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
    name: 'addWidth',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_width',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'asTicks',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: 'legLowerTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'legUpperTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'asset',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'clearLeg',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'i',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'constructRollTokenIdWith',
    inputs: [
      {
        name: 'oldTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'newTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'burnTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'mintTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'countLegs',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'countLongs',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'ensureIsOTM',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'flipToBurnToken',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'isLong',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'optionRatio',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'riskPartner',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'rollTokenInfo',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'other',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'src',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'dst',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'rolledTokenIsValid',
    inputs: [
      {
        name: 'oldTokenId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'newTokenId',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
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
    name: 'strike',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
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
    name: 'tokenType',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'univ3pool',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'validate',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'univ3PoolAddressId',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'validateIsExercisable',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'width',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'legIndex',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
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
    type: 'error',
    name: 'InvalidTokenIdParameter',
    inputs: [
      {
        name: 'parameterType',
        type: 'uint256',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'error',
    name: 'NoLegsExercisable',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotATokenRoll',
    inputs: []
  },
  {
    type: 'error',
    name: 'OptionsNotOTM',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  }
] as const
