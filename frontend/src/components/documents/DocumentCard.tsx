import { useState } from 'react'
import { useDeleteDocument } from '../../api/hooks/documents'
import { PRIORITY_LABELS, STATUS_LABELS } from '../../lib/documents'
import type { Document } from '../../types'
import { ConfirmModal } from '../ConfirmModal'

interface DocumentCardProps {
  document: Document
  onView: (id: string) => void
}

const PRIORITY_COLORS = {
  high: 'bg-red-50 text-red-700',
  medium: 'bg-yellow-50 text-yellow-700',
  low: 'bg-green-50 text-green-700',
}

const STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-600',
  in_review: 'bg-blue-50 text-blue-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
}

export function DocumentCard({ document, onView }: DocumentCardProps) {
  const deleteDocument = useDeleteDocument()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <>
      <article className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-gray-900">{document.title}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              Status:
              <span className={`rounded px-1.5 py-0.5 font-medium ${STATUS_COLORS[document.status]}`}>
                {STATUS_LABELS[document.status]}
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              Priority:
              <span className={`rounded px-1.5 py-0.5 font-medium ${PRIORITY_COLORS[document.priority]}`}>
                {PRIORITY_LABELS[document.priority]}
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              Category:
              <span className="rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-600">
                {document.category}
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              By:
              <span className="font-medium text-gray-700">{document.submitter_name}</span>
            </span>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onView(document.id)}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={deleteDocument.isPending}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </article>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete document"
        description={`"${document.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmOpen(false)
          deleteDocument.mutate(document.id)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}
