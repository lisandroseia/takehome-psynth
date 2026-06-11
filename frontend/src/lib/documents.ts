import type { DocumentCategory, DocumentPriority, DocumentSortBy, DocumentStatus } from '../types'

export const DOCUMENT_STATUSES: DocumentStatus[] = [
  'pending',
  'in_review',
  'approved',
  'rejected',
]

export const DOCUMENT_PRIORITIES: DocumentPriority[] = ['low', 'medium', 'high']

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  'Legal',
  'Marketing',
  'Security',
  'Operations',
  'Product',
  'Engineering',
  'Customer Success',
]

export const STATUS_LABELS: Record<DocumentStatus, string> = {
  pending: 'Pending',
  in_review: 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
}

export const PRIORITY_LABELS: Record<DocumentPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const SORT_BY_LABELS: Record<DocumentSortBy, string> = {
  title: 'Title',
  submitter_name: 'Submitter',
  created_at: 'Date',
  priority: 'Priority',
  status: 'Status',
}

export const PAGE_SIZE_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: 'All', value: null },
]

export function formatDocumentDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
