import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

export function useAuth() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const storedUser = authService.getStoredUser()
    const token = authService.getToken()

    if (storedUser && token) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      toast.success('已退出登录')
      navigate('/login')
    } catch (error) {
      toast.error('退出登录失败')
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  }
}
