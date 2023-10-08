import { userApi } from './api/user-api'
import { GameStateListType, GameStateType } from './game-boards'
import { RootState } from './store'

export const rootStateSelector = (state: RootState): RootState => state

export const userResultSelector = userApi.endpoints.getUser.select()

export const gameListSelector = (state: RootState): GameStateListType =>
  state.gameBoards

export const gameSelector = (state: RootState, id: string): GameStateType => {
  const games = gameListSelector(state)
  console.log(games, ' games')
  return games[id]
}
