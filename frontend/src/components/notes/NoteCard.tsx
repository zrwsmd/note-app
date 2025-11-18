import { NoteListItem } from '../../types/note'
import { formatDate } from '../../utils/formatDate'

interface NoteCardProps {
  note: NoteListItem
  onClick: () => void
  isSelectionMode?: boolean
  isSelected?: boolean
  onToggleSelection?: () => void
}

export default function NoteCard({ 
  note, 
  onClick, 
  isSelectionMode = false, 
  isSelected = false,
  onToggleSelection 
}: NoteCardProps) {
  const handleClick = () => {
    if (isSelectionMode && onToggleSelection) {
      onToggleSelection()
    } else {
      onClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-4 border ${
        isSelected 
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {isSelectionMode && (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {note.title || '无标题'}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {note.preview || '暂无内容'}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>更新于 {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  )
}
