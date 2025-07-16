import { 
  LayoutDashboard, 
  Grid3X3, 
  BarChart3, 
  FileText, 
  Calendar, 
  FolderOpen,
  Settings,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sheets', label: 'Sheets', icon: Grid3X3 },
  { id: 'gantt', label: 'Gantt', icon: Calendar },
  { id: 'forms', label: 'Forms', icon: FileText },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'workspaces', label: 'Workspaces', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Grid3X3 className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-gray-900">Smartsheet</span>
        </div>
      </div>
      
      <div className="px-4 mb-4">
        <Button className="w-full justify-start" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>
      
      <nav className="px-4 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Recent Sheets</div>
        <div className="space-y-1">
          <div className="text-sm text-gray-700 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            Project Timeline
          </div>
          <div className="text-sm text-gray-700 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            Task Management
          </div>
          <div className="text-sm text-gray-700 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            Budget Tracker
          </div>
        </div>
      </div>
    </div>
  )
}