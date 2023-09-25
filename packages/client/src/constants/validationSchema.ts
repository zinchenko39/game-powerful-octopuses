import * as Yup from 'yup'

export const singUpvalidationSchema = Yup.object({
  first_name: Yup.string()
    .matches(
      /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
      'Первая буква должна быть заглавной, без цифр, пробелов, разрешен дефис'
    )
    .required('Обязательное поле'),
  second_name: Yup.string()
    .matches(
      /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
      'Первая буква должна быть заглавной, без цифр, пробелов, разрешен дефис'
    )
    .required('Обязательное поле'),
  login: Yup.string()
    .matches(
      /^(?!_)(?!.*?_$)(?!^[0-9]*$)[a-zA-Z0-9_]{3,20}$/,
      'Латиница, разрешен дефис и нижнее подчеркивание'
    )
    .required('Обязательное поле'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Неправильный формат email'
    )
    .required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      'Пароль должен содержать хотя бы одну заглавную букву и цифру'
    )
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
  phone: Yup.string()
    .matches(/^(\+)?\d{10,15}$/, 'Неправильный формат номера телефона')
    .required('Обязательное поле'),
})

export const newTopicValidationSchema = Yup.object({
  title: Yup.string().trim().required('Введите название темы'),
  description: Yup.string().trim().required('Введите название темы'),
})

export const newCommentValidationSchema = Yup.object({
  newComment: Yup.string().trim().required('Введите текст комментария'),
})

export const singInValidationSchema = Yup.object({
  login: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
})

export const changePasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required('Обязательное поле'),
  newPassword: Yup.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      'Пароль должен содержать хотя бы одну заглавную букву и цифру'
    )
    .required('Обязательное поле'),
})
