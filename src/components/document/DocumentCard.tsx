import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Calendar, User, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Document } from '../../store/useStore'
import { formatDate, truncateText } from '../../lib/utils'

interface DocumentCardProps {
  document: Document
  onClick: () => void
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <Card 
        className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold leading-tight hover:text-blue-600 transition-colors">
              {document.title}
            </CardTitle>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Eye className="h-3 w-3" />
              <span>{document.viewCount}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {truncateText(document.excerpt, 120)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {document.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              >
                <Tag className="h-2.5 w-2.5" />
                <span>{tag}</span>
              </span>
            ))}
            {document.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{document.tags.length - 3} 更多
              </span>
            )}
          </div>
          
          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{document.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(document.createdAt)}</span>
              </div>
            </div>
            <span className="text-blue-600 font-medium">{document.category}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}