import { Formik, FormikValues } from 'formik'
import { Button, Typography, Container } from '@mui/material'
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { Link, useNavigate } from 'react-router-dom'
import { singUpInitialValues } from '../../constants/initialValues'
import { singUpValidationSchema } from '../../constants/validationSchema'
import { AuthService } from '../../services/auth-service'
import { SignUpProps, UserService } from '../../services'
import styles from './SingUp.module.css'
import { RouterName } from '../../router/types'
import { useState } from 'react'

type SignUpFormProps = SignUpProps & { confirmPassword: string }

export const SingUp = () => {
  const navigate = useNavigate()
  const [isAnimation, setAnimation] = useState<boolean>(true)

  const handleSignUp = async (values: SignUpProps) => {
    try {
      await AuthService.signUp(values)

      await UserService.getUserInfo()

      navigate(RouterName.about)
    } catch (error) {
      navigate(RouterName.error500)

      console.error('Авторизация ошибка ', error)
    }
  }

  const handleBlur = () => {
    setAnimation(true)
  }

  const handleFocus = () => {
    setAnimation(false)
  }

  const handleSubmit = (values: SignUpFormProps) => {
    const { confirmPassword, ...signUpData } = { ...values }

    handleSignUp(signUpData)
  }

  return (
    <Formik<SignUpFormProps>
      initialValues={singUpInitialValues}
      validationSchema={singUpValidationSchema}
      onSubmit={handleSubmit}>
      {formik => (
        <div className={styles.registrationContainer}>
          <Container maxWidth="sm">
            <div
              className={styles.paper}
              style={isAnimation ? {} : { animation: 'unset' }}>
              <Typography variant="h4" className={styles.header}>
                Регистрация
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                onBlur={handleBlur}
                onFocus={handleFocus}>
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
