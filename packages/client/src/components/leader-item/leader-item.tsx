import React from 'react'
import type { ILeaderItem } from './interfaces'
import { Container, Typography } from '@mui/material'
import { LeaderItemStyles } from './styles'

export const LeaderItem: React.FC<ILeaderItem> = ({ item }) => {
  return (
    <Container sx={LeaderItemStyles}>
      <Typography variant="subtitle1" component="p" align="left">
        {item.name}
      </Typography>
      <Typography variant="subtitle1" component="p" align="left">
        {item.points}
      </Typography>
    </Container>
  )
}
