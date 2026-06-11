import type { ApiErrorDetail, ApiValidationError } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export class ApiError extends Error {
  status: number
  body: ApiErrorDetail | ApiValidationError

  constructor(status: number, body: ApiErrorDetail | ApiValidationError) {
    const message =
      'detail' in body && typeof body.detail === 'string'
        ? body.detail
        : `Request failed with status ${status}`

    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

async function parseErrorBody(response: Response): Promise<ApiErrorDetail | ApiValidationError> {
  try {
    return (await response.json()) as ApiErrorDetail | ApiValidationError
  } catch {
    return { detail: response.statusText || 'Unknown error' }
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorBody(response))
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
