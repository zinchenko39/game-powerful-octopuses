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
import { TopicService, TopicType } from '../../services/topic-service'
import { useEffect, useState } from 'react'

const TopicButton = ({ topic }: { topic: TopicType }) => (
  <ListItemButton key={topic.id} component={Link} to={`/forum/${topic.id}`}>
    <ListItemIcon>
      <AccountBoxIcon />
    </ListItemIcon>
    <ListItemText primary={topic.title} secondary={topic.userId} />
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
        {topic.title}
      </Typography>
    </ListItemSecondaryAction>
  </ListItemButton>
)

export const TopicsList: React.FC = () => {
  const [topics, setTopics] = useState<TopicType[]>([])

  const fetchTopics = async () => {
    const topics = await TopicService.getTopics()

    if (Array.isArray(topics)) {
      setTopics(topics)
      return
    }

    console.error('Ошибка получения топиков: ', topics)
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  if (!topics.length) {
    return (
      <List sx={{ m: 3, px: 3, py: 2 }}>
        <Box>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            color={'text.secondary'}>
            тем нет, создайте новую...
          </Typography>
          <Button onClick={fetchTopics}>обновить</Button>
        </Box>
      </List>
    )
  }

  return (
    <List sx={{ m: 3, px: 3, py: 2 }}>
      {topics.map(topic => (
        <TopicButton key={topic.id} topic={topic} />
      ))}
    </List>
  )
}
