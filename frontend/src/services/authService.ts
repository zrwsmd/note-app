import api from './api'
import { RegisterData, LoginData, AuthResponse, User } from '../types/user'

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data)
    const { token, user } = response.data
    
    // 保存token和用户信息到localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    return response.data
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      // 无论请求是否成功，都清除本地存储
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ user: User }>('/auth/me')
    return response.data.user
  },

  async verifyEmail(token: string) {
    const response = await api.get(`/auth/verify-email?token=${token}`)
    return response.data
  },

  getStoredUser(): { id: string; email: string } | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
