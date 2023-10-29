import { useEffect } from 'react'
import { useUser } from '../hooks'
import { IUser } from '../services'
import { useLazyGetUserQuery } from '../store/api'

type WrappedComponentProps<T> = {
  isAuth: boolean
  user?: IUser
} & T

export const withAuth = <T,>(
  WrappedComponent: React.ComponentType<WrappedComponentProps<T>>
) => {
  const WrappedComponentContainer = (props: T) => {
    const [fetch, info] = useLazyGetUserQuery()

    const user = useUser()

    const { isLoading, isUninitialized } = info

    useEffect(() => {
      if (!user || !isUninitialized) fetch()
    }, [])

    if (isLoading && isUninitialized) {
      return <>загрузка</>
    }

    return <WrappedComponent {...props} isAuth={!!user} user={user} />
  }

  return WrappedComponentContainer
}
