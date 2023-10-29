import { ReactNode } from 'react'
import {
  AboutGame,
  GameMenu,
  LeaderBoard,
  SettingsPage,
  UserProfile,
  SingUp,
  SingIn,
  TopicScreen,
} from '../pages'
import { TopicDetails } from '../components'
import { RouterName } from './types'

export const AUTHORIZED_ROUTES: { path: string; element?: ReactNode }[] = [
  {
    path: RouterName.profile,
    element: <UserProfile />,
  },
  {
    path: RouterName.settings,
    element: <SettingsPage />,
  },
  {
    path: RouterName.about,
    element: <AboutGame />,
  },
  {
    path: RouterName.main,
    element: <GameMenu />,
  },
  {
    path: RouterName.leaderBoard,
    element: <LeaderBoard />,
  },
  {
    path: RouterName.forum,
    element: <TopicScreen />,
  },
  {
    path: RouterName.forumTopicId,
    element: <TopicDetails />,
  },
]

export const UNAUTHORIZED_ROUTES: { path: RouterName; element?: ReactNode }[] =
  [
    {
      path: RouterName.signUp,
      element: <SingUp />,
    },
    {
      path: RouterName.signIn,
      element: <SingIn />,
    },
    {
      path: RouterName.main,
      element: <SingIn />,
    },
  ]
