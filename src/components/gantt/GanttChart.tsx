import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Plus, Filter, Settings } from 'lucide-react'

export function GanttChart() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gantt Chart</h1>
          <p className="text-gray-600">Visual project timeline and dependency management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Project Timeline
          </CardTitle>
          <CardDescription>
            Track project progress and dependencies with interactive Gantt charts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gantt Chart View</h3>
              <p className="text-gray-600 mb-4">
                Interactive timeline visualization for project management
              </p>
              <Button>
                Create First Timeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Drag and drop task scheduling</li>
              <li>• Dependency management</li>
              <li>• Critical path highlighting</li>
              <li>• Resource allocation</li>
              <li>• Milestone tracking</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time updates</li>
              <li>• Team member assignments</li>
              <li>• Progress tracking</li>
              <li>• Comment threads</li>
              <li>• Notification system</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• PDF reports</li>
              <li>• Excel export</li>
              <li>• Image snapshots</li>
              <li>• Project templates</li>
              <li>• Calendar integration</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}