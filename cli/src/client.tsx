import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo
} from 'react'
import type { Network } from 'src/config.js'
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
import { NotificationContext } from './notification.js'
import { useWallet, type Wallet } from './wallet.js'
import { UserInputContext } from './commands.js'
import { type CommandKeys, Commands, isCli } from 'src/cmd.js'
import { parseInitialNetwork } from './cmd.ts'

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
}

const PublicClientContext = createContext<PublicClientContextProps>({
  network: null as unknown as Network
})

const network = parseInitialNetwork()

const client = buildPublicClient(network)

const archiveClient = buildPublicClient({
  ...network,
  rpc: network.archive ?? network.rpc
})

export const PublicClientProvider = ({ children }: PropsWithChildren) => {
  const { addMessage } = useContext(NotificationContext)

  useEffect(() => {
    if (!network) {
      addMessage('No network selected', { color: 'red' })
      return
    }
    addMessage(
      `Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`,
      { color: 'green' }
    )
  }, [addMessage])

  return (
    <PublicClientContext.Provider value={{ client, network, archiveClient }}>
      {children}
    </PublicClientContext.Provider>
  )
}

export const usePublicClient = () => useContext(PublicClientContext)

interface WalletClientContextProps {
  network: Network
  client?: ConnectedWalletClient
}

const WalletClientContext = createContext<WalletClientContextProps>({
  network: null as unknown as Network
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

const cli = isCli()

export const WalletClientProvider = ({ children }: PropsWithChildren) => {
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const client: ConnectedWalletClient = useMemo(
    () => buildWalletClient(network, wallet),
    [wallet]
  )
  const { input } = useContext(UserInputContext)

  useEffect(() => {
    if (cli && !Commands[input as CommandKeys]?.wallet) {
      return
    }

    if (!wallet.privateKeyAccount) {
      addMessage('Wallet is not initialized', { color: cli ? 'red' : 'gray' })
      return
    }

    addMessage(
      `Wallet connected to RPC - Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`,
      { color: 'green' }
    )
  }, [addMessage, wallet, input])

  return (
    <WalletClientContext.Provider value={{ client, network }}>
      {children}
    </WalletClientContext.Provider>
  )
}

export const useWalletClient = () => useContext(WalletClientContext)
