import React, { useContext } from 'react'
import { render, Text } from 'ink'
import { PublicClientProvider } from './client.js'
import Stats from './stats.js'
import { CommandKeys, CommandProvider, matchCommand, UserInputContext } from './commands.js'
import { HelpMessage } from './help.js'
import { NotificationBar, NotificationProvider } from './notification.js'

const InvalidCommandMessage = ({ command }: { command: string }) => {
  return <>
    <Text>Invalid Command [{command}].</Text>
    <Text>Available commands: {Object.values(CommandKeys).join(', ')}</Text>
  </>
}

const Router = () => {
  const { input } = useContext(UserInputContext)
  const m = matchCommand(input)?.full
  return <>
    <Text color={'green'}>========================================</Text>
    {!m && <InvalidCommandMessage command={input}/>}
    {m === CommandKeys.Help && <HelpMessage/>}
    {m === CommandKeys.List && <Stats/>}
  </>
}

const Mainframe = () => {
  return <NotificationProvider>
    <PublicClientProvider>
      <CommandProvider>
        <Router/>
        <NotificationBar/>
      </CommandProvider>
    </PublicClientProvider>
  </NotificationProvider>
}

export default Mainframe

export const renderMainframe = () => {
  return render(<Mainframe/>)
}
