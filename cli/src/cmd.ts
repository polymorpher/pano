import {
  type Network,
  networks,
  defaultPanopticfactoryAddress,
  defaultUniswapFactoryAddress,
  defaultWalletPrivateKey,
  defaultPanopticHelperAddress
} from './config.js'
import yargs from 'yargs/yargs'
import { type Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import process from 'process'
import options, { commandOptions } from './options.js'
import { type Address, type Hex } from 'viem'

export interface Command {
  short: string
  full: string
  desc: string
  wallet?: boolean
  tbd?: boolean
  submenu?: boolean // take exclusive focus on input, suppress user commands
}
export enum CommandKeys {
  Help = 'help',
  List = 'list',
  Wallet = 'wallet',
  Deposit = 'deposit',
  Portfolio = 'portfolio',
  Sell = 'sell',
  Buy = 'buy',
  Mint = 'mint',
  Burn = 'burn',
  Manage = 'manage',
  Quit = 'quit'
}

export const Commands: Record<CommandKeys, Command> = {
  help: { short: 'h', full: 'help', desc: 'show all commands' },
  list: {
    short: 'l',
    full: 'list',
    desc: 'List all available pools, and show their pool and collateral statistics'
  },
  wallet: {
    short: 'w',
    full: 'wallet',
    desc: 'Set private key for wallet (if not already set through .env, environment variable, or command line)',
    submenu: true
  },
  deposit: {
    short: 'd',
    full: 'deposit',
    desc: 'Deposit or withdraw funds as collateral in one of the trading pools',
    submenu: true,
    wallet: true
  },
  portfolio: {
    short: 'p',
    full: 'portfolio',
    desc: 'Show your deposited assets collateral value, open positions, margin requirement, and net value of each position',
    wallet: true,
    submenu: true
  },
  sell: {
    short: 's',
    full: 'sell',
    desc: 'Sell a simple option (open a short position with a single leg)',
    wallet: true,
    submenu: true
  },
  buy: {
    short: 'b',
    full: 'buy',
    desc: 'Buy a simple option (open a long position with a single leg)',
    wallet: true,
    submenu: true
  },
  burn: {
    short: 'u',
    full: 'burn',
    desc: 'Burn an option (close an existing position you minted)',
    wallet: true,
    submenu: true
  },
  mint: {
    short: 'a',
    full: 'advanced',
    desc: 'Mint a complex option (open a position with multiple legs that potentially hedge against each other, mixing long and short)',
    tbd: true,
    submenu: true
  },
  manage: {
    short: 'm',
    full: 'manage',
    desc: 'Perform market management operations (permissionless liquidation, forced exercise)',
    wallet: true,
    tbd: true
  },
  quit: { short: 'q', full: 'quit', desc: 'exit the program' }
}

export const defaultCommand = (cmd?: string) => {
  if (cmd === undefined) {
    return undefined
  }

  if (cmd.toLowerCase() === 'start') {
    return undefined
  }

  return cmd
}

const ya = yargs(hideBin(process.argv))
  .command('start', 'Enter interactive mode')
  .help(
    'Interactively communicate with a Panoptic option pool deployment. Configuration parameters (network, contract address, wallet...) can be set using command line arguments, or inside the interactive interface'
  )
  .options(options)

export const cmd = Object.keys(Commands)
  .filter(
    (c) => ![CommandKeys.Quit, CommandKeys.Wallet].includes(c as CommandKeys)
  )
  .reduce<Argv>((acc, c) => {
    const key = c as CommandKeys
    const cmd = Commands[key]
    const desc = cmd.tbd ? `[Coming soon] ${cmd.desc}` : cmd.desc

    return acc.command(c, `${desc}\n`, (argv) => {
      argv.options(commandOptions[key] ?? {})
    })
  }, ya)
  .strict().argv

export const parseInitialNetwork = (): Network => {
  const network = cmd.network as string
  let rpc = (cmd.rpc as string | undefined) ?? process.env.RPC
  let chainId = (cmd.chainId as number | undefined) ?? process.env.CHAIN_ID
  const networkSettings = networks[network]
  if (!networkSettings) {
    console.error(`Unknown network: ${network}`)
    process.exit(1)
  }
  rpc = rpc ?? networkSettings.rpc
  chainId = Number(chainId ?? networkSettings.chainId)
  return {
    ...networkSettings,
    rpc,
    chainId
  }
}

export const getPanopticFactoryAddress = (): Address => {
  const pfa = cmd.panopticFactory as Address
  return pfa ?? defaultPanopticfactoryAddress
}

export const getPanopticHelperAddress = (): Address => {
  const pfa = cmd.panopticHelper as Address
  return pfa ?? defaultPanopticHelperAddress
}

export const getUniswapFactoryAddress = (): Address => {
  const ufa = cmd.uniswapFactory as Address
  return ufa ?? defaultUniswapFactoryAddress
}

export const getPk = (): Hex => {
  const pk = cmd.pk as Hex
  return pk ?? defaultWalletPrivateKey
}

export const getOption = (key: string) => cmd[key]

export const isCli = () =>
  cmd._[0]?.toLowerCase() === 'start' ? false : Boolean(cmd._[0])
