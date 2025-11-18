import api from './api'
import { Note, NoteListItem, CreateNoteData, UpdateNoteData } from '../types/note'

export const noteService = {
  async getNotes(search?: string): Promise<NoteListItem[]> {
    const params = search ? { search } : {}
    const response = await api.get<{ notes: NoteListItem[] }>('/notes', { params })
    return response.data.notes
  },

  async getNoteById(id: string): Promise<Note> {
    const response = await api.get<{ note: Note }>(`/notes/${id}`)
    return response.data.note
  },

  async createNote(data: CreateNoteData): Promise<Note> {
    const response = await api.post<{ note: Note }>('/notes', data)
    return response.data.note
  },

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    const response = await api.put<{ note: Note }>(`/notes/${id}`, data)
    return response.data.note
  },

  async deleteNote(id: string): Promise<void> {
    await api.delete(`/notes/${id}`)
  },

  async batchDeleteNotes(noteIds: string[]): Promise<{ message: string; deletedCount: number }> {
    const response = await api.post<{ message: string; deletedCount: number }>('/notes/batch/delete', { noteIds })
    return response.data
  },
}
