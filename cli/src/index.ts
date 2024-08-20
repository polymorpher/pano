import * as process from 'process'
import { buildPublicClient } from './client.js'
import { isCommand, parseInitialNetwork } from './cmd.js'
import { renderMainframe } from './mainframe.js'

async function main () {
  const network = parseInitialNetwork()
  const client = buildPublicClient(network)
  console.log('Testing RPC connection...')
  if (!client) {
    console.error('Failed to create RPC client!')
    process.exit(1)
  }
  const resChainId = await client.getChainId()
  if (network.chainId !== resChainId) {
    console.error(`Chain ID mismatch! RPC Response: ${resChainId}, Expected: ${network.chainId}`)
    process.exit(1)
  }
  console.log('RPC Connection test completed. Retrieving option pool stats...')

  renderMainframe()

  if (isCommand('lp')) {
    console.log('test')
    return
  }
  console.log('test2')
}

main().catch(console.error)
