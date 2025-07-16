import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Shield, 
  Workflow,
  Database,
  Globe,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'portfolios', label: 'Portfolio Management', icon: FileText },
  { id: 'users', label: 'User Administration', icon: Users },
  { id: 'templates', label: 'Template Management', icon: Database },
  { id: 'automation', label: 'Automation Center', icon: Workflow },
  { id: 'security', label: 'Security & Compliance', icon: Shield },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'performance', label: 'Performance Monitor', icon: Zap },
  { id: 'settings', label: 'Global Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <span className="font-semibold text-lg">Control Center</span>
        </div>
      </div>
      
      <nav className="px-4 space-y-1">
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
    </div>
  )
}