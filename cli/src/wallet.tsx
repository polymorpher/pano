import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type Address, type Hex } from 'viem'
import { type ProviderProps } from './common.js'
import TextInput from 'ink-text-input'
import { Newline, Box, Text } from 'ink'
import { privateKeyToAccount, type PrivateKeyAccount } from 'viem/accounts'
import { NotificationContext } from './notification.js'

export enum WalletType {
  Unloaded = 'unloaded',
  Hot = 'hot',
  MetaMask = 'metamask',
  Ledger = 'ledger'
}

export interface Wallet {
  type: WalletType
  address?: Address
  privateKeyAccount?: PrivateKeyAccount
}

export const EmptyWallet: Wallet = { type: WalletType.Unloaded }

export const WalletContext = createContext<Wallet>(EmptyWallet)

interface WalletSelectorProps {
  updateWallet: (w: Wallet) => any
}

export const WalletSelector = ({ updateWallet }: WalletSelectorProps) => {
  const [pkInput, setPkInput] = useState<string>('')
  const [mode, setMode] = useState<WalletType | undefined>()
  const [textInput, setTextInput] = useState<string>('')
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    if (textInput.startsWith('0')) {
      setMode(WalletType.Unloaded)
    } else if (textInput.startsWith('1')) {
      setMode(WalletType.Hot)
    } else {
      setTextInput('')
    }
  }, [textInput])

  const onPkSubmit = useCallback((pk: string) => {
    if (!pk) {
      return
    }
    const hexInput: Hex = (pk.startsWith('0x') ? pk : ('0x' + pk)) as Hex
    try {
      const account = privateKeyToAccount(hexInput)
      const w: Wallet = {
        address: account.address,
        type: WalletType.Hot,
        privateKeyAccount: account
      }
      updateWallet(w)
      setMode(undefined)
      addMessage('Hot wallet was loaded successfully', { color: 'green' })
    } catch (ex: any) {
      addMessage(`ERROR - Hot wallet cannot be loaded. Cannot parse key. ${(ex as Error).toString()}`, { color: 'red' })
      setPkInput('')
    }
  }, [addMessage, updateWallet])
  const wallet = useContext(WalletContext)
  return <>
    {!mode && <>
      <Text>Choose your wallet:<Newline/></Text>
      {wallet.type !== WalletType.Unloaded && <Text>[0] unload and erase current wallet ({wallet.address}) </Text>}
      {<Text>[1] hot wallet (provide your private key) </Text>}
      {<Text color={'grey'}>[2] (Coming soon) MetaMask (connect and sign transactions via a browser window)</Text>}
      {<Text color={'grey'}>[3] (Coming soon) Ledger</Text>}
      <TextInput showCursor value={textInput} onChange={setTextInput} />
    </>}
    {mode === WalletType.Hot && <>
      <Box>
        <Text color={'grey'}>Please paste your private key: </Text>
        <TextInput showCursor value={pkInput} onSubmit={onPkSubmit} onChange={setPkInput} />
      </Box>
    </>}
  </>
}

export const ShowWallet = () => {
  const wallet = useContext(WalletContext)
  return <>
    {wallet.type === WalletType.Unloaded && <Text>No wallet is configured</Text>}
    {wallet.type === WalletType.Hot && <Text>Loaded Hot Wallet: {wallet.address}</Text>}
  </>
}

export const WalletProvider = ({ children }: ProviderProps) => {
  const [wallet, setWallet] = useState<Wallet>(EmptyWallet)
  return <WalletContext.Provider value={wallet}>
    <ShowWallet/>
    <WalletSelector updateWallet={setWallet}/>
    {children}
  </WalletContext.Provider>
}
