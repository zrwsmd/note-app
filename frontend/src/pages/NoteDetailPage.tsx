import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNote, useCreateNote, useUpdateNote, useDeleteNote } from '../hooks/useNotes'
import { useAutoSave } from '../hooks/useAutoSave'
import MarkdownEditor from '../components/notes/MarkdownEditor'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNewNote = id === 'new'

  const { data: note, isLoading } = useNote(id || '')
  const createMutation = useCreateNote()
  const updateMutation = useUpdateNote()
  const deleteMutation = useDeleteNote()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle')

  // 加载笔记数据
  useEffect(() => {
    if (note && !isNewNote) {
      setTitle(note.title)
      setContent(note.content)
      setHasChanges(false)
    } else if (isNewNote) {
      // 重置新笔记的状态
      setTitle('')
      setContent('')
      setHasChanges(false)
    }
  }, [note, isNewNote, id])

  // 自动保存
  useAutoSave(
    () => {
      if (hasChanges && !isNewNote && id) {
        handleAutoSave()
      }
    },
    30000,
    [title, content, hasChanges]
  )

  const handleAutoSave = async () => {
    if (!id || isNewNote) return

    setAutoSaveStatus('saving')
    try {
      await updateMutation.mutateAsync({
        id,
        data: { title, content },
      })
      setHasChanges(false)
      setAutoSaveStatus('saved')
      setTimeout(() => setAutoSaveStatus('idle'), 2000)
    } catch (error) {
      setAutoSaveStatus('idle')
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('请输入笔记标题')
      return
    }

    try {
      if (isNewNote) {
        await createMutation.mutateAsync({
          title: title.trim(),
          content,
        })
        toast.success('笔记创建成功')
        // 返回笔记列表
        navigate('/notes')
      } else if (id) {
        await updateMutation.mutateAsync({
          id,
          data: { title: title.trim(), content },
        })
        setHasChanges(false)
        // 保存成功后返回笔记列表
        navigate('/notes')
      }
    } catch (error) {
      // 错误已在 hook 中处理
    }
  }

  const handleDelete = async () => {
    if (!id || isNewNote) return

    try {
      await deleteMutation.mutateAsync(id)
      navigate('/notes')
    } catch (error) {
      // 错误已在 hook 中处理
    }
  }

  const handleBack = () => {
    // 检查是否有未保存的内容
    const hasContent = title.trim() || content.trim()
    
    if (isNewNote && hasContent && !hasChanges) {
      // 新笔记有内容但还没标记为已更改
      if (window.confirm('笔记还未保存，确定要离开吗？')) {
        navigate('/notes')
      }
    } else if (hasChanges) {
      if (window.confirm('有未保存的更改，确定要离开吗？')) {
        navigate('/notes')
      }
    } else {
      navigate('/notes')
    }
  }

  if (isLoading && !isNewNote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 顶部工具栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
                title="返回"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                {autoSaveStatus === 'saving' && (
                  <span className="text-sm text-gray-500">保存中...</span>
                )}
                {autoSaveStatus === 'saved' && (
                  <span className="text-sm text-green-600">已自动保存</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isNewNote && (
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  删除
                </Button>
              )}
              <Button
                onClick={handleSave}
                isLoading={createMutation.isPending || updateMutation.isPending}
              >
                保存
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setHasChanges(true)
            }}
            placeholder="笔记标题"
            className="text-2xl font-bold border-0 focus:ring-0 px-0"
          />
          <MarkdownEditor
            content={content}
            onChange={(newContent) => {
              setContent(newContent)
              setHasChanges(true)
            }}
          />
        </div>
      </main>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">确认删除</h3>
            <p className="text-gray-600 mb-6">确定要删除这篇笔记吗？此操作无法撤销。</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                取消
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                isLoading={deleteMutation.isPending}
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
