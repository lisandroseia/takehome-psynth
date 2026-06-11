import { useState } from 'react'
import {
  CreateDocumentForm,
  DocumentDetail,
  DocumentList,
  StatusFilter,
} from './components/documents'
import type { DocumentStatus } from './types'

function App() {
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | undefined>()
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  return (
    <div className="min-h-svh bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-8 text-left">
          <h1 className="text-2xl font-semibold text-gray-900">
            Document Review Queue
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Review, filter, and manage submitted documents.
          </p>
        </header>

        <div className="space-y-8">
          <CreateDocumentForm />

          <section className="space-y-4 text-left">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Documents</h2>
              <p className="mt-1 text-sm text-gray-600">
                Filter by status and open a document for full details.
              </p>
            </div>

            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            <DocumentList
              status={statusFilter}
              onViewDocument={setSelectedDocumentId}
            />
          </section>
        </div>
      </main>

      <DocumentDetail
        documentId={selectedDocumentId}
        onClose={() => setSelectedDocumentId(null)}
      />
    </div>
  )
}

export default App
