import {type Network, networks, defaultPanopticfactoryAddress, defaultUniswapFactoryAddress} from './config.js'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import process from 'process'
import options from './options.js'
import { type Address } from 'viem'

export const cmd = await yargs(hideBin(process.argv))
  .command('lp', 'Show liquidity provider tools')
  .options(options)
  .demandCommand(1)
  .strict()
  .argv
export const isCommand = (command: string) => cmd._[0] === command

export const parseInitialNetwork = (): Network => {
  const network = cmd.network as string
  let rpc = cmd.rpc as string | undefined ?? process.env.RPC
  let chainId = cmd.chainId as number | undefined ?? process.env.CHAIN_ID
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

export const getUniswapFactoryAddress = (): Address => {
  const ufa = cmd.uniswapFactory as Address
  return ufa ?? defaultUniswapFactoryAddress
}
