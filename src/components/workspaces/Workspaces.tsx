import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderOpen, Plus, Users, Settings } from 'lucide-react'

export function Workspaces() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
          <p className="text-gray-600">Organize your sheets and collaborate with your team</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Manage Team
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Workspace
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderOpen className="h-5 w-5 mr-2" />
            Team Workspaces
          </CardTitle>
          <CardDescription>
            Centralized collaboration spaces for your projects and teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workspace Manager</h3>
              <p className="text-gray-600 mb-4">
                Create organized spaces for different teams, projects, or departments
              </p>
              <Button>
                Create Your First Workspace
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Project-based grouping</li>
              <li>• Department separation</li>
              <li>• Client workspaces</li>
              <li>• Template libraries</li>
              <li>• Folder hierarchies</li>
              <li>• Custom categories</li>
              <li>• Search and filtering</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Team member invites</li>
              <li>• Role-based permissions</li>
              <li>• Guest access</li>
              <li>• Activity feeds</li>
              <li>• Notification settings</li>
              <li>• Comment threads</li>
              <li>• @mention system</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Management</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Admin controls</li>
              <li>• Usage analytics</li>
              <li>• Backup & restore</li>
              <li>• Audit logs</li>
              <li>• Security settings</li>
              <li>• Integration management</li>
              <li>• Billing & subscriptions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}