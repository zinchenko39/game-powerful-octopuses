import { network } from '../../api'
import { HOST_URL } from '../../globals'
import { useGetUserQuery } from '../../store/api'
import { RequestError } from '../common-interfaces'
import type { OAuthServiceID, OauthSignInRequest } from './interface'

export class OAuthService {
  static url = '/oauth/yandex'

  static async getServiceId(
    arg: string
  ): Promise<OAuthServiceID | RequestError> {
    const { data } = await network.get<OAuthServiceID | RequestError>(
      `${this.url}/service-id?redirect_uri=${arg}`
    )

    if ('service_id' in data) {
      this.signInOauth({ code: data.service_id, redirect_uri: HOST_URL })
      return data
    } else {
      throw new Error(data.reason)
    }
  }

  static async signInOauth(
    args: OauthSignInRequest
  ): Promise<RequestError | string> {
    const { data } = await network.post<RequestError | string>(`${this.url}`, {
      ...args,
    })
    console.log(data)
    if (typeof data == 'string') {
      // useGetUserQuery()
      return data
    } else {
      throw new Error(data.reason)
    }
  }
}
