import { type FormEvent, useState } from 'react'
import { useCreateDocument } from '../../api'
import { DOCUMENT_PRIORITIES, PRIORITY_LABELS } from '../../lib/documents'
import type { DocumentCreate, DocumentPriority } from '../../types'

const INITIAL_FORM: DocumentCreate = {
  title: '',
  submitter_name: '',
  category: '',
  priority: 'medium',
  summary: '',
}

export function CreateDocumentForm() {
  const createDocument = useCreateDocument()
  const [form, setForm] = useState<DocumentCreate>(INITIAL_FORM)

  function updateField<K extends keyof DocumentCreate>(
    field: K,
    value: DocumentCreate[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createDocument.mutate(form, {
      onSuccess: () => {
        setForm(INITIAL_FORM)
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 text-left"
    >
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Create Document</h2>
        <p className="mt-1 text-sm text-gray-600">
          Submit a new document to the review queue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="submitter_name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Submitter
          </label>
          <input
            id="submitter_name"
            type="text"
            required
            value={form.submitter_name}
            onChange={(event) => updateField('submitter_name', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            required
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            required
            value={form.priority}
            onChange={(event) =>
              updateField('priority', event.target.value as DocumentPriority)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          >
            {DOCUMENT_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="summary" className="mb-1 block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            required
            rows={4}
            value={form.summary}
            onChange={(event) => updateField('summary', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>
      </div>

      {createDocument.isError ? (
        <p className="mt-4 text-sm text-red-700">{createDocument.error.message}</p>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={createDocument.isPending}
          className="rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createDocument.isPending ? 'Creating...' : 'Create document'}
        </button>
      </div>
    </form>
  )
}
