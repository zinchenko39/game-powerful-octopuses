import { network } from '../../api'
import { IUser } from './interfaces'

export class UserService {
  static async getUserInfo(): Promise<IUser> {
    const { data } = await network.get<IUser>('/auth/user')

    return data
  }
}
