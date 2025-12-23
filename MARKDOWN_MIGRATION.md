# Markdown 迁移指南

## 概述

笔记应用已从 TipTap 富文本编辑器迁移到 Markdown 编辑器。这个文档说明了变化以及如何适应新的编辑方式。

## 主要变化

### 编辑器变化
- **旧版本**：使用 TipTap 富文本编辑器，提供工具栏进行格式化
- **新版本**：使用 Markdown 编辑器，支持编辑/预览模式切换

### 内容存储格式
- **旧版本**：内容以 HTML 格式存储
- **新版本**：内容以 Markdown 格式存储

### 用户界面
- **旧版本**：工具栏按钮用于快速格式化
- **新版本**：编辑/预览按钮用于切换模式，内置 Markdown 语法提示

## 迁移步骤

### 对于新笔记
直接使用 Markdown 语法编写笔记，无需任何额外步骤。

### 对于现有笔记
现有的 HTML 格式笔记仍然可以访问，但建议进行以下操作：

1. **打开现有笔记**
   - 进入笔记详情页面
   - 查看当前内容

2. **转换为 Markdown**
   - 如果内容是简单的文本，可以直接复制使用
   - 如果包含复杂的 HTML 格式，可以使用在线转换工具
   - 推荐工具：[Pandoc](https://pandoc.org/)、[CloudConvert](https://cloudconvert.com/)

3. **更新笔记**
   - 将转换后的 Markdown 内容复制到编辑器
   - 点击预览按钮查看效果
   - 点击保存按钮保存更新

## 常见转换示例

### 标题
```html
<!-- HTML 格式 -->
<h1>标题</h1>
<h2>副标题</h2>
```

```markdown
# 标题
## 副标题
```

### 文本格式
```html
<!-- HTML 格式 -->
<strong>粗体</strong>
<em>斜体</em>
<del>删除线</del>
```

```markdown
**粗体**
*斜体*
~~删除线~~
```

### 列表
```html
<!-- HTML 格式 -->
<ul>
  <li>项目 1</li>
  <li>项目 2</li>
</ul>

<ol>
  <li>第一项</li>
  <li>第二项</li>
</ol>
```

```markdown
- 项目 1
- 项目 2

1. 第一项
2. 第二项
```

### 链接和图片
```html
<!-- HTML 格式 -->
<a href="https://example.com">链接</a>
<img src="https://example.com/image.jpg" alt="描述">
```

```markdown
[链接](https://example.com)
![描述](https://example.com/image.jpg)
```

### 代码
```html
<!-- HTML 格式 -->
<code>行内代码</code>
<pre><code>代码块</code></pre>
```

```markdown
`行内代码`

```
代码块
```
```

## 优势

### 使用 Markdown 的优势

1. **简洁性**
   - Markdown 语法简单易学
   - 文本文件易于版本控制

2. **可移植性**
   - Markdown 是通用格式
   - 易于导出和导入

3. **性能**
   - 更小的文件大小
   - 更快的渲染速度

4. **灵活性**
   - 支持更多的格式选项
   - 易于扩展功能

5. **标准化**
   - Markdown 是行业标准
   - 与其他工具兼容

## 常见问题

### Q: 我的旧笔记会丢失吗？
A: 不会。旧笔记仍然保存在数据库中，但显示格式可能不同。建议逐步转换为 Markdown 格式。

### Q: 如何快速转换大量笔记？
A: 可以编写脚本使用 Pandoc 或其他工具进行批量转换。如需帮助，请联系开发团队。

### Q: 是否可以同时使用两种编辑器？
A: 目前只支持 Markdown 编辑器。如需使用富文本编辑器，可以保留旧版本的分支。

### Q: Markdown 编辑器是否支持所有 HTML 功能？
A: 大多数常见功能都支持。某些高级 HTML 功能可能不支持，但可以通过 Markdown 扩展实现。

### Q: 如何处理包含 HTML 的笔记？
A: 出于安全考虑，HTML 标签会被转义。建议将 HTML 内容转换为 Markdown 格式。

## 技术细节

### 依赖更新
```json
{
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "remark-math": "^6.0.0",
  "rehype-katex": "^7.0.0"
}
```

### 文件变化
- 新增：`frontend/src/components/notes/MarkdownEditor.tsx`
- 保留：`frontend/src/components/notes/NoteEditor.tsx`（用于参考）
- 更新：`frontend/src/pages/NoteDetailPage.tsx`
- 更新：`server/src/services/noteService.ts`

### 数据库
- 无需数据库迁移
- 现有数据保持不变
- 新笔记以 Markdown 格式存储

## 反馈和支持

如有任何问题或建议，请：
1. 检查 [Markdown 支持文档](./MARKDOWN_SUPPORT.md)
2. 查看常见问题部分
3. 联系开发团队

## 版本历史

### v1.0.0 (当前)
- 从 TipTap 迁移到 Markdown 编辑器
- 添加编辑/预览模式切换
- 支持 GitHub Flavored Markdown
- 支持数学公式
