# Markdown 快速参考

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 文本格式

```markdown
**粗体** 或 __粗体__
*斜体* 或 _斜体_
***粗斜体*** 或 ___粗斜体___
~~删除线~~
`行内代码`
```

## 列表

### 无序列表
```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

或使用 * 或 +：
* 项目 1
+ 项目 2
```

### 有序列表
```markdown
1. 第一项
2. 第二项
3. 第三项
   1. 子项目 3.1
   2. 子项目 3.2
```

### 任务列表
```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务
```

## 链接和图片

```markdown
[链接文本](https://example.com)
[链接文本](https://example.com "链接标题")

![图片描述](https://example.com/image.jpg)
![图片描述](https://example.com/image.jpg "图片标题")

[参考链接][ref]
[ref]: https://example.com
```

## 代码

### 行内代码
```markdown
这是 `行内代码` 的示例
```

### 代码块
````markdown
```
普通代码块
```

```python
# Python 代码块
def hello():
    print("Hello, World!")
```

```javascript
// JavaScript 代码块
console.log("Hello, World!");
```

```bash
# Bash 代码块
echo "Hello, World!"
```
````

## 引用

```markdown
> 这是一个引用
> 可以有多行

> 这是第一级引用
> > 这是第二级引用
> > > 这是第三级引用
```

## 分割线

```markdown
---
或
***
或
___
```

## 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

对齐方式：
| 左对齐 | 居中 | 右对齐 |
|:------|:----:|-------:|
| 左 | 中 | 右 |
```

## 数学公式

### 行内公式
```markdown
这是行内公式：$E = mc^2$
```

### 块级公式
```markdown
$$
\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
$$
```

## 特殊字符

```markdown
\*不是斜体\*
\[不是链接\]
\`不是代码\`
```

## HTML 标签

```markdown
<div>HTML 标签会被转义显示</div>
<img src="image.jpg" alt="图片">
```

## 脚注

```markdown
这是一个脚注[^1]

[^1]: 脚注内容
```

## 常用组合

### 强调列表
```markdown
- **重要**: 这是重要内容
- *注意*: 这是注意事项
- `代码`: 这是代码示例
```

### 嵌套列表和代码
```markdown
1. 安装依赖
   ```bash
   npm install
   ```

2. 启动服务
   ```bash
   npm start
   ```

3. 访问应用
   - 打开浏览器
   - 访问 http://localhost:3000
```

### 复杂表格
```markdown
| 功能 | 支持 | 说明 |
|------|------|------|
| 标题 | ✅ | 支持 H1-H6 |
| 列表 | ✅ | 支持有序和无序 |
| 代码 | ✅ | 支持语法高亮 |
| 表格 | ✅ | 支持对齐 |
| 公式 | ✅ | 支持 KaTeX |
```

## 快速技巧

### 1. 快速创建列表
```markdown
- 按 Enter 创建新项目
- 按 Tab 缩进子项目
- 按 Shift+Tab 取消缩进
```

### 2. 快速创建代码块
```markdown
使用三个反引号 ``` 开始和结束代码块
可以指定语言：```python
```

### 3. 快速创建表格
```markdown
| 列1 | 列2 |
|-----|-----|
| 内容 | 内容 |
```

### 4. 快速创建链接
```markdown
[文本](URL) 或 Ctrl+K 快捷键
```

## 常见错误

❌ 错误：
```markdown
#标题（没有空格）
**粗体（只有一个星号）
[链接](没有括号)
```

✅ 正确：
```markdown
# 标题（有空格）
**粗体**（两个星号）
[链接](https://example.com)
```

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- IE: ❌ 不支持

## 更多资源

- [Markdown 官方文档](https://daringfireball.net/projects/markdown/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [CommonMark 规范](https://spec.commonmark.org/)
- [KaTeX 文档](https://katex.org/)

## 快速参考表

| 元素 | 语法 | 示例 |
|------|------|------|
| 标题 | `# 文本` | # 标题 |
| 粗体 | `**文本**` | **粗体** |
| 斜体 | `*文本*` | *斜体* |
| 代码 | `` `文本` `` | `代码` |
| 链接 | `[文本](URL)` | [链接](https://example.com) |
| 图片 | `![文本](URL)` | ![图片](image.jpg) |
| 列表 | `- 项目` | - 项目 |
| 引用 | `> 文本` | > 引用 |
| 表格 | `\| 列 \|` | 见表格示例 |
| 公式 | `$公式$` | $E=mc^2$ |

---

**提示**: 在编辑器中点击"预览"按钮可以实时查看 Markdown 渲染效果！
