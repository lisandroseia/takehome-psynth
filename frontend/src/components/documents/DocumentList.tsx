import { useDocuments } from '../../api'
import type { DocumentStatus } from '../../types'
import { DocumentCard } from './DocumentCard'

interface DocumentListProps {
  status?: DocumentStatus
  onViewDocument: (id: string) => void
}

export function DocumentList({ status, onViewDocument }: DocumentListProps) {
  const { data, isLoading, isError, error, refetch, isFetching } = useDocuments(
    status ? { status } : undefined,
  )

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
          className="mt-4 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-gray-900">No documents found</p>
        <p className="mt-1 text-sm text-gray-600">
          {status
            ? 'Try another status filter or create a new document.'
            : 'Create a document to get started.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {isFetching && !isLoading ? (
        <p className="text-xs text-gray-500">Refreshing...</p>
      ) : null}
      {data.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onViewDocument}
        />
      ))}
    </div>
  )
}
