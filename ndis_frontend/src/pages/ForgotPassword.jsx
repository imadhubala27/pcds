import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../erp_services/erp'
import { getApiErrorMessage } from '../utils/apiHelper'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email?.trim()) return
    setLoading(true)
    try {
      const result = await forgotPassword(email.trim())
      if (result.success !== false) {
        setSubmitted(true)
      } else {
        setError(result.error || 'Something went wrong.')
      }
    } catch (err) {
      setError(getApiErrorMessage(err) || 'Failed to send reset link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 sm:py-12 px-2 sm:px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Forgot password
          </h1>
          <p className="text-slate-600">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass-lg p-4 sm:p-6 md:p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <p className="text-slate-600">
                If an account exists for that email, we&apos;ve sent a reset link. Check your inbox.
              </p>
              <Link
                to="/login"
                className="inline-block text-primary-600 font-medium hover:text-primary-700"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 touch-manipulation disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-sm text-slate-500">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
