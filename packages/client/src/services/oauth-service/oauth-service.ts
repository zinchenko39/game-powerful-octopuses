import { network } from '../../api'
import { RequestError } from '../common-interfaces'
import type { OAuthServiceID } from './interface'

export class OAuthService {
  static url = '/oauth/yandex'

  static async getServiceId(
    arg: string
  ): Promise<OAuthServiceID | RequestError> {
    const { data } = await network.get<OAuthServiceID | RequestError>(
      `${this.url}/service-id?redirect_uri=${arg}`
    )

    if ('service_id' in data) {
      return data
    } else {
      throw new Error(data.reason)
    }
  }
}
