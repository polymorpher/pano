import * as process from 'process'
import { buildPublicClient } from './client.js'
import { cmd, parseInitialNetwork } from './cmd.js'
import renderMainframe from './mainframe.js'

async function main() {
  const network = parseInitialNetwork()
  const client = buildPublicClient(network)
  console.log('Testing RPC connection...')
  if (!client) {
    console.error('Failed to create RPC client!')
    process.exit(1)
  }
  const resChainId = await client.getChainId()
  if (network.chainId !== resChainId) {
    console.error(
      `Chain ID mismatch! RPC Response: ${resChainId}, Expected: ${network.chainId}`
    )
    process.exit(1)
  }
  console.log('RPC Connection test completed. Retrieving option pool stats...')

  const { waitUntilExit } = renderMainframe({
    command: cmd._[0],
    options: cmd
  })

  await waitUntilExit()
}

main().catch(console.error)
