import { IUser } from '../services'

export function isUser(object: any): object is IUser {
  return 'login' in object
}
