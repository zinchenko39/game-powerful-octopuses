import React from 'react'
import { Modal, Box, Button, Typography } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import { newTopicInitialValues } from '../../../constants/initialValues'
import { newTopicValidationSchema } from '../../../constants/validationSchema'
import { CustomTextField } from '../../../components/CustomTextField/CustomTextField'
import { TopicDetailsProps } from '../../../constants/forumInterface'

type NewTopicModalProps = {
  isOpen: boolean
  onClose: () => void
}

const NewTopicModal: React.FC<NewTopicModalProps> = ({
  isOpen,
  onClose,
}: NewTopicModalProps) => {
  const handleCreateTopic = (
    values: TopicDetailsProps,
    { resetForm }: FormikHelpers<TopicDetailsProps>
  ) => {
    console.log(values)
    resetForm()
    onClose()
    //будет добавлена логика создания новой темы
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
export default NewTopicModal
