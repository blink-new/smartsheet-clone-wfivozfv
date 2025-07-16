import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  FileText, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

export function Overview() {
  const stats = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Sheets',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Automation Rules',
      value: '456',
      change: '+23%',
      trend: 'up',
      icon: Zap,
      color: 'text-purple-600'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'Stable',
      trend: 'stable',
      icon: Activity,
      color: 'text-emerald-600'
    }
  ]

  const recentActivity = [
    {
      type: 'user',
      message: 'New user Sarah Johnson joined Marketing workspace',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      type: 'automation',
      message: 'Automation rule "Project Status Update" executed successfully',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'High API usage detected in Finance department',
      time: '12 minutes ago',
      status: 'warning'
    },
    {
      type: 'system',
      message: 'Scheduled backup completed successfully',
      time: '1 hour ago',
      status: 'success'
    }
  ]

  const systemHealth = [
    { name: 'API Response Time', value: 95, status: 'good' },
    { name: 'Database Performance', value: 88, status: 'good' },
    { name: 'Storage Usage', value: 67, status: 'warning' },
    { name: 'Active Connections', value: 92, status: 'good' }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-gray-500'}>
                    {stat.change}
                  </span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {activity.status === 'warning' && (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{metric.value}%</span>
                      <Badge 
                        variant={metric.status === 'good' ? 'default' : 'secondary'}
                        className={
                          metric.status === 'good' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className={`h-2 ${
                      metric.status === 'good' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}