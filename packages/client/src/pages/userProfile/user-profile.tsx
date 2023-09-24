import { Container, Typography, Paper } from '@mui/material'
import { Navigation, UserProfileView } from '../../components'
import { useState, useEffect } from 'react'
import { IUser, UserService } from '../../services'

export const UserProfile = () => {
  // временное решение, пока не настроили Redux
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    try {
      setIsLoading(true)
      UserService.getUserInfo()
        .then(res => setUser(res))
        .finally(() => setIsLoading(false))
    } catch (e) {
      throw new Error((e as unknown as Error).message)
    }
  }, [])

  return (
    <>
      <Typography variant="h1" component="h3" align="center">
        Powerful Octopuses
      </Typography>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          maxWidth: '100%',
        }}>
        <Navigation />
        <Paper
          elevation={0}
          sx={{
            height: '50vh',
            flexGrow: '1',
            mt: '20px',
          }}>
          {!isLoading && user && <UserProfileView user={user} />}
        </Paper>
      </Container>
    </>
  )
}
