import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography, Container, Divider } from '@mui/material'
import { CustomTextField } from '../../components/custom-text-field'
import { singInInitialValues } from '../../constants/initial-values'
import { singInValidationSchema } from '../../constants/validation-schema'
import { SignInProps } from '../../services'
import styles from './sing-in.module.css'
import { useState } from 'react'
import { useLazyGetUserQuery, useSignInMutation } from '../../store/api'
import icon from './oauth.svg'
import { HOST_URL } from '../../globals'
import { OAuthService } from '../../services'

export const SingIn = () => {
  const navigation = useNavigate()
  const [signIn] = useSignInMutation()
  const [isAnimation, setAnimation] = useState<boolean>(true)

  const [fetch] = useLazyGetUserQuery()

  const handleSignIn = async (values: SignInProps) => {
    try {
      await signIn(values)

      fetch()

      navigation('/about')
    } catch (error) {
      console.error('Вход ошибка ', error)
    }
  }

  const handleOauth = async () => {
    try {
      const data = await OAuthService.getServiceId(HOST_URL)
      console.log(data)
    } catch (error) {
      console.error('Авторизация ошибка ', error)
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
                  <Divider textAlign="center">или</Divider>
                  <Link to="/sign-up">Еще нет аккаунта?</Link>
                  <Button
                    sx={{ ':hover': { bgcolor: 'transparent' } }}
                    onClick={handleOauth}>
                    <img src={icon} alt="oauth" />
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
