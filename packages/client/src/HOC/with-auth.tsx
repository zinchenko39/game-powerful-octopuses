import { useEffect } from 'react'
import { useUser } from '../hooks'
import { IUser } from '../services'
import { useLazyGetUserQuery } from '../store/api'
import { Typography } from '@mui/material'

import styles from './loading-background.module.css'

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

    const { isUninitialized } = info

    useEffect(() => {
      if (!user || !isUninitialized) fetch()
    }, [])

    return <WrappedComponent {...props} isAuth={!!user} user={user} />
  }

  return WrappedComponentContainer
}
