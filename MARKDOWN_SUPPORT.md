# Markdown 支持文档

## 概述

笔记应用现已支持 Markdown 格式编写和预览。用户可以使用 Markdown 语法来格式化笔记内容，并在预览模式下查看渲染效果。

## 功能特性

### 编辑模式
- 使用纯文本编辑器编写 Markdown 内容
- 实时切换到预览模式查看渲染效果
- 自动保存功能支持 Markdown 内容

### 预览模式
- 实时渲染 Markdown 内容
- 支持所有常见 Markdown 语法
- 美观的样式展示

## 支持的 Markdown 语法

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 文本格式
```markdown
**粗体文本**
*斜体文本*
~~删除线~~
`行内代码`
```

### 列表

**无序列表：**
```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3
```

**有序列表：**
```markdown
1. 第一项
2. 第二项
3. 第三项
```

### 链接和图片
```markdown
[链接文本](https://example.com)
![图片描述](https://example.com/image.jpg)
```

### 代码块
```markdown
`单行代码`

多行代码块：
```python
def hello():
    print("Hello, World!")
```
```

### 引用
```markdown
> 这是一个引用
> 可以有多行
```

### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

### 分割线
```markdown
---
或
***
或
___
```

### 数学公式（使用 KaTeX）
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

## 使用指南

### 编写笔记
1. 点击"新建笔记"或编辑现有笔记
2. 在编辑区域使用 Markdown 语法编写内容
3. 点击"预览"按钮查看渲染效果
4. 点击"编辑"按钮返回编辑模式
5. 点击"保存"按钮保存笔记

### 预览笔记
1. 在笔记详情页面点击"预览"按钮
2. 查看 Markdown 渲染后的效果
3. 点击"编辑"按钮返回编辑模式进行修改

### 笔记列表预览
- 笔记列表中显示笔记的文本预览（自动移除 Markdown 语法符号）
- 预览长度限制为 100 个字符

## 技术实现

### 前端依赖
- `react-markdown`: Markdown 渲染库
- `remark-gfm`: GitHub Flavored Markdown 支持
- `remark-math`: 数学公式支持
- `rehype-katex`: KaTeX 数学公式渲染

### 后端处理
- 笔记内容以 Markdown 格式存储在数据库中
- 预览生成时自动移除 Markdown 语法符号
- 支持 Markdown 内容的搜索

## 注意事项

1. **内容存储格式**：笔记内容现在以 Markdown 格式存储，不再是 HTML 格式
2. **向后兼容性**：现有的 HTML 格式笔记可能需要手动转换为 Markdown 格式
3. **搜索功能**：搜索会在 Markdown 原始内容中进行，包括 Markdown 语法符号
4. **导出功能**：导出的笔记将以 Markdown 格式提供

## 常见问题

### Q: 如何从 HTML 转换到 Markdown？
A: 可以使用在线转换工具（如 Pandoc）将 HTML 转换为 Markdown，然后复制粘贴到笔记中。

### Q: 是否支持自定义 CSS 样式？
A: 目前预览样式是固定的，使用 Tailwind CSS 进行样式设置。如需自定义，可以修改 `MarkdownEditor.tsx` 中的样式配置。

### Q: 如何插入图片？
A: 使用 Markdown 图片语法：`![描述](图片URL)`。图片 URL 可以是网络地址或本地上传的地址。

### Q: 是否支持 HTML 标签？
A: 出于安全考虑，HTML 标签会被转义显示，不会被执行。

## 更新日志

### v1.0.0 (当前版本)
- ✅ 添加 Markdown 编辑器
- ✅ 支持 Markdown 预览
- ✅ 支持 GitHub Flavored Markdown
- ✅ 支持数学公式
- ✅ 优化笔记列表预览显示
