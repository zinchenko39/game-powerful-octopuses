import { ThemeController } from '../controllers/theme.controller'
import { Router } from 'express'

const router = Router()

router.get('/get-theme', ThemeController.getTheme)
router.post('/save', ThemeController.saveTheme)

export default router
