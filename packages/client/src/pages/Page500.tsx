import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'

const primary = green[500]

type Page500Props = {
  description?: string | null
}

export const Page500: FC<Page500Props> = ({ description }) => (
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
    <Button variant="contained">Вернуться назад</Button>
  </Box>
)
