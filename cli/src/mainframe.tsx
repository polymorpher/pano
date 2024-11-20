import React, { useContext, useState } from 'react'
import { Box, render, Text } from 'ink'
import TextInput from 'ink-text-input'
import { PublicClientProvider, WalletClientProvider } from './client.js'
import Stats from './stats.js'
import { CommandKeys, getOption } from 'src/cmd.js'
import {
  CommandControl,
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
import { type OptionKey } from './options.js'

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
}

const Mainframe: React.FC<MainframeProps> = ({ options, command }) => (
  <CommandProvider options={options} command={command}>
    <NotificationProvider>
      <PublicClientProvider>
        <WalletProvider>
          <WalletClientProvider>
            <Router />
            {!command && <CommandControl />}
            <NotificationBar />
          </WalletClientProvider>
        </WalletProvider>
      </PublicClientProvider>
    </NotificationProvider>
  </CommandProvider>
)

const renderMainframe = (data: MainframeProps) =>
  render(<Mainframe {...data} />)

export default renderMainframe
