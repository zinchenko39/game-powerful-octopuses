import React from 'react'
import { Formik } from 'formik'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { Link, useNavigate } from 'react-router-dom'
import { singUpInitialValues } from '../../constants/initialValues'
import { singUpvalidationSchema } from '../../constants/validationSchema'
import { AuthService } from '../../services/auth-service'
import { SignUpProps } from '../../services'
import styles from './SingUp.module.css'

export const SingUp = () => {
  const navigate = useNavigate()
  const handleSignUp = async (values: SignUpProps) => {
    try {
      const responce = await AuthService.signUp(values)
      console.log('Авторизация ', responce)
      navigate('/about')
    } catch (error) {
      console.error('Авторизация ошибка ', error)
    }
  }
  return (
    <Formik
      initialValues={singUpInitialValues}
      validationSchema={singUpvalidationSchema}
      onSubmit={values => {
        const { confirmPassword, ...signUpData } = { ...values }
        handleSignUp(signUpData)
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
                  <Link to="/sign-in">Уже есть аккаунт?</Link>
                </div>
              </form>
            </div>
          </Container>
        </div>
      )}
    </Formik>
  )
}
