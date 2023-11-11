import { createApi } from '@reduxjs/toolkit/query/react'
import { fakeBaseQuery } from '../../utils'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['USER', 'LEADERBOARD'],
  endpoints: () => ({}),
})
