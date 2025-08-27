import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { DocumentList } from './components/document/DocumentList'
import { DocumentViewer } from './components/document/DocumentViewer'
import { HeroSection } from './components/home/HeroSection'
import { StatsSection } from './components/home/StatsSection'
import { useStore } from './store/useStore'
import { cn } from './lib/utils'

function App() {
  const { currentDocument, sidebarOpen, darkMode } = useStore()

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
        <Sidebar />
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "lg:ml-80" : "ml-0"
        )}>
          <AnimatePresence mode="wait">
            {currentDocument ? (
              <motion.div
                key="document-viewer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <DocumentViewer
                  document={currentDocument}
                  onBack={() => useStore.getState().setCurrentDocument(null)}
                />
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
                {!useStore.getState().searchQuery && !useStore.getState().selectedCategory && (
                  <>
                    <HeroSection />
                    <StatsSection />
                  </>
                )}
                
                <div className="p-6">
                  <DocumentList />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
