import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@chakra-ui/react/provider'
import { baseTheme } from '@chakra-ui/theme'
import { NotificationBar, NotificationProvider } from '@cli/notification.js'
import { PublicClientProvider, WalletClientProvider } from '@cli/client.js'
import { WalletProvider } from '@cli/wallet.js'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider theme={baseTheme}>
      <NotificationProvider>
        <PublicClientProvider>
          <WalletProvider>
            <WalletClientProvider>
              <App />
              <NotificationBar />
            </WalletClientProvider>
          </WalletProvider>
        </PublicClientProvider>
      </NotificationProvider>
    </Provider>
  </StrictMode>,
)
