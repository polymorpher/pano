import { type Options } from 'yargs'
import type { CommandKeys } from './commands.tsx'

export type OptionKey =
  | 'network'
  | 'rpc'
  | 'chainId'
  | 'uniswapFactory'
  | 'panopticFactory'
  | 'panopticHelper'
  | 'pk'
  | 'db'
  | PortfolioOptionKey

const options: Record<OptionKey, Options> = {
  network: {
    alias: 'n',
    type: 'string',
    default: 'local',
    describe:
      "The network you want to use, which provides a set of default values for RPC, chain id, and contract addresses, so you don't need to specify them one by one\n" +
      '  - local (forked ETH mainnet): RPC=http://localhost:8545 chainId=1\n' +
      '  - anvil: RPC=http://localhost:8545 chainId=31337\n' +
      '  - harmony: RPC=https://api.harmony.one chainId=1666600000\n'
  },
  rpc: {
    alias: 'r',
    type: 'string',
    describe:
      'RPC server for the blockchain, to override network default value\n'
  },
  chainId: {
    alias: 'c',
    type: 'number',
    describe: 'Chain ID for the blockchain, to override network default value\n'
  },
  uniswapFactory: {
    type: 'string',
    describe: 'Uniswap V3 Factory Contract Address\n'
  },
  panopticFactory: {
    type: 'string',
    describe: 'Panoptic Factory Contract Address\n'
  },
  panopticHelper: {
    type: 'string',
    describe: 'Panoptic Helper Contract Address\n'
  },
  pk: {
    type: 'string',
    describe: 'The private key of the wallet you want to preload\n'
  },
  db: {
    type: 'string',
    describe: 'Path to local database folder\n'
  }
}

type PortfolioOptionKey = 'sync' | 'duration'

export const commandOptions: Partial<
  Record<CommandKeys, Record<string, Options>>
> = {
  portfolio: {
    sync: {
      alias: 's',
      type: 'boolean',
      describe: 'Sync positions on chain'
    },
    duration: {
      alias: 'd',
      type: 'string',
      describe:
        'Time duration to scan for back (e.g. 10s, 5h, 3d, 1m, ... or in number of blocks, e.g. 1024)',
      default: '3d'
    }
  }
}

export default options
