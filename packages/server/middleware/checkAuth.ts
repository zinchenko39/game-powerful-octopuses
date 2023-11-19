import type express from 'express'
import axios, { AxiosError } from 'axios'

type YA_COOKIES = {
  uuid: string
  authCookie: string
}

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

export default async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const { uuid, authCookie } = req.cookies as YA_COOKIES
    let user

    console.log(req.headers)

    if (uuid && authCookie) {
      user = await getCurrentUser(req.headers['cookie'])
    }

    if (!uuid || !authCookie) {
      throw new Error('')
    }

    res.locals.user_id = user?.id
    res.locals.user = user

    next()
  } catch {
    res.status(401).send('Not authorized')
  }
  // return
}
