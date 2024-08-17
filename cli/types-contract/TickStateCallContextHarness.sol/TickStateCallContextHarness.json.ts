export default [
  {
    type: 'function',
    name: 'addCaller',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '_msgSender',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'addCurrentTick',
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
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'addMedianTick',
    inputs: [
      {
        name: 'self',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: 'medianTick',
        type: 'int24',
        internalType: 'int24'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'caller',
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
        type: 'address',
        internalType: 'address'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'currentTick',
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
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'medianTick',
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
        type: 'int24',
        internalType: 'int24'
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'updateCurrentTick',
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
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    stateMutability: 'pure'
  }
] as const
