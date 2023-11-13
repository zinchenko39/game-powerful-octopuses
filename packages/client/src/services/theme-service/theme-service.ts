import { PaletteMode } from '@mui/material'
import { network } from '../../api'
import { RequestError } from '../../services/common-interfaces'
import { BASE_API_URL } from '../../globals'

export class ThemeService {
  static url = `${BASE_API_URL}/theme`

  static async getTheme(): Promise<PaletteMode | RequestError> {
    const { data } = await network.get<PaletteMode | RequestError>(
      `${this.url}`
    )
    if (typeof data == 'string') {
      return data
    } else {
      throw new Error(data.reason)
    }
  }

  static async saveTheme(
    userId: number,
    theme: string
  ): Promise<string | RequestError> {
    const { data } = await network.post<RequestError | string>(
      `${this.url}/save`,
      {
        userId,
        theme,
      }
    )
    if (typeof data == 'string') {
      return data
    } else {
      throw new Error(data.reason)
    }
  }
}
