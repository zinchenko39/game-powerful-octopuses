import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import { gameBoardsReducer } from './game-boards'
import { resultScoreSlice } from './result-score'

export const getStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      gameBoards: gameBoardsReducer.reducer,
      resultScore: resultScoreSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  })

export const store = getStore()

export type RootState = ReturnType<typeof store.getState>
