import React, { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react'
import process from 'process'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import { NotificationContext } from './notification.js'

export interface Command {
  short: string
  full: string
  desc: string
  wallet?: boolean
  tbd?: boolean
  submenu?: boolean // take exclusive focus on input, suppress user commands
}
export enum CommandKeys {
  Help = 'help',
  List = 'list',
  Wallet = 'wallet',
  Deposit = 'deposit',
  Portfolio = 'portfolio',
  Mint = 'mint',
  Options = 'options',
  Buy = 'buy',
  Admin = 'admin',
  Quit = 'quit',
}

export const Commands: Record<CommandKeys, Command> = {
  help: { short: 'h', full: 'help', desc: 'show all commands' },
  list: { short: 'l', full: 'list', desc: 'list all available pools, and show their pool and collateral statistics' },
  wallet: { short: 'w', full: 'wallet', desc: 'set private key for wallet (if not already set through .env, environment variable, or command line)', submenu: true },
  deposit: { short: 'd', full: 'deposit', desc: 'deposit funds as collateral in one of the trading pools', submenu: true },
  portfolio: { short: 'p', full: 'portfolio', desc: 'show your deposited assets, option positions, estimated profit and loss', wallet: true, tbd: true },
  mint: { short: 'm', full: 'mint', desc: 'mint (i.e. sell) an option', wallet: true, tbd: true },
  options: { short: 'o', full: 'options', desc: 'show available minted options for buying', tbd: true },
  buy: { short: 'b', full: 'buy', desc: 'buy a minted option', wallet: true, tbd: true },
  admin: { short: 'a', full: 'admin', desc: 'enter admin mode to perform management operations (liquidation, forced exercise)', wallet: true, tbd: true },
  quit: { short: 'q', full: 'quit', desc: 'exit the program' }
}

export const CommandsInverse = Object.fromEntries(Object.values(Commands).map(c => [c.full, c]))
export const CommandsInverseShort = Object.fromEntries(Object.values(Commands).map(c => [c.short, c]))

interface InputCommandWithTime {
  command: string
  time: number
}

interface UserInputContextProps {
  input: string
  setInput: (input: string) => void
  disabled: boolean
  setDisabled: (disabled: boolean) => void
}

export const UserInputContext = createContext<UserInputContextProps>({
  input: '',
  setInput: (input: string) => {},
  disabled: false,
  setDisabled: () => {}
})

export function matchCommand (input: string): Command | null {
  const i = input.toLowerCase()
  const s = CommandsInverseShort[i]
  if (s) {
    return s
  }
  const f = CommandsInverse[i]
  if (f) {
    return f
  }
  return null
}

const UserInput = () => {
  const [input, setInput] = useState<string>('')
  const [queries, setQueries] = useState<InputCommandWithTime[]>([])
  const { setInput: setInputCommand, setDisabled } = useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)
  const onSubmit = useCallback((v: string) => {
    if (!v) {
      return
    }
    v = v.toLowerCase()
    setQueries(qs => [...qs, { command: v, time: Date.now() }])
    setInput('')
    const m = matchCommand(v)
    if (!m) {
      setInputCommand(CommandKeys.Help)
      addMessage(`Invalid command [${v}]`, { color: 'red' })
      return
    }
    if (m.full === CommandKeys.Quit) {
      process.exit(0)
    }
    if (m.submenu) {
      setDisabled(true)
    }
    if (m.full === input) {
      addMessage(`You are already at menu [${v}]`)
    }
    setInputCommand(v)
  }, [addMessage, setDisabled, input, setInputCommand])

  return <Box marginTop={1} flexDirection={'column'}>
    {queries?.length > 0 && queries.map((q) => {
      return <Text key={`${q.time} ${q.command}`}>[{new Date(q.time).toLocaleString()}] {q.command}</Text>
    })}
    <Box marginTop={1}>
      <Text>Your command (press Enter to confirm):  </Text>
      <TextInput showCursor value={input} onChange={setInput} onSubmit={onSubmit} />
    </Box>

  </Box>
}

export const CommandProvider = ({ children }: PropsWithChildren) => {
  const [input, setInput] = useState<string>(CommandKeys.Help)
  const [disabled, setDisabled] = useState<boolean>(false)
  return <UserInputContext.Provider value={{ input, setInput, disabled, setDisabled }}>
    {children}
  </UserInputContext.Provider>
}

export const CommandControl = () => {
  const { disabled } = useContext(UserInputContext)
  if (disabled) {
    return <></>
  }
  return <Box marginY={1} flexDirection={'column'}>
    <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1} marginY={1}><Text color={'yellow'}>Main menu</Text></Box>
    <Text>Available commands: {Object.values(CommandKeys).map(k => `(${k[0]}) ${k}`).join(', ')}</Text>
    <UserInput/>
  </Box>
}
