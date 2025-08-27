import React from 'react'
import { Search, Menu, Moon, Sun, Bell, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'

export function Header() {
  const { 
    searchQuery, 
    setSearchQuery, 
    sidebarOpen, 
    setSidebarOpen, 
    darkMode, 
    toggleDarkMode,
    selectedCategory,
    currentDocument
  } = useStore()
  
  // 判断是否在首页
  const isHomePage = !searchQuery && !selectedCategory && !currentDocument

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
    >
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("lg:hidden", isHomePage && "hidden")}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              DocHub
            </span>
          </motion.div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}