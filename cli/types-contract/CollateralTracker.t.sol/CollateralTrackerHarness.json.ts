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
    name: '_availableAssets',
    inputs: [],
    outputs: [
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
    name: '_inAMM',
    inputs: [],
    outputs: [
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
    name: '_totalAssets',
    inputs: [],
    outputs: [
      {
        name: 'totalManagedAssets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
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
    name: 'allowance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'spender',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'allowance',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'amount',
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
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
        name: 'uniPool',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'asset',
    inputs: [],
    outputs: [
      {
        name: 'assetTokenAddress',
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'burnLiquidity',
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
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
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
    name: 'buyCollateralRatio',
    inputs: [
      {
        name: 'utilization',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'collect',
    inputs: [
      {
        name: 'uniPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'amount0',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1',
        type: 'uint256',
        internalType: 'uint256'
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
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'computeBonus',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'positionBalanceArray',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      },
      {
        name: 'otherTokenData',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'twapTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160'
      },
      {
        name: 'premium',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [
      {
        name: 'bonusAmounts',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'tokenData',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'convertToAssets',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'convertToShares',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'delegate',
    inputs: [
      {
        name: 'delegator',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
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
    name: 'exercise',
    inputs: [
      {
        name: 'optionOwner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'longAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'shortAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'swappedAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'currentPositionPremium',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [
      {
        name: 'realizedPremium',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'exerciseCost',
    inputs: [
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'medianTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionId',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'positionBalance',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'longAmounts',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [
      {
        name: 'exerciseFees',
        type: 'int256',
        internalType: 'int256'
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
    name: 'getAccountMarginDetails',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionBalanceArray',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      },
      {
        name: 'premiumAllPositions',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [
      {
        name: 'tokenData',
        type: 'uint256',
        internalType: 'uint256'
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
    name: 'getPoolData',
    inputs: [],
    outputs: [
      {
        name: 'poolAssets',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'insideAMM',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'currentPoolUtilization',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getRefundAmounts',
    inputs: [
      {
        name: 'refunder',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'refundValues',
        type: 'int256',
        internalType: 'int256'
      },
      {
        name: 'atTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'collateralToken1',
        type: 'address',
        internalType: 'contract CollateralTracker'
      }
    ],
    outputs: [
      {
        name: 'refundAmounts',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getRequiredCollateralAtUtilization',
    inputs: [
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'isLong',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'utilization',
        type: 'int64',
        internalType: 'int64'
      }
    ],
    outputs: [
      {
        name: 'required',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getSystemParameters',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getTotalRequiredCollateral',
    inputs: [
      {
        name: 'currentTick',
        type: 'int24',
        internalType: 'int24'
      },
      {
        name: 'positionBalanceArray',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      }
    ],
    outputs: [
      {
        name: 'tokenRequired',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
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
    name: 'initalized',
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
    name: 'maxDeposit',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'maxAssets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'maxMint',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'maxShares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'maxRedeem',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'maxShares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'maxWithdraw',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'maxAssets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'mintLiquidity',
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
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128'
      },
      {
        name: 'payer',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        name: 'data',
        type: 'bytes[]',
        internalType: 'bytes[]'
      }
    ],
    outputs: [
      {
        name: 'results',
        type: 'bytes[]',
        internalType: 'bytes[]'
      }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: 'name',
        type: 'string',
        internalType: 'string'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'panopticPool',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract PanopticPool'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'poolUtilizationHook',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'previewDeposit',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'previewMint',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'previewRedeem',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'previewWithdraw',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'redeem',
    inputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'refund',
    inputs: [
      {
        name: 'refunder',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'refundee',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'int256',
        internalType: 'int256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'revoke',
    inputs: [
      {
        name: 'delegator',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'sellCollateralRatio',
    inputs: [
      {
        name: 'utilization',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'setBalance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setInAMM',
    inputs: [
      {
        name: 'amount',
        type: 'int128',
        internalType: 'int128'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'setPoolAssets',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
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
    name: 'startToken',
    inputs: [
      {
        name: 'underlyingToken',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'uniswapPool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool'
      },
      {
        name: 'panopticPool',
        type: 'address',
        internalType: 'contract PanopticPool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: 'symbol',
        type: 'string',
        internalType: 'string'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'takeCommissionAddData',
    inputs: [
      {
        name: 'environmentContext',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'longAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'shortAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'portfolioPremium',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'oldPositionPremia',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'swappedAmount',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'positionBalanceArray',
        type: 'uint256[2][]',
        internalType: 'uint256[2][]'
      }
    ],
    outputs: [
      {
        name: 'utilization',
        type: 'int128',
        internalType: 'int128'
      },
      {
        name: 'tokenData',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'realizedPremium',
        type: 'int128',
        internalType: 'int128'
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
    name: 'totalAssets',
    inputs: [],
    outputs: [
      {
        name: 'totalManagedAssets',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'totalSupply',
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
    name: 'transfer',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'amount',
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'amount',
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'underlyingIsToken0',
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
    name: 'uniswapV3MintCallback',
    inputs: [
      {
        name: 'amount0Owed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'amount1Owed',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
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
  },
  {
    type: 'function',
    name: 'updateParameters',
    inputs: [
      {
        name: 'newParameters',
        type: 'tuple',
        internalType: 'struct CollateralTracker.Parameters',
        components: [
          {
            name: 'maintenanceMarginRatio',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'commissionFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'ITMSpreadFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'sellCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'buyCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'targetPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'saturatedPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'exerciseCost',
            type: 'int128',
            internalType: 'int128'
          }
        ]
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      {
        name: 'assets',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'shares',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'ParametersUpdated',
    inputs: [
      {
        name: 'newParameters',
        type: 'tuple',
        indexed: false,
        internalType: 'struct CollateralTracker.Parameters',
        components: [
          {
            name: 'maintenanceMarginRatio',
            type: 'uint256',
            internalType: 'uint256'
          },
          {
            name: 'commissionFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'ITMSpreadFee',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'sellCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'buyCollateralRatio',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'targetPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'saturatedPoolUtilization',
            type: 'int128',
            internalType: 'int128'
          },
          {
            name: 'exerciseCost',
            type: 'int128',
            internalType: 'int128'
          }
        ]
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Withdraw',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
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
    name: 'CollateralTokenAlreadyInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'DepositTooLarge',
    inputs: []
  },
  {
    type: 'error',
    name: 'ExceedsMaximumRedemption',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidNotionalValue',
    inputs: []
  },
  {
    type: 'error',
    name: 'InvalidTick',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotMarginCalled',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotOwner',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotPanopticPool',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionCountNotZero',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'TransferFailed',
    inputs: []
  },
  {
    type: 'error',
    name: 'UnderOverFlow',
    inputs: []
  }
] as const
