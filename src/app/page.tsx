import Link from 'next/link'
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })

export const revalidate = 3600

export default function HomePage() {
  return (
    <main className={`${playfair.variable} ${dmSans.variable} font-(--font-body) min-h-screen bg-[#fafbff] overflow-x-hidden`}>

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(60px, 40px) scale(1.05); }
          66%       { transform: translate(-30px, 70px) scale(0.97); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-80px, 50px) scale(1.08); }
          70%       { transform: translate(40px, -30px) scale(0.95); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30%       { transform: translate(50px, -60px) scale(1.04); }
          65%       { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .social-icon-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* ── Nav ── */}
      <nav className="w-full py-5 relative z-20">
        <div className="max-w-[78%] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div className="bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200">
              Q
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">QuickPrint</span>
          </div>
          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-800 font-medium transition px-3 py-2">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm bg-linear-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-300 transition shadow-sm shadow-blue-200">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-[78%] mx-auto pt-20 pb-28 text-center relative z-10">
        {/* Animated Grid Background */}
        {/* <div className="hero-grid absolute inset-0 rounded-3xl -z-5" style={{ top: '-100px', height: '600px' }} /> */}

        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 shadow-sm animate-slide-up hover:shadow-md transition-shadow cursor-pointer"
          style={{ animationDelay: '0.1s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          No app · No login · Files auto-delete in 10 min
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s' }}>
          Send files to your<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-500 relative">
            print shop
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M2 9 Q75 2 150 8 Q225 14 298 7" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </span>{' '}
          instantly.
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: '0.3s' }}>
          Scan a QR code at the counter. Upload your file. Done.
          No WhatsApp. No app. No contact saving.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up"
          style={{ animationDelay: '0.4s' }}>
          <Link href="/signup" className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-blue-700 text-white px-9 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-300 transition text-sm shadow-lg shadow-blue-200 transform hover:scale-105">
            Register your shop — it's free →
          </Link>
          <Link href="/login" className="w-full sm:w-auto bg-white/80 backdrop-blur text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-white transition text-sm border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105">
            Sign in to dashboard
          </Link>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 relative z-10">
        <div className="max-w-[78%] mx-auto">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest text-center mb-3 animate-fade-in">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14 animate-slide-up">
            Three steps. Zero friction.
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                icon: '🖨️',
                title: 'Get your QR code',
                desc: 'Sign up once. Get a unique QR for your shop. Stick it at the counter.',
                bg: 'bg-white',
                accent: 'text-blue-600',
                border: 'border-gray-100',
                tag: 'bg-blue-50 text-blue-500',
                delay: '0s',
              },
              {
                step: '02',
                icon: '📱',
                title: 'Customer scans & sends',
                desc: 'No app, no login. Scan, pick a file, set print options, tap send.',
                bg: 'bg-white',
                accent: 'text-violet-600',
                border: 'border-gray-100',
                tag: 'bg-violet-50 text-violet-500',
                delay: '0.1s',
              },
              {
                step: '03',
                icon: '⚡',
                title: 'Print it',
                desc: 'File lands on your dashboard instantly with color, sides, and copies.',
                bg: 'bg-white',
                accent: 'text-emerald-600',
                border: 'border-gray-100',
                tag: 'bg-emerald-50 text-emerald-500',
                delay: '0.2s',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`${item.bg} rounded-2xl border ${item.border} p-7 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-slide-up`}
                style={{ animationDelay: item.delay }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl animate-float">{item.icon}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.tag}`}>
                    Step {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy strip ── */}
      <section className="py-16 relative z-10">
        <div className="max-w-[78%] mx-auto">
          <div className="relative bg-linear-to-br from-blue-600 via-blue-500 to-blue-700 rounded-3xl p-10 md:p-14 text-center text-white overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            {/* Inner orb decoration */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-700 opacity-50 group-hover:opacity-70 transition-opacity" />

            <div className="relative z-10">
              <div className="text-5xl mb-5 animate-float">🔒</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Privacy by design
              </h2>
              <p className="text-blue-100 max-w-lg mx-auto text-sm leading-relaxed">
                Every file is automatically and permanently deleted 10 minutes after upload.
                No document stored longer than needed. No data sold. No ads. Ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="text-center pb-24 px-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-slide-up">
          Ready to set up your shop?
        </h2>
        <p className="text-gray-400 text-sm mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>Free forever for hobby use. No credit card needed.</p>
        <Link href="/signup" className="inline-block bg-linear-to-r from-blue-600 to-blue-700 text-white px-10 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-300 transition text-sm shadow-lg shadow-blue-200 transform hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Create your free shop →
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white/60 backdrop-blur py-12 px-8 relative z-10">
        <div className="max-w-[78%] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-lg w-6 h-6 flex items-center justify-center font-bold text-xs">Q</div>
              <span className="text-sm font-semibold text-gray-700">QuickPrint</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition">Terms & Conditions</Link>
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition">Privacy Policy</Link>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition social-icon-hover"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition social-icon-hover"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554v-11h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 9.433c-1.144 0-2.063-.931-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.134-.925 2.065-2.064 2.065zm1.782 10.019H3.555v-11h3.564v11zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-xs text-gray-400">Made with <span className="text-red-500">❤️</span> by <a href="https://pragyan.dev" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-600 hover:text-blue-600 transition">Pragyan</a></p>
            <p className="text-xs text-gray-400 mt-2">© {new Date().getFullYear()} QuickPrint. Made for India 🇮🇳</p>
          </div>
        </div>
      </footer>

    </main>
  )
}