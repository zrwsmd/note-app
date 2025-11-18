import { Router } from 'express'
import authController from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// 公开路由
router.post('/register', authController.register.bind(authController))
router.post('/login', authController.login.bind(authController))

// 需要认证的路由
router.post('/logout', authMiddleware, authController.logout.bind(authController))
router.get('/me', authMiddleware, authController.getCurrentUser.bind(authController))

export default router
