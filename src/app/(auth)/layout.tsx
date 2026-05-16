export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-gray-900 font-semibold text-lg">
            <span className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold">Q</span>
            QuickPrint
          </span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {children}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          Files are deleted automatically. Your privacy is protected.
        </p>
      </div>
    </div>
  )
}