export interface User {
  id: string
  email: string
  createdAt: string
}

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
  }
}
