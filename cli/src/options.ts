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
  | DepositOptionKey
  | SellOptionKey
  | BuyOptionKey

const options: Record<OptionKey, Options> = {
  network: {
    alias: 'n',
    type: 'string',
    default: 'local',
    describe:
      "The network you want to use, which provides a set of default values for RPC, chain id, and contract addresses, so you don't need to specify them one by one\n" +
      '  - local (forked ETH mainnet): RPC=http://localhost:8545 chainId=1\n' +
      '  - anvil: RPC=http://localhost:8545 chainId=31337\n' +
      '  - harmony: RPC=https://api.harmony.one chainId=1666600000'
  },
  rpc: {
    alias: 'r',
    type: 'string',
    describe: 'RPC server for the blockchain, to override network default value'
  },
  chainId: {
    alias: 'c',
    type: 'number',
    describe: 'Chain ID for the blockchain, to override network default value'
  },
  uniswapFactory: {
    type: 'string',
    describe: 'Uniswap V3 Factory Contract Address'
  },
  panopticFactory: {
    type: 'string',
    describe: 'Panoptic Factory Contract Address'
  },
  panopticHelper: {
    type: 'string',
    describe: 'Panoptic Helper Contract Address'
  },
  pk: {
    type: 'string',
    describe: 'The private key of the wallet you want to preload'
  },
  db: {
    type: 'string',
    describe: 'Path to local database folder'
  }
}

type PortfolioOptionKey = 'sync' | 'duration'

type DepositOptionKey = 'pool' | 'asset' | 'amount'

type SellOptionKey = 'pool' | 'asset' | 'trade' | 'sp' | 'range' | 'amount'

type BuyOptionKey = SellOptionKey

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
  },
  deposit: {
    pool: {
      alias: 'p',
      type: 'string',
      describe: 'Pool (e.g. usdc/weth, weth/usdc)'
    },
    asset: {
      alias: 'a',
      type: 'string',
      describe: 'Collateral asset (e.g. usdc, weth)'
    },
    amount: {
      alias: 'm',
      type: 'number',
      describe: 'Deposit amount'
    }
  },
  sell: {
    pool: {
      alias: 'p',
      type: 'string',
      describe: 'Pool (e.g. usdc/weth, weth/usdc)'
    },
    asset: {
      alias: 'a',
      type: 'string',
      describe: 'Sell asset (e.g. usdc, weth)'
    },
    trade: {
      alias: 't',
      type: 'string',
      describe: 'put | call'
    },
    sp: {
      type: 'number',
      describe: 'Strike price for the option'
    },
    range: {
      type: 'number',
      describe: 'Price range for the option'
    },
    amount: {
      alias: 'm',
      type: 'number',
      describe: 'Amount of options to be sold'
    }
  },
  buy: {
    pool: {
      alias: 'p',
      type: 'string',
      describe: 'Pool (e.g. usdc/weth, weth/usdc)'
    },
    asset: {
      alias: 'a',
      type: 'string',
      describe: 'Buy asset (e.g. usdc, weth)'
    },
    trade: {
      alias: 't',
      type: 'string',
      describe: 'put | call'
    },
    sp: {
      type: 'number',
      describe: 'Strike price for the option'
    },
    range: {
      type: 'number',
      describe: 'Price range for the option'
    },
    amount: {
      alias: 'm',
      type: 'number',
      describe: 'Amount of options to be bought'
    }
  }
}

export default options
