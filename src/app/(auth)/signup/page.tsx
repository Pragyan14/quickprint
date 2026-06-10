'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

function parseSignupError(message: string): string {
  if (message.includes('already registered'))
    return 'An account with this email already exists. Try logging in.'
  if (message.includes('password'))
    return 'Password must be at least 6 characters.'
  if (message.includes('rate limit') || message.includes('too many'))
    return 'Too many signups from this device. Please try again later.'
  return 'Could not create your account. Please try again.'
}

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [shopName, setShopName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ shopName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors = { shopName: '', email: '', password: '' }
    if (!shopName.trim()) errors.shopName = 'Shop name is required.'
    if (!email) errors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email address.'
    if (!password) errors.password = 'Password is required.'
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters.'
    setFieldErrors(errors)
    return !errors.shopName && !errors.email && !errors.password
  }

  async function handleSignup() {
    if (!validate()) return
    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError || !data.user) {
      setError(parseSignupError(signUpError?.message || ''))
      setLoading(false)
      return
    }

    const { error: shopError } = await supabase.from('shops').insert({
      owner_id: data.user.id,
      name: shopName.trim(),
    })

    if (shopError) {
      setError('Account created but shop setup failed. Please contact support.')
      setLoading(false)
      return
    }

    // Show verify email message instead of redirecting
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto"
          style={{ background: 'rgba(5,150,105,0.12)' }}
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 10 8 14 16 6" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Check your email</h2>
        <p className="text-sm text-gray-500">
          We sent a verification link to{' '}
          <span className="font-medium text-gray-700">{email}</span>.
          Click it to activate your account.
        </p>
        <p className="text-xs text-gray-400 pt-2">
          Already verified?{' '}
          <Link href="/login" className="text-[#0369a1] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Set up your shop</h1>
      <p className="text-sm text-gray-500 mb-6">Create your QuickPrint account</p>

      {error && <div className="mb-4"><Alert type="error" message={error} /></div>}

      <div className="space-y-4">
        <Input
          label="Shop Name"
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="e.g. Sharma Xerox Center"
          error={fieldErrors.shopName}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={fieldErrors.email}
          autoComplete="email"
        />
        <Input
          label="Password"
          hint="Min 6 characters"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={fieldErrors.password}
          autoComplete="new-password"
        />
        <Button loading={loading} onClick={handleSignup}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-[#0369a1] hover:text-[#025d8c] font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}