import { TopicController } from '../controllers/topic.controller'

import { Router } from 'express'

const router = Router()

router.get('', TopicController.getTopics)

router.get('/', TopicController.getTopics)

router.get('/:id', TopicController.getTopic)

router.post('/create', TopicController.createTopic)

export default router
