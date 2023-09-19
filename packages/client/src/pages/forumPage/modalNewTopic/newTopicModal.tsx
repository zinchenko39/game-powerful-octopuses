import React, { useState } from 'react'
import { Modal, Box, TextField, Button, Typography } from '@mui/material'

type NewTopicModalProps = {
  isOpen: boolean
  onClose: () => void
}

const NewTopicModal: React.FC<NewTopicModalProps> = ({
  isOpen,
  onClose,
}: NewTopicModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleCreateTopic = () => {
    console.log('title: ', title, 'description: ', description)
    setTitle('')
    setDescription('')
    onClose()
    //будет добавлена логика создания новой темы
  }
  const handleClose = () => {
    setTitle('')
    setDescription('')
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
        <TextField
          label="Название темы"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Описание темы"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleCreateTopic}>
          Создать
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onClose}
          style={{ marginLeft: '8px' }}>
          Отмена
        </Button>
      </Box>
    </Modal>
  )
}
export default NewTopicModal
