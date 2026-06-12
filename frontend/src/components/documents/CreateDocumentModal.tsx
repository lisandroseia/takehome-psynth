import { CreateDocumentForm } from './CreateDocumentForm'

interface CreateDocumentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateDocumentModal({ isOpen, onClose }: CreateDocumentModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-document-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 id="create-document-title" className="text-lg font-medium text-gray-900">
            New Document
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
        <div className="px-6 py-5">
          <CreateDocumentForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  )
}
