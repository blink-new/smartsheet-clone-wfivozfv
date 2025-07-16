import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon, User, Shield, Bell, Palette } from 'lucide-react'

export function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account, preferences, and application settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Email Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Control your security settings and data privacy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Auth
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Data Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Email Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Push Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Digest Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Theme Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Layout Options
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Color Schemes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              Application
            </CardTitle>
            <CardDescription>
              General application settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Language & Region
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Time Zone
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Default Views
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Account
            </CardTitle>
            <CardDescription>
              Manage your subscription and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Billing & Plans
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Usage Statistics
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}