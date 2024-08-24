import React from 'react'
import { Newline, Text } from 'ink'
import { Commands } from './commands.js'

export const HelpMessage = () => {
  return <>
    <Text>Available commands:<Newline/></Text>
    {Object.values(Commands).map(c => {
      return <Text key={c.full}>({c.short}) {c.full} - {c.tbd ? '[Coming soon] ' : ''}{c.wallet ? '[wallet required] ' : ''}{c.desc} </Text>
    })}
    <Text/>
  </>
}
