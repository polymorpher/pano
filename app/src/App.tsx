import Stats from '@cli/stats.js'
import { NotificationBar, NotificationProvider } from '@cli/notification.js'
import { PublicClientProvider, WalletClientProvider } from '@cli/client.js'
import { WalletProvider } from '@cli/wallet.js'

function App() {
  return (
    <NotificationProvider>
      <PublicClientProvider>
        <WalletProvider>
          <WalletClientProvider>
            <Stats />
            <NotificationBar />
          </WalletClientProvider>
        </WalletProvider>
      </PublicClientProvider>
    </NotificationProvider>
  )
}

export default App
