import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontal, 
  Trash2, 
  Copy, 
  Edit,
  GripVertical
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

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

interface SpreadsheetGridProps {
  columns: Column[]
  rows: Row[]
  selectedCell: { rowId: string; columnId: string } | null
  editingCell: { rowId: string; columnId: string } | null
  onCellSelect: (cell: { rowId: string; columnId: string } | null) => void
  onCellEdit: (cell: { rowId: string; columnId: string } | null) => void
  onCellUpdate: (rowId: string, columnId: string, value: any) => void
  onRowDelete: (rowId: string) => void
  onColumnResize: (columnId: string, width: number) => void
}

export function SpreadsheetGrid({
  columns,
  rows,
  selectedCell,
  editingCell,
  onCellSelect,
  onCellEdit,
  onCellUpdate,
  onRowDelete,
  onColumnResize
}: SpreadsheetGridProps) {
  const [resizingColumn, setResizingColumn] = useState<string | null>(null)
  const [resizeStartX, setResizeStartX] = useState(0)
  const [resizeStartWidth, setResizeStartWidth] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, columnId: string, currentWidth: number) => {
    e.preventDefault()
    setResizingColumn(columnId)
    setResizeStartX(e.clientX)
    setResizeStartWidth(currentWidth)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizingColumn) {
        const diff = e.clientX - resizeStartX
        const newWidth = Math.max(80, resizeStartWidth + diff)
        onColumnResize(resizingColumn, newWidth)
      }
    }

    const handleMouseUp = () => {
      setResizingColumn(null)
    }

    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizingColumn, resizeStartX, resizeStartWidth, onColumnResize])

  const renderCell = (row: Row, column: Column) => {
    const value = row.cells[column.id]
    const isSelected = selectedCell?.rowId === row.id && selectedCell?.columnId === column.id
    const isEditing = editingCell?.rowId === row.id && editingCell?.columnId === column.id

    const handleCellClick = () => {
      onCellSelect({ rowId: row.id, columnId: column.id })
    }

    const handleCellDoubleClick = () => {
      onCellEdit({ rowId: row.id, columnId: column.id })
    }

    const handleCellUpdate = (newValue: any) => {
      onCellUpdate(row.id, column.id, newValue)
      onCellEdit(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onCellEdit(null)
      } else if (e.key === 'Escape') {
        onCellEdit(null)
      }
    }

    if (isEditing) {
      switch (column.type) {
        case 'checkbox':
          return (
            <div className="flex items-center justify-center h-full">
              <Checkbox
                checked={value}
                onCheckedChange={handleCellUpdate}
                autoFocus
              />
            </div>
          )
        case 'dropdown':
          return (
            <Select value={value} onValueChange={handleCellUpdate}>
              <SelectTrigger className="border-none shadow-none h-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {column.options?.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        case 'date':
          return (
            <Input
              type="date"
              value={value}
              onChange={(e) => handleCellUpdate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none shadow-none h-full"
              autoFocus
            />
          )
        case 'number':
          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => handleCellUpdate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none shadow-none h-full"
              autoFocus
            />
          )
        default:
          return (
            <Input
              value={value}
              onChange={(e) => handleCellUpdate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none shadow-none h-full"
              autoFocus
            />
          )
      }
    }

    // Display mode
    const cellContent = () => {
      switch (column.type) {
        case 'checkbox':
          return (
            <div className="flex items-center justify-center h-full">
              <Checkbox checked={value} disabled />
            </div>
          )
        case 'date':
          return value ? new Date(value).toLocaleDateString() : ''
        default:
          return value || ''
      }
    }

    return (
      <div
        className={cn(
          'h-full px-3 py-2 cursor-cell flex items-center',
          isSelected && 'bg-blue-50 ring-2 ring-blue-500'
        )}
        onClick={handleCellClick}
        onDoubleClick={handleCellDoubleClick}
      >
        {cellContent()}
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto" ref={gridRef}>
      <div className="min-w-full">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
          <div className="flex">
            <div className="w-12 h-10 border-r border-gray-200 flex items-center justify-center bg-gray-100">
              #
            </div>
            {columns.map((column, index) => (
              <div
                key={column.id}
                className="relative border-r border-gray-200 bg-gray-50"
                style={{ width: column.width }}
              >
                <div className="h-10 px-3 py-2 flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {column.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 uppercase">
                      {column.type}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Column
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Resize handle */}
                <div
                  className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors"
                  onMouseDown={(e) => handleMouseDown(e, column.id, column.width)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div>
          {rows.map((row, rowIndex) => (
            <div key={row.id} className="flex border-b border-gray-200 hover:bg-gray-50">
              <div className="w-12 h-12 border-r border-gray-200 flex items-center justify-center bg-gray-50 group">
                <span className="text-sm text-gray-500">{rowIndex + 1}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 ml-1"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate Row
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onRowDelete(row.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Row
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="border-r border-gray-200 h-12"
                  style={{ width: column.width }}
                >
                  {renderCell(row, column)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}