import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Eye, 
  Heart, 
  Users, 
  Plus,
  TrendingUp,
  Calendar,
  Edit3,
  Bookmark
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../store/authStore'

export function UserDashboard() {
  const { user } = useAuthStore()
  
  if (!user) return null

  const isCreator = user.role === 'creator'

  const recentDocuments = [
    { id: 1, title: 'React 18 新特性详解', views: 1250, likes: 89, createdAt: '2024-01-15' },
    { id: 2, title: 'TypeScript 高级类型系统', views: 890, likes: 67, createdAt: '2024-01-14' },
    { id: 3, title: 'RESTful API 设计最佳实践', views: 1560, likes: 123, createdAt: '2024-01-13' },
  ]

  const bookmarkedDocuments = [
    { id: 1, title: '微服务架构设计指南', author: '赵六', createdAt: '2024-01-12' },
    { id: 2, title: 'Docker 容器化部署', author: '钱七', createdAt: '2024-01-11' },
    { id: 3, title: 'GraphQL 实战教程', author: '孙八', createdAt: '2024-01-10' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isCreator ? '创作者中心' : '个人中心'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            欢迎回来，{user.profile.displayName}
          </p>
        </div>
        <div className="flex space-x-3">
          {isCreator && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建文档
            </Button>
          )}
          <Button variant="outline">
            <Edit3 className="h-4 w-4 mr-2" />
            编辑资料
          </Button>
        </div>
      </div>

      {/* Stats for Creators */}
      {isCreator && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: '我的文档', value: user.stats.documentsCount, icon: FileText, color: 'text-blue-600' },
            { title: '总浏览量', value: user.stats.viewsCount.toLocaleString(), icon: Eye, color: 'text-green-600' },
            { title: '获得点赞', value: user.stats.likesCount, icon: Heart, color: 'text-red-600' },
            { title: '粉丝数量', value: user.stats.followersCount, icon: Users, color: 'text-purple-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        {isCreator && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  我的文档
                </span>
                <Button variant="ghost" size="sm">查看全部</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{doc.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {doc.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {doc.likes}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {doc.createdAt}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">编辑</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookmarked Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Bookmark className="h-5 w-5 mr-2" />
                我的收藏
              </span>
              <Button variant="ghost" size="sm">查看全部</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookmarkedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{doc.title}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>作者：{doc.author}</span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {doc.createdAt}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">查看</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics for Creators */}
      {isCreator && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              数据分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">+23%</p>
                <p className="text-sm text-gray-600">本月浏览量增长</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+15%</p>
                <p className="text-sm text-gray-600">新增粉丝</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">+8%</p>
                <p className="text-sm text-gray-600">文档互动率</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}