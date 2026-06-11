interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title or submitter name..."
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>
      <p className="text-xs text-gray-500">
        Searches across <span className="font-medium">title</span> and{' '}
        <span className="font-medium">submitter name</span>
      </p>
    </div>
  )
}
