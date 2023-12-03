import { Request, Response } from 'express'
import { Topic } from '../models/topic.model'

export class TopicController {
  static async getTopics(req: Request, res: Response) {
    try {
      const topics = await Topic.findAll()

      res.status(200).send(topics)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async getTopic(req: Request, res: Response) {
    try {
      const topic = await Topic.findOne({ where: { id: req.params.id } })

      res.status(200).send(topic)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async createTopic(req: Request, res: Response) {
    try {
      const topic = await Topic.create({
        user: req.body.userId,
        title: req.body.title,
      })

      res.status(200).send(topic)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }
}
