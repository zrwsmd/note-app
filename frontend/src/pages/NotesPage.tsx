import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useBatchDeleteNotes } from '../hooks/useNotes'
import NoteList from '../components/notes/NoteList'
import SearchBar from '../components/common/SearchBar'
import Button from '../components/common/Button'
import ThemeToggle from '../components/common/ThemeToggle'

export default function NotesPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const batchDeleteMutation = useBatchDeleteNotes()

  const handleCreateNote = () => {
    navigate('/notes/new')
  }

  const handleToggleSelection = (noteId: string) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId]
    )
  }

  const handleBatchDelete = async () => {
    if (selectedNotes.length === 0) return

    try {
      await batchDeleteMutation.mutateAsync(selectedNotes)
      setSelectedNotes([])
      setIsSelectionMode(false)
      setShowDeleteConfirm(false)
    } catch (error) {
      // 错误已在hook中处理
    }
  }

  const handleCancelSelection = () => {
    setSelectedNotes([])
    setIsSelectionMode(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">我的笔记</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</span>
              <Button variant="secondary" onClick={logout}>
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
        {/* 工具栏 */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-96">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="flex gap-2">
            {!isSelectionMode ? (
              <>
                <Button variant="secondary" onClick={() => setIsSelectionMode(true)}>
                  <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  批量管理
                </Button>
                <Button onClick={handleCreateNote}>
                  <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  新建笔记
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleCancelSelection}>
                  取消
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={selectedNotes.length === 0}
                >
                  删除选中 ({selectedNotes.length})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 笔记列表 */}
        <NoteList
          search={searchQuery}
          isSelectionMode={isSelectionMode}
          selectedNotes={selectedNotes}
          onToggleSelection={handleToggleSelection}
        />
      </main>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">确认删除</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              确定要删除选中的 {selectedNotes.length} 篇笔记吗？此操作无法撤销。
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                取消
              </Button>
              <Button
                variant="danger"
                onClick={handleBatchDelete}
                isLoading={batchDeleteMutation.isPending}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
