import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  editable?: boolean
}

export default function MarkdownEditor({ content, onChange, editable = true }: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* 工具栏 */}
      {editable && (
        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-300 px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">编辑模式</span>
          </div>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPreview ? '编辑' : '预览'}
          </button>
        </div>
      )}

      {/* 编辑器或预览区域 */}
      <div className="flex">
        {/* 编辑区 */}
        {editable && !isPreview && (
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="使用Markdown格式编写笔记..."
            className="w-full p-4 focus:outline-none resize-none min-h-[400px] font-mono text-sm"
          />
        )}

        {/* 预览区 */}
        {isPreview || !editable ? (
          <div className="w-full p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none overflow-auto min-h-[400px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-3 mb-2" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-base font-bold mt-2 mb-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-sm font-bold mt-2 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="my-2 leading-7" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic text-gray-600" {...props} />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-sm" {...props} />
                  ) : (
                    <code className="block bg-gray-100 p-3 rounded my-2 overflow-x-auto font-mono text-sm" {...props} />
                  ),
                pre: ({ node, ...props }) => <pre className="bg-gray-100 p-3 rounded my-2 overflow-x-auto" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
                img: ({ node, ...props }) => <img className="max-w-full h-auto my-2 rounded" {...props} />,
                table: ({ node, ...props }) => (
                  <table className="border-collapse border border-gray-300 my-2 w-full" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold" {...props} />
                ),
                td: ({ node, ...props }) => <td className="border border-gray-300 px-3 py-2" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : null}
      </div>

      {/* 帮助提示 */}
      {editable && !isPreview && (
        <div className="bg-blue-50 border-t border-gray-300 px-4 py-3 text-xs text-gray-600">
          <p className="font-semibold mb-2">Markdown 语法提示：</p>
          <div className="grid grid-cols-2 gap-2">
            <div># 标题 / ## 副标题 / ### 小标题</div>
            <div>**粗体** / *斜体* / ~~删除线~~</div>
            <div>- 列表项 / 1. 有序列表</div>
            <div>[链接](url) / ![图片](url)</div>
            <div>`代码` / ```代码块```</div>
            <div>&gt; 引用 / | 表格 |</div>
          </div>
        </div>
      )}
    </div>
  )
}
