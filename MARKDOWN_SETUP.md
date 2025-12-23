# Markdown 功能设置指南

## 概述

笔记应用已成功添加了 Markdown 支持。本指南说明了如何设置和使用新的 Markdown 功能。

## 安装步骤

### 1. 更新前端依赖

```bash
cd frontend
npm install
```

这将安装以下新的依赖包：
- `react-markdown` - Markdown 渲染库
- `remark-gfm` - GitHub Flavored Markdown 支持
- `remark-math` - 数学公式支持
- `rehype-katex` - KaTeX 数学公式渲染

### 2. 启动开发服务器

**后端** (如果还没启动):
```bash
cd server
npm run dev
```

**前端**:
```bash
cd frontend
npm run dev
```

### 3. 验证安装

1. 打开浏览器访问 http://localhost:5173
2. 登录到应用
3. 创建新笔记或编辑现有笔记
4. 应该看到新的 Markdown 编辑器界面

## 使用指南

### 创建新笔记

1. 点击"新建笔记"按钮
2. 输入笔记标题
3. 在编辑区使用 Markdown 语法编写内容
4. 点击"预览"按钮查看渲染效果
5. 点击"编辑"按钮返回编辑模式
6. 点击"保存"按钮保存笔记

### 编辑现有笔记

1. 从笔记列表中点击要编辑的笔记
2. 修改标题或内容
3. 点击"预览"查看效果
4. 点击"保存"保存更改

### 使用 Markdown 语法

#### 基础语法

```markdown
# 标题
## 副标题

**粗体** 和 *斜体*

- 列表项 1
- 列表项 2

1. 有序项 1
2. 有序项 2

[链接](https://example.com)
![图片](image.jpg)

`代码`

> 引用
```

#### 高级语法

```markdown
| 表格 | 示例 |
|------|------|
| 内容 | 内容 |

$$
E = mc^2
$$

```python
代码块
```
```

详见 [Markdown 快速参考](./MARKDOWN_CHEATSHEET.md)

## 文件变化

### 新增文件
- `frontend/src/components/notes/MarkdownEditor.tsx` - Markdown 编辑器组件
- `MARKDOWN_SUPPORT.md` - 功能文档
- `MARKDOWN_MIGRATION.md` - 迁移指南
- `MARKDOWN_CHEATSHEET.md` - 快速参考
- `MARKDOWN_IMPLEMENTATION.md` - 实现细节

### 修改文件
- `frontend/package.json` - 添加 Markdown 依赖
- `frontend/src/pages/NoteDetailPage.tsx` - 使用新编辑器
- `server/src/services/noteService.ts` - 优化预览生成
- `README.md` - 更新文档

## 常见问题

### Q: 需要迁移现有笔记吗？
A: 不需要。现有笔记仍然可以访问。建议逐步转换为 Markdown 格式。

### Q: 如何转换 HTML 笔记到 Markdown？
A: 可以使用在线工具或 Pandoc 进行转换。详见 [迁移指南](./MARKDOWN_MIGRATION.md)。

### Q: 编辑器支持哪些 Markdown 语法？
A: 支持所有常见语法，包括表格、代码块、数学公式等。详见 [快速参考](./MARKDOWN_CHEATSHEET.md)。

### Q: 如何在预览中查看效果？
A: 点击编辑器顶部的"预览"按钮即可切换到预览模式。

### Q: 是否支持自定义样式？
A: 目前使用 Tailwind CSS 样式。可以修改 `MarkdownEditor.tsx` 中的样式配置。

## 故障排除

### 问题：编辑器不显示
**解决方案**:
1. 确保已运行 `npm install`
2. 清除浏览器缓存
3. 重新启动开发服务器

### 问题：Markdown 不渲染
**解决方案**:
1. 检查 Markdown 语法是否正确
2. 点击"预览"按钮
3. 查看浏览器控制台是否有错误

### 问题：图片不显示
**解决方案**:
1. 确保图片 URL 正确
2. 检查图片是否可访问
3. 使用完整的 URL 而不是相对路径

### 问题：数学公式不显示
**解决方案**:
1. 确保使用正确的 KaTeX 语法
2. 使用 `$公式$` 表示行内公式
3. 使用 `$$公式$$` 表示块级公式

## 性能优化

### 建议
1. 避免在单个笔记中放置过多内容
2. 使用代码块而不是行内代码处理长代码
3. 定期保存笔记

### 监控
- 检查浏览器开发者工具中的性能指标
- 监控网络请求
- 检查内存使用情况

## 安全建议

1. **不要在 Markdown 中包含敏感信息**
   - 密码
   - API 密钥
   - 个人身份信息

2. **验证外部链接**
   - 只链接到可信的网站
   - 避免点击不明来源的链接

3. **定期备份**
   - 定期导出重要笔记
   - 保存本地副本

## 下一步

1. 阅读 [Markdown 支持文档](./MARKDOWN_SUPPORT.md) 了解所有功能
2. 查看 [快速参考](./MARKDOWN_CHEATSHEET.md) 学习语法
3. 开始创建和编辑 Markdown 笔记
4. 根据需要转换现有笔记

## 获取帮助

- 📖 查看文档：[MARKDOWN_SUPPORT.md](./MARKDOWN_SUPPORT.md)
- 🚀 快速参考：[MARKDOWN_CHEATSHEET.md](./MARKDOWN_CHEATSHEET.md)
- 🔄 迁移指南：[MARKDOWN_MIGRATION.md](./MARKDOWN_MIGRATION.md)
- 💻 实现细节：[MARKDOWN_IMPLEMENTATION.md](./MARKDOWN_IMPLEMENTATION.md)

## 反馈

如有任何问题或建议，欢迎反馈！

---

**版本**: 1.0.0  
**最后更新**: 2024  
**状态**: 生产就绪
