import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import { gameBoardsReducer } from './game-boards'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    gameBoards: gameBoardsReducer.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
