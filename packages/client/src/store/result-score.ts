import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ResultScoreState = {
  score: number
}

const initialState: ResultScoreState = {
  score: 0,
}

export const resultScoreSlice = createSlice({
  name: 'resultScore',
  initialState,
  reducers: {
    updateResultScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload
    },
    resetResultScore: state => {
      state.score = 0
    },
  },
})

export const { updateResultScore, resetResultScore } = resultScoreSlice.actions
