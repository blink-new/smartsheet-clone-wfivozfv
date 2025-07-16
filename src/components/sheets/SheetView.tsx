import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Filter, 
  Share, 
  Download, 
  MoreHorizontal,
  ChevronDown,
  Users,
  Save,
  Upload,
  Zap,
  MessageCircle
} from 'lucide-react'
import { SpreadsheetGrid } from './SpreadsheetGrid'
import { ColumnManager } from './ColumnManager'
import { FilterSortPanel } from './FilterSortPanel'
import { ImportExport } from './ImportExport'
import { CommentsAttachments } from './CommentsAttachments'
import { blink } from '@/lib/blink'

interface Column {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'contact'
  width: number
  options?: string[]
}

interface Row {
  id: string
  cells: { [columnId: string]: any }
}

export function SheetView() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'col1', name: 'Task Name', type: 'text', width: 200 },
    { id: 'col2', name: 'Assigned To', type: 'contact', width: 150 },
    { id: 'col3', name: 'Status', type: 'dropdown', width: 120, options: ['Not Started', 'In Progress', 'Complete'] },
    { id: 'col4', name: 'Priority', type: 'dropdown', width: 100, options: ['Low', 'Medium', 'High'] },
    { id: 'col5', name: 'Due Date', type: 'date', width: 120 },
    { id: 'col6', name: 'Complete', type: 'checkbox', width: 80 }
  ])

  const [rows, setRows] = useState<Row[]>([
    {
      id: 'row1',
      cells: {
        col1: 'Design homepage mockups',
        col2: 'John Doe',
        col3: 'In Progress',
        col4: 'High',
        col5: '2024-01-25',
        col6: false
      }
    },
    {
      id: 'row2',
      cells: {
        col1: 'Implement user authentication',
        col2: 'Sarah Wilson',
        col3: 'Not Started',
        col4: 'Medium',
        col5: '2024-01-30',
        col6: false
      }
    },
    {
      id: 'row3',
      cells: {
        col1: 'Set up database schema',
        col2: 'Mike Johnson',
        col3: 'Complete',
        col4: 'High',
        col5: '2024-01-20',
        col6: true
      }
    }
  ])

  const [selectedCell, setSelectedCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [showColumnManager, setShowColumnManager] = useState(false)
  const [filters, setFilters] = useState<any[]>([])
  const [sorts, setSorts] = useState<any[]>([])
  const [collaborators] = useState([
    { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg', online: true },
    { id: '2', name: 'Sarah Wilson', avatar: '/avatars/sarah.jpg', online: true },
    { id: '3', name: 'Mike Johnson', avatar: '/avatars/mike.jpg', online: false }
  ])
  const [comments] = useState<any[]>([])
  const [attachments] = useState<any[]>([])

  const addRow = () => {
    const newRow: Row = {
      id: `row${Date.now()}`,
      cells: {}
    }
    columns.forEach(col => {
      newRow.cells[col.id] = col.type === 'checkbox' ? false : ''
    })
    setRows([...rows, newRow])
  }

  const addColumn = () => {
    setShowColumnManager(true)
  }

  const updateCell = (rowId: string, columnId: string, value: any) => {
    setRows(rows.map(row => 
      row.id === rowId 
        ? { ...row, cells: { ...row.cells, [columnId]: value } }
        : row
    ))
  }

  const deleteRow = (rowId: string) => {
    setRows(rows.filter(row => row.id !== rowId))
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Project Timeline</h1>
            <div className="flex items-center space-x-2">
              {collaborators.filter(c => c.online).map(collaborator => (
                <div
                  key={collaborator.id}
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium relative"
                  title={collaborator.name}
                >
                  {collaborator.name.split(' ').map(n => n[0]).join('')}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <FilterSortPanel
              columns={columns}
              filters={filters}
              sorts={sorts}
              onFiltersChange={setFilters}
              onSortsChange={setSorts}
              onApply={() => {
                // Apply filters and sorts
                console.log('Applying filters and sorts', { filters, sorts })
              }}
              onClear={() => {
                setFilters([])
                setSorts([])
              }}
            />
            <ImportExport />
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Automate
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={addRow} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
          <Button onClick={addColumn} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
          
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-sm text-gray-600">View:</span>
            <Select defaultValue="grid">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="gantt">Gantt</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-hidden">
        <SpreadsheetGrid
          columns={columns}
          rows={rows}
          selectedCell={selectedCell}
          editingCell={editingCell}
          onCellSelect={setSelectedCell}
          onCellEdit={setEditingCell}
          onCellUpdate={updateCell}
          onRowDelete={deleteRow}
          onColumnResize={(columnId, width) => {
            setColumns(columns.map(col => 
              col.id === columnId ? { ...col, width } : col
            ))
          }}
        />
      </div>

      {/* Column Manager Modal */}
      {showColumnManager && (
        <ColumnManager
          columns={columns}
          onColumnsChange={setColumns}
          onClose={() => setShowColumnManager(false)}
        />
      )}
    </div>
  )
}