type FileCardProps = {
  file: {
    id: string
    file_name: string
    color_mode: string
    sides: string
    copies: number
    expires_at: string
    storage_path: string
  }
  onDownload: (storagePath: string, fileName: string) => void
}

function getTimeRemaining(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (diff <= 0) return null
  const mins = Math.floor(diff / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return { label: `${mins}m ${secs}s`, urgent: mins < 2 }
}

function getFileType(fileName: string) {
  const ext = fileName?.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return { label: 'PDF', bg: 'rgba(239,68,68,0.08)', color: '#dc2626', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  )}
  if (['jpg', 'jpeg', 'png'].includes(ext || '')) return { label: 'Image', bg: 'rgba(124,58,237,0.08)', color: '#7c3aed', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  )}
  if (ext === 'docx') return { label: 'Word', bg: 'rgba(3,105,161,0.08)', color: '#0369a1', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  )}
  return { label: 'File', bg: 'rgba(0,0,0,0.05)', color: '#6b7280', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
  )}
}

export default function FileCard({ file, onDownload }: FileCardProps) {
  const time = getTimeRemaining(file.expires_at)
  const fileType = getFileType(file.file_name)

  return (
    <div className="group flex items-center gap-4 px-5 py-4 hover:bg-white/40 transition-colors">

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: fileType.bg, color: fileType.color }}
      >
        {fileType.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{file.file_name || 'Untitled'}</p>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span
            className="text-[11px] font-medium px-1.5 py-0.5 rounded-md"
            style={{ background: fileType.bg, color: fileType.color }}
          >
            {fileType.label}
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">{file.color_mode === 'bw' ? 'B&W' : 'Color'}</span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">{file.sides === 'single' ? 'Single' : 'Double'} sided</span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">{file.copies} {file.copies === 1 ? 'copy' : 'copies'}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {time && (
          <span
            className="text-xs font-semibold tabular-nums px-2 py-1 rounded-lg"
            style={{
              background: time.urgent ? 'rgba(239,68,68,0.08)' : 'rgba(251,146,60,0.08)',
              color: time.urgent ? '#dc2626' : '#ea580c',
            }}
          >
            {time.label}
          </span>
        )}
        <button
          onClick={() => onDownload(file.storage_path, file.file_name || 'file')}
          className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-all"
          style={{ color: '#0369a1' }}
        >
          Download ↓
        </button>
      </div>
    </div>
  )
}