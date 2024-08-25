import React, { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { type Network } from 'src/config.js'
import { createPublicClient, createWalletClient, http } from 'viem'
import { type PublicClient, type WalletClient } from 'viem'
import { parseInitialNetwork } from './cmd.js'
import { NotificationContext } from './notification.js'
import { type Wallet, WalletContext } from './wallet.js'

// use outside of hooks and react components, such as main
export const buildPublicClient = (network: Network): PublicClient => {
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
  setNetwork: (network: Network) => void
}

export const initialNetwork = parseInitialNetwork()

const PublicClientContext = createContext<PublicClientContextProps>({
  network: initialNetwork,
  setNetwork: (network: Network) => {}
})

// a react hook, use inside react components
const usePublicClientHook = () => {
  const [network, setNetwork] = useState<Network>(initialNetwork)
  const [publicClient, setPublicClient] = useState<PublicClient>()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    if (!network) {
      addMessage('No network selected', { color: 'red' })
      return
    }
    const client = buildPublicClient(network)
    addMessage(`Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`, { color: 'green' })
    setPublicClient(client)
  }, [addMessage, network])
  return { network, setNetwork, client: publicClient }
}

export const PublicClientProvider = ({ children }: PropsWithChildren) => {
  const { client, network, setNetwork } = usePublicClientHook()
  return <PublicClientContext.Provider value={{ client, network, setNetwork }}>
    {children}
  </PublicClientContext.Provider>
}

export const usePublicClient = () => useContext(PublicClientContext)

interface WalletClientContextProps {
  network: Network
  client?: WalletClient
  setNetwork: (network: Network) => void
}

const WalletClientContext = createContext<WalletClientContextProps>({
  network: initialNetwork,
  setNetwork: (network: Network) => {}
})

export const buildWalletClient = (network: Network, wallet: Wallet): WalletClient => {
  return createWalletClient({
    account: wallet.privateKeyAccount,
    chain: {
      rpcUrls: { default: { http: [network.rpc] } },
      nativeCurrency: network.nativeCurrency,
      name: network.name,
      id: network?.chainId
    },
    transport: http()
  })
}

export const useWalletClient = () => {
  const { wallet } = useContext(WalletContext)
  const [network, setNetwork] = useState<Network>(initialNetwork)
  const [client, setClient] = useState<WalletClient>()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    if (!wallet.privateKeyAccount) {
      return
    }
    const c = buildWalletClient(network, wallet)
    addMessage(`Wallet connected to RPC - Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`, { color: 'green' })
    setClient(c)
  }, [addMessage, wallet, network])

  return { network, setNetwork, client }
}

export const WalletClientProvider = ({ children }: PropsWithChildren) => {
  const { client, network, setNetwork } = useWalletClient()
  return <WalletClientContext.Provider value={{ client, network, setNetwork }}>
    {children}
  </WalletClientContext.Provider>
}
