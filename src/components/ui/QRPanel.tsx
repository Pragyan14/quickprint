'use client'

import { useEffect, useRef } from 'react'

type QRPanelProps = {
  qrUrl: string
  shopId: string
  shopName: string
  onClose: () => void
}

export default function QRPanel({ qrUrl, shopId, shopName, onClose }: QRPanelProps) {
  const uploadUrl = `${window.location.origin}/upload/${shopId}`

  async function downloadQRAsPDF() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const pageWidth = doc.internal.pageSize.getWidth()

    // Background
    doc.setFillColor(248, 249, 252)
    doc.rect(0, 0, pageWidth, 297, 'F')

    // Top accent bar
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 0, pageWidth, 8, 'F')

    // Shop name
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.setTextColor(15, 23, 42)
    doc.text(shopName, pageWidth / 2, 36, { align: 'center' })

    // Subtitle
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(100, 116, 139)
    doc.text('Scan to send your document for printing', pageWidth / 2, 46, { align: 'center' })

    // QR code box background
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(pageWidth / 2 - 55, 56, 110, 110, 5, 5, 'F')
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.5)
    doc.roundedRect(pageWidth / 2 - 55, 56, 110, 110, 5, 5, 'S')

    // QR code image
    doc.addImage(qrUrl, 'PNG', pageWidth / 2 - 48, 62, 96, 96)

    // Divider
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(20, 178, pageWidth - 20, 178)

    // How it works
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(37, 99, 235)
    doc.text('HOW IT WORKS', pageWidth / 2, 188, { align: 'center' })

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

    // Privacy note box
    doc.setFillColor(239, 246, 255)
    doc.roundedRect(20, 228, pageWidth - 40, 20, 3, 3, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(37, 99, 235)
    doc.text('Privacy First', pageWidth / 2, 237, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    doc.text('Your file is automatically deleted 10 minutes after upload.', pageWidth / 2, 243, { align: 'center' })

    // Footer
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(37, 99, 235)
    doc.text('QuickPrint', pageWidth / 2, 262, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text('Fast · Private · No app required', pageWidth / 2, 268, { align: 'center' })

    // Bottom bar
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 289, pageWidth, 8, 'F')

    doc.save(`${shopName}-QuickPrint-QR.pdf`)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Your QR Code</h2>
            <p className="text-xs text-gray-400 mt-0.5">Customers scan this to upload</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition text-xl"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            {qrUrl && <img src={qrUrl} alt="Shop QR Code" className="w-44 h-44" />}
          </div>

          <div className="text-center w-full">
            <p className="text-sm font-semibold text-gray-800">{shopName}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-[11px] text-gray-400 font-mono break-all">{uploadUrl}</p>
              <button
                onClick={() => navigator.clipboard.writeText(uploadUrl)}
                className="shrink-0 text-[11px] text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md transition font-medium"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="w-full bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600">
              🔒 Files auto-delete after 10 minutes
            </p>
          </div>

          <button
            onClick={downloadQRAsPDF}
            className="w-full bg-blue-600 text-white text-sm py-2.5 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition font-medium flex items-center justify-center gap-2"
          >
            <span>↓</span> Download as PDF
          </button>
        </div>
      </div>
    </div>
  )
}