import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { type Network } from 'src/config.js'
import {
  type PublicClient,
  type WalletClient,
  type Account,
  type Chain,
  createPublicClient,
  createWalletClient,
  http,
  type Transport
} from 'viem'
import { parseInitialNetwork } from './cmd.js'
import { NotificationContext } from './notification.js'
import { useWallet, type Wallet } from './wallet.js'

type ConnectedWalletClient = WalletClient<Transport, Chain, Account>

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
  archiveClient?: PublicClient
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
  const [archiveClient, setArchiveClient] = useState<PublicClient>()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    if (!network) {
      addMessage('No network selected', { color: 'red' })
      return
    }
    const client = buildPublicClient(network)
    addMessage(
      `Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`,
      { color: 'green' }
    )
    setPublicClient(client)
    const aClient = buildPublicClient({
      ...network,
      rpc: network.archive ?? network.rpc
    })
    setArchiveClient(aClient)
  }, [addMessage, network])
  return { network, setNetwork, client: publicClient, archiveClient }
}

export const PublicClientProvider = ({ children }: PropsWithChildren) => {
  const { client, network, setNetwork, archiveClient } = usePublicClientHook()
  return (
    <PublicClientContext.Provider
      value={{ client, network, setNetwork, archiveClient }}
    >
      {children}
    </PublicClientContext.Provider>
  )
}

export const usePublicClient = () => useContext(PublicClientContext)

interface WalletClientContextProps {
  network: Network
  client?: ConnectedWalletClient
  setNetwork: (network: Network) => void
}

const WalletClientContext = createContext<WalletClientContextProps>({
  network: initialNetwork,
  setNetwork: (network: Network) => {}
})

export const buildWalletClient = (
  network: Network,
  wallet: Wallet
): ConnectedWalletClient => {
  return createWalletClient({
    account: wallet.privateKeyAccount!,
    chain: {
      rpcUrls: { default: { http: [network.rpc] } },
      nativeCurrency: network.nativeCurrency,
      name: network.name,
      id: network?.chainId
    },
    transport: http()
  })
}

export const useWalletClientHook = () => {
  const { wallet } = useWallet()
  const [network, setNetwork] = useState<Network>(initialNetwork)
  const [client, setClient] = useState<ConnectedWalletClient>()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    if (!wallet.privateKeyAccount) {
      addMessage('Wallet is not initialized')
      return
    }
    const c = buildWalletClient(network, wallet)
    addMessage(
      `Wallet connected to RPC - Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`,
      { color: 'green' }
    )
    setClient(c)
  }, [addMessage, wallet, network])

  return { network, setNetwork, client }
}

export const WalletClientProvider = ({ children }: PropsWithChildren) => {
  const { client, network, setNetwork } = useWalletClientHook()
  return (
    <WalletClientContext.Provider value={{ client, network, setNetwork }}>
      {children}
    </WalletClientContext.Provider>
  )
}

export const useWalletClient = () => useContext(WalletClientContext)
