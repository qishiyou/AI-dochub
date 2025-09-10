import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Eye, 
  TrendingUp, 
  Settings,
  Shield,
  BarChart3,
  UserCheck,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'

export function AdminDashboard() {
  const stats = [
    {
      title: '总用户数',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: '总文档数',
      value: '15,234',
      change: '+8%',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: '总浏览量',
      value: '1.2M',
      change: '+23%',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: '活跃用户',
      value: '1,456',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const recentActivities = [
    { id: 1, user: '张三', action: '发布了新文档', document: 'React 18 最佳实践', time: '2分钟前' },
    { id: 2, user: '李四', action: '更新了文档', document: 'TypeScript 进阶指南', time: '5分钟前' },
    { id: 3, user: '王五', action: '删除了文档', document: '过时的API文档', time: '10分钟前' },
    { id: 4, user: '赵六', action: '注册了账号', document: '', time: '15分钟前' },
  ]

  const pendingReviews = [
    { id: 1, title: 'Vue 3 组合式API详解', author: '创作者A', status: 'pending' },
    { id: 2, title: 'Node.js 性能优化指南', author: '创作者B', status: 'pending' },
    { id: 3, title: 'Docker 容器化部署', author: '创作者C', status: 'pending' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">管理员控制台</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">平台数据概览和管理功能</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            系统设置
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            安全中心
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                    <p className="text-sm text-green-600 mt-1">
                      {stat.change} 本月
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                      {activity.document && (
                        <span className="text-blue-600"> "{activity.document}"</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              待审核文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{review.title}</p>
                    <p className="text-xs text-gray-500">作者：{review.author}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">拒绝</Button>
                    <Button size="sm">通过</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              用户管理
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              内容管理
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              举报处理
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              数据分析
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}