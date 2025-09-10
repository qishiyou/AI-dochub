export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'creator' | 'user'
  createdAt: string
  lastLoginAt?: string
  isActive: boolean
  profile: {
    displayName: string
    bio?: string
    website?: string
    location?: string
  }
  stats: {
    documentsCount: number
    viewsCount: number
    likesCount: number
    followersCount: number
    followingCount: number
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}