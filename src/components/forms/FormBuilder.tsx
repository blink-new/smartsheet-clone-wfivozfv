import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Type, 
  Hash, 
  Calendar, 
  CheckSquare, 
  List, 
  Mail, 
  Phone, 
  FileText,
  Trash2,
  Eye,
  Settings,
  Plus,
  GripVertical,
  Copy
} from 'lucide-react'

interface FormField {
  id: string
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

interface FormConfig {
  id: string
  title: string
  description: string
  fields: FormField[]
  settings: {
    submitButtonText: string
    successMessage: string
    allowMultipleSubmissions: boolean
    requireLogin: boolean
  }
}

const FIELD_TYPES = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'date', label: 'Date', icon: Calendar },
  { type: 'textarea', label: 'Long Text', icon: FileText },
  { type: 'select', label: 'Dropdown', icon: List },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'radio', label: 'Radio Buttons', icon: CheckSquare }
]

export function FormBuilder() {
  const [form, setForm] = useState<FormConfig>({
    id: 'form-1',
    title: 'New Form',
    description: 'Please fill out this form',
    fields: [],
    settings: {
      submitButtonText: 'Submit',
      successMessage: 'Thank you for your submission!',
      allowMultipleSubmissions: true,
      requireLogin: false
    }
  })

  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [draggedField, setDraggedField] = useState<string | null>(null)

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      ...(type === 'select' || type === 'radio' ? { options: ['Option 1', 'Option 2'] } : {})
    }

    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }))
    setSelectedField(newField.id)
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }))
  }

  const deleteField = (fieldId: string) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }))
    setSelectedField(null)
  }

  const duplicateField = (fieldId: string) => {
    const field = form.fields.find(f => f.id === fieldId)
    if (field) {
      const newField = {
        ...field,
        id: `field-${Date.now()}`,
        label: `${field.label} (Copy)`
      }
      setForm(prev => ({
        ...prev,
        fields: [...prev.fields, newField]
      }))
    }
  }

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...form.fields]
    const [movedField] = newFields.splice(fromIndex, 1)
    newFields.splice(toIndex, 0, movedField)
    
    setForm(prev => ({
      ...prev,
      fields: newFields
    }))
  }

  const renderFieldPreview = (field: FormField) => {
    const commonProps = {
      placeholder: field.placeholder,
      required: field.required
    }

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return <Input type={field.type} {...commonProps} />
      case 'number':
        return <Input type="number" {...commonProps} />
      case 'date':
        return <Input type="date" {...commonProps} />
      case 'textarea':
        return <Textarea {...commonProps} />
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" id={field.id} />
            <label htmlFor={field.id}>{field.label}</label>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} id={`${field.id}-${index}`} />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      default:
        return <Input {...commonProps} />
    }
  }

  const selectedFieldData = form.fields.find(f => f.id === selectedField)

  if (previewMode) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Form Preview</h2>
          <Button onClick={() => setPreviewMode(false)}>
            Back to Editor
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <p className="text-gray-600">{form.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="flex items-center">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderFieldPreview(field)}
              </div>
            ))}
            <Button className="w-full">
              {form.settings.submitButtonText}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Field Palette */}
      <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
        <h3 className="font-medium mb-4">Form Fields</h3>
        <div className="space-y-2">
          {FIELD_TYPES.map((fieldType) => {
            const Icon = fieldType.icon
            return (
              <Button
                key={fieldType.type}
                variant="outline"
                className="w-full justify-start"
                onClick={() => addField(fieldType.type as FormField['type'])}
              >
                <Icon className="h-4 w-4 mr-2" />
                {fieldType.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Form Builder */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Input
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="text-xl font-bold border-none p-0 h-auto"
              placeholder="Form Title"
            />
            <Textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="mt-2 border-none p-0 resize-none"
              placeholder="Form description..."
              rows={2}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form Settings</DialogTitle>
                  <DialogDescription>
                    Configure form behavior and appearance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Submit Button Text</Label>
                    <Input
                      value={form.settings.submitButtonText}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, submitButtonText: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Success Message</Label>
                    <Textarea
                      value={form.settings.successMessage}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, successMessage: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button>Save Form</Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {form.fields.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No fields added yet. Select a field type from the left panel to get started.</p>
            </div>
          ) : (
            form.fields.map((field, index) => (
              <Card
                key={field.id}
                className={`cursor-pointer transition-all ${
                  selectedField === field.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedField(field.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Label className="flex items-center">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateField(field.id)
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteField(field.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {renderFieldPreview(field)}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Field Properties Panel */}
      {selectedFieldData && (
        <div className="w-80 border-l border-gray-200 p-4 bg-gray-50">
          <h3 className="font-medium mb-4">Field Properties</h3>
          <div className="space-y-4">
            <div>
              <Label>Field Label</Label>
              <Input
                value={selectedFieldData.label}
                onChange={(e) => updateField(selectedField!, { label: e.target.value })}
              />
            </div>
            
            <div>
              <Label>Placeholder</Label>
              <Input
                value={selectedFieldData.placeholder || ''}
                onChange={(e) => updateField(selectedField!, { placeholder: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="required"
                checked={selectedFieldData.required}
                onChange={(e) => updateField(selectedField!, { required: e.target.checked })}
              />
              <Label htmlFor="required">Required field</Label>
            </div>

            {(selectedFieldData.type === 'select' || selectedFieldData.type === 'radio') && (
              <div>
                <Label>Options</Label>
                <div className="space-y-2">
                  {selectedFieldData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(selectedFieldData.options || [])]
                          newOptions[index] = e.target.value
                          updateField(selectedField!, { options: newOptions })
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newOptions = selectedFieldData.options?.filter((_, i) => i !== index)
                          updateField(selectedField!, { options: newOptions })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...(selectedFieldData.options || []), `Option ${(selectedFieldData.options?.length || 0) + 1}`]
                      updateField(selectedField!, { options: newOptions })
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}