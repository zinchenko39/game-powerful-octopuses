import { userApi } from './api/user-api'
import { RootState } from './store'

export const rootStateSelector = (state: RootState): RootState => state

export const userResultSelector = userApi.endpoints.getUser.select()
