import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import ErrorBoundary from './services/error-boundary'

const theme = createTheme({
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  )
}

export default App
