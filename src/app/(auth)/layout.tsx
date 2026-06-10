import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm relative z-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo size={34} />
            <span className="text-lg font-semibold text-[#0c4a6e]">QuickPrint</span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px rgba(3,105,161,0.08)',
          }}
        >
          {children}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Files are deleted automatically. Your privacy is protected.
        </p>
      </div>
    </div>
  )
}