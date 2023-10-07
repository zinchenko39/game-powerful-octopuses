import { useRoutes } from 'react-router-dom'

import { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES } from './constants'
import { Page404, Page500 } from '../pages'
import { RouterName } from './types'
import { useUser } from '../hooks/useUser'

export const Router = () => {
  const user = useUser()

  const routes = user ? AUTHORIZED_ROUTES : UNAUTHORIZED_ROUTES

  const element = useRoutes([
    ...routes,
    {
      path: RouterName.error500,
      element: <Page500 />,
    },
    {
      path: RouterName.others,
      element: <Page404 />,
    },
  ])

  return element
}
