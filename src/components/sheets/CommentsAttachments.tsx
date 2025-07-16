import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  MessageCircle, 
  Paperclip, 
  Send, 
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Reply,
  Edit,
  FileText,
  Image,
  File
} from 'lucide-react'

interface Comment {
  id: string
  text: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  replies: Comment[]
  isEdited: boolean
}

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedBy: {
    id: string
    name: string
  }
  uploadedAt: Date
}

interface CommentsAttachmentsProps {
  rowId: string
  columnId?: string
  comments: Comment[]
  attachments: Attachment[]
  onCommentAdd: (text: string, parentId?: string) => void
  onCommentEdit: (commentId: string, text: string) => void
  onCommentDelete: (commentId: string) => void
  onAttachmentAdd: (files: FileList) => void
  onAttachmentDelete: (attachmentId: string) => void
}

export function CommentsAttachments({
  rowId,
  columnId,
  comments,
  attachments,
  onCommentAdd,
  onCommentEdit,
  onCommentDelete,
  onAttachmentAdd,
  onAttachmentDelete
}: CommentsAttachmentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onCommentAdd(newComment, replyingTo || undefined)
      setNewComment('')
      setReplyingTo(null)
    }
  }

  const handleEditSubmit = (commentId: string) => {
    if (editText.trim()) {
      onCommentEdit(commentId, editText)
      setEditingComment(null)
      setEditText('')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      onAttachmentAdd(files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image
    if (type.includes('pdf') || type.includes('document')) return FileText
    return File
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-2' : 'mb-4'}`}>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            {comment.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-gray-500">
              {comment.timestamp.toLocaleString()}
            </span>
            {comment.isEdited && (
              <Badge variant="secondary" className="text-xs">
                Edited
              </Badge>
            )}
          </div>
          
          {editingComment === comment.id ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px]"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleEditSubmit(comment.id)}>
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setEditingComment(null)
                    setEditText('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem 
                      onClick={() => {
                        setEditingComment(comment.id)
                        setEditText(comment.text)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => onCommentDelete(comment.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
          
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      </div>
    </div>
  )

  const totalCount = comments.length + attachments.length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <MessageCircle className="h-4 w-4 mr-1" />
          <Paperclip className="h-4 w-4" />
          {totalCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {totalCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Comments & Attachments</DialogTitle>
          <DialogDescription>
            {columnId ? 'Cell-level' : 'Row-level'} comments and file attachments
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Comments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Comments ({comments.length})</h3>
            </div>
            
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map(comment => renderComment(comment))
              )}
            </div>

            {/* Add Comment */}
            <div className="mt-4 space-y-2">
              {replyingTo && (
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span className="text-sm text-blue-700">
                    Replying to comment
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="min-h-[60px]"
                />
                <Button 
                  onClick={handleCommentSubmit}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Attachments ({attachments.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Add File
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {attachments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No attachments yet. Upload files to share with your team.
                </p>
              ) : (
                attachments.map(attachment => {
                  const FileIcon = getFileIcon(attachment.type)
                  return (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FileIcon className="h-8 w-8 text-gray-400" />
                        <div>
                          <div className="font-medium text-sm">{attachment.name}</div>
                          <div className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)} • 
                            Uploaded by {attachment.uploadedBy.name} • 
                            {attachment.uploadedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => onAttachmentDelete(attachment.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}