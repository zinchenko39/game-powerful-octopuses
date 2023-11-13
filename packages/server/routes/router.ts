import ThemeRouter from './theme.routes'
import { Router } from 'express'

const router = Router()

router.use('/theme', ThemeRouter)

export default router
