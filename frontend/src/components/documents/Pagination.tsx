import { PAGE_SIZE_OPTIONS } from '../../lib/documents'

interface PaginationProps {
  page: number
  totalPages: number
  pageSize: number | null
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number | null) => void
}

export function Pagination({
  page,
  totalPages,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Rows per page</span>
        <select
          value={pageSize ?? 'all'}
          onChange={(e) => {
            const val = e.target.value
            onPageSizeChange(val === 'all' ? null : Number(val))
          }}
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        >
          {PAGE_SIZE_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value ?? 'all'}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>

      {pageSize !== null && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
