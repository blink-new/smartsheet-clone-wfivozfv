import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  X, 
  Plus,
  Search
} from 'lucide-react'

interface Column {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'contact'
  options?: string[]
}

interface FilterRule {
  id: string
  columnId: string
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty'
  value: string
  logic: 'AND' | 'OR'
}

interface SortRule {
  columnId: string
  direction: 'asc' | 'desc'
}

interface FilterSortPanelProps {
  columns: Column[]
  filters: FilterRule[]
  sorts: SortRule[]
  onFiltersChange: (filters: FilterRule[]) => void
  onSortsChange: (sorts: SortRule[]) => void
  onApply: () => void
  onClear: () => void
}

const OPERATORS = {
  text: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Does not equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does not contain' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' }
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Does not equal' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' }
  ],
  date: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'greater_than', label: 'Is after' },
    { value: 'less_than', label: 'Is before' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' }
  ],
  dropdown: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' }
  ],
  checkbox: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' }
  ],
  contact: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'contains', label: 'Contains' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' }
  ]
}

export function FilterSortPanel({ 
  columns, 
  filters, 
  sorts, 
  onFiltersChange, 
  onSortsChange, 
  onApply, 
  onClear 
}: FilterSortPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'filter' | 'sort'>('filter')

  const addFilter = () => {
    const newFilter: FilterRule = {
      id: Date.now().toString(),
      columnId: columns[0]?.id || '',
      operator: 'equals',
      value: '',
      logic: 'AND'
    }
    onFiltersChange([...filters, newFilter])
  }

  const updateFilter = (filterId: string, updates: Partial<FilterRule>) => {
    onFiltersChange(filters.map(filter => 
      filter.id === filterId ? { ...filter, ...updates } : filter
    ))
  }

  const removeFilter = (filterId: string) => {
    onFiltersChange(filters.filter(filter => filter.id !== filterId))
  }

  const addSort = () => {
    if (sorts.length < columns.length) {
      const usedColumns = sorts.map(s => s.columnId)
      const availableColumn = columns.find(col => !usedColumns.includes(col.id))
      
      if (availableColumn) {
        const newSort: SortRule = {
          columnId: availableColumn.id,
          direction: 'asc'
        }
        onSortsChange([...sorts, newSort])
      }
    }
  }

  const updateSort = (index: number, updates: Partial<SortRule>) => {
    onSortsChange(sorts.map((sort, i) => 
      i === index ? { ...sort, ...updates } : sort
    ))
  }

  const removeSort = (index: number) => {
    onSortsChange(sorts.filter((_, i) => i !== index))
  }

  const getColumnOperators = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    return column ? OPERATORS[column.type] || OPERATORS.text : OPERATORS.text
  }

  const renderFilterValue = (filter: FilterRule) => {
    const column = columns.find(col => col.id === filter.columnId)
    
    if (filter.operator === 'is_empty' || filter.operator === 'is_not_empty') {
      return null
    }

    if (column?.type === 'dropdown' && column.options) {
      return (
        <Select value={filter.value} onValueChange={(value) => updateFilter(filter.id, { value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {column.options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (column?.type === 'checkbox') {
      return (
        <Select value={filter.value} onValueChange={(value) => updateFilter(filter.id, { value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Checked</SelectItem>
            <SelectItem value="false">Unchecked</SelectItem>
          </SelectContent>
        </Select>
      )
    }

    const inputType = column?.type === 'date' ? 'date' : 
                     column?.type === 'number' ? 'number' : 'text'

    return (
      <Input
        type={inputType}
        value={filter.value}
        onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
        placeholder="Enter value"
      />
    )
  }

  const activeFiltersCount = filters.length
  const activeSortsCount = sorts.length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter & Sort
          {(activeFiltersCount > 0 || activeSortsCount > 0) && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount + activeSortsCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Filter & Sort</DialogTitle>
          <DialogDescription>
            Create advanced filters and sorting rules for your data
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-b">
          <Button
            variant={activeTab === 'filter' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('filter')}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'sort' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('sort')}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Sort
            {activeSortsCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeSortsCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'filter' && (
            <div className="space-y-4">
              {filters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No filters applied</p>
                  <Button onClick={addFilter} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Filter
                  </Button>
                </div>
              ) : (
                <>
                  {filters.map((filter, index) => (
                    <div key={filter.id} className="border border-gray-200 rounded-lg p-4">
                      {index > 0 && (
                        <div className="mb-3">
                          <Select 
                            value={filter.logic} 
                            onValueChange={(value: 'AND' | 'OR') => updateFilter(filter.id, { logic: value })}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AND">AND</SelectItem>
                              <SelectItem value="OR">OR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-3">
                          <Label>Column</Label>
                          <Select 
                            value={filter.columnId} 
                            onValueChange={(value) => updateFilter(filter.id, { columnId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {columns.map(column => (
                                <SelectItem key={column.id} value={column.id}>
                                  {column.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-3">
                          <Label>Condition</Label>
                          <Select 
                            value={filter.operator} 
                            onValueChange={(value) => updateFilter(filter.id, { operator: value as any })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {getColumnOperators(filter.columnId).map(op => (
                                <SelectItem key={op.value} value={op.value}>
                                  {op.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-5">
                          <Label>Value</Label>
                          {renderFilterValue(filter)}
                        </div>

                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFilter(filter.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button onClick={addFilter} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Filter
                  </Button>
                </>
              )}
            </div>
          )}

          {activeTab === 'sort' && (
            <div className="space-y-4">
              {sorts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <SortAsc className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No sorting applied</p>
                  <Button onClick={addSort} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sort
                  </Button>
                </div>
              ) : (
                <>
                  {sorts.map((sort, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-1 text-sm text-gray-500">
                          {index + 1}.
                        </div>
                        
                        <div className="col-span-5">
                          <Label>Column</Label>
                          <Select 
                            value={sort.columnId} 
                            onValueChange={(value) => updateSort(index, { columnId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {columns.map(column => (
                                <SelectItem key={column.id} value={column.id}>
                                  {column.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-5">
                          <Label>Direction</Label>
                          <Select 
                            value={sort.direction} 
                            onValueChange={(value: 'asc' | 'desc') => updateSort(index, { direction: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asc">
                                <div className="flex items-center">
                                  <SortAsc className="h-4 w-4 mr-2" />
                                  Ascending (A-Z, 1-9)
                                </div>
                              </SelectItem>
                              <SelectItem value="desc">
                                <div className="flex items-center">
                                  <SortDesc className="h-4 w-4 mr-2" />
                                  Descending (Z-A, 9-1)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSort(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button onClick={addSort} variant="outline" disabled={sorts.length >= columns.length}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sort
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClear}>
            Clear All
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => { onApply(); setIsOpen(false) }}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}