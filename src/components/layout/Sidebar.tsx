import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Folder, 
  Tag, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { mockCategories } from '../../data/mockData'
import { cn } from '../../lib/utils'

export function Sidebar() {
  const { 
    sidebarOpen, 
    selectedCategory, 
    setSelectedCategory,
    setCategories,
    categories 
  } = useStore()

  React.useEffect(() => {
    setCategories(mockCategories)
  }, [setCategories])

  const [expandedSections, setExpandedSections] = React.useState<string[]>(['categories'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -300, opacity: 0 }
  }

  const menuItems = [
    { id: 'recent', label: '最近访问', icon: Clock },
    { id: 'favorites', label: '收藏夹', icon: Star },
    { id: 'trending', label: '热门文档', icon: TrendingUp },
  ]

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => useStore.getState().setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-16"
          >
            <div className="flex h-full flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-6">
                  {/* Quick Access */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                      快速访问
                    </h3>
                    <ul className="space-y-1">
                      {menuItems.map((item) => (
                        <li key={item.id}>
                          <motion.button
                            whileHover={{ x: 4 }}
                            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Categories */}
                  <div>
                    <button
                      onClick={() => toggleSection('categories')}
                      className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-500 dark:text-gray-400"
                    >
                      <span>文档分类</span>
                      {expandedSections.includes('categories') ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.includes('categories') && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-1 overflow-hidden"
                        >
                          <li>
                            <motion.button
                              whileHover={{ x: 4 }}
                              onClick={() => setSelectedCategory(null)}
                              className={cn(
                                "flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                selectedCategory === null
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                              )}
                            >
                              <FileText className="h-4 w-4" />
                              <span>所有文档</span>
                            </motion.button>
                          </li>
                          {categories.map((category) => (
                            <li key={category.id}>
                              <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={cn(
                                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                                  selectedCategory === category.id
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                              >
                                <div className="flex items-center space-x-3">
                                  <Folder className="h-4 w-4" />
                                  <span>{category.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {category.documentCount}
                                </span>
                              </motion.button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tags */}
                  <div>
                    <button
                      onClick={() => toggleSection('tags')}
                      className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-500 dark:text-gray-400"
                    >
                      <span>标签</span>
                      {expandedSections.includes('tags') ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.includes('tags') && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-wrap gap-2 overflow-hidden"
                        >
                          {['React', 'TypeScript', 'API', '架构', '前端开发', '后端开发'].map((tag) => (
                            <motion.button
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Tag className="h-3 w-3" />
                              <span>{tag}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}