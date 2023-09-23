import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutGame } from '../pages/aboutGame/AboutGame'
import { IRouter } from './interfaces'
import { SingUp } from '../pages/singUp/SingUp'
import { SingIn } from '../pages/singIn/SingIn'
import { LeaderBoard } from '../pages'

export const Router = ({ isAuthorized }: IRouter) => {
  return (
    <Routes>
      {isAuthorized && (
        <>
          <Route path={'/profile'} element={<>Страница профиля</>} />
          <Route path={'/'} element={<>Страница игры</>} />
          <Route path={'/about'} element={<AboutGame />} />
          <Route path={'/leaderboard'} element={<LeaderBoard />} />
          <Route path={'/forum'} element={<>Страница форума</>}>
            <Route path={':topicId'} element={<>Страница топика</>} />
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
