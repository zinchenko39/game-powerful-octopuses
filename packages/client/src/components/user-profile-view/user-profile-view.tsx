import React from 'react'
import type { IUserProfileView } from './interfaces'
import { Avatar, Button, Container, Typography } from '@mui/material'
import { BASE_URL } from '../../globals'
import { useNavigate } from 'react-router-dom'
import { LeaderList } from '../leader-list'

export const UserProfileView: React.FC<IUserProfileView> = ({ user }) => {
  const navigate = useNavigate()

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '20px',
      }}>
      <Avatar
        sx={{ width: 128, height: 128 }}
        alt="avatar"
        src={`${BASE_URL}/resources/${user.avatar}`}
      />
      <Typography variant="h6" component="h6" align="center">
        {user.first_name} {user.second_name}
      </Typography>
      <Typography variant="subtitle2" component="p" align="center">
        @{user.login}
      </Typography>
      <Button variant="text" onClick={() => navigate('/settings')}>
        Настройки
      </Button>
      <Container
        sx={{
          width: '100%',
        }}>
        <LeaderList
          list={[
            { name: '01.01.2001', points: 1920 },
            { name: '01.01.2001', points: 190 },
            { name: '01.01.2001', points: 20 },
          ]}
        />
      </Container>
    </Container>
  )
}
