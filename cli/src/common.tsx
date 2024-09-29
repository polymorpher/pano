import React, { type PropsWithChildren, useCallback, useContext, useState } from 'react'
import { Box, Text } from 'ink'
import type { Pair } from './config.js'
import { type Address, type Hex } from 'viem'
import type { Tuple } from 'reverse-mirage'
import TextInput from 'ink-text-input'
import { NotificationContext } from './notification.js'
import { UserInputContext } from './commands.js'
import { TickBase } from './util.js'

export const SectionTitle = ({ children }: PropsWithChildren) => {
  return <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1} marginY={1}><Text color={'yellow'}>{children}</Text></Box>
}

export type Token01 = 'token0' | 'token1'
export type PositionType = 'long' | 'short'
export type RiskPartnerIndexType = 0 | 1 | 2 | 3

export interface PairedPoolAddresses {
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

export interface ValidatedPair extends Pair, PairedPoolAddresses {
  token0Address: Address
  token1Address: Address
}

export interface Leg {
  // "asset" is used for calculating number of tokens being moved, as well as the option's notional value
  // Learn more at https://github.com/polymorpher/panoptic-v1-core/blob/1432f9152e3e16c9c692b14bd7160bff7ce20737/contracts/libraries/PanopticMath.sol#L427
  asset: Token01
  optionRatio: number
  position: PositionType
  tokenType: Token01
  riskPartnerIndex: RiskPartnerIndexType
  // always follows pool's tick (token1/token0 price) - no conversion necessary regardless of the value of `asset`
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

export function tokenIdToLeg (tokenId: bigint, legIndex: number, tickSpacing: TickSpacing): Leg | undefined {
  const masked = (tokenId >> 64n >> (48n * BigInt(legIndex))) & 0xffffffffffffn
  if (masked === 0n) {
    return undefined
  }
  const asset = (masked & 0x1n) === 0n ? 'token0' : 'token1'
  const optionRatio = Number((masked >> 1n) & 0x8fn)
  const position = ((masked >> 8n) & 0x1n) === 0n ? 'short' : 'long'
  const tokenType = ((masked >> 9n) & 0x1n) === 0n ? 'token0' : 'token1'
  const riskPartnerIndex = Number((masked >> 10n) & 0x3n) as RiskPartnerIndexType
  const strike = Number((masked >> 12n) & 0xffffffn)
  const width = Number((masked >> 36n) & 0xfffn)
  const tickLower = strike - width * tickSpacing
  const tickUpper = strike + width * tickSpacing
  return {
    asset,
    optionRatio,
    position,
    tokenType,
    riskPartnerIndex,
    tickLower,
    tickUpper
  }
}

export const tokenIdToPosition = (tokenId: bigint, tickSpacing: TickSpacing, poolMapping: Record<string, Address>): Position => {
  const poolId = extractPoolId(tokenId)
  const uniswapPoolAddress = poolMapping[poolId.toString(16)]
  const leg1 = tokenIdToLeg(tokenId, 0, tickSpacing)
  const leg2 = tokenIdToLeg(tokenId, 1, tickSpacing)
  const leg3 = tokenIdToLeg(tokenId, 2, tickSpacing)
  const leg4 = tokenIdToLeg(tokenId, 3, tickSpacing)
  return {
    uniswapPoolAddress,
    tickSpacing,
    legs: [leg1, leg2, leg3, leg4]
  }
}

export const getUniswapPoolId = (poolAddress: Address): bigint => {
  return (BigInt(poolAddress) >> 96n) & 0xffffffffffffffffn
}

export interface Position {
  uniswapPoolAddress: Address
  tickSpacing: TickSpacing
  legs: Tuple<Leg | undefined, 4>
  ts?: number
}

export interface PositionWithId extends Position {
  id: Hex
}

export interface PositionWithData extends PositionWithId {
  balance?: bigint
  utilization0?: number
  utilization1?: number
}

export function extractLR64 (n: bigint): [bigint, bigint] {
  const left = (n >> 64n) & 0xffffffffffffffffn
  const right = n & 0xffffffffffffffffn
  return [left, right]
}

export function getPoolId (pool: Address): bigint {
  return (BigInt(pool) >> 96n) & 0xffffffffffffffffn
}

export function extractPoolId (tokenId: bigint): bigint {
  return tokenId & 0xffffffffffffffffn
}

// adapted from Panoptic SDK
export const calculateTokenId = ({
  uniswapPoolAddress,
  tickSpacing,
  legs
}: Position): bigint => {
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
    {typeof intro === 'string' ? <Box marginY={1}><Text>{intro}</Text></Box> : intro}
    {options.map((entry, index) => {
      if (typeof entry === 'string') {
        return <Text key={`option-${index}`}>[{index + 1}] {entry}</Text>
      }
      return <Box key={`option-${index}`}><Text>[{index + 1}] </Text>{entry}</Box>
    })}
    <Text color={'red'}>[x] {backText ?? 'Go back to last step'}</Text>
    <Box marginY={1}>
      <Text>{prompt}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}

interface AmountSelectorProps {
  onSubmit?: (input: number) => any
  prompt: string
  intro: string | React.JSX.Element
  inactive?: boolean
  hideGoBackPrompt?: boolean
  onBack?: () => any
  allowZero?: boolean
  onRawSubmit?: (input: string) => any
}

export const AmountSelector = ({ intro, prompt, onSubmit, inactive, hideGoBackPrompt, onBack, allowZero, onRawSubmit }: AmountSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { disabled } = useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)
  const onInputSubmit = useCallback((input: string) => {
    if ((!allowZero && input === '0') || input.toLowerCase() === 'x') {
      setTextInput('')
      onBack?.()
      return
    }
    if (onRawSubmit) {
      onRawSubmit(input)
      return
    }
    const n = Number(input)
    if (!n) {
      addMessage(`Invalid input: ${input}`, { color: 'red' })
      return
    }
    onSubmit?.(n)
  }, [addMessage, onRawSubmit, onSubmit, allowZero, onBack])
  const goBackPrompt = allowZero ? '(enter x to go back)' : '(enter 0 or x to go back)'
  return <Box marginTop={1} flexDirection={'column'}>
    {typeof intro === 'string' ? <Text>{intro}</Text> : intro}
    <Box marginY={1}>
      <Text>{prompt} {hideGoBackPrompt ? '' : goBackPrompt}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onInputSubmit} />
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
    <Box marginY={1}>
      <Text>{prompt ?? 'Continue? (y) yes / (n) no / (a) abort'}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}

