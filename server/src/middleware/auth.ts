import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.js'

// 扩展 Express Request 类型以包含 userId
declare global {
  namespace Express {
    interface Request {
      userId?: string
      userEmail?: string
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    // 从 Authorization header 获取 token
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: '未提供认证令牌' })
      return
    }

    const token = authHeader.substring(7) // 移除 "Bearer " 前缀

    // 验证 token
    const payload = verifyToken(token)

    // 将用户信息添加到请求对象
    req.userId = payload.userId
    req.userEmail = payload.email

    next()
  } catch (error) {
    const message = error instanceof Error ? error.message : '认证失败'
    res.status(401).json({ error: message })
  }
}
