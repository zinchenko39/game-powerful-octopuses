import { useState } from 'react'
import { useUser } from '../hooks'
import { IUser } from '../services'

type WrappedComponentProps<T> = {
  isAuth: boolean
  user?: IUser
} & T

export const widthAuth = <T,>(
  WrappedComponent: React.ComponentType<WrappedComponentProps<T>>
) => {
  const [test, setTest] = useState(0)

  const WrappedComponentContainer = (props: T) => {
    return <WrappedComponent {...props} isAuth={!!user} user={user} />
  }

  return WrappedComponentContainer
}
