import { useState, useEffect } from 'react'
import { blink } from '@/lib/blink'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { SheetView } from '@/components/sheets/SheetView'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { GanttChart } from '@/components/gantt/GanttChart'
import { Forms } from '@/components/forms/Forms'
import { Reports } from '@/components/reports/Reports'
import { Workspaces } from '@/components/workspaces/Workspaces'
import { Settings } from '@/components/settings/Settings'
import { AutomationWorkflows } from '@/components/automation/AutomationWorkflows'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Smartsheet...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Smartsheet</h1>
          <p className="text-gray-600 mb-8">Please sign in to continue</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'sheets':
        return <SheetView />
      case 'gantt':
        return <GanttChart />
      case 'forms':
        return <Forms />
      case 'reports':
        return <Reports />
      case 'workspaces':
        return <Workspaces />
      case 'automation':
        return <AutomationWorkflows />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeView} onTabChange={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header title="Smartsheet" />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App