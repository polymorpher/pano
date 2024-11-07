import React, { useContext, useState } from 'react'
import { Box, render, Text } from 'ink'
import TextInput from 'ink-text-input'
import { PublicClientProvider, WalletClientProvider } from './client.js'
import Stats from './stats.js'
import {
  CommandControl,
  CommandKeys,
  CommandProvider,
  matchCommand,
  useOption,
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
import { commandOptions, type OptionKey } from './options.js'

const Router = () => {
  const { input } = useContext(UserInputContext)
  const { wallet } = useWallet()
  const force = useOption('force')
  const sync = useOption('sync')
  const [confirmInput, setConfirmInput] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>()

  const matched = matchCommand(input)

  if (matched?.wallet && !wallet.address) {
    return <WalletRequired />
  }

  if (input === CommandKeys.Portfolio && !sync) {
    // pass
  } else if (commandOptions[input as CommandKeys]?.force && !force) {
    if (confirmed === undefined) {
      return (
        <Box marginTop={1}>
          <Text>Are you ready to proceed? (y/n): </Text>
          <TextInput
            focus
            showCursor
            value={confirmInput}
            onChange={setConfirmInput}
            onSubmit={(value) => {
              setConfirmed(value.toLowerCase() === 'y')
            }}
          />
        </Box>
      )
    }

    if (!confirmed) {
      return <></>
    }
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

const renderMainframe = (data: MainframeProps) =>
  render(<Mainframe {...data} />)

export default renderMainframe
