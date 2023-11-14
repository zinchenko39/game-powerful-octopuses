import { Request, Response } from 'express'
import { Theme } from '../models/theme.model'

export class ThemeController {
  static async getTheme(req: Request, res: Response) {
    try {
      const currentUser = res.locals.user

      const [record] = await Theme.upsert({
        userId: currentUser?.id,
      })

      res.status(200).send(record)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async saveTheme(req: Request, res: Response) {
    try {
      const currentUser = res.locals.user

      const { body } = req

      const [record] = await Theme.upsert({
        userId: currentUser.id,
        theme: body.theme,
      })

      res.status(200).send(record)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }
}