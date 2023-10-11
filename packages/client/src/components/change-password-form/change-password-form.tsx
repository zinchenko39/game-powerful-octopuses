import React from 'react'
import { Formik } from 'formik'
import {
  changePasswordInitialValues,
  changePasswordValidationSchema,
} from '../../constants'
import { IChangePasswordForm } from './interfaces'
import { Button, Container, Typography } from '@mui/material'
import { CustomTextField } from '../custom-text-field'

export const ChangePasswordForm: React.FC<IChangePasswordForm> = ({
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={changePasswordInitialValues}
      validationSchema={changePasswordValidationSchema}
      onSubmit={values => onSubmit(values)}>
      {formik => (
        <Container
          sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>Смена пароля</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Container
              sx={{
                height: '100%',
                gap: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: 0,
                padding: 0,
                boxSizing: 0,
              }}>
              <CustomTextField
                id="oldPassword"
                label="Старый пароль"
                type="password"
              />
              <br />
              <CustomTextField
                id="newPassword"
                label="Новый пароль"
                type="password"
              />
              <br />
              <Button variant="text" type="submit">
                Сохранить
              </Button>
            </Container>
          </form>
        </Container>
      )}
    </Formik>
  )
}
