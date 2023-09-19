import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import styles from './SingUp.module.css'

const validationSchema = Yup.object({
  first_name: Yup.string().required('Обязательное поле'),
  second_name: Yup.string().required('Обязательное поле'),
  login: Yup.string().required('Обязательное поле'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
  phone: Yup.string().required('Обязательное поле'),
})

export const SingUp = () => {
  const initialValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values)
      }}>
      {formik => (
        <div className={styles.registrationContainer}>
          <Container maxWidth="sm">
            <div className={styles.paper}>
              <Typography variant="h4" className={styles.header}>
                Регистрация
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <div className={styles.fieldsWrapper}>
                  <CustomTextField id="first_name" label="Имя" type="text" />
                  <CustomTextField
                    id="second_name"
                    label="Фамилия"
                    type="text"
                  />
                  <CustomTextField id="login" label="Логин" type="text" />
                  <CustomTextField id="email" label="Email" type="text" />
                  <CustomTextField
                    id="password"
                    label="Пароль"
                    type="password"
                  />
                  <CustomTextField
                    id="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                  />
                  <CustomTextField id="phone" label="Телефон" type="tel" />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    className={styles.submitButton}>
                    Зарегистрироваться
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </div>
      )}
    </Formik>
  )
}
