import type {
  CreateDocumentRequest,
  CreateDocumentResponse,
  DeleteDocumentResponse,
  GetDocumentResponse,
  GetDocumentsParams,
  GetDocumentsResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from '../types'
import { apiRequest } from './client'

function buildDocumentsPath(params?: GetDocumentsParams): string {
  if (!params?.status) {
    return '/documents'
  }

  const searchParams = new URLSearchParams({ status: params.status })
  return `/documents?${searchParams.toString()}`
}

export function getDocuments(params?: GetDocumentsParams): Promise<GetDocumentsResponse> {
  return apiRequest<GetDocumentsResponse>(buildDocumentsPath(params))
}

export function getDocument(id: string): Promise<GetDocumentResponse> {
  return apiRequest<GetDocumentResponse>(`/documents/${id}`)
}

export function createDocument(
  data: CreateDocumentRequest,
): Promise<CreateDocumentResponse> {
  return apiRequest<CreateDocumentResponse>('/documents', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateDocument(
  id: string,
  data: UpdateDocumentRequest,
): Promise<UpdateDocumentResponse> {
  return apiRequest<UpdateDocumentResponse>(`/documents/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteDocument(id: string): Promise<DeleteDocumentResponse> {
  return apiRequest<DeleteDocumentResponse>(`/documents/${id}`, {
    method: 'DELETE',
  })
}
