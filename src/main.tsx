import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Web3CoreProvider, Web3SyncProvider } from '@dcl/core-web3'
import { AnalyticsProvider, TranslationProvider } from '@dcl/hooks'
import { DclThemeProvider, darkTheme } from 'decentraland-ui2'
import { store } from './app/store'
import { getEnv } from './config'
import { web3Config } from './features/web3/web3.config'
import en from './intl/en.json'
import { AppRoutes } from './Routes'

const segmentWriteKey = getEnv('SEGMENT_API_KEY') || ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Web3CoreProvider config={web3Config}>
        <Web3SyncProvider>
          <DclThemeProvider theme={darkTheme}>
            <AnalyticsProvider writeKey={segmentWriteKey}>
              <TranslationProvider locale="en" translations={{ en }} fallbackLocale="en">
                <BrowserRouter basename="/">
                  <AppRoutes />
                </BrowserRouter>
              </TranslationProvider>
            </AnalyticsProvider>
          </DclThemeProvider>
        </Web3SyncProvider>
      </Web3CoreProvider>
    </Provider>
  </StrictMode>
)
