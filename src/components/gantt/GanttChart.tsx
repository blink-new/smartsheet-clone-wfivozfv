import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Plus, 
  Filter, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Task {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignee: string
  dependencies: string[]
  color: string
}

interface GanttProps {
  tasks: Task[]
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete: (taskId: string) => void
  onTaskAdd: (task: Omit<Task, 'id'>) => void
}

export function GanttChart() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Project Planning',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-25'),
      progress: 100,
      assignee: 'John Doe',
      dependencies: [],
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'Design Phase',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-05'),
      progress: 75,
      assignee: 'Sarah Wilson',
      dependencies: ['1'],
      color: '#10b981'
    },
    {
      id: '3',
      name: 'Development',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-03-15'),
      progress: 30,
      assignee: 'Mike Johnson',
      dependencies: ['2'],
      color: '#f59e0b'
    },
    {
      id: '4',
      name: 'Testing & QA',
      startDate: new Date('2024-03-10'),
      endDate: new Date('2024-03-25'),
      progress: 0,
      assignee: 'Lisa Chen',
      dependencies: ['3'],
      color: '#ef4444'
    }
  ])

  const [viewStart, setViewStart] = useState(new Date('2024-01-01'))
  const [viewEnd, setViewEnd] = useState(new Date('2024-04-01'))
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)

  const getDaysBetween = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getTaskPosition = (task: Task) => {
    const totalDays = getDaysBetween(viewStart, viewEnd)
    const startOffset = getDaysBetween(viewStart, task.startDate)
    const duration = getDaysBetween(task.startDate, task.endDate)
    
    return {
      left: (startOffset / totalDays) * 100,
      width: (duration / totalDays) * 100
    }
  }

  const generateTimelineHeaders = () => {
    const headers = []
    const current = new Date(viewStart)
    
    while (current <= viewEnd) {
      headers.push(new Date(current))
      current.setDate(current.getDate() + 7) // Weekly intervals
    }
    
    return headers
  }

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleTaskAdd = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    }
    setTasks([...tasks, task])
    setIsAddingTask(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto">
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
          <Button size="sm" onClick={() => setIsAddingTask(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Project Timeline
              </CardTitle>
              <CardDescription>
                Interactive Gantt chart with drag-and-drop scheduling
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                const newStart = new Date(viewStart)
                newStart.setMonth(newStart.getMonth() - 1)
                setViewStart(newStart)
              }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {viewStart.toLocaleDateString()} - {viewEnd.toLocaleDateString()}
              </span>
              <Button variant="outline" size="sm" onClick={() => {
                const newStart = new Date(viewStart)
                newStart.setMonth(newStart.getMonth() + 1)
                setViewStart(newStart)
              }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="gantt-container">
            {/* Timeline Header */}
            <div className="flex border-b border-gray-200 mb-4">
              <div className="w-64 p-2 font-medium text-gray-700 border-r border-gray-200">
                Task Name
              </div>
              <div className="flex-1 relative">
                <div className="flex">
                  {generateTimelineHeaders().map((date, index) => (
                    <div key={index} className="flex-1 p-2 text-center text-sm text-gray-600 border-r border-gray-100">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Rows */}
            <div className="space-y-2">
              {tasks.map((task) => {
                const position = getTaskPosition(task)
                return (
                  <div key={task.id} className="flex items-center group hover:bg-gray-50 rounded">
                    {/* Task Info */}
                    <div className="w-64 p-3 border-r border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{task.name}</div>
                          <div className="text-sm text-gray-500">{task.assignee}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleTaskDelete(task.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Timeline Bar */}
                    <div className="flex-1 relative h-12 flex items-center">
                      <div 
                        className="absolute h-6 rounded-md flex items-center px-2 text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                        style={{
                          left: `${position.left}%`,
                          width: `${position.width}%`,
                          backgroundColor: task.color
                        }}
                        onClick={() => setSelectedTask(task.id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate">{task.progress}%</span>
                          <div 
                            className="h-full bg-white bg-opacity-30 rounded-r-md"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Dependencies */}
                      {task.dependencies.map(depId => {
                        const depTask = tasks.find(t => t.id === depId)
                        if (!depTask) return null
                        
                        const depPosition = getTaskPosition(depTask)
                        return (
                          <div
                            key={depId}
                            className="absolute h-0.5 bg-gray-400"
                            style={{
                              left: `${depPosition.left + depPosition.width}%`,
                              width: `${position.left - (depPosition.left + depPosition.width)}%`,
                              top: '50%'
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Add Task Form */}
            {isAddingTask && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-3">Add New Task</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Task name" />
                  <Input placeholder="Assignee" />
                  <Input type="date" placeholder="Start date" />
                  <Input type="date" placeholder="End date" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // This would normally handle form submission
                    handleTaskAdd({
                      name: 'New Task',
                      startDate: new Date(),
                      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                      progress: 0,
                      assignee: 'Unassigned',
                      dependencies: [],
                      color: '#6366f1'
                    })
                  }}>
                    Add Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.progress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.progress > 0 && t.progress < 100).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.progress === 0).length}
            </div>
            <div className="text-sm text-gray-600">Not Started</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}