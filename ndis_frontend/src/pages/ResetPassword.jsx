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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                <div className="relative">
                  <input
                    id="reset-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-primary-500 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.584 10.587A2 2 0 0113.414 13.42" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.88 5.082A9.716 9.716 0 0112 5c5 0 9 3.5 10 7- .273.995-.78 1.92-1.49 2.73M6.61 6.61C4.43 7.74 2.9 9.54 2 12c.64 1.86 2.01 3.44 3.76 4.57A10.44 10.44 0 0012 19c1.3 0 2.55-.23 3.7-.65" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="reset-confirm" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    id="reset-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-primary-500 focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.584 10.587A2 2 0 0113.414 13.42" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.88 5.082A9.716 9.716 0 0112 5c5 0 9 3.5 10 7- .273.995-.78 1.92-1.49 2.73M6.61 6.61C4.43 7.74 2.9 9.54 2 12c.64 1.86 2.01 3.44 3.76 4.57A10.44 10.44 0 0012 19c1.3 0 2.55-.23 3.7-.65" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
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
