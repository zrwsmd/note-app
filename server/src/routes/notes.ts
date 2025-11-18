import { Router } from 'express'
import noteController from '../controllers/noteController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// 所有笔记路由都需要认证
router.use(authMiddleware)

// 笔记CRUD操作
router.post('/', noteController.createNote.bind(noteController))
router.get('/', noteController.getNotes.bind(noteController))
router.get('/:id', noteController.getNoteById.bind(noteController))
router.put('/:id', noteController.updateNote.bind(noteController))
router.delete('/:id', noteController.deleteNote.bind(noteController))

// 批量操作
router.post('/batch/delete', noteController.batchDeleteNotes.bind(noteController))

export default router
