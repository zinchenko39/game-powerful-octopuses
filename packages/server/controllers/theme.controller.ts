import { Request, Response } from 'express'
import { Theme } from '../models/theme.model'

export class ThemeController {
  static async getTheme(req: Request, res: Response) {
    try {
      const { params } = req
      if (!params.userId) {
        res.status(404).send('userId is required')
      }

      Theme.findOne({ where: { userId: params.userId } }).then(async function (
        obj
      ) {
        let theme
        if (obj) theme = obj
        else {
          theme = await Theme.create({ userId: params.userId })
        }
        res.status(200).send(theme)
      })
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async saveTheme(req: Request, res: Response) {
    try {
      const { body } = req
      if (!body.userId || !body.theme) {
        res.status(404).send('userId and theme are required')
      }

      Theme.findOne({ where: { userId: body.userId } }).then(async function (
        obj
      ) {
        let theme
        if (obj) theme = await obj.update({ theme: body.theme })
        else {
          theme = await Theme.create({ userId: body.userId, theme: body.theme })
        }
        res.status(200).send(theme)
      })
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }
}
