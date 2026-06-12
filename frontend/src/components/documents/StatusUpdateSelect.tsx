import { useUpdateDocument } from '../../api/hooks/documents'
import { DOCUMENT_STATUSES, STATUS_LABELS } from '../../lib/documents'
import type { DocumentStatus } from '../../types'

interface StatusUpdateSelectProps {
  documentId: string
  value: DocumentStatus
  disabled?: boolean
}

export function StatusUpdateSelect({
  documentId,
  value,
  disabled = false,
}: StatusUpdateSelectProps) {
  const updateDocument = useUpdateDocument()

  return (
    <select
      value={value}
      disabled={disabled || updateDocument.isPending}
      onChange={(event) => {
        const nextStatus = event.target.value as DocumentStatus
        if (nextStatus === value) {
          return
        }

        updateDocument.mutate({
          id: documentId,
          data: { status: nextStatus },
        })
      }}
      className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
      aria-label="Update document status"
    >
      {DOCUMENT_STATUSES.map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  )
}
