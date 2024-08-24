import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type Address } from 'viem'
import { type ProviderProps } from './common.js'
import TextInput from 'ink-text-input'
import { Newline, Box, Text } from 'ink'

export enum WalletType {
  Unloaded = 'unloaded',
  Hot = 'hot',
  MetaMask = 'metamask',
  Ledger = 'ledger'
}

export interface Wallet {
  type: WalletType
  pk: string
  address: Address
}

export const EmptyWallet: Wallet = { type: WalletType.Unloaded, pk: '', address: '' }

export const WalletContext = createContext<Wallet>(EmptyWallet)

export const WalletProvider = ({ children }: ProviderProps) => {
  const [wallet, setWallet] = useState<Wallet>(EmptyWallet)
  return <WalletContext.Provider value={wallet}>
    {children}
  </WalletContext.Provider>
}

interface WalletSelectorProps {
  updateWallet: (w: Wallet) => any
}

export const WalletSelector = ({ updateWallet }: WalletSelectorProps) => {
  const [pkInput, setPkInput] = useState<string>()
  const [mode, setMode] = useState<WalletType | undefined>()
  const [textInput, setTextInput] = useState<string>('')
  useEffect(() => {
    if (textInput.startsWith('0')) {
      setMode(WalletType.Unloaded)
    } else if (textInput.startsWith('1')) {
      setMode(WalletType.Hot)
    } else {
      setTextInput('')
    }
  }, [textInput])

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
      
    </>}
  </>
}
