import Link from 'next/link'
import { Lock, Clock, Layers, Users } from 'lucide-react'

const steps = [
  {
    number: '01',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
      </svg>
    ),
    title: 'Get your QR code',
    desc: 'Sign up once. Get a unique QR for your shop. Stick it at the counter — customers scan it to send files instantly.',
  },
  {
    number: '02',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: 'Customer scans & uploads',
    desc: 'No app install, no account needed. Scan, pick a file, choose print options — color, sides, copies — and tap send.',
  },
  {
    number: '03',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
    title: 'Print it',
    desc: 'The file lands on your dashboard instantly with all print settings attached. No back-and-forth, no confusion.',
  },
]

const pills = [
  { icon: Clock, label: 'Auto-deleted in 10 min', color: 'text-emerald-600' },
  { icon: Layers, label: 'PDF, DOCX, JPG, PPT', color: 'text-violet-600' },
  { icon: Users, label: 'Free for shop owners', color: 'text-amber-600' },
]

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-24 pb-16 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 bg-sky-50/80 border border-sky-200/60 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse inline-block" />
            No app · No login · Files auto-delete in 10 min
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] text-[#0c172a] mb-5">
            Send files to your print shop,<br />
            <span className="text-[#0369a1]">instantly.</span>
          </h1>

          <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto">
            Scan a QR at the counter, upload your file, set print options. Done in seconds — no app install, no saving contacts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-[#0369a1] text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-[#025d8c] transition-colors"
            >
              Register your shop — it's free →
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto text-sm font-medium text-gray-600 px-6 py-3 rounded-xl hover:text-gray-900 transition-colors"
              style={{ background: 'rgba(255,255,255,0.55)', border: '0.5px solid rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }}
            >
              Sign in to dashboard
            </Link>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pills.map(({ icon: Icon, label, color }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.45)', border: '0.5px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}
              >
                <Icon size={14} strokeWidth={1.75} className={color} />
                {label}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="pb-24">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
          <p className="text-xs font-semibold text-gray-400 tracking-widest text-center uppercase mb-10">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map(({ number, iconBg, iconColor, icon, title, desc }) => (
              <div
                key={number}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-100/40"
                style={{
                  background: 'rgba(255,255,255,0.38)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    {icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-300">{number}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section id="privacy" className="pb-24">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
          <div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.42)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.65)',
            }}
          >
            {/* Corner decorations — matching the mockup */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full"
              style={{ background: 'rgba(3,105,161,0.07)' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full"
              style={{ background: 'rgba(3,105,161,0.05)' }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-5">
                <Lock size={22} strokeWidth={1.75} className="text-sky-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Privacy by design</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                Every file is permanently deleted 10 minutes after upload. No document stored longer than needed. No data sold. No ads. Ever.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}