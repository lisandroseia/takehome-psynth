import type { Document, DocumentCategory, DocumentCreate, DocumentPatch, DocumentPriority, DocumentSortBy, DocumentStatus, SortOrder } from './document'

export interface GetDocumentsParams {
  status?: DocumentStatus
  priority?: DocumentPriority
  category?: DocumentCategory
  q?: string
  page?: number
  page_size?: number
  sort_by?: DocumentSortBy
  sort_order?: SortOrder
}

export interface PaginatedResponse {
  items: Document[]
  total: number
  page: number
  page_size: number | null
  total_pages: number
}

export type GetDocumentsResponse = PaginatedResponse

export type GetDocumentResponse = Document

export type CreateDocumentRequest = DocumentCreate

export type CreateDocumentResponse = Document

export type UpdateDocumentRequest = DocumentPatch

export type UpdateDocumentResponse = Document

export type DeleteDocumentResponse = void

export interface ApiErrorDetail {
  detail: string
}

export interface ApiValidationErrorItem {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface ApiValidationError {
  detail: ApiValidationErrorItem[]
}
