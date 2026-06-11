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
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set('status', params.status)
  if (params?.priority) searchParams.set('priority', params.priority)
  if (params?.category) searchParams.set('category', params.category)
  if (params?.q) searchParams.set('q', params.q)
  if (params?.sort_by) searchParams.set('sort_by', params.sort_by)
  if (params?.sort_order) searchParams.set('sort_order', params.sort_order)
  if (params?.page != null) searchParams.set('page', String(params.page))
  if (params?.page_size != null) searchParams.set('page_size', String(params.page_size))
  const qs = searchParams.toString()
  return qs ? `/documents?${qs}` : '/documents'
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
