import type { SignInProps } from './interfaces'
import { network } from '../../api'
import { RequestError } from '../common-interfaces'

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
}
