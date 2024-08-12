import React, { useEffect, useState } from 'react'
import { type Network } from 'src/config.js'
import { createPublicClient, http } from 'viem'
import { type PublicClient } from 'viem'
import { parseInitialNetwork } from './cmd.js'

// use outside of hooks and react components, such as main
const buildPublicClient = (network: Network): PublicClient => {
  return createPublicClient({
    chain: {
      rpcUrls: { default: { http: [network.rpc] } },
      nativeCurrency: network.nativeCurrency,
      name: network.name,
      id: network?.chainId
    },
    transport: http()
  })
}

// a react hook, use inside react components
const usePublicClient = () => {
  const [network, setNetwork] = useState<Network>(parseInitialNetwork())
  // const [pk, setPk] = useState<string>('')
  const [publicClient, setPublicClient] = useState<PublicClient>()
  useEffect(() => {
    if (!network) {
      console.log('No network selected')
      return
    }
    const client = buildPublicClient(network)
    console.log(`Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`)
    setPublicClient(client)
  }, [network])
  return { network, setNetwork, client: publicClient }
}

export { usePublicClient, buildPublicClient }
