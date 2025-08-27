import React from 'react'
import { motion } from 'framer-motion'
import { DocumentCard } from './DocumentCard'
import { useStore } from '../../store/useStore'
import { mockDocuments } from '../../data/mockData'
import { Search, FileX } from 'lucide-react'

export function DocumentList() {
  const { 
    documents, 
    setDocuments, 
    selectedCategory, 
    searchQuery, 
    setCurrentDocument 
  } = useStore()

  React.useEffect(() => {
    setDocuments(mockDocuments)
  }, [setDocuments])

  const filteredDocuments = React.useMemo(() => {
    let filtered = documents

    // Filter by category
    if (selectedCategory) {
      const categoryName = useStore.getState().categories.find(c => c.id === selectedCategory)?.name
      if (categoryName) {
        filtered = filtered.filter(doc => doc.category === categoryName)
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
        doc.author.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [documents, selectedCategory, searchQuery])

  const handleDocumentClick = (document: any) => {
    setCurrentDocument(document)
  }

  if (filteredDocuments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        {searchQuery ? (
          <>
            <Search className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              未找到相关文档
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              尝试使用不同的关键词搜索，或者浏览所有文档分类。
            </p>
          </>
        ) : (
          <>
            <FileX className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              暂无文档
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              该分类下暂时没有文档，请选择其他分类或创建新文档。
            </p>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery ? `搜索结果` : selectedCategory ? 
              useStore.getState().categories.find(c => c.id === selectedCategory)?.name : 
              '所有文档'
            }
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            找到 {filteredDocuments.length} 篇文档
            {searchQuery && ` 包含 "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Document grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
      >
        {filteredDocuments.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DocumentCard
              document={document}
              onClick={() => handleDocumentClick(document)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}