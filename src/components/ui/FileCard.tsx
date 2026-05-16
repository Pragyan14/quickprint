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
  if (ext === 'pdf') return { icon: '📄', label: 'PDF', color: 'bg-red-50 text-red-500' }
  if (['jpg', 'jpeg', 'png'].includes(ext || '')) return { icon: '🖼️', label: 'Image', color: 'bg-purple-50 text-purple-500' }
  if (ext === 'docx') return { icon: '📝', label: 'Word', color: 'bg-blue-50 text-blue-500' }
  return { icon: '📎', label: 'File', color: 'bg-gray-50 text-gray-500' }
}

export default function FileCard({ file, onDownload }: FileCardProps) {
  const time = getTimeRemaining(file.expires_at)
  const fileType = getFileType(file.file_name)

  return (
    <div className="group relative flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors rounded-xl">
      {/* File type badge */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${fileType.color}`}>
        {fileType.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
          {file.file_name || 'Untitled'}
        </p>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${fileType.color}`}>
            {fileType.label}
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">
            {file.color_mode === 'bw' ? 'B&W' : 'Color'}
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">
            {file.sides === 'single' ? 'Single' : 'Double'} sided
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-400">
            {file.copies} {file.copies === 1 ? 'copy' : 'copies'}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        {time && (
          <span className={`text-xs font-semibold tabular-nums px-2 py-1 rounded-lg ${
            time.urgent
              ? 'bg-red-50 text-red-500'
              : 'bg-orange-50 text-orange-400'
          }`}>
            ⏱ {time.label}
          </span>
        )}
        <button
          onClick={() => onDownload(file.storage_path, file.file_name || 'file')}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover:opacity-100 transition-all"
        >
          Download ↓
        </button>
      </div>
    </div>
  )
}