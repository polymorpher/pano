import React, { useContext } from 'react'
import { render, Text } from 'ink'
import { PublicClientProvider } from './client.js'
import Stats from './stats.js'
import { CommandControl, CommandKeys, CommandProvider, matchCommand, UserInputContext } from './commands.js'
import { HelpMessage } from './help.js'
import { NotificationBar, NotificationProvider } from './notification.js'
import { WalletControl, WalletProvider } from './wallet.js'

const Router = () => {
  const { input } = useContext(UserInputContext)
  const m = matchCommand(input)?.full
  return <>
    {m === CommandKeys.Help && <HelpMessage/>}
    {m === CommandKeys.List && <Stats/>}
    {m === CommandKeys.Wallet && <WalletControl/>}
  </>
}

const Mainframe = () => {
  return <NotificationProvider>
    <PublicClientProvider>
      <WalletProvider>
        <CommandProvider>
          <Router/>
          <CommandControl/>
          <NotificationBar/>
        </CommandProvider>
      </WalletProvider>
    </PublicClientProvider>
  </NotificationProvider>
}

export default Mainframe

export const renderMainframe = () => {
  return render(<Mainframe/>)
}
