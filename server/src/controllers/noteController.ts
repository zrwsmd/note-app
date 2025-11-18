import { Request, Response } from 'express'
import noteService from '../services/noteService.js'
import { CreateNoteRequest, UpdateNoteRequest } from '../types/index.js'

export class NoteController {
  async createNote(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { title, content = '' } = req.body as CreateNoteRequest

      if (!title) {
        return res.status(400).json({ error: '标题不能为空' })
      }

      const note = await noteService.createNote(userId, title, content)

      return res.status(201).json({ note })
    } catch (error) {
      const message = error instanceof Error ? error.message : '创建笔记失败'
      return res.status(400).json({ error: message })
    }
  }

  async getNotes(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const search = req.query.search as string | undefined

      const notes = await noteService.getNotes(userId, search)

      res.json({ notes })
    } catch (error) {
      const message = error instanceof Error ? error.message : '获取笔记列表失败'
      res.status(400).json({ error: message })
    }
  }

  async getNoteById(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { id } = req.params

      const note = await noteService.getNoteById(id, userId)

      res.json({ note })
    } catch (error) {
      const message = error instanceof Error ? error.message : '获取笔记失败'
      res.status(404).json({ error: message })
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { id } = req.params
      const { title, content } = req.body as UpdateNoteRequest

      const note = await noteService.updateNote(id, userId, title, content)

      res.json({ note })
    } catch (error) {
      const message = error instanceof Error ? error.message : '更新笔记失败'
      res.status(400).json({ error: message })
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { id } = req.params

      const result = await noteService.deleteNote(id, userId)

      res.json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : '删除笔记失败'
      res.status(400).json({ error: message })
    }
  }

  async batchDeleteNotes(req: Request, res: Response) {
    try {
      const userId = req.userId!
      const { noteIds } = req.body as { noteIds: string[] }

      if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
        return res.status(400).json({ error: '请选择要删除的笔记' })
      }

      const result = await noteService.batchDeleteNotes(noteIds, userId)

      return res.json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : '批量删除失败'
      return res.status(400).json({ error: message })
    }
  }
}

export default new NoteController()
