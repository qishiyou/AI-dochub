import React from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  ArrowLeft, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Clock
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Document } from '../../store/useStore'
import { formatDate } from '../../lib/utils'

interface DocumentViewerProps {
  document: Document
  onBack: () => void
}

export function DocumentViewer({ document, onBack }: DocumentViewerProps) {
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      )
    },
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
        {children}
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
        {children}
      </td>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Document meta */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {document.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{document.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(document.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>更新于 {formatDate(document.updatedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{document.viewCount} 次浏览</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={components}
          >
            {document.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}