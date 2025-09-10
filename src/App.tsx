import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { DocumentList } from './components/document/DocumentList'
import { DocumentViewer } from './components/document/DocumentViewer'
import { HeroSection } from './components/home/HeroSection'
import { StatsSection } from './components/home/StatsSection'
import { AdminDashboard } from './components/dashboard/AdminDashboard'
import { UserDashboard } from './components/dashboard/UserDashboard'
import { CreatorCenter } from './components/dashboard/CreatorCenter'
import { useStore } from './store/useStore'
import { useAuthStore } from './store/authStore'
import { cn } from './lib/utils'

function App() {
  const { currentDocument, sidebarOpen, darkMode, searchQuery, selectedCategory } = useStore()
  const { user, isAuthenticated } = useAuthStore()
  
  // 判断是否在首页（没有搜索查询且没有选择分类）
  const isHomePage = !searchQuery && !selectedCategory && !currentDocument && !isAuthenticated
  
  // 判断当前页面类型
  const getCurrentPage = () => {
    if (currentDocument) return 'document'
    if (isAuthenticated && user) {
      if (user.role === 'admin') return 'admin-dashboard'
      if (user.role === 'creator') return 'creator-center'
      return 'user-dashboard'
    }
    if (searchQuery || selectedCategory) return 'document-list'
    return 'home'
  }
  
  const currentPage = getCurrentPage()

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={cn("min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200")}>
      <Header />
      
      <div className="flex">
        {/* 只在非首页时显示侧边栏 */}
        {currentPage !== 'home' && currentPage !== 'admin-dashboard' && currentPage !== 'user-dashboard' && currentPage !== 'creator-center' && <Sidebar />}
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          (currentPage === 'document-list' || currentPage === 'document') && sidebarOpen ? "lg:ml-80" : "ml-0"
        )}>
          <AnimatePresence mode="wait">
            {currentPage === 'document' ? (
              <motion.div
                key="document-viewer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-6 sm:px-6 lg:px-8"
              >
                <DocumentViewer
                  document={currentDocument}
                  onBack={() => useStore.getState().setCurrentDocument(null)}
                />
              </motion.div>
            ) : currentPage === 'admin-dashboard' ? (
              <motion.div
                key="admin-dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdminDashboard />
              </motion.div>
            ) : currentPage === 'creator-center' ? (
              <motion.div
                key="creator-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CreatorCenter />
              </motion.div>
            ) : currentPage === 'user-dashboard' ? (
              <motion.div
                key="user-dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserDashboard />
              </motion.div>
            ) : (
              <motion.div
                key="document-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Show hero section only when no search query and no category selected */}
                {currentPage === 'home' && (
                  <>
                    <HeroSection />
                    <StatsSection />
                  </>
                )}
                
                {/* 只在非首页时显示文档列表 */}
                {currentPage === 'document-list' && (
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <DocumentList />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
