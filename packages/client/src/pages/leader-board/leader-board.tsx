import { Container, Paper, Typography } from '@mui/material'
import { LeaderList, Navigation } from '../../components'

export const LeaderBoard = () => {
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
          <Typography variant="h4" component="h4" align="center">
            Таблица лидеров
          </Typography>
          <LeaderList
            list={[
              { name: 'Игрок 1', points: 1920 },
              { name: 'Игрок 2', points: 190 },
              { name: 'Игрок 3', points: 20 },
            ]}
          />
        </Paper>
      </Container>
    </>
  )
}
