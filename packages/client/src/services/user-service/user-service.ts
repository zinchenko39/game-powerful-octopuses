import { network } from '../../api'
import { isUser } from '../../utils'
import { RequestError } from '../common-interfaces'
import { ChangePasswordProps, IUser } from './interfaces'

export class UserService {
  static url = '/user'

  static async getUserInfo(): Promise<IUser> {
    const { data } = await network.get<IUser>('/auth/user')

    if (data) {
      localStorage.setItem('UserYandex', JSON.stringify(data))
    }

    return data
  }

  static async changeUserPassword(args: ChangePasswordProps): Promise<string> {
    const { data } = await network.put<RequestError | string>(
      `${this.url}/password`,
      { ...args }
    )

    //TODO Вынести обработку в network
    if (typeof data !== 'string') {
      throw new Error(data.reason)
    }

    return data
  }

  static async changeUserAvatar(args: FormData): Promise<IUser> {
    const { data } = await network.put<RequestError | IUser>(
      `${this.url}/profile/avatar`,
      args,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    if (!isUser(data)) {
      throw new Error(data.reason)
    }

    return data
  }
}
