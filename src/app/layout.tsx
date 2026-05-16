import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuickPrint — Send files to your print shop instantly',
  description: 'Scan a QR code, upload your document, done. No app, no login, no WhatsApp clutter. Files auto-delete in 10 minutes.',
  keywords: 'print shop, document upload, QR code printing, xerox, quick print India',
  openGraph: {
    title: 'QuickPrint',
    description: 'Send files to your print shop instantly via QR code.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={geist.className}>{children}</body>
    </html>
  )
}