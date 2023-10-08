import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { singInInitialValues } from '../../constants/initialValues'
import { singInValidationSchema } from '../../constants/validationSchema'
import { SignInProps } from '../../services'
import styles from './SingIn.module.css'
import { useState } from 'react'
import { useSignInMutation } from '../../store/api'

export const SingIn = () => {
  const navigation = useNavigate()
  const [signIn] = useSignInMutation()
  const [isAnimation, setAnimation] = useState<boolean>(true)

  const handleSignIn = async (values: SignInProps) => {
    try {
      await signIn(values)

      navigation('/about')
    } catch (error) {
      console.error('Вход ошибка ', error)
    }
  }

  const handleFocus = () => setAnimation(false)

  const handleBlur = () => setAnimation(true)

  return (
    <Formik
      initialValues={singInInitialValues}
      validationSchema={singInValidationSchema}
      onSubmit={values => handleSignIn(values)}>
      {formik => (
        <div className={styles.loginContainer}>
          <Container maxWidth="sm">
            <div
              className={styles.paper}
              style={isAnimation ? {} : { animation: 'unset' }}>
              <Typography variant="h4" className={styles.header}>
                Авторизация
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                onBlur={handleBlur}
                onFocus={handleFocus}>
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
