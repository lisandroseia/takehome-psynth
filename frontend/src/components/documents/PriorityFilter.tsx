import { PRIORITY_LABELS } from '../../lib/documents'
import type { DocumentPriority } from '../../types'

const OPTIONS: Array<{ value: DocumentPriority | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  { value: 'high', label: PRIORITY_LABELS.high },
  { value: 'medium', label: PRIORITY_LABELS.medium },
  { value: 'low', label: PRIORITY_LABELS.low },
]

interface PriorityFilterProps {
  value: DocumentPriority | undefined
  onChange: (priority: DocumentPriority | undefined) => void
}

export function PriorityFilter({ value, onChange }: PriorityFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500">Priority</span>
      {OPTIONS.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
