import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface Column {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'contact'
  width: number
  options?: string[]
}

interface ColumnManagerProps {
  columns: Column[]
  onColumnsChange: (columns: Column[]) => void
  onClose: () => void
}

export function ColumnManager({ columns, onColumnsChange, onClose }: ColumnManagerProps) {
  const [newColumn, setNewColumn] = useState({
    name: '',
    type: 'text' as Column['type'],
    options: [] as string[]
  })
  const [optionInput, setOptionInput] = useState('')

  const columnTypes = [
    { value: 'text', label: 'Text/Number' },
    { value: 'dropdown', label: 'Dropdown List' },
    { value: 'date', label: 'Date' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'contact', label: 'Contact List' }
  ]

  const addOption = () => {
    if (optionInput.trim() && !newColumn.options.includes(optionInput.trim())) {
      setNewColumn({
        ...newColumn,
        options: [...newColumn.options, optionInput.trim()]
      })
      setOptionInput('')
    }
  }

  const removeOption = (option: string) => {
    setNewColumn({
      ...newColumn,
      options: newColumn.options.filter(opt => opt !== option)
    })
  }

  const handleSubmit = () => {
    if (!newColumn.name.trim()) return

    const column: Column = {
      id: `col${Date.now()}`,
      name: newColumn.name.trim(),
      type: newColumn.type,
      width: 150,
      ...(newColumn.type === 'dropdown' && { options: newColumn.options })
    }

    onColumnsChange([...columns, column])
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newColumn.type === 'dropdown') {
      e.preventDefault()
      addOption()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Create a new column for your sheet. Choose the appropriate column type for your data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="column-name">Column Name</Label>
            <Input
              id="column-name"
              placeholder="Enter column name..."
              value={newColumn.name}
              onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="column-type">Column Type</Label>
            <Select
              value={newColumn.type}
              onValueChange={(value: Column['type']) => 
                setNewColumn({ ...newColumn, type: value, options: [] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {columnTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newColumn.type === 'dropdown' && (
            <div className="space-y-2">
              <Label>Dropdown Options</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add option..."
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={addOption} variant="outline">
                  Add
                </Button>
              </div>
              {newColumn.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newColumn.options.map((option) => (
                    <Badge key={option} variant="secondary" className="flex items-center gap-1">
                      {option}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeOption(option)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {newColumn.type === 'text' && (
            <div className="text-sm text-gray-600">
              Text columns can contain any text or numbers. They support basic formatting and are searchable.
            </div>
          )}

          {newColumn.type === 'date' && (
            <div className="text-sm text-gray-600">
              Date columns provide a date picker and can be used for sorting and filtering by date ranges.
            </div>
          )}

          {newColumn.type === 'checkbox' && (
            <div className="text-sm text-gray-600">
              Checkbox columns are perfect for yes/no values, completion status, or boolean data.
            </div>
          )}

          {newColumn.type === 'contact' && (
            <div className="text-sm text-gray-600">
              Contact columns can store names, email addresses, or team member assignments.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!newColumn.name.trim() || (newColumn.type === 'dropdown' && newColumn.options.length === 0)}
          >
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}