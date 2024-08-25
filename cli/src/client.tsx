import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
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

interface PublicClientContextProps {
  client?: PublicClient
  network: Network
}

export const initialNetwork = parseInitialNetwork()

const PublicClientContext = createContext<PublicClientContextProps>({ network: initialNetwork })

// a react hook, use inside react components
const usePublicClientHook = () => {
  const [network, setNetwork] = useState<Network>(initialNetwork)
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

export const PublicClientProvider = ({ children }: PropsWithChildren) => {
  const { client, network } = usePublicClientHook()
  return <PublicClientContext.Provider value={{ client, network }}>
    {children}
  </PublicClientContext.Provider>
}

export const usePublicClient = () => useContext(PublicClientContext)

export { buildPublicClient }
