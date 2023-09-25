import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TopicScreen } from '../pages/forumPage/TopicScreen'
import { TopicDetails } from '../pages/forumPage/topicDetails/TopicDetails'
import { IRouter } from './interfaces'

import {
  LeaderBoard,
  UserProfile,
  SingIn,
  SingUp,
  AboutGame,
  SettingsPage,
} from '../pages'
import { Game } from '../pages/game/Game'

export const Router = ({ isAuthorized }: IRouter) => {
  return (
    <Routes>
      Гонки
      {!isAuthorized && (
        <>
          <Route path={'/profile'} element={<UserProfile />} />
          <Route path={'/settings'} element={<SettingsPage />} />
          <Route path={'/'} element={<Game />} />
          <Route path={'/about'} element={<AboutGame />} />
          <Route path={'/leaderboard'} element={<LeaderBoard />} />
          <Route path={'/forum'}>
            <Route index element={<TopicScreen />} />
            <Route path={':topicId'} element={<TopicDetails />} />
          </Route>
        </>
      )}
      {!isAuthorized && (
        <>
          <Route path={'/sign-in'} element={<SingIn />} />
          <Route path={'/sign-up'} element={<SingUp />} />
        </>
      )}
      <Route
        path="*"
        element={
          <>
            {(!isAuthorized && <Navigate to={'/sign-in'} />) || (
              <>Страница не найдена</>
            )}
          </>
        }
      />
    </Routes>
  )
}
