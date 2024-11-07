import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { networks, type Network } from 'src/config.js'
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
import {
  type CommandKeys,
  Commands,
  OptionContext,
  useCli,
  UserInputContext
} from './commands.js'
import type { OptionKey } from './options.js'

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

export const parseInitialNetwork = (
  args: Record<OptionKey, string>
): Network => {
  const network = args.network
  let rpc = args.rpc ?? process.env.RPC
  const networkSettings = networks[network]
  if (!networkSettings) {
    console.error(`Unknown network: ${network}`)
    process.exit(1)
  }
  rpc = rpc ?? networkSettings.rpc
  const chainId = Number(
    args.chainId ?? process.env.CHAIN_ID ?? networkSettings.chainId
  )
  return {
    ...networkSettings,
    rpc,
    chainId
  }
}

interface PublicClientContextProps {
  archiveClient?: PublicClient
  client?: PublicClient
  network: Network
}

const PublicClientContext = createContext<PublicClientContextProps>({
  network: null as unknown as Network
})

export const PublicClientProvider = ({ children }: PropsWithChildren) => {
  const options = useContext(OptionContext)
  const network = useMemo(() => parseInitialNetwork(options), [options])
  const { addMessage } = useContext(NotificationContext)
  const publicClient: PublicClient = useMemo(
    () => buildPublicClient(network),
    [network]
  )
  const archiveClient: PublicClient = useMemo(
    () =>
      buildPublicClient({
        ...network,
        rpc: network.archive ?? network.rpc
      }),
    [network]
  )

  useEffect(() => {
    if (!network) {
      addMessage('No network selected', { color: 'red' })
      return
    }
    addMessage(
      `Network: ${network.name} | Chain ID: ${network.chainId} | RPC: ${network.rpc}`,
      { color: 'green' }
    )
  }, [addMessage, network])

  return (
    <PublicClientContext.Provider
      value={{ client: publicClient, network, archiveClient }}
    >
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

export const WalletClientProvider = ({ children }: PropsWithChildren) => {
  const options = useContext(OptionContext)
  const network = useMemo(() => parseInitialNetwork(options), [options])
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const client: ConnectedWalletClient = useMemo(
    () => buildWalletClient(network, wallet),
    [network, wallet]
  )
  const cli = useCli()
  const { input } = useContext(UserInputContext)

  useEffect(() => {
    if (cli && !Commands[input as CommandKeys].wallet) {
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
  }, [addMessage, wallet, network, cli, input])

  return (
    <WalletClientContext.Provider value={{ client, network }}>
      {children}
    </WalletClientContext.Provider>
  )
}

export const useWalletClient = () => useContext(WalletClientContext)
