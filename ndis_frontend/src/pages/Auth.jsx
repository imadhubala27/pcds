import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const USER_STORAGE_KEY = 'pcds_user'
const CURRENT_USER_STORAGE_KEY = 'pcds_current_user'

function Auth({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()

  const [storedUser, setStoredUser] = useState(null)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState('')

  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setStoredUser(parsed)
        if (parsed?.email) {
          setLoginEmail(parsed.email)
        }
      }
    } catch (error) {
      console.error('Failed to read user from localStorage', error)
    }
  }, [])

  useEffect(() => {
    try {
      const current = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
      if (current) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.error('Failed to read current user from localStorage', error)
    }
  }, [navigate])

  useEffect(() => {
    if (!storedUser) return

    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storedUser))
    } catch (error) {
      console.error('Failed to save user to localStorage', error)
    }
  }, [storedUser])

  useEffect(() => {
    setLoginError('')
    setSignupError('')
    setSignupSuccess('')
  }, [isLogin])

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    setLoginError('')

    if (!loginEmail || !loginPassword) {
      setLoginError('Email and Password are required.')
      return
    }

    if (!storedUser) {
      setLoginError('No account found. Please sign up first.')
      return
    }

    const normalizedEmail = loginEmail.trim().toLowerCase()

    if (
      normalizedEmail === storedUser.email?.trim().toLowerCase() &&
      loginPassword === storedUser.password
    ) {
      try {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(storedUser))
        window.dispatchEvent(new Event('pcds-auth-changed'))
      } catch (error) {
        console.error('Failed to save current user to localStorage', error)
      }
      navigate('/')
    } else {
      setLoginError('Invalid Email or Password')
    }
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault()

    setSignupError('')
    setSignupSuccess('')

    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      setSignupError('All fields are required.')
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match.')
      return
    }

    const newUser = {
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
    }

    setStoredUser(newUser)
    setSignupSuccess('Account created successfully. Redirecting to sign in...')

    setSignupName('')
    setSignupPassword('')
    setSignupConfirmPassword('')

    navigate('/login')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 sm:py-12 px-2 sm:px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            {isLogin ? 'Welcome back to Perfection Care' : 'Create your Perfection Care account'}
          </h1>
          <p className="text-slate-600">
            {isLogin
              ? 'Sign in to manage disability services, track supports, and stay connected.'
              : 'Sign up to access the Perfection Care portal and coordinate disability services in one place.'}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass-lg p-4 sm:p-6 md:p-8">
          <div className="flex p-1 rounded-xl bg-slate-100 mb-6">
            <Link
              to="/login"
              className={`flex-1 py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`flex-1 py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Create account
            </Link>
          </div>

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-700"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-3.414M9.88 9.88 7.05 7.05M14.12 14.12 16.95 16.95M6.228 6.228C4.28 7.31 2.88 8.992 2.25 10c1.5 2.4 4.8 6 9.75 6 1.545 0 2.94-.3 4.184-.822M17.772 13.772C19.72 12.69 21.12 11.008 21.75 10 20.25 7.6 16.95 4 12 4c-.936 0-1.83.1-2.672.292"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 10.5C3.9 7.5 7.2 5 12 5s8.1 2.5 9.75 5.5c-1.65 3-4.95 5.5-9.75 5.5S3.9 13.5 2.25 10.5z"
                        />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-sm text-red-600">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 touch-manipulation"
              >
                Sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  value={signupName}
                  onChange={(event) => setSignupName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    value={signupPassword}
                    onChange={(event) => setSignupPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-700"
                    aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSignupPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-3.414M9.88 9.88 7.05 7.05M14.12 14.12 16.95 16.95M6.228 6.228C4.28 7.31 2.88 8.992 2.25 10c1.5 2.4 4.8 6 9.75 6 1.545 0 2.94-.3 4.184-.822M17.772 13.772C19.72 12.69 21.12 11.008 21.75 10 20.25 7.6 16.95 4 12 4c-.936 0-1.83.1-2.672.292"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 10.5C3.9 7.5 7.2 5 12 5s8.1 2.5 9.75 5.5c-1.65 3-4.95 5.5-9.75 5.5S3.9 13.5 2.25 10.5z"
                        />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showSignupConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    value={signupConfirmPassword}
                    onChange={(event) => setSignupConfirmPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-700"
                    aria-label={showSignupConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSignupConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-3.414M9.88 9.88 7.05 7.05M14.12 14.12 16.95 16.95M6.228 6.228C4.28 7.31 2.88 8.992 2.25 10c1.5 2.4 4.8 6 9.75 6 1.545 0 2.94-.3 4.184-.822M17.772 13.772C19.72 12.69 21.12 11.008 21.75 10 20.25 7.6 16.95 4 12 4c-.936 0-1.83.1-2.672.292"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 10.5C3.9 7.5 7.2 5 12 5s8.1 2.5 9.75 5.5c-1.65 3-4.95 5.5-9.75 5.5S3.9 13.5 2.25 10.5z"
                        />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {signupError && (
                <p className="text-sm text-red-600">
                  {signupError}
                </p>
              )}

              {signupSuccess && (
                <p className="text-sm text-emerald-600">
                  {signupSuccess}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 touch-manipulation"
              >
                Create account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
