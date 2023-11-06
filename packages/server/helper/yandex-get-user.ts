import axios, { AxiosError } from 'axios'

export interface IUser {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export const getCurrentUser = async (
  _cookieHeader?: string
): Promise<IUser | undefined> => {
  let user: IUser | undefined

  try {
    const response = await axios.get(
      `https://ya-praktikum.tech/api/v2/auth/user`,
      {
        headers: {
          cookie: _cookieHeader,
        },
      }
    )
    user = response.data
  } catch (exp) {
    const noAuth = exp instanceof AxiosError && exp.response?.status === 401

    if (!noAuth) throw exp
  }

  return user
}

export default getCurrentUser
