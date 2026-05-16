'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

function parseLoginError(message: string): string {
  if (message.includes('Invalid login credentials'))
    return 'Wrong email or password. Please try again.'
  if (message.includes('Email not confirmed'))
    return 'Please verify your email before logging in.'
  if (message.includes('too many requests'))
    return 'Too many attempts. Please wait a moment and try again.'
  return 'Something went wrong. Please try again.'
}

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors = { email: '', password: '' }
    if (!email) errors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email address.'
    if (!password) errors.password = 'Password is required.'
    setFieldErrors(errors)
    return !errors.email && !errors.password
  }

  async function handleLogin() {
    if (!validate()) return
    setLoading(true)
    setError('')

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(parseLoginError(loginError.message))
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-6">Sign in to manage your shop</p>

      {error && <div className="mb-4"><Alert type="error" message={error} /></div>}

      <div className="space-y-4">
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={fieldErrors.password}
          autoComplete="current-password"
        />
        <Button loading={loading} onClick={handleLogin}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        New to QuickPrint?{' '}
        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
          Create a shop
        </Link>
      </p>
    </div>
  )
}