import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Plus, 
  Eye, 
  Settings, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  ExternalLink
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FormBuilder } from './FormBuilder'

interface Form {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'archived'
  responses: number
  lastModified: Date
  createdBy: string
}

export function Forms() {
  const [view, setView] = useState<'list' | 'builder'>('list')
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      title: 'Customer Feedback Survey',
      description: 'Collect feedback from customers about our products and services',
      status: 'published',
      responses: 127,
      lastModified: new Date('2024-01-20'),
      createdBy: 'John Doe'
    },
    {
      id: '2',
      title: 'Event Registration Form',
      description: 'Registration form for the annual company conference',
      status: 'published',
      responses: 89,
      lastModified: new Date('2024-01-18'),
      createdBy: 'Sarah Wilson'
    },
    {
      id: '3',
      title: 'Employee Onboarding',
      description: 'New employee information collection form',
      status: 'draft',
      responses: 0,
      lastModified: new Date('2024-01-15'),
      createdBy: 'Mike Johnson'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Form['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFormAction = (formId: string, action: 'edit' | 'duplicate' | 'delete' | 'view') => {
    switch (action) {
      case 'edit':
        setView('builder')
        break
      case 'duplicate': {
        const formToDuplicate = forms.find(f => f.id === formId)
        if (formToDuplicate) {
          const newForm: Form = {
            ...formToDuplicate,
            id: Date.now().toString(),
            title: `${formToDuplicate.title} (Copy)`,
            status: 'draft',
            responses: 0,
            lastModified: new Date()
          }
          setForms([...forms, newForm])
        }
        break
      }
      case 'delete':
        setForms(forms.filter(f => f.id !== formId))
        break
      case 'view':
        // Open form in new tab
        window.open(`/forms/${formId}`, '_blank')
        break
    }
  }

  if (view === 'builder') {
    return (
      <div className="h-full">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setView('list')}>
                ← Back to Forms
              </Button>
              <h1 className="text-xl font-semibold">Form Builder</h1>
            </div>
          </div>
        </div>
        <div className="h-[calc(100%-80px)]">
          <FormBuilder />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Create custom forms to collect data directly into your sheets</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setView('builder')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All Forms
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('published')}>
              Published
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('archived')}>
              Archived
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {form.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFormAction(form.id, 'view')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Form
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFormAction(form.id, 'edit')}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Form
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFormAction(form.id, 'duplicate')}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleFormAction(form.id, 'delete')}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(form.status)}>
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {form.responses} responses
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <div>Created by {form.createdBy}</div>
                  <div>Modified {form.lastModified.toLocaleDateString()}</div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleFormAction(form.id, 'view')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleFormAction(form.id, 'edit')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first form to start collecting data'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setView('builder')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Form
            </Button>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{forms.length}</div>
            <div className="text-sm text-gray-600">Total Forms</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {forms.filter(f => f.status === 'published').length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {forms.filter(f => f.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {forms.reduce((total, form) => total + form.responses, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Responses</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}