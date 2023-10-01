import React from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { singInInitialValues } from '../../constants/initialValues'
import { singInValidationSchema } from '../../constants/validationSchema'
import { AuthService } from '../../services/auth-service'
import { SignInProps } from '../../services'
import styles from './SingIn.module.css'

export const SingIn = () => {
  const handleSignIn = async (values: SignInProps) => {
    try {
      const responce = await AuthService.signIn(values)
      console.log('Зашли ', responce)
      window.location.href = '/about'
    } catch (error) {
      console.error('Вход ошибка ', error)
    }
  }
  return (
    <Formik
      initialValues={singInInitialValues}
      validationSchema={singInValidationSchema}
      onSubmit={values => handleSignIn(values)}>
      {formik => (
        <div className={styles.loginContainer}>
          <Container maxWidth="sm">
            <div className={styles.paper}>
              <Typography variant="h4" className={styles.header}>
                Авторизация
              </Typography>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  formik.handleSubmit(e)
                }}>
                <div className={styles.fieldsWrapper}>
                  <CustomTextField id="login" label="Логин" type="text" />
                  <CustomTextField
                    id="password"
                    label="Пароль"
                    type="password"
                  />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    className={styles.submitButton}>
                    Войти
                  </Button>
                  <Link to="/sign-up">Еще нет аккаунта?</Link>
                </div>
              </form>
            </div>
          </Container>
        </div>
      )}
    </Formik>
  )
}
