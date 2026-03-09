import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../erp_services/erp'
import { getApiErrorMessage } from '../utils/apiHelper'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const keyFromUrl = searchParams.get('key') || ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [missingKey, setMissingKey] = useState(false)

  useEffect(() => {
    if (!keyFromUrl.trim()) setMissingKey(true)
  }, [keyFromUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!keyFromUrl.trim()) {
      setError('Invalid or missing reset link. Request a new one from Forgot password.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const result = await resetPassword({ key: keyFromUrl, new_password: password })
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Reset failed.')
      }
    } catch (err) {
      setError(getApiErrorMessage(err) || 'Reset failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 sm:py-12 px-2 sm:px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Reset password
          </h1>
          <p className="text-slate-600">
            Enter your new password. Use at least 6 characters.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass-lg p-4 sm:p-6 md:p-8">
          {missingKey ? (
            <div className="text-center space-y-4">
              <p className="text-red-600">Invalid or missing reset link. Please use the link from your email or request a new one.</p>
              <Link to="/forgot-password" className="inline-block text-primary-600 font-medium hover:text-primary-700">Request new link</Link>
            </div>
          ) : success ? (
            <div className="text-center space-y-4">
              <p className="text-slate-600">Your password has been reset.</p>
              <Link
                to="/login"
                className="inline-block min-h-[44px] py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 transition-all"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reset-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  New password
                </label>
                <input
                  id="reset-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="reset-confirm" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm new password
                </label>
                <input
                  id="reset-confirm"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 touch-manipulation disabled:opacity-70"
              >
                {loading ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-sm text-slate-500">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
