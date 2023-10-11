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
import { topics, comments } from '../../pages/forum-page/dataFake'
import { newCommentInitialValues } from '../../constants'
import { newCommentValidationSchema } from '../../constants'
import { NewCommentProps } from '../../constants'
import { CustomTextField } from '../custom-text-field'

export const TopicDetails: React.FC = () => {
  const { topicId } = useParams()
  const topic = topics.find(({ id }) => String(id) === topicId)

  const handleAddComment = (
    values: NewCommentProps,
    { resetForm }: FormikHelpers<NewCommentProps>
  ) => {
    console.log(values)
    resetForm()
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
            {topic?.autor}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" color="initial" component="h1">
            {topic?.title}
          </Typography>
          <Typography variant="body1" color="initial">
            {topic?.description}
          </Typography>
        </Grid>
      </Grid>
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