interface InProgressSelectorProps {
  onExit?: () => any
  prompt?: string
  intro: string | React.JSX.Element
  inactive?: boolean
}

export const InProgressSelector = ({ intro, prompt, onExit, inactive }: InProgressSelectorProps) => {
  const [textInput, setTextInput] = useState<string>('')
  const { disabled } = useContext(UserInputContext)
  const { addMessage } = useContext(NotificationContext)
  const onSubmit = useCallback(async (input: string) => {
    input = input.toLowerCase()
    setTextInput('')
    if (input === 'x') {
      onExit?.()
      return
    }
    addMessage(`Unrecognized input [${input}]`, { color: 'red' })
  }, [onExit, addMessage])

  return <Box marginTop={1} flexDirection={'column'}>
    {typeof intro === 'string' ? <Text>{intro}</Text> : intro}
    <Box marginY={1}>
      <Text>{prompt ?? 'Enter x to stop'}: </Text>
      <TextInput focus={!inactive && disabled} showCursor value={textInput} onChange={setTextInput} onSubmit={onSubmit} />
    </Box>
  </Box>
}

export const getOptionRange = (strike: number, width: number, tickSpacing: number): [number, number] => {
  const ticks = width * tickSpacing
  const multiplier = TickBase ** ticks
  const lower = strike / multiplier
  const upper = strike * multiplier
  return [lower, upper]
}
