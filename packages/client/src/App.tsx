import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { IUser, UserService } from './services/user-service'
import ErrorBoundary from './services/ErrorBoundary'

const theme = createTheme({
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
})

function App() {
  const [user, setUser] = useState<IUser>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        if (!user) {
          const user = await UserService.getUserInfo()
          setUser(user)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServerData()
    fetchUserData()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!isLoading && (
          <BrowserRouter>
            <ErrorBoundary>
              <Router isAuthorized={!!user} />
            </ErrorBoundary>
          </BrowserRouter>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
