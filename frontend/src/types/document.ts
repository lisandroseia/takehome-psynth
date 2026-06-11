export type DocumentStatus =
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'

export type DocumentPriority = 'low' | 'medium' | 'high'

export type DocumentCategory =
  | 'Legal'
  | 'Marketing'
  | 'Security'
  | 'Operations'
  | 'Product'
  | 'Engineering'
  | 'Customer Success'

export type DocumentSortBy =
  | 'title'
  | 'submitter_name'
  | 'created_at'
  | 'priority'
  | 'status'

export type SortOrder = 'asc' | 'desc'

export interface Document {
  id: string
  title: string
  submitter_name: string
  category: DocumentCategory
  status: DocumentStatus
  priority: DocumentPriority
  created_at: string
  summary: string
}

export interface DocumentCreate {
  title: string
  submitter_name: string
  category: DocumentCategory
  status?: DocumentStatus
  priority: DocumentPriority
  summary: string
}

export interface DocumentPatch {
  status: DocumentStatus
}
