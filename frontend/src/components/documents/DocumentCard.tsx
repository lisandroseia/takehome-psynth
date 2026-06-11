import { useDeleteDocument } from '../../api'
import { formatDocumentDate, PRIORITY_LABELS, STATUS_LABELS } from '../../lib/documents'
import type { Document } from '../../types'
import { StatusUpdateSelect } from './StatusUpdateSelect'

interface DocumentCardProps {
  document: Document
  onView: (id: string) => void
}

export function DocumentCard({ document, onView }: DocumentCardProps) {
  const deleteDocument = useDeleteDocument()

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-medium text-gray-900">{document.title}</h3>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
              {document.category}
            </span>
          </div>

          <p className="line-clamp-2 text-sm text-gray-600">{document.summary}</p>

          <dl className="grid gap-1 text-sm text-gray-600 sm:grid-cols-2">
            <div>
              <dt className="inline font-medium text-gray-700">Submitter: </dt>
              <dd className="inline">{document.submitter_name}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-700">Priority: </dt>
              <dd className="inline">{PRIORITY_LABELS[document.priority]}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-700">Status: </dt>
              <dd className="inline">{STATUS_LABELS[document.status]}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-700">Created: </dt>
              <dd className="inline">{formatDocumentDate(document.created_at)}</dd>
            </div>
          </dl>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <StatusUpdateSelect documentId={document.id} value={document.status} />
          <button
            type="button"
            onClick={() => onView(document.id)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => deleteDocument.mutate(document.id)}
            disabled={deleteDocument.isPending}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
