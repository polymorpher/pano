import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@chakra-ui/react/provider'
import { baseTheme } from '@chakra-ui/theme'
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider theme={baseTheme}>
      <App />
    </Provider>
  </StrictMode>,
)
