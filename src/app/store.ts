import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { networkReducer, transactionsReducer, walletReducer } from '@dcl/core-web3'
import { profileClient } from '../features/profile/profile.client'

const rootReducer = combineReducers({
  network: networkReducer,
  transactions: transactionsReducer,
  wallet: walletReducer,
  [profileClient.reducerPath]: profileClient.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(profileClient.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store, type AppDispatch, type RootState }
