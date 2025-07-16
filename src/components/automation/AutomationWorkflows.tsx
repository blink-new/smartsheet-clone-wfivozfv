import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Clock,
  Mail,
  Bell,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface AutomationRule {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: {
    type: 'row_added' | 'row_updated' | 'cell_changed' | 'date_reached' | 'form_submitted'
    conditions: {
      columnId?: string
      operator?: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than'
      value?: string
    }[]
  }
  actions: {
    type: 'send_email' | 'send_notification' | 'update_cell' | 'create_row' | 'assign_user' | 'set_reminder'
    config: any
  }[]
  lastRun?: Date
  runCount: number
  createdBy: string
  createdAt: Date
}

const TRIGGER_TYPES = [
  { value: 'row_added', label: 'When a row is added', icon: Plus },
  { value: 'row_updated', label: 'When a row is updated', icon: Edit },
  { value: 'cell_changed', label: 'When a cell changes', icon: Edit },
  { value: 'date_reached', label: 'When a date is reached', icon: Calendar },
  { value: 'form_submitted', label: 'When a form is submitted', icon: CheckCircle }
]

const ACTION_TYPES = [
  { value: 'send_email', label: 'Send email', icon: Mail },
  { value: 'send_notification', label: 'Send notification', icon: Bell },
  { value: 'update_cell', label: 'Update cell', icon: Edit },
  { value: 'create_row', label: 'Create row', icon: Plus },
  { value: 'assign_user', label: 'Assign user', icon: Users },
  { value: 'set_reminder', label: 'Set reminder', icon: Clock }
]

export function AutomationWorkflows() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'New Task Assignment',
      description: 'Send email notification when a new task is assigned',
      isActive: true,
      trigger: {
        type: 'row_added',
        conditions: []
      },
      actions: [
        {
          type: 'send_email',
          config: {
            to: '{{assigned_to}}',
            subject: 'New task assigned: {{task_name}}',
            body: 'You have been assigned a new task: {{task_name}}'
          }
        }
      ],
      lastRun: new Date('2024-01-20T10:30:00'),
      runCount: 15,
      createdBy: 'John Doe',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Overdue Task Alert',
      description: 'Send reminder when task due date passes',
      isActive: true,
      trigger: {
        type: 'date_reached',
        conditions: [
          {
            columnId: 'due_date',
            operator: 'less_than',
            value: 'today'
          }
        ]
      },
      actions: [
        {
          type: 'send_notification',
          config: {
            message: 'Task "{{task_name}}" is overdue',
            users: ['{{assigned_to}}', '{{project_manager}}']
          }
        }
      ],
      lastRun: new Date('2024-01-19T09:00:00'),
      runCount: 8,
      createdBy: 'Sarah Wilson',
      createdAt: new Date('2024-01-10')
    }
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [editingRule, setEditingRule] = useState<string | null>(null)

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ))
  }

  const duplicateRule = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId)
    if (rule) {
      const newRule: AutomationRule = {
        ...rule,
        id: Date.now().toString(),
        name: `${rule.name} (Copy)`,
        isActive: false,
        runCount: 0,
        lastRun: undefined,
        createdAt: new Date()
      }
      setRules([...rules, newRule])
    }
  }

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId))
  }

  const getTriggerIcon = (type: string) => {
    const triggerType = TRIGGER_TYPES.find(t => t.value === type)
    return triggerType?.icon || Zap
  }

  const getActionIcon = (type: string) => {
    const actionType = ACTION_TYPES.find(a => a.value === type)
    return actionType?.icon || Zap
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation</h1>
          <p className="text-gray-600">Create automated workflows to streamline your processes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Active Rules */}
      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule) => {
          const TriggerIcon = getTriggerIcon(rule.trigger.type)
          const triggerType = TRIGGER_TYPES.find(t => t.value === rule.trigger.type)
          
          return (
            <Card key={rule.id} className={`${rule.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${rule.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <TriggerIcon className={`h-5 w-5 ${rule.isActive ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingRule(rule.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Rule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateRule(rule.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => deleteRule(rule.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Trigger and Actions Flow */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <TriggerIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        {triggerType?.label}
                      </span>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    
                    <div className="flex items-center space-x-2">
                      {rule.actions.map((action, index) => {
                        const ActionIcon = getActionIcon(action.type)
                        const actionType = ACTION_TYPES.find(a => a.value === action.type)
                        
                        return (
                          <div key={index} className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
                            <ActionIcon className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-900">
                              {actionType?.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Rule Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Created by {rule.createdBy}</span>
                      <span>•</span>
                      <span>Run {rule.runCount} times</span>
                      {rule.lastRun && (
                        <>
                          <span>•</span>
                          <span>Last run {rule.lastRun.toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {rules.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No automation rules</h3>
          <p className="text-gray-600 mb-4">
            Create your first automation rule to streamline your workflow
          </p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Rule
          </Button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{rules.length}</div>
            <div className="text-sm text-gray-600">Total Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {rules.filter(r => r.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Rules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {rules.reduce((total, rule) => total + rule.runCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Runs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {rules.filter(r => r.lastRun && r.lastRun > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-gray-600">Ran Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Rule Builder Modal */}
      {isCreating && (
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Automation Rule</DialogTitle>
              <DialogDescription>
                Set up triggers and actions to automate your workflow
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label>Rule Name</Label>
                  <Input placeholder="Enter rule name" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Describe what this rule does" />
                </div>
              </div>

              {/* Trigger Selection */}
              <div className="space-y-4">
                <h3 className="font-medium">When this happens...</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRIGGER_TYPES.map(trigger => {
                      const Icon = trigger.icon
                      return (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 mr-2" />
                            {trigger.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Actions Selection */}
              <div className="space-y-4">
                <h3 className="font-medium">Do this...</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ACTION_TYPES.map(action => {
                    const Icon = action.icon
                    return (
                      <Card key={action.value} className="cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 text-gray-600" />
                            <span className="font-medium">{action.label}</span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreating(false)}>
                  Create Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}