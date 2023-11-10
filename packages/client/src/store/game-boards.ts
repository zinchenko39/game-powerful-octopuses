import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GameMapType } from '../actions/types'
import { initialMap } from '../constants'

export type GameStateType = {
  map?: GameMapType
  step: number
}

export type GameStateListType = {
  [boardId: string]: GameStateType
}

const initialState: GameStateListType = {}

export const gameBoardsReducer = createSlice({
  name: 'gameBoards',
  initialState,
  reducers: {
    addGameBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      const boardId = action.payload.boardId

      if (state[boardId]) return

      state[boardId] = {
        map: initialMap,
        step: 0,
      }
    },
    updateGameBoard: (
      state,
      action: PayloadAction<{
        boardId: string
        map?: GameMapType
        step?: number
      }>
    ) => {
      const { boardId, map, step } = action.payload

      if (state[boardId]) return

      const newGameState: { map?: GameMapType; step?: number } = {}

      if (map) {
        newGameState['map'] = map
      }

      if (step) {
        newGameState['step'] = step
      }

      state[boardId] = { ...state[boardId], ...newGameState }
    },
    removeGameBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      const boardId = action.payload.boardId

      if (state[boardId]) {
        delete state[boardId]
      }
    },
  },
})

export const { addGameBoard, updateGameBoard, removeGameBoard } =
  gameBoardsReducer.actions
