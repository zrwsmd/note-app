import { Request, Response } from 'express'
import authService from '../services/authService.js'
import { RegisterRequest, LoginRequest } from '../types/index.js'

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email: username, password, confirmPassword } = req.body as RegisterRequest

      const result = await authService.register(username, password, confirmPassword)

      res.status(201).json({
        message: '注册成功',
        userId: result.userId,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : '注册失败'
      res.status(400).json({ error: message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email: username, password } = req.body as LoginRequest

      const result = await authService.login(username, password)

      res.json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : '登录失败'
      res.status(401).json({ error: message })
    }
  }

  async logout(_req: Request, res: Response) {
    // JWT是无状态的，登出主要在客户端处理（删除token）
    return res.json({ message: '退出登录成功' })
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      // userId 由认证中间件添加到 req 对象
      const userId = (req as any).userId

      if (!userId) {
        return res.status(401).json({ error: '未授权' })
      }

      const user = await authService.getUserById(userId)

      return res.json({ user })
    } catch (error) {
      const message = error instanceof Error ? error.message : '获取用户信息失败'
      return res.status(400).json({ error: message })
    }
  }
}

export default new AuthController()
