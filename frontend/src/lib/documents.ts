import type { DocumentPriority, DocumentStatus } from '../types'

export const DOCUMENT_STATUSES: DocumentStatus[] = [
  'pending',
  'in_review',
  'approved',
  'rejected',
]

export const DOCUMENT_PRIORITIES: DocumentPriority[] = ['low', 'medium', 'high']

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

export function formatDocumentDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
