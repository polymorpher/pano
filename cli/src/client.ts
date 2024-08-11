import { type Network } from 'src/config.js'
import { createPublicClient, http } from 'viem'
import { type PublicClient } from 'viem'
import { useEffect, useState } from 'react'

const usePublicClient = () => {
  const [network, setNetwork] = useState<Network | undefined>()
  // const [pk, setPk] = useState<string>('')
  const [publicClient, setPublicClient] = useState<PublicClient>()
  useEffect(() => {
    if (!network) {
      console.log('No network selected')
      return
    }
    const client = createPublicClient({
      chain: {
        rpcUrls: { default: { http: [network.rpc] } },
        nativeCurrency: network.nativeCurrency,
        name: network.name,
        id: network?.chainId
      },
      transport: http()
    })
    console.log(`Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`)
    setPublicClient(client)
  }, [network])
  return { network, setNetwork, client: publicClient }
}

export { usePublicClient }
