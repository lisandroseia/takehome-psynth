import { DOCUMENT_CATEGORIES } from '../../lib/documents'
import type { DocumentCategory } from '../../types'

interface CategoryFilterProps {
  value: DocumentCategory | undefined
  onChange: (category: DocumentCategory | undefined) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Category</span>
      <select
        value={value ?? ''}
        onChange={(e) => onChange((e.target.value as DocumentCategory) || undefined)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        <option value="">All</option>
        {DOCUMENT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}
