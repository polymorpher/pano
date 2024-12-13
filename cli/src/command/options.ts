import {
  type ArgumentsCamelCase,
  type Argv,
  type MiddlewareFunction,
  type Options
} from 'yargs'
import { Commands } from './common.js'

export type BaseOptionKey =
  | 'network'
  | 'rpc'
  | 'chainId'
  | 'uniswapFactory'
  | 'panopticFactory'
  | 'panopticHelper'
  | 'pk'
  | 'db'

export const baseOptions: Record<BaseOptionKey, Options> = {
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

export type PortfolioOptionKey = 'sync' | 'duration' | 'force'
export const portfolioOptions: Record<PortfolioOptionKey, Options> = {
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
  },
  force: {
    alias: 'f',
    type: 'boolean',
    describe: 'Execute the operation without asking user confirmation',
    default: false
  }
}

type CommandDefinition<T> = [
  string,
  string,
  ((args: Argv<T>) => void)?,
  ((args: ArgumentsCamelCase) => void)?,
  MiddlewareFunction[]?,
  false?
]

export const portfolioCommand: CommandDefinition<PortfolioOptionKey> = [
  'portfolio',
  'View your positions, their values, and participated pools. Sync local positions data with blockchain to resolve errors.',
  (yargs: Argv<PortfolioOptionKey>) => {
    yargs.options(portfolioOptions).help('h').alias('h', 'help')
  }
]

export type DepositOptionKey = 'pool' | 'asset' | 'amount' | 'force'

export const depositOptions: Record<DepositOptionKey, Options> = {
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
  },
  force: {
    alias: 'f',
    type: 'boolean',
    describe: 'Execute the operation without asking user confirmation',
    default: false
  }
}

export const depositCommand: CommandDefinition<DepositOptionKey> = [
  Commands.deposit.short,
  Commands.deposit.desc,
  (yargs: Argv<DepositOptionKey>) => {
    yargs
      .options(depositOptions)
      .help('h')
      .alias('h', 'help')
      .demandOption(['pool', 'asset', 'amount'])
  }
]

export type SellOptionKey =
  | 'pool'
  | 'asset'
  | 'put'
  | 'call'
  | 'strike'
  | 'range'
  | 'amount'
  | 'force'

export const sellOptions: Record<SellOptionKey, Options> = {
  pool: {
    alias: 'p',
    type: 'string',
    describe: 'Pool (e.g. usdc/weth, weth/usdc)'
  },
  asset: {
    alias: 'a',
    type: 'string',
    describe: 'Which asset is used as quoting asset (e.g. usdc)'
  },
  put: {
    type: 'boolean',
    describe:
      'Whether you are selling a put option. Cannot be used together with "call"'
  },
  call: {
    type: 'boolean',
    describe:
      'Whether you are selling a call option. Cannot be used together with "put"'
  },
  strike: {
    type: 'number',
    describe: 'Strike price for the option'
  },
  range: {
    type: 'number',
    describe:
      'Price range percentage for the option (10 means +-10% around strike price)'
  },
  amount: {
    alias: 'm',
    type: 'number',
    describe: 'Amount of options to be sold'
  },
  force: {
    alias: 'f',
    type: 'boolean',
    describe: 'Execute the operation without asking user confirmation',
    default: false
  }
}

export const sellCommand: CommandDefinition<SellOptionKey> = [
  Commands.sell.short,
  Commands.sell.desc,
  (yargs: Argv<SellOptionKey>) => {
    yargs
      .options(sellOptions)
      .help('h')
      .alias('h', 'help')
      .demandOption(['pool', 'asset', 'strike', 'range', 'amount'])
  }
]

export type BuyOptionKey = SellOptionKey

export const buyOptions: Record<BuyOptionKey, Options> = {
  pool: {
    alias: 'p',
    type: 'string',
    describe: 'Pool (e.g. usdc/weth, weth/usdc)'
  },
  asset: {
    alias: 'a',
    type: 'string',
    describe: 'Which asset is used as quoting asset (e.g. usdc)'
  },
  put: {
    type: 'boolean',
    describe:
      'Whether you are selling a put option. Cannot be used together with "call"'
  },
  call: {
    type: 'boolean',
    describe:
      'Whether you are selling a call option. Cannot be used together with "put"'
  },
  strike: {
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
  },
  force: {
    alias: 'f',
    type: 'boolean',
    describe: 'Execute the operation without asking user confirmation',
    default: false
  }
}

export const buyCommand: CommandDefinition<BuyOptionKey> = [
  Commands.buy.short,
  Commands.buy.desc,
  (yargs: Argv<BuyOptionKey>) => {
    yargs
      .options(buyOptions)
      .help('h')
      .alias('h', 'help')
      .demandOption(['pool', 'asset', 'strike', 'range', 'amount'])
  }
]

export const listCommand: CommandDefinition<void> = [
  Commands.list.short,
  Commands.list.desc,
  (yargs: Argv<void>) => {
    yargs.help('h').alias('h', 'help')
  }
]
