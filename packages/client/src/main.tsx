import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App'
import './index.css'
import { store, type RootState } from './store'
import { BrowserRouter } from 'react-router-dom'

declare const window: Window &
  typeof globalThis & {
    __PRELOADED_STATE__?: RootState
  }

delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
