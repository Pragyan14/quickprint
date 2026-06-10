import Link from 'next/link'
import { Logo } from '../ui/Logo'

export function Navbar() {
  return (
    <header
      className="glass fixed top-0 left-0 right-0 z-50 h-16"
      style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-lg font-semibold text-[#0c4a6e]">QuickPrint</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#0369a1] text-white px-4 py-2 rounded-xl hover:bg-[#025d8c] transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}