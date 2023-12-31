import React from 'react'
import { Modal, Box, Button, Typography } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { newTopicInitialValues } from '../../constants'
import { newTopicValidationSchema } from '../../constants'
import { CustomTextField } from '../custom-text-field'
import { TopicDetailsProps } from '../../constants'
import { TopicService } from '../../services/topic-service'
import { useUser } from '../../hooks'

type NewTopicModalProps = {
  isOpen: boolean
  onClose: () => void
  callback: () => void
}

export const NewTopicModal: React.FC<NewTopicModalProps> = ({
  isOpen,
  onClose,
  callback,
}: NewTopicModalProps) => {
  const user = useUser()

  const handleCreateTopic = async (
    values: TopicDetailsProps,
    { resetForm }: FormikHelpers<TopicDetailsProps>
  ) => {
    if (!user?.id) return

    const data = await TopicService.createTopic({
      userId: user.id,
      title: values.title,
      description: values.description,
    })

    if ('id' in data) {
      if (callback) callback()

      resetForm()

      onClose()
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}>
        <Typography variant="h6">Создать новую тему</Typography>
        <Formik
          initialValues={newTopicInitialValues}
          validationSchema={newTopicValidationSchema}
          onSubmit={handleCreateTopic}>
          <Form>
            <Box sx={{ py: 2 }}>
              <Box sx={{ py: 2 }}>
                <CustomTextField id="title" label="Название темы" type="text" />
              </Box>
              <Box sx={{ py: 2 }}>
                <CustomTextField
                  id="description"
                  label="Описание темы"
                  type="text"
                />
              </Box>
            </Box>
            <div>
              <Button type="submit" variant="contained" color="success">
                Создать
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={onClose}
                style={{ marginLeft: '8px' }}>
                Отмена
              </Button>
            </div>
          </Form>
        </Formik>
      </Box>
    </Modal>
  )
}
