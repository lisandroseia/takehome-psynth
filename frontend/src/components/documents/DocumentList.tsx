import { useDocuments } from '../../api/hooks/documents'
import type { DocumentCategory, DocumentPriority, DocumentSortBy, DocumentStatus, SortOrder } from '../../types'
import { DocumentCard } from './DocumentCard'
import { Pagination } from './Pagination'
import { SortControls } from './SortControls'

interface DocumentListProps {
  status?: DocumentStatus
  priority?: DocumentPriority
  category?: DocumentCategory
  q?: string
  page: number
  pageSize: number | null
  sortBy: DocumentSortBy
  sortOrder: SortOrder
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number | null) => void
  onSortChange: (sortBy: DocumentSortBy, sortOrder: SortOrder) => void
  onViewDocument: (id: string) => void
}

export function DocumentList({
  status,
  priority,
  category,
  q,
  page,
  pageSize,
  sortBy,
  sortOrder,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  onViewDocument,
}: DocumentListProps) {
  const { data, isLoading, isError, error, refetch, isFetching } = useDocuments({
    status,
    priority,
    category,
    q,
    page,
    page_size: pageSize ?? undefined,
    sort_by: sortBy,
    sort_order: sortOrder,
  })

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
        Loading documents...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-left">
        <p className="text-sm font-medium text-red-800">Failed to load documents</p>
        <p className="mt-1 text-sm text-red-700">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 cursor-pointer rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SortControls sortBy={sortBy} sortOrder={sortOrder} onChange={onSortChange} />
        {isFetching && !isLoading ? (
          <p className="text-xs text-gray-500">Refreshing...</p>
        ) : null}
      </div>

      {!data?.items.length ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-900">No documents found</p>
          <p className="mt-1 text-sm text-gray-600">
            {status || priority || category || q
              ? 'Try adjusting the search or filters.'
              : 'Create a document to get started.'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((document) => (
              <DocumentCard key={document.id} document={document} onView={onViewDocument} />
            ))}
          </div>
          <Pagination
            page={data.page}
            totalPages={data.total_pages}
            pageSize={data.page_size}
            total={data.total}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      )}
    </div>
  )
}
