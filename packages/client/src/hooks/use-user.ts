import { useSelector } from 'react-redux'
import { userResultSelector } from '../store/selectors'
import { IUser } from '../services'

export const useUser = (): IUser | undefined => {
  const user = useSelector(userResultSelector)

  return user.data
}
