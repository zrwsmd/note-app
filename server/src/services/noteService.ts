import prisma from '../prisma.js'

// 从Markdown内容中提取纯文本预览
function extractPreview(content: string, maxLength: number = 100): string {
  // 移除Markdown语法符号
  let text = content
    .replace(/^#+\s+/gm, '') // 移除标题符号
    .replace(/\*\*(.+?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.+?)\*/g, '$1') // 移除斜体
    .replace(/~~(.+?)~~/g, '$1') // 移除删除线
    .replace(/`(.+?)`/g, '$1') // 移除代码
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 移除链接
    .replace(/!\[.+?\]\(.+?\)/g, '[图片]') // 替换图片
    .replace(/^>\s+/gm, '') // 移除引用
    .replace(/^\s*[-*+]\s+/gm, '') // 移除列表符号
    .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表
    .replace(/\n+/g, ' ') // 将换行替换为空格
    .trim()

  // 截取指定长度
  return text.substring(0, maxLength)
}

export class NoteService {
  // 创建笔记
  async createNote(userId: string, title: string, content: string) {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    })

    return note
  }

  // 获取用户的所有笔记
  async getNotes(userId: string, search?: string) {
    const where: any = { userId }

    // 如果有搜索关键词，添加搜索条件
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // 为每个笔记生成预览（前100个字符，移除Markdown语法）
    return notes.map((note: { id: string; title: string; content: string; createdAt: Date; updatedAt: Date }) => ({
      ...note,
      preview: extractPreview(note.content),
    }))
  }

  // 获取单个笔记
  async getNoteById(noteId: string, userId: string) {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId, // 确保用户只能访问自己的笔记
      },
    })

    if (!note) {
      throw new Error('笔记不存在')
    }

    return note
  }

  // 更新笔记
  async updateNote(noteId: string, userId: string, title?: string, content?: string) {
    // 先检查笔记是否存在且属于该用户
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    })

    if (!existingNote) {
      throw new Error('笔记不存在或无权限')
    }

    // 更新笔记
    const note = await prisma.note.update({
      where: { id: noteId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
    })

    return note
  }

  // 删除笔记
  async deleteNote(noteId: string, userId: string) {
    // 先检查笔记是否存在且属于该用户
    const existingNote = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    })

    if (!existingNote) {
      throw new Error('笔记不存在或无权限')
    }

    // 删除笔记
    await prisma.note.delete({
      where: { id: noteId },
    })

    return { message: '笔记删除成功' }
  }

  // 批量删除笔记
  async batchDeleteNotes(noteIds: string[], userId: string) {
    // 检查所有笔记是否属于该用户
    const userNotes = await prisma.note.findMany({
      where: {
        id: { in: noteIds },
        userId,
      },
      select: { id: true },
    })

    if (userNotes.length !== noteIds.length) {
      throw new Error('部分笔记不存在或无权限')
    }

    // 批量删除
    const result = await prisma.note.deleteMany({
      where: {
        id: { in: noteIds },
        userId,
      },
    })

    return { 
      message: `成功删除 ${result.count} 篇笔记`,
      deletedCount: result.count 
    }
  }
}

export default new NoteService()
