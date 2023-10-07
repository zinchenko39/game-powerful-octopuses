import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import ErrorBoundary from './services/ErrorBoundary'
import { useGetUserQuery } from './store/api'

const theme = createTheme({
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
})

function App() {
  const { isLoading } = useGetUserQuery()

  if (isLoading) return <>Загрузка</>

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

export default App
