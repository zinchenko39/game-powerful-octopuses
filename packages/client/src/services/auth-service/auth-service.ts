import type { SignInProps } from './interfaces'
import { network } from '../../api'
import { SignInResponse } from './interfaces'

export class AuthService {
  static url = '/auth'

  static async signIn(args: SignInProps): Promise<SignInResponse | string> {
    const { data } = await network.post<SignInResponse | string>(
      `${this.url}/signin`,
      { ...args }
    )

    if (typeof data !== 'string') {
      throw new Error(data.reason)
    }

    return data
  }
}
