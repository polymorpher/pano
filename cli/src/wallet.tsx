import React, { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'
import { type Address, type Hex } from 'viem'
import TextInput from 'ink-text-input'
import { Newline, Box, Text } from 'ink'
import { privateKeyToAccount, type PrivateKeyAccount } from 'viem/accounts'
import { NotificationContext } from './notification.js'
import { UserInputContext } from './commands.js'

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

interface WalletContextProps {
  wallet: Wallet
  setWallet: (wallet: Wallet) => void
}

export const WalletContext = createContext<WalletContextProps>({ wallet: EmptyWallet, setWallet: () => {} })

export const WalletSelector = () => {
  const [pkInput, setPkInput] = useState<string>('')
  const [mode, setMode] = useState<WalletType | undefined>()
  const [textInput, setTextInput] = useState<string>('')
  const { wallet, setWallet } = useContext(WalletContext)
  const { addMessage } = useContext(NotificationContext)
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } = useContext(UserInputContext)

  useEffect(() => {
    setUserCommandDisabled(true)
  }, [setUserCommandDisabled])

  useEffect(() => {
    if (userCommandDisabled) {
      setTextInput('')
      setMode(undefined)
    }
  }, [userCommandDisabled])

  useEffect(() => {
    if (textInput.startsWith('0')) {
      setMode(WalletType.Unloaded)
      addMessage(`You selected: ${textInput}`)
    } else if (textInput.startsWith('1')) {
      setMode(WalletType.Hot)
      addMessage(`You selected: ${textInput}`)
    } else if (textInput.startsWith('x')) {
      setMode(undefined)
      setUserCommandDisabled(false)
      addMessage(`You selected: ${textInput}`)
    }
  }, [addMessage, setUserCommandDisabled, textInput])

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
      setWallet(w)
      addMessage('Hot wallet was loaded successfully', { color: 'green' })
      setUserCommandDisabled(false)
    } catch (ex: any) {
      addMessage(`ERROR - Hot wallet cannot be loaded. Cannot parse key. ${(ex as Error).toString()}`, { color: 'red' })
      setPkInput('')
    } finally {
      setMode(undefined)
    }
  }, [setUserCommandDisabled, addMessage, setWallet])

  return <>
    {!mode && <>
      <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1}>
        <Text color={'yellow'}>Wallet Controller</Text>
      </Box>
      {wallet.type !== WalletType.Unloaded && <Text>[0] unload and erase current wallet ({wallet.address}) </Text>}
      {<Text>[1] hot wallet (provide your private key) </Text>}
      {<Text color={'grey'}>[2] (Coming soon) MetaMask (connect and sign transactions via a browser window)</Text>}
      {<Text color={'grey'}>[3] (Coming soon) Ledger</Text>}
      {<Text color={'red'}>[x] Exit to main menu </Text>}
      {userCommandDisabled && <Box marginY={1}><Text>Your selection: </Text><TextInput showCursor value={textInput} onChange={setTextInput} /></Box>}
    </>}
    {mode === WalletType.Hot && <>
      <Box>
        <Text color={'grey'}>Please paste your private key: </Text>
        {userCommandDisabled && <TextInput showCursor value={pkInput} onSubmit={onPkSubmit} onChange={setPkInput} />}
      </Box>
    </>}
  </>
}

export const ShowWallet = () => {
  const { wallet } = useContext(WalletContext)
  return <>
    <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1}><Text color={'yellow'}>Current Wallet</Text></Box>
    {wallet.type === WalletType.Unloaded && <Text color={'red'}>No wallet is configured</Text>}
    {wallet.type === WalletType.Hot && <Text color={'green'} >Loaded Hot Wallet: {wallet.address}</Text>}
  </>
}

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [wallet, setWallet] = useState<Wallet>(EmptyWallet)
  return <WalletContext.Provider value={{ wallet, setWallet }}>
    {children}
  </WalletContext.Provider>
}

export const WalletControl = () => {
  return <>
    <ShowWallet/>
    <WalletSelector/>
  </>
}
