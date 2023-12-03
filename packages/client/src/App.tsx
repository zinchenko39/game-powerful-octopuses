import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { ThemeProvider } from '@mui/material/styles'
import ErrorBoundary from './services/error-boundary'
import { CssBaseline } from '@mui/material'
import { useThemeContext } from './theme'

export const App = () => {
  useEffect(() => {
    Notification.requestPermission().then(permission => {
      console.log(permission)
    })
  }, [])

  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  )
}
