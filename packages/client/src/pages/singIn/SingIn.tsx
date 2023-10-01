import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { singInInitialValues } from '../../constants/initialValues'
import { singInValidationSchema } from '../../constants/validationSchema'
import { AuthService } from '../../services/auth-service'
import { SignInProps, UserService } from '../../services'
import styles from './SingIn.module.css'
import { useState } from 'react'

export const SingIn = () => {
  const navigation = useNavigate()
  const [isAnimation, setAnimation] = useState<boolean>(true)

  const handleSignIn = async (values: SignInProps) => {
    try {
      await AuthService.signIn(values)

      const user = await UserService.getUserInfo()

      if (user) {
        localStorage.setItem('UserYandex', JSON.stringify(user))
        navigation('/about')
      }
    } catch (error) {
      console.error('Вход ошибка ', error)
    }
  }

  const handleClick = () => setAnimation(false)

  const handleBlur = () => setAnimation(true)

  return (
    <Formik
      initialValues={singInInitialValues}
      validationSchema={singInValidationSchema}
      onSubmit={values => handleSignIn(values)}>
      {formik => (
        <div className={styles.loginContainer}>
          <Container maxWidth="sm">
            <div className={isAnimation ? styles.paper : styles.paper2}>
              <Typography variant="h4" className={styles.header}>
                Авторизация
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                onBlur={handleBlur}
                onClick={handleClick}>
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
