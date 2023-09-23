import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Router } from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { IUser, UserService } from './services/user-service'
import ErrorBoundary from './service/ErrorBoundary'

const theme = createTheme({
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
})

function App() {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    const fetchUserData = async () => {
      if (!user) {
        const user = await UserService.getUserInfo()
        setUser(user)
      }
    }

    fetchServerData()
    fetchUserData()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <ErrorBoundary>
            <Router isAuthorized={!!user} />
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
