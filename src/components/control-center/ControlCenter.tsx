import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Overview } from './Overview'
import { PortfolioManagement } from './PortfolioManagement'
import { UserAdministration } from './UserAdministration'
import { AutomationCenter } from './AutomationCenter'
import { Analytics } from './Analytics'

// Placeholder components for remaining tabs
const TemplateManagement = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Template Management</h2>
    <p className="text-gray-600">Manage and organize sheet templates across your organization.</p>
  </div>
)

const SecurityCompliance = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Compliance</h2>
    <p className="text-gray-600">Monitor security settings and compliance requirements.</p>
  </div>
)

const Integrations = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Integrations</h2>
    <p className="text-gray-600">Manage third-party integrations and API connections.</p>
  </div>
)

const PerformanceMonitor = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Monitor</h2>
    <p className="text-gray-600">Monitor system performance and resource usage.</p>
  </div>
)

const GlobalSettings = () => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Global Settings</h2>
    <p className="text-gray-600">Configure system-wide settings and preferences.</p>
  </div>
)

export function ControlCenter() {
  const [activeTab, setActiveTab] = useState('overview')

  const getTabTitle = (tab: string) => {
    const titles = {
      overview: 'Control Center Overview',
      portfolios: 'Portfolio Management',
      users: 'User Administration',
      templates: 'Template Management',
      automation: 'Automation Center',
      security: 'Security & Compliance',
      analytics: 'Analytics & Reports',
      integrations: 'Integrations',
      performance: 'Performance Monitor',
      settings: 'Global Settings'
    }
    return titles[tab as keyof typeof titles] || 'Control Center'
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'portfolios':
        return <PortfolioManagement />
      case 'users':
        return <UserAdministration />
      case 'templates':
        return <TemplateManagement />
      case 'automation':
        return <AutomationCenter />
      case 'security':
        return <SecurityCompliance />
      case 'analytics':
        return <Analytics />
      case 'integrations':
        return <Integrations />
      case 'performance':
        return <PerformanceMonitor />
      case 'settings':
        return <GlobalSettings />
      default:
        return <Overview />
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header title={getTabTitle(activeTab)} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}