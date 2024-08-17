export default [
  {
    type: 'error',
    name: 'BurnedTokenIdNotLastIndex',
    inputs: []
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
    name: 'EffectiveLiquidityAboveThreshold',
    inputs: []
  },
  {
    type: 'error',
    name: 'ExceedsMaximumRedemption',
    inputs: []
  },
  {
    type: 'error',
    name: 'InputListFail',
    inputs: []
  },
  {
    type: 'error',
    name: 'InsufficientCollateralDecrease',
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
    name: 'InvalidUniswapCallback',
    inputs: []
  },
  {
    type: 'error',
    name: 'LeftRightInputError',
    inputs: []
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
    name: 'NotEnoughCollateral',
    inputs: []
  },
  {
    type: 'error',
    name: 'NotEnoughLiquidity',
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
    name: 'OptionsBalanceZero',
    inputs: []
  },
  {
    type: 'error',
    name: 'OptionsNotOTM',
    inputs: []
  },
  {
    type: 'error',
    name: 'PoolAlreadyInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionAlreadyMinted',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionCountNotZero',
    inputs: []
  },
  {
    type: 'error',
    name: 'PositionTooLarge',
    inputs: []
  },
  {
    type: 'error',
    name: 'PriceBoundFail',
    inputs: []
  },
  {
    type: 'error',
    name: 'ReentrantCall',
    inputs: []
  },
  {
    type: 'error',
    name: 'TicksNotInitializable',
    inputs: []
  },
  {
    type: 'error',
    name: 'TooManyPositionsOpen',
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
  },
  {
    type: 'error',
    name: 'UniswapPoolNotInitialized',
    inputs: []
  },
  {
    type: 'error',
    name: 'UniswapPoolNotSupported',
    inputs: []
  }
] as const
