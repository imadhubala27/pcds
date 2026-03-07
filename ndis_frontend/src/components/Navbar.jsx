import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import pcdsLogo from '../assets/img/pcds.jpeg'

const CURRENT_USER_STORAGE_KEY = 'pcds_current_user'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/settings', label: 'Settings' },
  { to: '/signup', label: 'Register' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userMenuOpen) return
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  useEffect(() => {
    const readCurrentUser = () => {
      try {
        const saved = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
        if (saved) {
          setCurrentUser(JSON.parse(saved))
        } else {
          setCurrentUser(null)
        }
      } catch (error) {
        console.error('Failed to read current user', error)
        setCurrentUser(null)
      }
    }

    readCurrentUser()

    const handleAuthChange = () => {
      readCurrentUser()
    }

    window.addEventListener('pcds-auth-changed', handleAuthChange)

    return () => {
      window.removeEventListener('pcds-auth-changed', handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
      window.dispatchEvent(new Event('pcds-auth-changed'))
    } catch (error) {
      console.error('Failed to remove current user', error)
    }
    setUserMenuOpen(false)
    navigate('/login')
  }

  const visibleLinks = currentUser
    ? navLinks.filter((link) => link.to !== '/signup' && link.to !== '/settings')
    : navLinks.filter((link) => link.to !== '/settings')

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.5rem]">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group min-w-0"
        >
          <img
            src={pcdsLogo}
            alt="Perfection Care Disability Services logo"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-cover shadow-lg shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary-500/30 flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-slate-800 tracking-tight truncate text-sm sm:text-base">Perfection Care</span>
            <span className="text-xs text-slate-500 hidden sm:block">Disability Services</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary-200 transition-colors touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <nav
            className={`absolute md:static top-full left-0 right-0 md:flex md:items-center md:gap-1 bg-white md:bg-transparent border-b md:border-0 border-slate-200 shadow-lg md:shadow-none ${menuOpen ? 'flex flex-col p-4 gap-0' : 'hidden'}`}
          >
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3.5 min-h-[44px] flex items-center md:min-h-0 md:py-2 md:px-3 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 md:bg-primary-50/80'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50 md:hover:bg-primary-50/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {currentUser && (
              <div className="md:hidden border-t border-slate-200 mt-2 pt-3 space-y-1">
                <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</p>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); navigate('/settings') }}
                  className="w-full text-left px-4 py-3.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 touch-manipulation"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => { handleLogout() }}
                  className="w-full text-left px-4 py-3.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 touch-manipulation"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {currentUser && (
            <div ref={dropdownRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="h-9 w-9 rounded-full bg-primary-600 text-white text-sm font-semibold flex items-center justify-center shadow-md shadow-primary-500/30"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                {currentUser.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : (currentUser.email || '?').charAt(0).toUpperCase()}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Logged in as</p>
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {currentUser.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false)
                      navigate('/settings')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
