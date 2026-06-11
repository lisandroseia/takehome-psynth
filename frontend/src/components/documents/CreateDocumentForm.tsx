import { type FormEvent, useState } from 'react'
import { useCreateDocument } from '../../api'
import { DOCUMENT_CATEGORIES, DOCUMENT_PRIORITIES, PRIORITY_LABELS } from '../../lib/documents'
import type { DocumentCategory, DocumentCreate, DocumentPriority } from '../../types'

const INITIAL_FORM: DocumentCreate = {
  title: '',
  submitter_name: '',
  category: 'Legal',
  priority: 'medium',
  summary: '',
}

interface FormErrors {
  title?: string
  submitter_name?: string
  summary?: string
}

function validate(form: DocumentCreate): FormErrors {
  const errors: FormErrors = {}
  const title = form.title.trim()
  const name = form.submitter_name.trim()
  const summary = form.summary.trim()

  if (title.length < 3) errors.title = 'Title must be at least 3 characters.'
  else if (title.length > 200) errors.title = 'Title must be at most 200 characters.'

  if (name.length < 2) errors.submitter_name = 'Name must be at least 2 characters.'
  else if (name.length > 100) errors.submitter_name = 'Name must be at most 100 characters.'

  if (summary.length < 10) errors.summary = 'Summary must be at least 10 characters.'
  else if (summary.length > 1000) errors.summary = 'Summary must be at most 1000 characters.'

  return errors
}

function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}

interface CreateDocumentFormProps {
  onSuccess?: () => void
}

export function CreateDocumentForm({ onSuccess }: CreateDocumentFormProps) {
  const createDocument = useCreateDocument()
  const [form, setForm] = useState<DocumentCreate>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormErrors, boolean>>>({})

  function updateField<K extends keyof DocumentCreate>(field: K, value: DocumentCreate[K]) {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field as keyof FormErrors]) {
      setErrors(validate(updated))
    }
  }

  function handleBlur(field: keyof FormErrors) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(form))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validate(form)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      setTouched({ title: true, submitter_name: true, summary: true })
      return
    }

    createDocument.mutate(form, {
      onSuccess: () => {
        setForm(INITIAL_FORM)
        setErrors({})
        setTouched({})
        onSuccess?.()
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-gray-200 bg-white p-6 text-left"
    >
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Create Document</h2>
        <p className="mt-1 text-sm text-gray-600">Submit a new document to the review queue.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            className={[
              'w-full rounded-md border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1',
              errors.title && touched.title
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900',
            ].join(' ')}
          />
          {errors.title && touched.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="submitter_name" className="mb-1 block text-sm font-medium text-gray-700">
            Submitter
          </label>
          <input
            id="submitter_name"
            type="text"
            value={form.submitter_name}
            onChange={(e) => updateField('submitter_name', e.target.value)}
            onBlur={() => handleBlur('submitter_name')}
            className={[
              'w-full rounded-md border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1',
              errors.submitter_name && touched.submitter_name
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900',
            ].join(' ')}
          />
          {errors.submitter_name && touched.submitter_name && (
            <p className="mt-1 text-xs text-red-600">{errors.submitter_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value as DocumentCategory)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="mb-1 block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => updateField('priority', e.target.value as DocumentPriority)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
            rows={4}
            value={form.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            onBlur={() => handleBlur('summary')}
            className={[
              'w-full rounded-md border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1',
              errors.summary && touched.summary
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900',
            ].join(' ')}
          />
          {errors.summary && touched.summary && (
            <p className="mt-1 text-xs text-red-600">{errors.summary}</p>
          )}
          <p className="mt-1 text-right text-xs text-gray-400">
            {form.summary.length}/1000
          </p>
        </div>
      </div>

      {createDocument.isError && (
        <p className="mt-4 text-sm text-red-700">{createDocument.error.message}</p>
      )}

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
