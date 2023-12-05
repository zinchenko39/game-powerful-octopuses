import { NextFunction, Request, Response } from 'express'
import { Reaction } from '../models/reaction.model'

export class ReactionController {
  static async saveReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = res.locals.user
      const { body } = req

      Reaction.findOne({
        where: { userId: currentUser.id, commentId: body.commentId },
      }).then(async function (obj) {
        let reaction
        if (obj) {
          reaction = await Reaction.update(
            { reaction: body.reaction },
            {
              where: { userId: currentUser.id, commentId: body.commentId },
              returning: true,
            }
          )
          reaction = reaction[1]
        } else {
          reaction = await Reaction.create({
            userId: currentUser.id,
            commentId: body.commentId,
            reaction: body.reaction,
          })
        }
        res.status(200).json(reaction)
      })
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    } finally {
      next()
    }
  }

  static async getCommentReactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { params } = req

      if (!params.commentId) {
        res.status(404).send('Comment id is missing')
      }

      const reactions = await Reaction.findAll({
        where: { commentId: params.commentId },
      })

      res.status(200).json(reactions)
    } catch (e) {
      console.error(e)
      res.status(500).send('Внутренняя ошибка сервера')
    } finally {
      next()
    }
  }
}
