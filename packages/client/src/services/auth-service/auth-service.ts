import type { SignInProps, SignUpProps } from './interfaces'
import { network } from '../../api'
import { RequestError, SignUpAnswear } from '../common-interfaces'

export class AuthService {
  static url = '/auth'

  static async signIn(args: SignInProps): Promise<RequestError | string> {
    const { data } = await network.post<RequestError | string>(
      `${this.url}/signin`,
      { ...args }
    )

    if (typeof data !== 'string') {
      throw new Error(data.reason)
    }

    return data
  }
  static async signUp(
    args: SignUpProps
  ): Promise<RequestError | SignUpAnswear> {
    const { data } = await network.post<RequestError | SignUpAnswear>(
      `${this.url}/signup`,
      { ...args }
    )
    console.log(data)
    if ('id' in data) {
      return data
    } else {
      throw new Error(data.reason)
    }
  }

  static async logout(): Promise<RequestError | string> {
    const { data } = await network.post(`${this.url}/logout`)
    if (typeof data !== 'string') {
      throw new Error(data.reason)
    }

    return data
  }
}
