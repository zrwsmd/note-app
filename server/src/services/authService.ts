import bcrypt from 'bcrypt'
import prisma from '../prisma.js'
import { validateUsername, validatePassword } from '../utils/validation.js'
import { generateToken } from '../utils/jwt.js'

const SALT_ROUNDS = 10

export class AuthService {
  async register(username: string, password: string, confirmPassword: string) {
    // 验证用户名
    const usernameValidation = validateUsername(username)
    if (!usernameValidation.valid) {
      throw new Error(usernameValidation.message)
    }

    // 验证密码
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message)
    }

    // 验证密码确认
    if (password !== confirmPassword) {
      throw new Error('两次输入的密码不一致')
    }

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      throw new Error('该用户名已被注册')
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    return {
      userId: user.id,
      username: user.username,
    }
  }

  async login(username: string, password: string) {
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error('用户名或密码错误')
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('用户名或密码错误')
    }

    // 生成JWT token
    const token = generateToken({
      userId: user.id,
      email: user.username,
    })

    return {
      token,
      user: {
        id: user.id,
        email: user.username,
      },
    }
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw new Error('用户不存在')
    }

    return user
  }
}

export default new AuthService()
