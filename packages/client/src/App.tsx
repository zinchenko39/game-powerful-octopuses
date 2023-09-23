import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'

import { IUser, UserService } from './services/user-service'
import ErrorBoundary from './service/ErrorBoundary'

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
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Router isAuthorized={!!user} />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
