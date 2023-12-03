import { PaletteMode } from '@mui/material'
import { network } from '../../api'
import { RequestError } from '../../services/common-interfaces'
import { BASE_API_URL } from '../../globals'

export class ThemeService {
  static url = `${BASE_API_URL}/theme`

  static async getTheme(): Promise<PaletteMode | RequestError> {
    try {
      const { data } = await network.get<PaletteMode | RequestError>(
        `${this.url}`
      )

      return data
    } catch (e) {
      console.error('fetch theme error: ', e)

      return { reason: 'ошибка' }
    }
  }

  static async saveTheme(
    userId: number,
    theme: string
  ): Promise<string | RequestError> {
    try {
      const { data } = await network.post<RequestError | string>(
        `${this.url}/save`,
        {
          userId,
          theme,
        }
      )

      return data
    } catch (e) {
      console.error('fetch theme error: ', e)

      return { reason: 'ошибка' }
    }
  }
}
