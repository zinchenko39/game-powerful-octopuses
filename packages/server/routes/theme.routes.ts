import { ThemeController } from '../controllers/theme.controller'
import { Router } from 'express'

const router = Router()

router.get('/', ThemeController.getTheme)
router.post('/save', ThemeController.saveTheme)

export default router
