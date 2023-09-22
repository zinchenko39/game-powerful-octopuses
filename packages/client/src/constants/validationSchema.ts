import * as Yup from 'yup'

export const singUpvalidationSchema = Yup.object({
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

export const newTopicValidationSchema = Yup.object({
  title: Yup.string().trim().required('Введите название темы'),
  description: Yup.string().trim().required('Введите название темы'),
})

export const newCommentValidationSchema = Yup.object({
  newComment: Yup.string().trim().required('Введите текст комментария'),
})
