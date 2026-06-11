import { STATUS_LABELS } from '../../lib/documents'
import type { DocumentStatus } from '../../types'

interface StatusFilterProps {
  value: DocumentStatus | undefined
  onChange: (status: DocumentStatus | undefined) => void
}

const FILTER_OPTIONS: Array<{ value: DocumentStatus | undefined; label: string }> = [
  { value: undefined, label: 'All' },
  ...(['pending', 'in_review', 'approved', 'rejected'] as DocumentStatus[]).map(
    (status) => ({
      value: status,
      label: STATUS_LABELS[status],
    }),
  ),
]

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => {
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
