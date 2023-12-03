import ThemeRouter from './theme.routes'
import TopicRouter from './topic.routes'
import ReactionRouter from './reaction.routes'
import { Router } from 'express'

const router = Router()

router.use('/theme', ThemeRouter)
router.use('/reaction', ReactionRouter)

router.use('/topic', TopicRouter)

export default router
