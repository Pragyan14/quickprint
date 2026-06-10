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
  const base = 'w-full py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-[#0369a1] text-white hover:bg-[#025d8c] active:bg-[#024f7a]',
    ghost: 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/70',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]}`}
    >
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