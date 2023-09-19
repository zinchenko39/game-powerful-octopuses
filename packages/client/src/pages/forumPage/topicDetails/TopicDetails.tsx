import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopicCommentSection } from './TopicCommentSection'
import {
  Typography,
  Box,
  Breadcrumbs,
  Avatar,
  Divider,
  Grid,
  Button,
  TextField,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { topics, comments } from '../dataFake'

export const TopicDetails: React.FC = () => {
  const { topicId } = useParams()
  const topic = topics.find(({ id }) => String(id) === topicId)

  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return
    }
    console.log('Новый комментарий: ', newComment)
    setNewComment('')
  }

  return (
    <main>
      <Breadcrumbs aria-label="breadcrumb">
        <Box component={Link} to="/about">
          Главная
        </Box>
        <Box component={Link} to="/forum">
          Форум
        </Box>
        <Typography color="text.primary">{topic?.title}</Typography>
      </Breadcrumbs>
      <Grid container spacing={0} sx={{ my: 2, height: 'max-content' }}>
        <Grid item xs={1} sx={{ padding: 1 }}>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary">
            {' '}
            {topic?.autor}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" color="initial" component="h1">
            {topic?.title}
          </Typography>
          <Typography variant="body1" color="initial">
            {' '}
            {topic?.description}
          </Typography>
        </Grid>
      </Grid>
      <Divider textAlign="left">Комментарии:</Divider>
      <Box sx={{ margin: 2, display: 'flex', flexDirection: 'row' }}>
        <TextField
          id="outlined-basic"
          label="Новый комментарий"
          variant="outlined"
          value={newComment}
          onChange={handleCommentChange}
          sx={{ width: '50%' }}
        />
        <Button variant="outlined" onClick={handleAddComment}>
          Добавить комментарий
        </Button>
      </Box>
      <TopicCommentSection comments={comments} />
    </main>
  )
}
