type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  variant?: 'primary' | 'ghost' | 'danger'
}

export default function Button({
  loading,
  variant = 'primary',
  children,
  ...props
}: ButtonProps) {
  const base = 'w-full py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    ghost: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  }

  return (
    <button {...props} disabled={loading || props.disabled} className={`${base} ${variants[variant]}`}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}