import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import pcdsLogo from '../assets/img/pcds.jpeg'

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

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.5rem]">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <img
            src={pcdsLogo}
            alt="Perfection Care Disability Services logo"
            className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary-500/30"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 tracking-tight">Perfection Care</span>
            <span className="text-xs text-slate-500">Disability Services</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary-200 transition-colors"
          aria-label="Toggle menu"
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
          className={`absolute md:static top-full left-0 right-0 md:flex md:items-center md:gap-1 bg-white md:bg-transparent border-b md:border-0 border-slate-200 shadow-lg md:shadow-none ${menuOpen ? 'flex flex-col p-4 gap-1' : 'hidden'}`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 md:py-2 md:px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 md:bg-primary-50/80'
                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50 md:hover:bg-primary-50/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
