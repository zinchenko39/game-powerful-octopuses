import { Typography, TextField, Container, Button } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { IChangeAvatarForm } from './interfaces'

export const ChangeAvatarForm: React.FC<IChangeAvatarForm> = ({ onSubmit }) => {
  const [file, setFile] = useState<File>()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFile(event.target.files[0])
    }
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography>Смена аватара</Typography>
      <TextField
        type="file"
        onChange={event =>
          handleFileChange(event as ChangeEvent<HTMLInputElement>)
        }
      />
      <Button
        variant="text"
        onClick={() => {
          if (file) {
            onSubmit(file)
          }
        }}>
        Сохранить
      </Button>
    </Container>
  )
}
