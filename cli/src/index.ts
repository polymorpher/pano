import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as process from 'process'
import options from './options.js'
import config from './config.js'
import { createPublicClient, http } from 'viem'

const cmd = await yargs(hideBin(process.argv))
  .command('lp', 'Show liquidity provider tools')
  .options(options)
  .demandCommand(1)
  .strict()
  .argv

const isCommand = (command: string) => cmd._[0] === command

async function main () {
  const network = cmd.network as string
  let rpc = cmd.rpc as string | undefined ?? process.env.RPC
  let chainId = cmd.chainId as number | undefined ?? process.env.CHAIN_ID
  const networkSettings = config.networks[network]
  if (!networkSettings) {
    console.error(`Unknown network: ${network}`)
    process.exit(1)
  }
  rpc = rpc ?? networkSettings.rpc
  chainId = Number(chainId ?? networkSettings.chainId)

  const rClient = createPublicClient({
    chain: {
      rpcUrls: { default: { http: [rpc] } },
      nativeCurrency: networkSettings.nativeCurrency,
      name: network,
      id: chainId
    },
    transport: http()
  })

  console.log(`Network: ${network} | Chain ID: ${chainId} | RPC: ${rpc}`)
  console.log('Testing RPC connection...')
  const resChainId = await rClient.getChainId()
  if (chainId !== resChainId) {
    console.error(`Chain ID mismatch! RPC Response: ${resChainId}, Expected: ${chainId}`)
    process.exit(1)
  }
  console.log('RPC Connection test completed. Retrieving option pool stats...')

  if (isCommand('lp')) {
    console.log('test')
    return
  }
  console.log('test2')
}

main().catch(console.error)
