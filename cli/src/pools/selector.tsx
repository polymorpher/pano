import { SimplePoolInfo } from './info.js'
import React, { useCallback, useContext, useState } from 'react'
import { Box, Text } from 'ink'
import { usePools } from './hooks.js'
import TextInput from 'ink-text-input'
import { UserInputContext } from '../commands.js'
import type { ValidatedPair } from '../common.js'
import { NotificationContext } from '../notification.js'

interface PoolSelectorProps {
  onSelected: (args: { text: string, pair?: ValidatedPair }) => any
}

export const PoolSelector = ({ onSelected }: PoolSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { pairs } = usePools()
  const { disabled: userCommandDisabled, setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)

  const onPoolSelection = useCallback((input: string) => {
    if (!input) {
      return
    }
    if (input.toLowerCase() === 'x') {
      setTextInput('')
      onSelected({ text: 'x' })
      setUserCommandDisabled(false)
      return
    }
    const index = Number(input)
    if (!index || !(index <= pairs.length)) {
      addMessage(`Unrecognized selection [${input}]`, { color: 'red' })
      return
    }
    const p = pairs[index - 1]
    onSelected({ text: input, pair: p })
    setTextInput('')
    addMessage(`Your selected [${input}]`, { color: 'grey' })
  }, [onSelected, setUserCommandDisabled, pairs, addMessage])

  return <Box marginTop={1} flexDirection={'column'}>
    <Box marginBottom={1}>
      <Text>Choose from an existing pool</Text>
    </Box>
    {pairs.map((pair, i) => <Box key={`pair-${i}`}><Text>[{i + 1}] </Text><SimplePoolInfo pair={pair}/></Box>)}
    <Text color={'red'}>[x] Back to main menu</Text>
    <Box marginTop={1}>
      <Text>Select a pool: </Text>
      <TextInput focus={userCommandDisabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onPoolSelection} />
    </Box>
  </Box>
}
