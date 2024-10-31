import React, { useContext } from 'react'
import { PublicClientProvider, WalletClientProvider } from './client.js'
import Stats from './stats.js'
import {
  CommandControl,
  CommandKeys,
  CommandProvider,
  matchCommand,
  UserInputContext
} from './commands.js'
import { HelpMessage } from './help.js'
import { NotificationBar, NotificationProvider } from './notification.js'
import { useWallet, WalletControl, WalletProvider } from './wallet.js'
import { DepositControl } from './deposit.js'
import { WalletRequired } from './errors.js'
import { SellControl } from './trade/sell.js'
import { BuyControl } from './trade/buy.js'
import { PortfolioControl } from './positions/portfolio.js'
import { BurnControl } from './trade/burn.js'
import type { OptionKey } from './options.ts'

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

export interface MainframeProps {
  command?: CommandKeys
  options: Record<OptionKey, string>
  cli?: boolean
}

const Mainframe: React.FC<MainframeProps> = ({ options, command, cli }) => {
  return (
    <CommandProvider options={options} command={command} cli={cli}>
      <NotificationProvider>
        <PublicClientProvider>
          <WalletProvider>
            <WalletClientProvider>
              {cli ? (
                <>
                  <NotificationBar />
                  <Router />
                </>
              ) : (
                <>
                  <Router />
                  <CommandControl />
                  <NotificationBar />
                </>
              )}
            </WalletClientProvider>
          </WalletProvider>
        </PublicClientProvider>
      </NotificationProvider>
    </CommandProvider>
  )
}

export default Mainframe
