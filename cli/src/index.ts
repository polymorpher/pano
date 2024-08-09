import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as process from 'process'
import options from './options.js'
import { networks } from './config.js'
import renderStats from 'src/stats.tsx'
import { publicClient, updateNetwork } from './client.js'

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
  const networkSettings = networks[network]
  if (!networkSettings) {
    console.error(`Unknown network: ${network}`)
    process.exit(1)
  }
  rpc = rpc ?? networkSettings.rpc
  chainId = Number(chainId ?? networkSettings.chainId)
  updateNetwork({
    ...networkSettings,
    rpc,
    chainId
  })
  const client = publicClient()
  console.log('Testing RPC connection...')
  if (!client) {
    console.error('Failed to create RPC client!')
    process.exit(1)
  }
  const resChainId = await client.getChainId()
  if (chainId !== resChainId) {
    console.error(`Chain ID mismatch! RPC Response: ${resChainId}, Expected: ${chainId}`)
    process.exit(1)
  }
  console.log('RPC Connection test completed. Retrieving option pool stats...')

  renderStats()

  if (isCommand('lp')) {
    console.log('test')
    return
  }
  console.log('test2')
}

main().catch(console.error)
