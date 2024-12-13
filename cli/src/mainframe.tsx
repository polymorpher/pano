import React, { useContext } from 'react'
import { render } from 'ink'
import { PublicClientProvider, WalletClientProvider } from './client.js'
import Stats from './stats.js'
import { getCommand } from 'src/command/cmd.js'
import {
  CommandControl,
  CommandProvider,
  matchCommand,
  UserInputContext
} from './command/commands.js'
import { HelpMessage } from './help.js'
import { NotificationBar, NotificationProvider } from './notification.js'
import { useWallet, WalletControl, WalletProvider } from './wallet.js'
import { DepositControl } from './deposit.js'
import { WalletRequired } from './errors.js'
import { SellControl } from './trade/sell.js'
import { BuyControl } from './trade/buy.js'
import { PortfolioControl } from './positions/portfolio.js'
import { BurnControl } from './trade/burn.js'
import { CommandKeys } from './command/common.js'

const Router = () => {
  const { input } = useContext(UserInputContext)
  const { wallet } = useWallet()

  const matched = matchCommand(input)

  if (matched?.wallet && !wallet.address) {
    return <WalletRequired />
  }

  const m = matched?.full

  return (
    <>
      {m === CommandKeys.Help && <HelpMessage />}
      {m === CommandKeys.List && <Stats />}
      {m === CommandKeys.Portfolio && <PortfolioControl />}
      {m === CommandKeys.Wallet && <WalletControl />}
      {m === CommandKeys.Deposit && <DepositControl />}
      {m === CommandKeys.Sell && <SellControl />}
      {m === CommandKeys.Buy && <BuyControl />}
      {m === CommandKeys.Burn && <BurnControl />}
    </>
  )
}

const Mainframe: React.FC = () => (
  <CommandProvider>
    <NotificationProvider>
      <PublicClientProvider>
        <WalletProvider>
          <WalletClientProvider>
            <Router />
            {!getCommand() && <CommandControl />}
            <NotificationBar />
          </WalletClientProvider>
        </WalletProvider>
      </PublicClientProvider>
    </NotificationProvider>
  </CommandProvider>
)

const renderMainframe = () => render(<Mainframe />)

export default renderMainframe
