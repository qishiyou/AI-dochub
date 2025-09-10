import { create } from 'zustand'
import { User, AuthState } from '../types/auth'

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  updateProfile: (profile: Partial<User['profile']>) => void
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@dochub.com',
    role: 'admin',
    createdAt: '2024-01-01',
    lastLoginAt: '2024-01-20',
    isActive: true,
    profile: {
      displayName: '系统管理员',
      bio: '负责平台整体运营和管理',
    },
    stats: {
      documentsCount: 0,
      viewsCount: 0,
      likesCount: 0,
      followersCount: 0,
      followingCount: 0,
    }
  },
  {
    id: '2',
    username: 'creator1',
    email: 'creator@dochub.com',
    role: 'creator',
    createdAt: '2024-01-05',
    lastLoginAt: '2024-01-20',
    isActive: true,
    profile: {
      displayName: '技术创作者',
      bio: '专注于前端技术分享和教程创作',
      website: 'https://example.com',
      location: '北京',
    },
    stats: {
      documentsCount: 15,
      viewsCount: 12500,
      likesCount: 890,
      followersCount: 234,
      followingCount: 56,
    }
  }
]

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    
    // Mock login logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockUsers.find(u => u.email === email)
    if (user && password === '123456') {
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      })
    } else {
      set({ isLoading: false })
      throw new Error('邮箱或密码错误')
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    })
  },

  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: !!user 
    })
  },

  updateProfile: (profileUpdate) => {
    const { user } = get()
    if (user) {
      set({
        user: {
          ...user,
          profile: {
            ...user.profile,
            ...profileUpdate
          }
        }
      })
    }
  }
}))