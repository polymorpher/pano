import React from 'react'
import { Text } from 'ink'
import { Commands } from 'src/cmd.js'
import { SectionTitle } from './common.js'

export const HelpMessage = () => (
  <>
    <SectionTitle>Help Menu</SectionTitle>
    {Object.values(Commands).map((c) => (
      <Text color={c.tbd ? 'gray' : undefined} key={c.full}>
        ({c.short}) {c.full} - {c.tbd ? '[Coming soon] ' : ''}
        {c.wallet ? '[wallet required] ' : ''}
        {c.desc}
      </Text>
    ))}
    <Text />
  </>
)
