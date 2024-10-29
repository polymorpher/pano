import {
  type Network,
  networks,
  defaultPanopticfactoryAddress,
  defaultUniswapFactoryAddress,
  defaultWalletPrivateKey,
  defaultPanopticHelperAddress
} from './config.js'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import process from 'process'
import options from './options.js'
import { type Address, type Hex } from 'viem'

export const cmd = await yargs(hideBin(process.argv))
  // .command('lp', 'Show liquidity provider tools')
  .command('start', 'Enter interactive mode')
  .help(
    'Interactively communicate with a Panoptic option pool deployment. Configuration parameters (network, contract address, wallet...) can be set using command line arguments, or inside the interactive interface'
  )
  .options(options)
  .strict()
  // .demandCommand()
  .showHelp().argv

export const isCommand = (command: string) => cmd._[0] === command

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
