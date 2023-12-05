import { Request, Response } from 'express'
import { Theme } from '../models/theme.model'

export class ThemeController {
  static async getTheme(req: Request, res: Response) {
    try {
      const currentUser = res.locals.user

      let options

      if (currentUser && currentUser.id) {
        options = { where: { userId: currentUser } }
      }

      const userTheme = await Theme.findOne(options)

      res.status(200).json(userTheme)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async saveTheme(req: Request, res: Response) {
    try {
      const { body } = req

      const currentUser = res.locals.user

      let userId

      if (currentUser && currentUser.id) {
        userId = currentUser.id
      } else {
        const user = await Theme.findOne()

        userId = user?.get('userId')
      }

      const [record] = await Theme.upsert({
        userId: userId || body.userId,
        theme: body.theme,
      })

      res.status(200).json(record)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }
}
