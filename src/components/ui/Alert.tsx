type AlertProps = {
  type: 'error' | 'success' | 'info'
  message: string
}

const styles = {
  error: 'bg-red-50 text-red-700 border border-red-100',
  success: 'bg-green-50 text-green-700 border border-green-100',
  info: 'bg-blue-50 text-blue-700 border border-blue-100',
}

const icons = {
  error: '⚠',
  success: '✓',
  info: 'ℹ',
}

export default function Alert({ type, message }: AlertProps) {
  return (
    <div className={`flex items-start gap-2.5 text-sm px-4 py-3 rounded-lg ${styles[type]}`}>
      <span className="mt-px shrink-0 font-semibold">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}