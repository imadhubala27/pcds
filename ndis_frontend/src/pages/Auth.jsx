import { Link } from 'react-router-dom'

function Auth({ mode }) {
  const isLogin = mode === 'login'

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            {isLogin ? 'Welcome back to Perfection Care' : 'Create your Perfection Care account'}
          </h1>
          <p className="text-slate-600">
            {isLogin
              ? 'Sign in to manage disability services, track supports, and stay connected.'
              : 'Sign up to access the Perfection Care portal and coordinate disability services in one place.'}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass-lg p-6 md:p-8">
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
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                Sign in
              </button>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">Confirm password</label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
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
