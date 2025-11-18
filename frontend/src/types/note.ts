export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface NoteListItem extends Note {
  preview: string
}

export interface CreateNoteData {
  title: string
  content: string
}

export interface UpdateNoteData {
  title?: string
  content?: string
}
