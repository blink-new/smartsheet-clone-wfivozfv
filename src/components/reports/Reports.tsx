import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Plus, Download, Share } from 'lucide-react'

export function Reports() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Create insightful reports and analytics from your sheet data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Visualize your data with charts, graphs, and custom reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Report Builder</h3>
              <p className="text-gray-600 mb-4">
                Transform your sheet data into meaningful insights and visualizations
              </p>
              <Button>
                Create Your First Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chart Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Bar charts</li>
              <li>• Line graphs</li>
              <li>• Pie charts</li>
              <li>• Scatter plots</li>
              <li>• Heat maps</li>
              <li>• Gauge charts</li>
              <li>• Custom visualizations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time data updates</li>
              <li>• Interactive filters</li>
              <li>• Drill-down capabilities</li>
              <li>• Scheduled delivery</li>
              <li>• Custom formatting</li>
              <li>• Multi-sheet aggregation</li>
              <li>• Conditional formatting</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sharing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Public dashboards</li>
              <li>• PDF exports</li>
              <li>• Email reports</li>
              <li>• Embed codes</li>
              <li>• API access</li>
              <li>• Team permissions</li>
              <li>• Version history</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}