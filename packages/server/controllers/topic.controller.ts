import { Request, Response } from 'express'
import { Topic } from '../models/topic.model'

export class TopicController {
  static async getTopics(req: Request, res: Response) {
    try {
      const topics = await Topic.findAll()

      res.status(200).json(topics)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async getTopic(req: Request, res: Response) {
    try {
      const topic = await Topic.findOne({ where: { id: req.params.id } })

      res.status(200).json(topic)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }

  static async createTopic(req: Request, res: Response) {
    try {
      console.error(req.body)

      const topic = await Topic.create({
        authorId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
      })

      res.status(200).json(topic)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    }
  }
}
