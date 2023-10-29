import { useRoutes } from 'react-router-dom'

import { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES } from './constants'
import { Page404, Page500 } from '../pages'
import { RouterName } from './types'
import { withAuth } from '../HOC/with-auth'

export const Router = withAuth(({ isAuth }) => {
  const routes = isAuth ? AUTHORIZED_ROUTES : UNAUTHORIZED_ROUTES

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
})
