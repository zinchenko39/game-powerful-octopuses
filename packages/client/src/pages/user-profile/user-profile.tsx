import { Container, Typography, Paper } from '@mui/material'
import { Navigation, UserProfileView } from '../../components'

export const UserProfile = () => (
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
        <UserProfileView />
      </Paper>
    </Container>
  </>
)
