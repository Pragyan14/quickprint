'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import QRCode from 'qrcode'
import FileCard from '@/components/ui/FileCard'
import QRPanel from '@/components/ui/QRPanel'
import { Logo } from '@/components/ui/Logo'

type Shop = { id: string; name: string }
type FileRecord = {
  id: string; file_name: string; color_mode: string
  sides: string; copies: number; uploaded_at: string
  expires_at: string; storage_path: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [shop, setShop] = useState<Shop | null>(null)
  const [files, setFiles] = useState<FileRecord[]>([])
  const [qrUrl, setQrUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => { loadDashboard() }, [])

  // Live countdown tick
  useEffect(() => {
    const interval = setInterval(() => setFiles(f => [...f]), 1000)
    return () => clearInterval(interval)
  }, [])

  async function loadDashboard() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data: shopData } = await supabase
      .from('shops').select('*').eq('owner_id', user.id).single()

    if (!shopData) { setLoading(false); return }
    setShop(shopData)

    const uploadUrl = `${window.location.origin}/upload/${shopData.id}`
    const qr = await QRCode.toDataURL(uploadUrl, { width: 300, margin: 2 })
    setQrUrl(qr)

    await loadFiles(shopData.id)
    setLoading(false)
  }

  async function loadFiles(shopId: string) {
    const { data } = await supabase
      .from('files').select('*')
      .eq('shop_id', shopId).eq('is_deleted', false)
      .gt('expires_at', new Date().toISOString())
      .order('uploaded_at', { ascending: false })
    setFiles(data || [])
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  async function handleDownloadFile(storagePath: string, fileName: string, fileId: string) {
  const response = await fetch('/api/file-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ storagePath, fileId }),
  })

  const result = await response.json()

  if (!response.ok) {
    alert('Could not download file.')
    return
  }

  const link = document.createElement('a')
  link.href = result.signedUrl
  link.download = fileName
  link.click()
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-gray-500">No shop found. <button onClick={handleLogout} className="text-blue-600 underline">Sign out</button></p>
      </div>
    )
  }

  const activeCount = files.length
  const pctFull = Math.round((activeCount / 20) * 100)

  return (
    <div className="min-h-screen relative z-10">
      {showQR && (
        <QRPanel
          qrUrl={qrUrl}
          shopId={shop.id}
          shopName={shop.name}
          onClose={() => setShowQR(false)}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">{shop.name}</h1>
              <p className="text-[11px] text-gray-400">QuickPrint Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition border border-blue-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="17" width="3" height="3"/>
                <rect x="19" y="14" width="2" height="2"/><rect x="17" y="19" width="4" height="2"/>
              </svg>
              QR Code
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-400 transition font-medium px-3 py-2 rounded-xl hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-400 font-medium mb-1">Active Files</p>
            <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-xs text-gray-400 mt-1">of 20 slots used</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs text-gray-400 font-medium mb-1">Queue Status</p>
            <div className="flex items-end gap-1.5 mt-1">
              <p className="text-3xl font-bold text-gray-900">{pctFull}%</p>
            </div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${pctFull > 80 ? 'bg-red-400' : pctFull > 50 ? 'bg-orange-400' : 'bg-green-400'}`}
                style={{ width: `${pctFull}%` }}
              />
            </div>
          </div>
          <div className="bg-blue-600 rounded-2xl p-4 shadow-sm shadow-blue-200 cursor-pointer hover:bg-blue-700 transition" onClick={() => setShowQR(true)}>
            <p className="text-xs text-blue-200 font-medium mb-1">Your QR Code</p>
            <p className="text-sm font-semibold text-white mt-2">Tap to view</p>
            <p className="text-xs text-blue-200 mt-1">Share with customers →</p>
          </div>
        </div>

        {/* Files panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Incoming Files</h2>
              {activeCount > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-500 font-medium">{activeCount} active</span>
                </span>
              )}
            </div>
            <button
              onClick={() => shop && loadFiles(shop.id)}
              className="text-xs text-gray-400 hover:text-blue-500 transition font-medium flex items-center gap-1"
            >
              ↻ Refresh
            </button>
          </div>

          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-3xl mb-4">
                📭
              </div>
              <p className="text-sm font-semibold text-gray-700">Waiting for files</p>
              <p className="text-xs text-gray-400 mt-1.5 max-w-xs leading-relaxed">
                When a customer scans your QR code and uploads a document, it will appear here instantly.
              </p>
              <button
                onClick={() => setShowQR(true)}
                className="mt-5 inline-flex items-center gap-2 text-xs text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition border border-blue-100"
              >
                View your QR Code →
              </button>
            </div>
          ) : (
            <div>
              {files.map((file, i) => (
                <div key={file.id} className={i !== 0 ? 'border-t border-gray-50' : ''}>
                  <FileCard file={file} onDownload={(path, name) => handleDownloadFile(path, name, file.id)} />
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400">
          Files are automatically deleted 10 minutes after upload · Realtime updates coming soon
        </p>
      </div>
    </div>
  )
}