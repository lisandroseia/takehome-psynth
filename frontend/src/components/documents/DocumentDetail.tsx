import { useDocument } from '../../api/hooks/documents'
import {
  formatDocumentDate,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from '../../lib/documents'
import { StatusUpdateSelect } from './StatusUpdateSelect'

interface DocumentDetailProps {
  documentId: string | null
  onClose: () => void
}

export function DocumentDetail({ documentId, onClose }: DocumentDetailProps) {
  const { data, isLoading, isError, error } = useDocument(documentId ?? '')

  if (!documentId) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-detail-title"
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2
              id="document-detail-title"
              className="text-lg font-medium text-gray-900"
            >
              Document Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div className="px-6 py-5 text-left">
          {isLoading ? (
            <p className="text-sm text-gray-600">Loading document...</p>
          ) : null}

          {isError ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">
                Failed to load document
              </p>
              <p className="mt-1 text-sm text-red-700">{error.message}</p>
            </div>
          ) : null}

          {data ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-medium text-gray-900">{data.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{data.summary}</p>
              </div>

              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-gray-700">Submitter</dt>
                  <dd className="mt-1 text-gray-900">{data.submitter_name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Category</dt>
                  <dd className="mt-1 text-gray-900">{data.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Priority</dt>
                  <dd className="mt-1 text-gray-900">
                    {PRIORITY_LABELS[data.priority]}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Status</dt>
                  <dd className="mt-1 text-gray-900">
                    {STATUS_LABELS[data.status]}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-medium text-gray-700">Created</dt>
                  <dd className="mt-1 text-gray-900">
                    {formatDocumentDate(data.created_at)}
                  </dd>
                </div>
              </dl>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Update status</p>
                <StatusUpdateSelect documentId={data.id} value={data.status} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
