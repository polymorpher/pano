import React, { type PropsWithChildren, useCallback, useContext, useState } from 'react'
import { Box, Text } from 'ink'
import type { Pair } from './config.js'
import { type Address } from 'viem'
import type { Tuple } from 'reverse-mirage'
import TextInput from 'ink-text-input'
import { NotificationContext } from './notification.js'
import { UserInputContext } from './commands.js'

export const SectionTitle = ({ children }: PropsWithChildren) => {
  return <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1}><Text color={'yellow'}>{children}</Text></Box>
}

export interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

export interface Leg {
  asset: 'token0' | 'token1'
  optionRatio: number
  position: 'long' | 'short'
  tokenType: 'token0' | 'token1'
  riskPartnerIndex: 0 | 1 | 2 | 3
  tickLower: number
  tickUpper: number
}

export type FeeTier = 100 | 500 | 3_000 | 10_000

export type TickSpacing = 1 | 10 | 60 | 200

// adapted from Panoptic SDK
export const calculateLegId = (leg: Leg, tickSpacing: TickSpacing) => {
  let id = 0n
  id |= leg.asset === 'token0' ? 0n : 1n
  id |= BigInt(leg.optionRatio) << 1n
  id |= (leg.position === 'short' ? 0n : 1n) << 8n
  id |= (leg.tokenType === 'token0' ? 0n : 1n) << 9n
  id |= BigInt(leg.riskPartnerIndex) << 10n
  id |= BigInt((leg.tickUpper + leg.tickLower) / 2) << 12n
  id |= BigInt((leg.tickUpper - leg.tickLower) / tickSpacing) << 36n
  return id
}

export interface Position {
  uniswapPoolAddress: Address
  tickSpacing: TickSpacing
  legs: Tuple<Leg | undefined, 4>
}

export function getPoolId (pool: Address): bigint {
  return (BigInt(pool) >> 96n) & 0xffffffffffffffffn
}

export function extractPoolId (tokenId: bigint): bigint {
  return tokenId & 0xffffffffffffffffn
}

// adapted from Panoptic SDK
export const calculateTokenId = (
  uniswapPoolAddress: Address,
  tickSpacing: TickSpacing,
  legs: Tuple<Leg | undefined, 4>
): bigint => {
  let id = 0n
  id |= (BigInt(uniswapPoolAddress) >> 96n) & 0xffffffffffffffffn
  id |= legs[0] ? calculateLegId(legs[0], tickSpacing) << 64n : 0n
  id |= legs[1]
    ? calculateLegId(legs[1], tickSpacing) << (64n + 48n)
    : 0n
  id |= legs[2]
    ? calculateLegId(legs[2], tickSpacing) << (64n + 48n + 48n)
    : 0n
  id |= legs[3]
    ? calculateLegId(legs[3], tickSpacing) <<
      (64n + 48n + 48n + 48n)
    : 0n

  return id
}

interface MultiChoiceSelectorProps {
  options: Array<string | React.JSX.Element>
  onSelected: (choice: number) => any
  onExit: () => any
  prompt: string
  intro: string | React.JSX.Element
  backText?: string
  inactive?: boolean
}

export const MultiChoiceSelector = ({ intro, prompt, backText, options, onSelected, onExit, inactive }: MultiChoiceSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { addMessage } = useContext(NotificationContext)
  const { disabled } = useContext(UserInputContext)
  const onSubmit = useCallback((input: string) => {
    if (!input) {
      return
    }
    setTextInput('')
    if (input.toLowerCase() === 'x') {
      onExit()
      return
    }
    const selection = Number(input)
    if (!selection || selection > options.length) {
      addMessage(`Unrecognized selection [${input}]`, { color: 'red' })
      return
    }
    onSelected(selection)
  }, [options.length, addMessage, onExit, onSelected])

  return <Box marginTop={1} flexDirection={'column'}>
    {typeof intro === 'string' ? <Text>{intro}</Text> : intro}
    {options.map((entry, index) => {
      if (typeof entry === 'string') {
        return <Text key={`option-${index}`}>[{index + 1}] {entry}</Text>
      }
      return <Box key={`option-${index}`}><Text>[{index + 1}] </Text>{entry}</Box>
    })}
    <Text color={'red'}>[x] {backText ?? 'Go back to last step'}</Text>
    <Box>
      <Text>{prompt}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}

interface AmountSelectorProps {
  onSubmit: (input: string) => any
  prompt: string
  intro: string | React.JSX.Element
  inactive?: boolean
}

export const AmountSelector = ({ intro, prompt, onSubmit, inactive }: AmountSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { disabled } = useContext(UserInputContext)
  return <Box marginTop={1} flexDirection={'column'}>
    {typeof intro === 'string' ? <Text>{intro}</Text> : intro}
    <Box>
      <Text>{prompt}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}

interface ConfirmationSelectorProps {
  onConfirm: (yes?: boolean) => any
  prompt?: string
  intro: string | React.JSX.Element
  inactive?: boolean
}

export const ConfirmationSelector = ({ intro, prompt, onConfirm, inactive }: ConfirmationSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { disabled } = useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)

  const onSubmit = useCallback(async (input: string) => {
    input = input.toLowerCase()
    setTextInput('')
    if (input === 'n' || input === 'no') {
      onConfirm(false)
    } else if (input === 'a' || input === 'abort') {
      onConfirm(undefined)
    } else if (input === 'y' || input === 'yes') {
      onConfirm(true)
    } else {
      addMessage(`Unrecognized input [${input}]`, { color: 'red' })
    }
  }, [onConfirm, addMessage])

  return <Box marginTop={1} flexDirection={'column'}>
    {typeof intro === 'string' ? <Text>{intro}</Text> : intro}
    <Box>
      <Text>{prompt ?? 'Continue? (y) yes / (n) no / (a) abort'}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}
