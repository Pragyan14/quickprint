'use client'

import { Download, X } from 'lucide-react'
import { useState } from 'react'

type QRPanelProps = {
  qrUrl: string
  shopId: string
  shopName: string
  onClose: () => void
}

export default function QRPanel({ qrUrl, shopId, shopName, onClose }: QRPanelProps) {
  const uploadUrl = `${window.location.origin}/upload/${shopId}`
  const [copied, setCopied] = useState(false)

  async function downloadQRAsPDF() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()

  // Background — soft sky tint matching the app gradient
  doc.setFillColor(240, 249, 255) // sky-50
  doc.rect(0, 0, pageWidth, 297, 'F')

  // Top accent bar — #0369a1
  doc.setFillColor(3, 105, 161)
  doc.rect(0, 0, pageWidth, 8, 'F')

  // Shop name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(12, 23, 46) // #0c172e
  doc.text(shopName, pageWidth / 2, 36, { align: 'center' })

  // Subtitle
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(100, 116, 139)
  doc.text('Scan to send your document for printing', pageWidth / 2, 46, { align: 'center' })

  // QR code white card
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(pageWidth / 2 - 55, 56, 110, 110, 6, 6, 'F')
  doc.setDrawColor(186, 230, 253) // sky-200
  doc.setLineWidth(0.5)
  doc.roundedRect(pageWidth / 2 - 55, 56, 110, 110, 6, 6, 'S')
  doc.addImage(qrUrl, 'PNG', pageWidth / 2 - 48, 62, 96, 96)

  // Divider
  doc.setDrawColor(186, 230, 253) // sky-200
  doc.setLineWidth(0.3)
  doc.line(20, 178, pageWidth - 20, 178)

  // How it works heading
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(3, 105, 161) // #0369a1
  doc.text('HOW IT WORKS', pageWidth / 2, 188, { align: 'center' })

  // Steps
  const steps = [
    '1. Scan the QR code with your phone camera',
    '2. Select your file and print preferences',
    '3. Tap "Send to Shop" — no app or login needed',
  ]
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(71, 85, 105)
  steps.forEach((step, i) => {
    doc.text(step, pageWidth / 2, 198 + i * 9, { align: 'center' })
  })

  // Privacy card — sky tint
  doc.setFillColor(224, 242, 254) // sky-100
  doc.roundedRect(20, 228, pageWidth - 40, 22, 4, 4, 'F')
  doc.setDrawColor(186, 230, 253) // sky-200
  doc.setLineWidth(0.3)
  doc.roundedRect(20, 228, pageWidth - 40, 22, 4, 4, 'S')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(3, 105, 161)
  doc.text('Privacy First', pageWidth / 2, 237, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(12, 74, 110) // sky-900
  doc.text('Your file is automatically deleted 10 minutes after upload.', pageWidth / 2, 244, { align: 'center' })

  // Branding
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(3, 105, 161)
  doc.text('QuickPrint', pageWidth / 2, 262, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text('Fast · Private · No app required', pageWidth / 2, 269, { align: 'center' })

  // Bottom accent bar — #0369a1
  doc.setFillColor(3, 105, 161)
  doc.rect(0, 289, pageWidth, 8, 'F')

  doc.save(`${shopName}-QuickPrint-QR.pdf`)
}

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="max-w-xs w-full rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 20px 60px rgba(3,105,161,0.12)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Your QR code</h2>
            <p className="text-xs text-gray-400 mt-0.5">Customers scan this to upload</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 transition-colors text-xl"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <X width={18}/>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* QR image */}
          <div
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.8)', border: '0.5px solid rgba(0,0,0,0.08)' }}
          >
            {qrUrl && <img src={qrUrl} alt="Shop QR Code" className="w-44 h-44" />}
          </div>

          {/* Shop name + URL */}
          <div className="text-center w-full">
            <p className="text-sm font-semibold text-gray-800">{shopName}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-[11px] text-gray-400 font-mono break-all">{uploadUrl}</p>
              <button
                onClick={async () => {
                  try {
                    if (navigator.clipboard && window.isSecureContext) {
                      await navigator.clipboard.writeText(uploadUrl)
                    } else {
                      const textarea = document.createElement('textarea')
                      textarea.value = uploadUrl
                      textarea.style.position = 'fixed'
                      textarea.style.opacity = '0'
                      document.body.appendChild(textarea)
                      textarea.focus()
                      textarea.select()
                      document.execCommand('copy')
                      document.body.removeChild(textarea)
                    }
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch (err) {
                    console.error('Copy failed:', err)
                  }
                }}
                className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer"
                style={{
                  color: copied ? '#059669' : '#0369a1',
                  background: copied ? 'rgba(5,150,105,0.08)' : 'rgba(3,105,161,0.08)',
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Privacy note */}
          <div
            className="w-full rounded-xl p-3 text-center text-xs"
            style={{ background: 'rgba(3,105,161,0.06)', color: '#0369a1' }}
          >
            Files auto-delete after 10 minutes
          </div>

          {/* Download */}
          <button
            onClick={downloadQRAsPDF}
            className="w-full text-white text-sm py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            style={{ background: '#0369a1' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#025d8c')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0369a1')}
          >
            <Download width={18} /> Download as PDF
          </button>
        </div>
      </div>
    </div>
  )
}