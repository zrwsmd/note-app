import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = '用户名不能为空'
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await authService.login(formData)
      toast.success('登录成功！')
      navigate('/notes')
    } catch (error: any) {
      const message = error.response?.data?.error || '登录失败，请重试'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧 - 装饰区域 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-4xl font-bold mb-2">欢迎回来</h1>
            <p className="text-xl text-primary-100">继续记录你的精彩想法</p>
          </div>
          <div className="space-y-4 text-primary-100">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-white">富文本编辑</h3>
                <p className="text-sm">支持标题、列表、代码等多种格式</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-white">自动保存</h3>
                <p className="text-sm">每30秒自动保存，永不丢失</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-white">快速搜索</h3>
                <p className="text-sm">轻松找到任何笔记</p>
              </div>
            </div>
          </div>
        </div>
        {/* 装饰圆圈 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
      </div>

      {/* 右侧 - 登录表单 */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">登录账户</h2>
            <p className="mt-2 text-sm text-gray-600">
              还没有账户？{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                立即注册
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <Input
                label="用户名"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="请输入用户名"
                autoComplete="username"
              />
              <Input
                label="密码"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="输入密码"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg"
              isLoading={isLoading}
            >
              登录
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            登录即表示您同意我们的服务条款和隐私政策
          </div>
        </div>
      </div>
    </div>
  )
}
