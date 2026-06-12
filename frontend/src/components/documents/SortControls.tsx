import { SORT_BY_LABELS } from '../../lib/documents'
import type { DocumentSortBy, SortOrder } from '../../types'

const SORT_BY_OPTIONS: DocumentSortBy[] = [
  'created_at',
  'title',
  'submitter_name',
  'priority',
  'status',
]

interface SortControlsProps {
  sortBy: DocumentSortBy
  sortOrder: SortOrder
  onChange: (sortBy: DocumentSortBy, sortOrder: SortOrder) => void
}

export function SortControls({ sortBy, sortOrder, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Sort by</span>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as DocumentSortBy, sortOrder)}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_BY_LABELS[option]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
        title={sortOrder === 'asc' ? 'Ascending — click for descending' : 'Descending — click for ascending'}
        className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  )
}
