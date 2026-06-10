import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/section/Navbar'
import { Footer } from '@/components/section/Footer'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'], // added 800
})

export const metadata: Metadata = {
  title: 'QuickPrint | Send files to your print shop instantly',
  description: 'Scan a QR code, upload your document, done. No app, no login. Files auto-delete in 10 minutes.',
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
      <body className={jakarta.variable}>
        {/* Background blobs */}
        <div className="blob" style={{ width: 500, height: 500, background: '#7dd3fc', top: -120, left: -100 }} aria-hidden="true" />
        <div className="blob" style={{ width: 400, height: 400, background: '#86efac', top: 280, right: -80 }} aria-hidden="true" />
        <div className="blob" style={{ width: 320, height: 320, background: '#f9a8d4', bottom: 220, left: 60 }} aria-hidden="true" />
        <div className="blob" style={{ width: 260, height: 260, background: '#fde68a', bottom: 60, right: 100 }} aria-hidden="true" />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}