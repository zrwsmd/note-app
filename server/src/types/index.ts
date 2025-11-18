export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
}

export interface LoginRequest {
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

export interface UserResponse {
  id: string
  email: string
  createdAt: Date
}

export interface CreateNoteRequest {
  title: string
  content: string
}

export interface UpdateNoteRequest {
  title?: string
  content?: string
}

export interface NoteResponse {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface NoteListItem {
  id: string
  title: string
  content: string
  preview: string
  createdAt: Date
  updatedAt: Date
}
