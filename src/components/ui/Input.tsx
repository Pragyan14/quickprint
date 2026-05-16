type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export default function Input({ label, hint, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <input
        {...props}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition
          ${error
            ? 'border-red-300 focus:ring-red-200'
            : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
          }
          ${props.className || ''}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}