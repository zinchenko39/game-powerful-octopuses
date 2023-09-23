import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutGame } from '../pages/aboutGame/AboutGame'
import { IRouter } from './interfaces'
import { SingUp } from '../pages/singUp/SingUp'
import { SingIn } from '../pages/singIn/SingIn'
import { Page404 } from '../pages/Page404'

export const Router = ({ isAuthorized }: IRouter) => {
  return (
    <Routes>
      {isAuthorized && (
        <>
          <Route path={'/profile'} element={<>Страница профиля</>} />
          <Route path={'/'} element={<>Страница игры</>} />
          <Route path={'/about'} element={<AboutGame />} />
          <Route path={'/leaderboard'} element={<>Страница лидерборда</>} />
          <Route path={'/forum'} element={<>Страница форума</>}>
            <Route path={':topicId'} element={<>Страница топика</>} />
          </Route>
        </>
      )}
      <Route path={'/sign-in'} element={<SingIn />} />
      <Route path={'/sign-up'} element={<SingUp />} />
      <Route
        path="*"
        element={
          <>{(!isAuthorized && <Navigate to={'/sign-in'} />) || <Page404 />}</>
        }
      />
    </Routes>
  )
}
