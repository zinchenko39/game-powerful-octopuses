import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { ThemeProvider } from '@mui/material/styles'
import ErrorBoundary from './services/error-boundary'
import { CssBaseline } from '@mui/material'
import { useThemeContext } from './theme'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
