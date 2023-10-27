import { RequestError } from '../../../services'
import { apiSlicePromiseWrapper } from '../../../utils'
import {
  LeaderboardService,
  PostLeaderboardData,
  GetLeaderboardRequest,
  LeaderboardServerResponse,
} from '../../../services'
import { apiSlice } from '../api'

const leaderBoardApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getLeaderboard: build.mutation<
      LeaderboardServerResponse,
      GetLeaderboardRequest
    >({
      queryFn: (args: GetLeaderboardRequest) =>
        apiSlicePromiseWrapper(() => LeaderboardService.getLeaderboard(args)),
      invalidatesTags: ['LEADERBOARD'],
    }),
    postScore: build.mutation<string | RequestError, PostLeaderboardData>({
      queryFn: (args: PostLeaderboardData) =>
        apiSlicePromiseWrapper(() => LeaderboardService.postScore(args)),
      invalidatesTags: ['LEADERBOARD'],
    }),
  }),
})

export const { useGetLeaderboardMutation, usePostScoreMutation } =
  leaderBoardApi
