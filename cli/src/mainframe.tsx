import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { render, Newline, Box, Text } from 'ink'
import { PublicClientProvider } from './client.js'
import Stats from './stats.js'
import process from 'process'
import TextInput from 'ink-text-input'

interface Command {
  short: string
  full: string
  desc: string
  wallet?: boolean
  tbd?: boolean
}
enum CommandKeys {
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

const Commands: Record<CommandKeys, Command> = {
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

const CommandsInverse = Object.fromEntries(Object.values(Commands).map(c => [c.full, c]))
const CommandsInverseShort = Object.fromEntries(Object.values(Commands).map(c => [c.short, c]))

interface InputCommandWithTime {
  command: string
  time: number
}

const UserInputContext = createContext<string>('')
interface UserInputProps {
  updateInput: (s: string) => any
}

function matchCommand (input: string): Command | null {
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

const HelpMessage = () => {
  return <>
    <Text>Available commands:<Newline/></Text>
    {Object.values(Commands).map(c => {
      return <Text key={c.full}>({c.short}) {c.full} - {c.tbd ? '[Coming soon] ' : ''}{c.wallet ? '[wallet required] ' : ''}{c.desc} </Text>
    })}
    <Text/>
  </>
}

const InvalidCommandMessage = ({ command }: { command: string }) => {
  return <>
    <Text>Invalid Command [{command}].</Text>
    <Text>Available commands: {Object.values(CommandKeys).join(', ')}</Text>
  </>
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

const CommandProvider = ({ children }: { children?: any }) => {
  const [command, setCommand] = useState<string>(CommandKeys.Help)
  // useEffect(() => {
  //   console.log('CommandProvider', { command })
  // }, [command])
  return <UserInputContext.Provider value={command}>
    {children}
    <UserInput updateInput={setCommand}/>
  </UserInputContext.Provider>
}

const Router = () => {
  const inputCommand = useContext(UserInputContext)
  const m = matchCommand(inputCommand)?.full
  return <>
    <Text color={'green'}>========================================</Text>
    {!m && <InvalidCommandMessage command={inputCommand}/>}
    {m === CommandKeys.Help && <HelpMessage/>}
    {m === CommandKeys.List && <Stats/>}
  </>
}

const Mainframe = () => {
  return <PublicClientProvider>
    <CommandProvider>
      <Router/>
    </CommandProvider>
  </PublicClientProvider>
}

export default Mainframe

export const renderMainframe = () => {
  return render(<Mainframe/>)
}
