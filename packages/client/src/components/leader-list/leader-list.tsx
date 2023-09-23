import React from 'react'
import { ILeaderList } from './interfaces'
import { Container } from '@mui/material'
import { ListStyles } from './styles'
import { LeaderItem } from '../leader-item'

export const LeaderList: React.FC<ILeaderList> = ({ list = [] }) => {
  return (
    <Container sx={ListStyles}>
      {list.map((item, index) => (
        <LeaderItem key={index} item={item} />
      ))}
    </Container>
  )
}
