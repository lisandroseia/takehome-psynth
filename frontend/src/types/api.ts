import type { Document, DocumentCreate, DocumentPatch, DocumentStatus } from './document'

export interface GetDocumentsParams {
  status?: DocumentStatus
}

export type GetDocumentsResponse = Document[]

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
