import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AboutGame } from '../pages/aboutGame/AboutGame'
import { TopicScreen } from '../pages/forumPage/TopicScreen'
import { TopicDetails } from '../pages/forumPage/topicDetails/TopicDetails'
import { SingUp } from '../pages/singUp/SingUp'

export const Router = () => {
  return (
    <Routes>
      <Route path={'/sign-in'} element={<>Страница логина</>} />
      <Route path={'/sign-up'} element={<SingUp />} />
      <Route path={'/profile'} element={<>Страница профиля</>} />
      <Route path={'/'} element={<>Страница игры</>} />
      <Route path={'/about'} element={<AboutGame />} />
      <Route path={'/leaderboard'} element={<>Страница лидерборда</>} />
      <Route path={'/forum'}>
        <Route index element={<TopicScreen />} />
        <Route path={':topicId'} element={<TopicDetails />} />
      </Route>
      <Route path="*" element={<>Страница не найдена</>} />
    </Routes>
  )
}
