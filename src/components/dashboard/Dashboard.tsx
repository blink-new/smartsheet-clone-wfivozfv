import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Grid3X3, 
  Calendar, 
  FileText, 
  BarChart3, 
  Users, 
  Clock,
  TrendingUp,
  Plus,
  MoreHorizontal
} from 'lucide-react'
import { blink } from '@/lib/blink'

interface DashboardStats {
  totalSheets: number
  activeProjects: number
  completedTasks: number
  teamMembers: number
}

interface RecentActivity {
  id: string
  type: 'sheet' | 'task' | 'comment'
  title: string
  description: string
  timestamp: string
  user: string
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSheets: 12,
    activeProjects: 5,
    completedTasks: 89,
    teamMembers: 8
  })

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'sheet',
      title: 'Project Timeline Updated',
      description: 'Added new milestones for Q2 deliverables',
      timestamp: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'task',
      title: 'Task Completed',
      description: 'Design review completed for mobile app',
      timestamp: '4 hours ago',
      user: 'Sarah Wilson'
    },
    {
      id: '3',
      type: 'comment',
      title: 'New Comment',
      description: 'Budget needs revision for marketing campaign',
      timestamp: '6 hours ago',
      user: 'Mike Johnson'
    }
  ])

  const quickActions = [
    {
      title: 'Create Sheet',
      description: 'Start with a blank sheet',
      icon: Grid3X3,
      color: 'bg-blue-500'
    },
    {
      title: 'Project Template',
      description: 'Use a project template',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Create Form',
      description: 'Collect data with forms',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Build Report',
      description: 'Analyze your data',
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sheets</CardTitle>
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSheets}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              3 due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              2 online now
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sheets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Sheets</CardTitle>
              <CardDescription>Your most recently accessed sheets</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Project Timeline', type: 'Project', lastModified: '2 hours ago', status: 'Active' },
              { name: 'Budget Tracker', type: 'Finance', lastModified: '1 day ago', status: 'Review' },
              { name: 'Task Management', type: 'Operations', lastModified: '3 days ago', status: 'Active' },
              { name: 'Team Directory', type: 'HR', lastModified: '1 week ago', status: 'Complete' },
              { name: 'Marketing Campaign', type: 'Marketing', lastModified: '2 weeks ago', status: 'Planning' },
              { name: 'Inventory Tracking', type: 'Operations', lastModified: '3 weeks ago', status: 'Active' }
            ].map((sheet, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{sheet.name}</h3>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{sheet.type}</p>
                    <p className="text-xs text-gray-500">{sheet.lastModified}</p>
                  </div>
                  <Badge variant={sheet.status === 'Active' ? 'default' : 'secondary'}>
                    {sheet.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}