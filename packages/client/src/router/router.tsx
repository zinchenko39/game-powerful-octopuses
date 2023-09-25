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
  Page404,
  Game,
  Page500,
} from '../pages'

export const Router = ({ isAuthorized }: IRouter) => {
  return (
    <Routes>
      <Route path={'/'} element={<Game />} />
      {isAuthorized && (
        <>
          <Route path={'/profile'} element={<UserProfile />} />
          <Route path={'/settings'} element={<SettingsPage />} />
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
      <Route path="/error" element={<Page500 />} />
      <Route
        path="*"
        element={
          <>{(!isAuthorized && <Navigate to={'/sign-in'} />) || <Page404 />}</>
        }
      />
    </Routes>
  )
}
