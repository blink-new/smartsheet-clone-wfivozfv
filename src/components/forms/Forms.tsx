import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus, Eye, Settings } from 'lucide-react'

export function Forms() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Create custom forms to collect data directly into your sheets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Form Builder
          </CardTitle>
          <CardDescription>
            Design custom forms with drag-and-drop interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Form Builder</h3>
              <p className="text-gray-600 mb-4">
                Create professional forms to collect data from your team or customers
              </p>
              <Button>
                Build Your First Form
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">Contact Form</h4>
                <p className="text-sm text-gray-600">Basic contact information collection</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">Event Registration</h4>
                <p className="text-sm text-gray-600">Collect event attendee information</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">Feedback Survey</h4>
                <p className="text-sm text-gray-600">Gather customer feedback and ratings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Field Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Text input fields</li>
              <li>• Dropdown selections</li>
              <li>• Multiple choice</li>
              <li>• Date pickers</li>
              <li>• File uploads</li>
              <li>• Rating scales</li>
              <li>• Signature capture</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Conditional logic</li>
              <li>• Auto-calculations</li>
              <li>• Email notifications</li>
              <li>• Custom branding</li>
              <li>• Mobile optimization</li>
              <li>• Data validation</li>
              <li>• Integration webhooks</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}