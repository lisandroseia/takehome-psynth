import { useState } from 'react'
import {
  CreateDocumentModal,
  DocumentDetail,
  DocumentFilters,
  DocumentList,
  SearchBar,
} from './components/documents'
import { useDebounce } from './hooks/useDebounce'
import type { DocumentCategory, DocumentPriority, DocumentSortBy, DocumentStatus, SortOrder } from './types'

function App() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | undefined>()
  const [priorityFilter, setPriorityFilter] = useState<DocumentPriority | undefined>()
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | undefined>()
  const [searchInput, setSearchInput] = useState('')
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number | null>(10)
  const [sortBy, setSortBy] = useState<DocumentSortBy>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const debouncedSearch = useDebounce(searchInput, 300)

  function handleStatusChange(status: DocumentStatus | undefined) {
    setStatusFilter(status)
    setPage(1)
  }

  function handlePriorityChange(priority: DocumentPriority | undefined) {
    setPriorityFilter(priority)
    setPage(1)
  }

  function handleCategoryChange(category: DocumentCategory | undefined) {
    setCategoryFilter(category)
    setPage(1)
  }

  function handleSearchChange(value: string) {
    setSearchInput(value)
    setPage(1)
  }

  function handleSortChange(by: DocumentSortBy, order: SortOrder) {
    setSortBy(by)
    setSortOrder(order)
    setPage(1)
  }

  function handlePageSizeChange(size: number | null) {
    setPageSize(size)
    setPage(1)
  }

  return (
    <div className="min-h-svh bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-8 text-left">
          <h1 className="text-2xl font-semibold text-gray-900">Document Review Queue</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review, filter, and manage submitted documents.
          </p>
        </header>

        <section className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Documents</h2>
              <p className="mt-0.5 text-sm text-gray-600">
                {[statusFilter, priorityFilter, categoryFilter, debouncedSearch].some(Boolean)
                  ? 'Showing filtered results.'
                  : 'All submitted documents.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              New document
            </button>
          </div>

          <SearchBar value={searchInput} onChange={handleSearchChange} />
          <DocumentFilters
            status={statusFilter}
            priority={priorityFilter}
            category={categoryFilter}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onCategoryChange={handleCategoryChange}
          />

          <DocumentList
            status={statusFilter}
            priority={priorityFilter}
            category={categoryFilter}
            q={debouncedSearch || undefined}
            page={page}
            pageSize={pageSize}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
            onViewDocument={setSelectedDocumentId}
          />
        </section>
      </main>

      <CreateDocumentModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <DocumentDetail
        documentId={selectedDocumentId}
        onClose={() => setSelectedDocumentId(null)}
      />
    </div>
  )
}

export default App
