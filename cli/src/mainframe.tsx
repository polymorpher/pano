import React, { useContext } from 'react'
import { render } from 'ink'
import { PublicClientProvider, WalletClientProvider } from './client.js'
import Stats from './stats.js'
import { CommandControl, CommandKeys, CommandProvider, matchCommand, UserInputContext } from './commands.js'
import { HelpMessage } from './help.js'
import { NotificationBar, NotificationProvider } from './notification.js'
import { WalletControl, WalletProvider } from './wallet.js'
import { DepositControl } from './deposit.js'

const Router = () => {
  const { input } = useContext(UserInputContext)
  const m = matchCommand(input)?.full
  return <>
    {m === CommandKeys.Help && <HelpMessage/>}
    {m === CommandKeys.List && <Stats/>}
    {m === CommandKeys.Wallet && <WalletControl/>}
    {m === CommandKeys.Deposit && <DepositControl/>}
  </>
}

const Mainframe = () => {
  return <NotificationProvider>
    <PublicClientProvider>
      <WalletProvider>
        <WalletClientProvider>
          <CommandProvider>
            <Router/>
            <CommandControl/>
            <NotificationBar/>
          </CommandProvider>
        </WalletClientProvider>
      </WalletProvider>
    </PublicClientProvider>
  </NotificationProvider>
}

export default Mainframe

export const renderMainframe = () => {
  return render(<Mainframe/>)
}
