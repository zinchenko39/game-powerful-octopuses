import { network } from '../../api'
import { HOST_URL } from '../../globals'
import { RequestError } from '../common-interfaces'
import type { OAuthServiceID, OauthSignInRequest } from './interface'

export class OAuthService {
  static url = '/oauth/yandex'

  static async getServiceId(): Promise<OAuthServiceID | RequestError> {
    const { data } = await network.get<OAuthServiceID | RequestError>(
      `${this.url}/service-id`,
      {
        params: {
          redirect_uri: HOST_URL,
        },
      }
    )
    if ('service_id' in data) {
      return data as OAuthServiceID
    } else {
      throw new Error('Ошибка получения id сервиса')
    }
  }

  static async signInOauth(
    args: OauthSignInRequest
  ): Promise<RequestError | string> {
    const { data } = await network.post<RequestError | string>(`${this.url}`, {
      code: args.code,
      redirect_uri: HOST_URL,
    })

    if (typeof data == 'string') {
      return data
    } else {
      throw new Error(data.reason)
    }
  }
}
