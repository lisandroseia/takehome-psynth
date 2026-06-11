export type DocumentStatus =
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'

export type DocumentPriority = 'low' | 'medium' | 'high'

export interface Document {
  id: string
  title: string
  submitter_name: string
  category: string
  status: DocumentStatus
  priority: DocumentPriority
  created_at: string
  summary: string
}

export interface DocumentCreate {
  title: string
  submitter_name: string
  category: string
  status?: DocumentStatus
  priority: DocumentPriority
  summary: string
}

export interface DocumentPatch {
  status: DocumentStatus
}
