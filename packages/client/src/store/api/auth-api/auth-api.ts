import {
  AuthService,
  RequestError,
  SignInProps,
  SignUpProps,
  SignUpAnswer,
} from '../../../services'
import { apiSlicePromiseWrapper } from '../../../utils'
import { apiSlice } from '../api'

const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<RequestError | string, SignInProps>({
      queryFn: (args: SignInProps) =>
        apiSlicePromiseWrapper(() => AuthService.signIn(args)),
      invalidatesTags: ['USER'],
    }),
    signUp: build.mutation<RequestError | SignUpAnswer, SignUpProps>({
      queryFn: (args: SignUpProps) =>
        apiSlicePromiseWrapper(() => AuthService.signUp(args)),
      invalidatesTags: ['USER'],
    }),
    logout: build.mutation<RequestError | string, void>({
      queryFn: () => apiSlicePromiseWrapper(() => AuthService.logout()),
      invalidatesTags: ['USER'],
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useLogoutMutation } =
  authApi
