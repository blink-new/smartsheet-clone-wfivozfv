import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  File,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react'

interface ImportJob {
  id: string
  fileName: string
  fileSize: number
  status: 'uploading' | 'processing' | 'mapping' | 'importing' | 'completed' | 'error'
  progress: number
  rowsProcessed: number
  totalRows: number
  errors: string[]
  createdAt: Date
}

interface ExportJob {
  id: string
  name: string
  format: 'xlsx' | 'csv' | 'pdf'
  status: 'preparing' | 'generating' | 'completed' | 'error'
  progress: number
  downloadUrl?: string
  createdAt: Date
}

interface ColumnMapping {
  sourceColumn: string
  targetColumn: string
  dataType: 'text' | 'number' | 'date' | 'boolean'
}

export function ImportExport() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import')
  const [importJobs, setImportJobs] = useState<ImportJob[]>([])
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([])
  const [showMapping, setShowMapping] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newJob: ImportJob = {
        id: Date.now().toString(),
        fileName: file.name,
        fileSize: file.size,
        status: 'uploading',
        progress: 0,
        rowsProcessed: 0,
        totalRows: 0,
        errors: [],
        createdAt: new Date()
      }
      
      setImportJobs(prev => [...prev, newJob])
      
      // Simulate upload progress
      simulateImportProgress(newJob.id)
    })
  }

  const simulateImportProgress = (jobId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      
      setImportJobs(prev => prev.map(job => {
        if (job.id === jobId) {
          if (progress >= 100) {
            clearInterval(interval)
            return {
              ...job,
              status: 'completed',
              progress: 100,
              rowsProcessed: 150,
              totalRows: 150
            }
          }
          
          let status = job.status
          if (progress > 20 && status === 'uploading') status = 'processing'
          if (progress > 40 && status === 'processing') status = 'mapping'
          if (progress > 60 && status === 'mapping') status = 'importing'
          
          return {
            ...job,
            status,
            progress: Math.min(progress, 100),
            rowsProcessed: Math.floor((progress / 100) * 150),
            totalRows: 150
          }
        }
        return job
      }))
    }, 500)
  }

  const handleExport = (format: 'xlsx' | 'csv' | 'pdf', name: string) => {
    const newJob: ExportJob = {
      id: Date.now().toString(),
      name,
      format,
      status: 'preparing',
      progress: 0,
      createdAt: new Date()
    }
    
    setExportJobs(prev => [...prev, newJob])
    simulateExportProgress(newJob.id)
  }

  const simulateExportProgress = (jobId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25
      
      setExportJobs(prev => prev.map(job => {
        if (job.id === jobId) {
          if (progress >= 100) {
            clearInterval(interval)
            return {
              ...job,
              status: 'completed',
              progress: 100,
              downloadUrl: `/exports/${job.name}.${job.format}`
            }
          }
          
          let status = job.status
          if (progress > 30 && status === 'preparing') status = 'generating'
          
          return {
            ...job,
            status,
            progress: Math.min(progress, 100)
          }
        }
        return job
      }))
    }, 300)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      case 'uploading':
      case 'processing':
      case 'mapping':
      case 'importing':
      case 'preparing':
      case 'generating':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'error':
        return AlertCircle
      default:
        return RefreshCw
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import/Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Import & Export Data</DialogTitle>
          <DialogDescription>
            Import data from files or export your sheet data
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'import' | 'export')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import Data</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            {/* File Upload Area */}
            <Card
              className={`border-2 border-dashed transition-colors ${
                dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                const files = e.dataTransfer.files
                if (files.length > 0) {
                  handleFileUpload(files)
                }
              }}
            >
              <CardContent className="p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Files</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv,.tsv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(e.target.files)
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Supports: Excel (.xlsx, .xls), CSV, TSV
                </p>
              </CardContent>
            </Card>

            {/* Import Jobs */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {importJobs.map((job) => {
                const StatusIcon = getStatusIcon(job.status)
                return (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">{job.fileName}</div>
                            <div className="text-sm text-gray-500">
                              {formatFileSize(job.fileSize)} • {job.createdAt.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(job.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {job.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {job.status !== 'completed' && job.status !== 'error' && (
                        <div className="space-y-2">
                          <Progress value={job.progress} className="h-2" />
                          <div className="text-sm text-gray-600">
                            {job.rowsProcessed} of {job.totalRows} rows processed
                          </div>
                        </div>
                      )}
                      
                      {job.status === 'completed' && (
                        <div className="text-sm text-green-600">
                          Successfully imported {job.rowsProcessed} rows
                        </div>
                      )}
                      
                      {job.errors.length > 0 && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                          {job.errors.length} error(s) found
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {importJobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No imports yet. Upload a file to get started.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-green-200">
                <CardContent className="p-4 text-center" onClick={() => handleExport('xlsx', 'Sheet Export')}>
                  <FileSpreadsheet className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-medium">Excel (.xlsx)</h3>
                  <p className="text-sm text-gray-600">Full formatting and formulas</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-blue-200">
                <CardContent className="p-4 text-center" onClick={() => handleExport('csv', 'Sheet Export')}>
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium">CSV</h3>
                  <p className="text-sm text-gray-600">Comma-separated values</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-red-200">
                <CardContent className="p-4 text-center" onClick={() => handleExport('pdf', 'Sheet Export')}>
                  <File className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-medium">PDF</h3>
                  <p className="text-sm text-gray-600">Printable document</p>
                </CardContent>
              </Card>
            </div>

            {/* Export Jobs */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {exportJobs.map((job) => {
                const StatusIcon = getStatusIcon(job.status)
                return (
                  <Card key={job.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{job.name}.{job.format}</div>
                            <div className="text-sm text-gray-500">
                              {job.createdAt.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(job.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {job.status}
                          </Badge>
                          {job.status === 'completed' && job.downloadUrl && (
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {job.status !== 'completed' && job.status !== 'error' && (
                        <Progress value={job.progress} className="h-2" />
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {exportJobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Download className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No exports yet. Choose a format above to export your data.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}