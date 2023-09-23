import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutGame } from '../pages/aboutGame/AboutGame'
import { TopicScreen } from '../pages/forumPage/TopicScreen'
import { TopicDetails } from '../pages/forumPage/topicDetails/TopicDetails'
import { IRouter } from './interfaces'
import { SingUp } from '../pages/singUp/SingUp'
import { SingIn } from '../pages/singIn/SingIn'
import { Game } from '../pages/game/Game'
import { LeaderBoard } from '../pages'

export const Router = ({ isAuthorized }: IRouter) => {
  return (
    <Routes>
      {!isAuthorized && (
        <>
          <Route path={'/profile'} element={<>Страница профиля</>} />
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
