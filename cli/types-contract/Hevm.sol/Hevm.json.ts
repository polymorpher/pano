export default [
  {
    type: 'function',
    name: 'accesses',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'reads',
        type: 'bytes32[]',
        internalType: 'bytes32[]'
      },
      {
        name: 'writes',
        type: 'bytes32[]',
        internalType: 'bytes32[]'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'addr',
    inputs: [
      {
        name: '',
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
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'assume',
    inputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'clearMockedCalls',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'deal',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'etch',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'expectCall',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'expectEmit',
    inputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      },
      {
        name: '',
        type: 'bool',
        internalType: 'bool'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'expectRevert',
    inputs: [
      {
        name: '',
        type: 'bytes4',
        internalType: 'bytes4'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'expectRevert',
    inputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'fee',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'ffi',
    inputs: [
      {
        name: '',
        type: 'string[]',
        internalType: 'string[]'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'getCode',
    inputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'label',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address'
      },
      {
        name: 'label',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'load',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'mockCall',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      },
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'prank',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'prank',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'record',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'roll',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'sign',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'startPrank',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'startPrank',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'stopPrank',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'store',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      },
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'warp',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const