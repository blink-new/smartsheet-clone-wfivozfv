import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Activity,
  Download,
  Calendar,
  Filter
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Analytics() {
  const usageData = [
    { month: 'Jan', users: 2400, sheets: 1200, automations: 340 },
    { month: 'Feb', users: 2600, sheets: 1350, automations: 380 },
    { month: 'Mar', users: 2800, sheets: 1500, automations: 420 },
    { month: 'Apr', users: 2950, sheets: 1650, automations: 450 },
    { month: 'May', users: 3100, sheets: 1800, automations: 480 },
    { month: 'Jun', users: 3250, sheets: 1950, automations: 520 }
  ]

  const performanceData = [
    { day: 'Mon', responseTime: 120, uptime: 99.9 },
    { day: 'Tue', responseTime: 115, uptime: 99.8 },
    { day: 'Wed', responseTime: 125, uptime: 99.9 },
    { day: 'Thu', responseTime: 110, uptime: 100 },
    { day: 'Fri', responseTime: 130, uptime: 99.7 },
    { day: 'Sat', responseTime: 105, uptime: 100 },
    { day: 'Sun', responseTime: 108, uptime: 99.9 }
  ]

  const departmentData = [
    { name: 'Product', value: 35, color: '#0ea5e9' },
    { name: 'Marketing', value: 25, color: '#10b981' },
    { name: 'Engineering', value: 20, color: '#f59e0b' },
    { name: 'Sales', value: 12, color: '#ef4444' },
    { name: 'HR', value: 8, color: '#8b5cf6' }
  ]

  const topSheets = [
    { name: 'Q1 Product Roadmap', views: 1250, owner: 'Sarah Johnson', department: 'Product' },
    { name: 'Marketing Campaign Tracker', views: 980, owner: 'Mike Chen', department: 'Marketing' },
    { name: 'Bug Tracking System', views: 875, owner: 'Alex Rodriguez', department: 'Engineering' },
    { name: 'Sales Pipeline', views: 720, owner: 'Emily Davis', department: 'Sales' },
    { name: 'Employee Onboarding', views: 650, owner: 'David Wilson', department: 'HR' }
  ]

  const kpis = [
    {
      title: 'Monthly Active Users',
      value: '3,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Sheets Created',
      value: '1,956',
      change: '+8.3%',
      trend: 'up',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Response Time',
      value: '118ms',
      change: '-5.2%',
      trend: 'down',
      icon: Activity,
      color: 'text-purple-600'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Monitor system performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {kpi.change}
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Monthly growth across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#0ea5e9" name="Users" />
                <Bar dataKey="sheets" fill="#10b981" name="Sheets" />
                <Bar dataKey="automations" fill="#f59e0b" name="Automations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Response time and uptime over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#0ea5e9" 
                  name="Response Time (ms)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#10b981" 
                  name="Uptime (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by Department</CardTitle>
            <CardDescription>Distribution of active users across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{dept.name}</span>
                  <span className="text-sm font-medium">{dept.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Sheets */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sheets</CardTitle>
            <CardDescription>Most viewed sheets this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSheets.map((sheet, index) => (
                <div key={sheet.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{sheet.name}</div>
                      <div className="text-xs text-gray-500">
                        {sheet.owner} • {sheet.department}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{sheet.views}</div>
                    <div className="text-xs text-gray-500">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Key metrics and insights from the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">User Engagement</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Daily Active Users</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Session Duration</span>
                  <span className="font-medium">24m 32s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New User Signups</span>
                  <span className="font-medium">156</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Content Activity</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sheets Created</span>
                  <span className="font-medium">342</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Comments Added</span>
                  <span className="font-medium">1,567</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Files Uploaded</span>
                  <span className="font-medium">89</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">System Health</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">API Success Rate</span>
                  <span className="font-medium">99.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Error Rate</span>
                  <span className="font-medium">0.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-medium">67.2%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}