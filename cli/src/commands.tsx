import React, { createContext, useCallback, useContext, useState } from 'react'
import process from 'process'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import { NotificationContext } from './notification.js'
import { useWallet } from './wallet.js'
import type { OptionKey } from './options.js'
import type { MainframeProps } from './mainframe.js'
import { Commands, CommandKeys } from './cmd.js'
import type { Command } from './cmd.js'

export const CommandsInverse = Object.fromEntries(
  Object.values(Commands).map((c) => [c.full, c])
)
export const CommandsInverseShort = Object.fromEntries(
  Object.values(Commands).map((c) => [c.short, c])
)

interface InputCommandWithTime {
  command: string
  time: number
}

interface UserInputContextProps {
  input: string
  setInput: (input: string) => void
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  cli?: boolean
}

export const UserInputContext = createContext<UserInputContextProps>({
  input: '',
  setInput: (input: string) => {},
  disabled: false,
  setDisabled: () => {},
  cli: false
})

export function matchCommand(input: string): Command | null {
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
  const { setInput: setInputCommand, setDisabled } =
    useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const onSubmit = useCallback(
    (v: string) => {
      if (!v) {
        return
      }
      v = v.toLowerCase()
      setQueries((qs) => [...qs, { command: v, time: Date.now() }])
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
      if (m.submenu && m.wallet && !wallet.address) {
        addMessage(
          '[ERROR] A wallet is required to do this. Please load a wallet first',
          { color: 'red' }
        )
        return
      }
      if (m.submenu) {
        setDisabled(true)
      }
      if (m.full === input) {
        addMessage(`You are already at menu [${v}]`)
      }
      setInputCommand(v)
    },
    [wallet.address, addMessage, setDisabled, input, setInputCommand]
  )

  return (
    <Box marginTop={1} flexDirection={'column'}>
      {queries?.length > 0 &&
        queries.map((q) => {
          return (
            <Text key={`${q.time} ${q.command}`}>
              [{new Date(q.time).toLocaleString()}] {q.command}
            </Text>
          )
        })}
      <Box marginTop={1}>
        <Text>Your command (press Enter to confirm): </Text>
        <TextInput
          showCursor
          value={input}
          onChange={setInput}
          onSubmit={onSubmit}
        />
      </Box>
    </Box>
  )
}

export interface CommandProviderProps extends MainframeProps {
  children: React.ReactNode
}

const OptionContext = createContext<Partial<Record<OptionKey, string>>>({
  network: '',
  rpc: '',
  chainId: '',
  uniswapFactory: '',
  panopticFactory: '',
  panopticHelper: '',
  pk: '',
  db: ''
})

export const useOption = (optionKey: OptionKey) =>
  useContext(OptionContext)[optionKey]

export const useCli = () => useContext(UserInputContext).cli

export const CommandProvider = ({
  command,
  options,
  children
}: CommandProviderProps) => {
  const [input, setInput] = useState<string>(command ?? CommandKeys.Help)
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <UserInputContext.Provider
      value={{ input, setInput, disabled, setDisabled, cli: Boolean(command) }}
    >
      <OptionContext.Provider value={options}>
        {children}
      </OptionContext.Provider>
    </UserInputContext.Provider>
  )
}

const numCommands = Object.values(CommandKeys).length

export const CommandControl = () => {
  const { disabled } = useContext(UserInputContext)
  if (disabled) {
    return <></>
  }

  return (
    <Box marginY={1} flexDirection={'column'}>
      <Box
        borderStyle={'single'}
        borderColor={'yellow'}
        paddingX={1}
        marginY={1}
      >
        <Text color={'yellow'}>Main menu</Text>
      </Box>
      <Box>
        <Text>Available commands: </Text>
        {Object.values(CommandKeys).map((k, i) => (
          <Text key={k} color={Commands[k].tbd ? 'gray' : undefined}>
            ({k[0]}) {k}
            {i !== numCommands - 1 ? ', ' : ''}{' '}
          </Text>
        ))}
      </Box>
      <UserInput />
    </Box>
  )
}
