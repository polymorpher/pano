import { type Network } from 'src/config.js'
import { createPublicClient, http } from 'viem'
import { type PublicClient } from 'viem'

let selectedNetwork: Network | undefined

const publicClient = (): PublicClient | undefined => {
  if (!selectedNetwork) {
    return
  }
  return createPublicClient({
    chain: {
      rpcUrls: { default: { http: [selectedNetwork.rpc] } },
      nativeCurrency: selectedNetwork.nativeCurrency,
      name: selectedNetwork.name,
      id: selectedNetwork?.chainId
    },
    transport: http()
  })
}

const updateNetwork = (network: Network) => {
  selectedNetwork = network
  console.log(`Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`)
}

export { publicClient, updateNetwork }
