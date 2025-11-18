import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './contexts/ThemeContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/NotesPage'
import NoteDetailPage from './pages/NoteDetailPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute>
                  <NoteDetailPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
