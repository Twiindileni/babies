'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (!data.user) {
        throw new Error('Login succeeded but no user was returned.')
      }

      // Prefer role from app_metadata for manually created Supabase users.
      const roleFromMetadata = data.user.app_metadata?.role as string | undefined

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle()

      if (userError) {
        console.error('Error fetching user role:', userError)
      }

      const role = userData?.role || roleFromMetadata || 'parent'

      toast.success('Login successful!')

      const target = role === 'admin' ? '/admin/dashboard' : '/parent/dashboard'
      // Refresh server-side session/cookies, then navigate so middleware sees the session.
      router.refresh()
      // Full navigation avoids rare race where client chunk + cookie write lag causes a redirect loop.
      window.location.assign(target)
    } catch (error: any) {
      const isEmailConfirmError =
        typeof error?.message === 'string' &&
        error.message.toLowerCase().includes('email not confirmed')

      toast.error(isEmailConfirmError ? 'Please verify your email before logging in.' : (error.message || 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4">Parent Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link href="/signup">Don&apos;t have an account? Sign up</Link>
                  <br />
                  <Link href="/reset-password">Forgot password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
