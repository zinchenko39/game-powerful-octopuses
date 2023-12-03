import { Link, useParams } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik'
import { TopicCommentSection } from '../topic-comment-section'
import {
  Typography,
  Box,
  Breadcrumbs,
  Avatar,
  Divider,
  Grid,
  Button,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { comments } from '../../pages/forum-page/dataFake'
import { newCommentInitialValues } from '../../constants'
import { newCommentValidationSchema } from '../../constants'
import { NewCommentProps } from '../../constants'
import { CustomTextField } from '../custom-text-field'
import { useEffect, useState } from 'react'
import { TopicService, TopicType } from '../../services/topic-service'

export const TopicDetails: React.FC = () => {
  const { topicId } = useParams()
  const [topic, setTopic] = useState<TopicType | null>(null)

  const handleAddComment = (
    values: NewCommentProps,
    { resetForm }: FormikHelpers<NewCommentProps>
  ) => {
    resetForm()
  }

  useEffect(() => {
    ;async () => {
      if (!topicId) return

      const currentTopic = await TopicService.getTopic({ topicId })

      if ('id' in currentTopic) {
        setTopic(currentTopic)
        return
      }

      console.error('Ошибка получения топиков: ', currentTopic)
    }
  }, [topicId])

  const content = topic ? (
    <Grid container spacing={0} sx={{ my: 2, height: 'max-content' }}>
      <Grid item xs={1} sx={{ padding: 1 }}>
        <Avatar>
          <AccountBoxIcon />
        </Avatar>
        <Typography variant="subtitle2" color="text.secondary">
          {topic?.userId}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h6" color="initial" component="h1">
          {topic?.title}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <>нет данных о топике</>
  )

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
      {content}
      <Divider textAlign="left">Комментарии:</Divider>
      <Box sx={{ margin: 2, display: 'flex', flexDirection: 'row' }}>
        <Formik
          initialValues={newCommentInitialValues}
          validationSchema={newCommentValidationSchema}
          onSubmit={handleAddComment}>
          <Form>
            <Box sx={{ margin: 2 }}>
              <CustomTextField
                id="newComment"
                label="Новый комментарий"
                type="text"
              />
              <Button type="submit" variant="outlined">
                Добавить
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
      <TopicCommentSection comments={comments} />
    </main>
  )
}
