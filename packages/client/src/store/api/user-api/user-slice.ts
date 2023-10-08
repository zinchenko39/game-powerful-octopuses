import { IUser, UserService } from '../../../services'
import { apiSlicePromiseWrapper } from '../../../utils'
import { apiSlice } from '../api'

export const userApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<IUser, void>({
      queryFn: () => apiSlicePromiseWrapper(UserService.getUserInfo),
      providesTags: ['USER'],
    }),
  }),
})

export const { useGetUserQuery } = userApi
