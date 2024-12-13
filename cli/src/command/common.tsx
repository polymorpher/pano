export interface Command {
  short: string
  full: string
  desc: string
  wallet?: boolean
  tbd?: boolean
  submenu?: boolean // take exclusive focus on input, suppress user commands
}
export enum CommandKeys {
  Help = 'help',
  List = 'list',
  Wallet = 'wallet',
  Deposit = 'deposit',
  Portfolio = 'portfolio',
  Sell = 'sell',
  Buy = 'buy',
  Mint = 'mint',
  Burn = 'burn',
  Manage = 'manage',
  Quit = 'quit'
}

export const Commands: Record<CommandKeys, Command> = {
  help: { short: 'h', full: 'help', desc: 'show all commands' },
  list: {
    short: 'l',
    full: 'list',
    desc: 'List all available pools, and show their pool and collateral statistics'
  },
  wallet: {
    short: 'w',
    full: 'wallet',
    desc: 'Set private key for wallet (if not already set through .env, environment variable, or command line)',
    submenu: true
  },
  deposit: {
    short: 'd',
    full: 'deposit',
    desc: 'Deposit or withdraw funds as collateral in one of the trading pools, so you can start trading options',
    submenu: true,
    wallet: true
  },
  portfolio: {
    short: 'p',
    full: 'portfolio',
    desc: 'Show your deposited assets collateral value, open positions, margin requirement, and net value of each position',
    wallet: true,
    submenu: true
  },
  sell: {
    short: 's',
    full: 'sell',
    desc: 'Sell a simple option (open a short position with a single leg)',
    wallet: true,
    submenu: true
  },
  buy: {
    short: 'b',
    full: 'buy',
    desc: 'Buy a simple option (open a long position with a single leg)',
    wallet: true,
    submenu: true
  },
  burn: {
    short: 'u',
    full: 'burn',
    desc: 'Burn an option (close an existing position you minted)',
    wallet: true,
    submenu: true
  },
  mint: {
    short: 'a',
    full: 'advanced',
    desc: 'Mint a complex option (open a position with multiple legs that potentially hedge against each other, mixing long and short)',
    tbd: true,
    submenu: true
  },
  manage: {
    short: 'm',
    full: 'manage',
    desc: 'Perform market management operations (permissionless liquidation, forced exercise)',
    wallet: true,
    tbd: true
  },
  quit: { short: 'q', full: 'quit', desc: 'exit the program' }
}
