import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '../../HOC/with-auth'
import { RouterName } from '../../router/types'

const primary = green[500]

type Page500Props = {
  description?: string | null
}

export const Page500: FC<Page500Props> = withAuth(({ description, isAuth }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(isAuth ? RouterName.about : RouterName.signIn)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}>
      <Typography variant="h1" style={{ color: 'white' }}>
        500
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        {description || 'Ошибка сервера'}
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        {isAuth ? 'Перейти в меню' : 'Войти'}
      </Button>
    </Box>
  )
})
