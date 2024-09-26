import React from 'react'
import { Text } from 'ink'
import { Commands } from './commands.js'
import { SectionTitle } from './common.js'

export const HelpMessage = () => {
  return <>
    <SectionTitle>Help Menu</SectionTitle>
    {Object.values(Commands).map(c => {
      return <Text color={c.tbd ? 'gray' : undefined } key={c.full}>
        ({c.short}) {c.full} - {c.tbd ? '[Coming soon] ' : ''}{c.wallet ? '[wallet required] ' : ''}{c.desc}
      </Text>
    })}
    <Text/>
  </>
}
