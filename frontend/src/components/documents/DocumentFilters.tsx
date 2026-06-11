import { DOCUMENT_CATEGORIES, DOCUMENT_PRIORITIES, PRIORITY_LABELS, STATUS_LABELS } from '../../lib/documents'
import type { DocumentCategory, DocumentPriority, DocumentStatus } from '../../types'

interface DocumentFiltersProps {
  status: DocumentStatus | undefined
  priority: DocumentPriority | undefined
  category: DocumentCategory | undefined
  onStatusChange: (value: DocumentStatus | undefined) => void
  onPriorityChange: (value: DocumentPriority | undefined) => void
  onCategoryChange: (value: DocumentCategory | undefined) => void
}

const STATUSES: DocumentStatus[] = ['pending', 'in_review', 'approved', 'rejected']

export function DocumentFilters({
  status,
  priority,
  category,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: DocumentFiltersProps) {
  const selectClass =
    'rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900'

  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={status ?? ''}
        onChange={(e) => onStatusChange((e.target.value as DocumentStatus) || undefined)}
        className={selectClass}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      <select
        value={priority ?? ''}
        onChange={(e) => onPriorityChange((e.target.value as DocumentPriority) || undefined)}
        className={selectClass}
      >
        <option value="">All priorities</option>
        {DOCUMENT_PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABELS[p]}
          </option>
        ))}
      </select>

      <select
        value={category ?? ''}
        onChange={(e) => onCategoryChange((e.target.value as DocumentCategory) || undefined)}
        className={selectClass}
      >
        <option value="">All categories</option>
        {DOCUMENT_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
