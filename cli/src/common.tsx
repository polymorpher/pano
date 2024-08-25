import React, { type PropsWithChildren } from 'react'
import { Box, Text } from 'ink'
import type { Pair } from './config.js'
import type { Address } from 'viem'

export const SectionTitle = ({ children }: PropsWithChildren) => {
  return <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1}><Text color={'yellow'}>{children}</Text></Box>
}

export interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}
