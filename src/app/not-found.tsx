import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-6 text-center">
      <h1 className="text-8xl font-semibold text-sky-200">404</h1>
      <p className="text-gray-400 text-sm">This page doesn't exist.</p>
      <Link
        href="/"
        className="mt-2 bg-[#0369a1] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-[#025d8c] transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}