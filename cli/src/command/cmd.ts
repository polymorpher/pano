import {
  type Network,
  networks,
  defaultPanopticfactoryAddress,
  defaultUniswapFactoryAddress,
  defaultWalletPrivateKey,
  defaultPanopticHelperAddress
} from '../config.js'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import process from 'process'
import {
  baseOptions,
  type BaseOptionKey,
  portfolioCommand,
  sellCommand,
  buyCommand,
  listCommand,
  type PortfolioOptionKey,
  type SellOptionKey,
  type DepositOptionKey,
  type BuyOptionKey
} from './options.js'
import { type Address, type Hex } from 'viem'

export const cmd = await yargs(hideBin(process.argv))
  .help(
    'Trade options or provision liquidity to a Panoptic pool, via an interactive shell or command line arguments'
  )
  .command('start', 'Enter interactive mode')
  .options(baseOptions)
  .command(...portfolioCommand)
  .command(...sellCommand)
  .command(...buyCommand)
  .command(...listCommand)
  .showHelp()
  .strict()
  // .argv
  .parse()

export const getCommand = (): string | undefined => {
  if (cmd._[0] === 'start') {
    return undefined
  }
  return cmd._[0]?.toString()
}

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

export const getOption = (
  optionKey:
    | BaseOptionKey
    | PortfolioOptionKey
    | DepositOptionKey
    | SellOptionKey
    | BuyOptionKey
) => cmd[optionKey]

export const isCli = () => cmd._[0]?.toString().toLowerCase() !== 'start'
