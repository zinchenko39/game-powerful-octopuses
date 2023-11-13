import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Box,
  Button,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CommentIcon from '@mui/icons-material/Comment'
import { topics } from '../../pages/forum-page/dataFake'
import { getAllTopics } from '../../store/forum-slice'
import { get } from 'lodash'
import { AppDispatch } from '../../store'
import { ForumService } from '../../services/forum-service/forum-service'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const TopicsList: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    ForumService.getAllTopics()
  }, [])
  return <Button onClick={() => getAllTopics()}>Test</Button>

  return (
    <List sx={{ m: 3, px: 3, py: 2 }}>
      {topics.length === 0 ? (
        <Box>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            color={'text.secondary'}>
            тем нет, создайте новую...
          </Typography>
        </Box>
      ) : (
        topics.map(topic => (
          <ListItemButton
            key={topic.id}
            component={Link}
            to={`/forum/${topic.id}`}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={topic.title} secondary={topic.autor} />
            <ListItemSecondaryAction>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <Typography
                component="div"
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ width: '50%' }}>
                {topic.comment}
              </Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))
      )}
    </List>
  )
}
