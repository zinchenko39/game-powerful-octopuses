import { useEffect } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useGetTeamLeaderboardMutation } from '../../store/api/leader-board-api/leader-board-api'
import { LeaderList, Navigation } from '../../components'

export const LeaderBoard = () => {
  const [getTeamLeaderboard, { data: leaderboardData, isLoading }] =
    useGetTeamLeaderboardMutation()

  useEffect(() => {
    getTeamLeaderboard({
      cursor: 0,
      limit: 10,
    })
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
          <Typography variant="h4" component="h4" align="center">
            Таблица лидеров
          </Typography>
          {isLoading ? (
            <Box display="flex" justifyContent="center" marginTop="50px">
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <>
              {leaderboardData && (
                <LeaderList
                  list={leaderboardData.map(item => ({
                    name: item.data.name || 'Неизвестный игрок',
                    points: item.data?.powerfulOctopuses,
                  }))}
                />
              )}
            </>
          )}
        </Paper>
      </Container>
    </>
  )
}
