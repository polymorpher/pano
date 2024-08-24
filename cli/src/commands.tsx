import React, { createContext, useCallback, useState } from 'react'
import process from 'process'
import type { ProviderProps } from './common.js'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'

export interface Command {
  short: string
  full: string
  desc: string
  wallet?: boolean
  tbd?: boolean
  focus?: boolean // take exclusive focus on input, suppress user commands
}
export enum CommandKeys {
  Help = 'help',
  List = 'list',
  Wallet = 'wallet',
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
  wallet: { short: 'w', full: 'wallet', desc: 'set private key for wallet (if not already set through .env, environment variable, or command line)' },
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
  disabled: boolean
  setDisabled: (disabled: boolean) => void
}

export const UserInputContext = createContext<UserInputContextProps>({
  input: '',
  disabled: false,
  setDisabled: () => {}
})

interface UserInputProps {
  updateInput: (s: string) => any
}

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

const UserInput = ({ updateInput }: UserInputProps) => {
  const [input, setInput] = useState<string>('')
  const [queries, setQueries] = useState<InputCommandWithTime[]>([])
  const onSubmit = useCallback((v: string) => {
    if (!v) {
      return
    }
    setQueries(qs => [...qs, { command: v, time: Date.now() }])
    setInput('')
    if (v === 'q' || v === 'quit') {
      process.exit(0)
    }
    // console.log({ v })
    updateInput(v)
  }, [updateInput])

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

export const CommandProvider = ({ children }: ProviderProps) => {
  const [command, setCommand] = useState<string>(CommandKeys.Help)
  const [disabled, setDisabled] = useState<boolean>(true)
  // useEffect(() => {
  //   console.log('CommandProvider', { command })
  // }, [command])
  return <UserInputContext.Provider value={{ input: command, disabled, setDisabled }}>
    {children}
    {disabled && <UserInput updateInput={setCommand}/>}
  </UserInputContext.Provider>
}
