import { ReactionController } from '../controllers/reaction.controller'
import { Router } from 'express'

const router = Router()

router.get('/get-reactions/:commentId', ReactionController.getCommentReactions)

router.post('/save-reaction', ReactionController.saveReaction)

export default router
