import styles from './sing-in.module.css'
import { useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography, Container, Divider } from '@mui/material'
import { CustomTextField } from '../../components/custom-text-field'
import { singInInitialValues } from '../../constants/initial-values'
import { singInValidationSchema } from '../../constants/validation-schema'
import { OAuthService, SignInProps } from '../../services'
import { useLazyGetUserQuery, useSignInMutation } from '../../store/api'
import { OAuth } from '../../components'

export const SingIn = () => {
  const navigation = useNavigate()
  const [signIn] = useSignInMutation()
  const [isAnimation, setAnimation] = useState<boolean>(true)

  const [fetch] = useLazyGetUserQuery()

  const searchParams = new URLSearchParams(window.location.search)

  const handleSignIn = async (values: SignInProps) => {
    try {
      await signIn(values)

      fetch()

      navigation('/about')
    } catch (error) {
      console.error('Вход ошибка ', error)
    }
  }

  const handleFocus = () => setAnimation(false)

  const handleBlur = () => setAnimation(true)

  const trySignIn = useCallback(async () => {
    const code = searchParams.get('code')
    if (code) {
      await OAuthService.signInOauth({ code })
      fetch()
      console.log(`Code from URL: ${code}`)
    }
  }, [])

  useEffect(() => {
    trySignIn()
  }, [])

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
                </div>
              </form>
              <OAuth />
            </div>
          </Container>
        </div>
      )}
    </Formik>
  )
}
