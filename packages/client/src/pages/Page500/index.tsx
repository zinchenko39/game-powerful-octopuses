import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

const primary = green[500]

type Page500Props = {
  description?: string | null
}

export const Page500: FC<Page500Props> = ({ description }) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(-1)

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
        Вернуться назад
      </Button>
    </Box>
  )
}
