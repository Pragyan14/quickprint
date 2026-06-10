'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

type Shop = {
  id: string
  name: string
}

type ToggleGroupProps = {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (val: string) => void
}

function ToggleGroup({ label, options, value, onChange }: ToggleGroupProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
              value === opt.value
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function UploadPage() {
  const { shopId } = useParams()
  const supabase = createClient()

  const [shop, setShop] = useState<Shop | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [colorMode, setColorMode] = useState('bw')
  const [sides, setSides] = useState('single')
  const [copies, setCopies] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => { fetchShop() }, [])

  async function fetchShop() {
    const { data, error } = await supabase
      .from('shops')
      .select('id, name')
      .eq('id', shopId)
      .single()

    if (error || !data) { setNotFound(true); return }
    setShop(data)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return

    const allowed = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowed.includes(selected.type)) {
      setError('Only PDF, JPG, PNG, and DOCX files are allowed.')
      setFile(null)
      return
    }

    if (selected.size > 20 * 1024 * 1024) {
      setError('File is too large. Maximum size is 20MB.')
      setFile(null)
      return
    }

    setError('')
    setFile(selected)
    if (!fileName) setFileName(selected.name)
  }

  async function handleUpload() {
    if (!file) { setError('Please select a file first.'); return }

    setLoading(true)
    setError('')

    const base64 = await fileToBase64(file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopId,
        fileName: fileName || file.name,
        fileBase64: base64,
        fileType: file.type,
        colorMode,
        sides,
        copies,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      setError(result.error || 'Upload failed. Please try again.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  function resetForm() {
    setSuccess(false)
    setFile(null)
    setFileName('')
    setCopies(1)
    setColorMode('bw')
    setSides('single')
    setError('')
  }

  if (notFound) {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4 text-2xl">
            🔍
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Shop not found</h2>
          <p className="text-sm text-gray-400">
            This QR code may be invalid or the shop no longer exists.
          </p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">File sent!</h2>
          <p className="text-sm text-gray-500">
            Your file is on its way to{' '}
            <span className="font-medium text-gray-700">{shop?.name}</span>.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            It will be deleted automatically in 10 minutes.
          </p>
          <button
            onClick={resetForm}
            className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Send another file
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-sm w-full">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Sending to</p>
          <h1 className="text-xl font-semibold text-gray-900">
            {shop?.name || '...'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Your file will be deleted after 10 minutes.
          </p>
        </div>

        {error && (
          <div className="mb-4">
            <Alert type="error" message={error} />
          </div>
        )}

        <div className="space-y-5">

          {/* File picker */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select File</p>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-50">{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB · tap to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500">Tap to choose a file</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOCX · max 20MB</p>
                </div>
              )}
            </label>
          </div>

          {/* File label */}
          <Input
            label="File Label"
            hint="optional"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g. Resume, Aadhaar, Assignment"
          />

          {/* Toggle options */}
          <ToggleGroup
            label="Print Color"
            options={[{ value: 'bw', label: 'B&W' }, { value: 'color', label: 'Color' }]}
            value={colorMode}
            onChange={setColorMode}
          />

          <ToggleGroup
            label="Sides"
            options={[{ value: 'single', label: 'Single Sided' }, { value: 'double', label: 'Double Sided' }]}
            value={sides}
            onChange={setSides}
          />

          {/* Copies */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Copies</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCopies(Math.max(1, copies - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition text-lg font-medium"
              >
                −
              </button>
              <span className="text-base font-semibold text-gray-900 w-6 text-center tabular-nums">
                {copies}
              </span>
              <button
                onClick={() => setCopies(Math.min(10, copies + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          <Button loading={loading} onClick={handleUpload} disabled={!file}>
            {loading ? 'Sending...' : 'Send to Shop'}
          </Button>

        </div>
      </div>
    </div>
  )
}