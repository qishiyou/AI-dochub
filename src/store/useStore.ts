import { create } from 'zustand'

export interface Document {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  viewCount: number
}

export interface Category {
  id: string
  name: string
  description: string
  documentCount: number
}

interface AppState {
  // Documents
  documents: Document[]
  currentDocument: Document | null
  
  // Categories
  categories: Category[]
  selectedCategory: string | null
  
  // Search
  searchQuery: string
  searchResults: Document[]
  
  // UI State
  sidebarOpen: boolean
  darkMode: boolean
  
  // Actions
  setDocuments: (documents: Document[]) => void
  setCurrentDocument: (document: Document | null) => void
  setCategories: (categories: Category[]) => void
  setSelectedCategory: (categoryId: string | null) => void
  setSearchQuery: (query: string) => void
  setSearchResults: (results: Document[]) => void
  setSidebarOpen: (open: boolean) => void
  toggleDarkMode: () => void
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  documents: [],
  currentDocument: null,
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  searchResults: [],
  sidebarOpen: true,
  darkMode: false,
  
  // Actions
  setDocuments: (documents) => set({ documents }),
  setCurrentDocument: (document) => set({ currentDocument: document }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}))