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

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
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

//export default App
