import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
import type {
  CreateDocumentRequest,
  CreateDocumentResponse,
  DeleteDocumentResponse,
  Document,
  GetDocumentResponse,
  GetDocumentsParams,
  GetDocumentsResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from '../../types'
import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  updateDocument,
} from '../documents'

export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (params?: GetDocumentsParams) =>
    [...documentKeys.lists(), params ?? {}] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
}

export function useDocuments(
  params?: GetDocumentsParams,
  options?: Omit<
    UseQueryOptions<GetDocumentsResponse, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => getDocuments(params),
    ...options,
  })
}

export function useDocument(
  id: string,
  options?: Omit<
    UseQueryOptions<GetDocumentResponse, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => getDocument(id),
    enabled: Boolean(id),
    ...options,
  })
}

export function useCreateDocument(
  options?: Omit<
    UseMutationOptions<CreateDocumentResponse, Error, CreateDocumentRequest>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createDocument,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

export function useUpdateDocument(
  options?: Omit<
    UseMutationOptions<
      UpdateDocumentResponse,
      Error,
      { id: string; data: UpdateDocumentRequest }
    >,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, data }) => updateDocument(id, data),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.setQueryData<Document>(documentKeys.detail(data.id), data)
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
  })
}

export function useDeleteDocument(
  options?: Omit<
    UseMutationOptions<DeleteDocumentResponse, Error, string>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteDocument,
    onSuccess: (data, id, onMutateResult, context) => {
      queryClient.removeQueries({ queryKey: documentKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() })
      options?.onSuccess?.(data, id, onMutateResult, context)
    },
  })
}
