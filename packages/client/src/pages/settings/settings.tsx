import { Typography, Container, Paper } from '@mui/material'
import {
  Navigation,
  ChangePasswordForm,
  ChangeAvatarForm,
} from '../../components'
import { ChangePasswordProps, UserService } from '../../services'

export const SettingsPage = () => {
  const handleUpdatePassword = async (values: ChangePasswordProps) => {
    try {
      await UserService.changeUserPassword(values)
    } catch (e: unknown) {
      throw new Error((e as Error).message)
    }
  }

  const handleUpdateAvatar = async (file: File) => {
    try {
      const formData = new FormData()

      formData.append('avatar', file, `${file.name}`)

      await UserService.changeUserAvatar(formData)
    } catch (e: unknown) {
      throw new Error((e as Error).message)
    }
  }

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
            gap: '12px',
          }}>
          <ChangePasswordForm onSubmit={handleUpdatePassword} />
          <ChangeAvatarForm onSubmit={handleUpdateAvatar} />
        </Paper>
      </Container>
    </>
  )
}
