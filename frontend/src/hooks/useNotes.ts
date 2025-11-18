import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { noteService } from '../services/noteService'
import { CreateNoteData, UpdateNoteData } from '../types/note'
import toast from 'react-hot-toast'

export function useNotes(search?: string) {
  return useQuery({
    queryKey: ['notes', search],
    queryFn: () => noteService.getNotes(search),
  })
}

export function useNote(id: string) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => noteService.getNoteById(id),
    enabled: !!id && id !== 'new',
  })
}

export function useCreateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoteData) => noteService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || '创建笔记失败'
      toast.error(message)
    },
  })
}

export function useUpdateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNoteData }) =>
      noteService.updateNote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] })
      toast.success('笔记保存成功')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || '保存笔记失败'
      toast.error(message)
    },
  })
}

export function useDeleteNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => noteService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      toast.success('笔记删除成功')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || '删除笔记失败'
      toast.error(message)
    },
  })
}

export function useBatchDeleteNotes() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (noteIds: string[]) => noteService.batchDeleteNotes(noteIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      toast.success(data.message)
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || '批量删除失败'
      toast.error(message)
    },
  })
}
