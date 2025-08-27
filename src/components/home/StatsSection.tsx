import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, Eye, TrendingUp } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: FileText,
      value: '2,847',
      label: '文档总数',
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      value: '1,234',
      label: '活跃用户',
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Eye,
      value: '45.2K',
      label: '总浏览量',
      change: '+23%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      value: '89%',
      label: '搜索准确率',
      change: '+5%',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            平台数据概览
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            实时统计数据，展示平台的活跃度和用户参与情况
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              
              <div className="text-gray-600 dark:text-gray-300 mb-2">
                {stat.label}
              </div>
              
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{stat.change}</span>
                <span className="text-gray-500 ml-1">本月</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}