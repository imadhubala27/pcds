import { Link } from 'react-router-dom'
import pcdsLogo from '../assets/img/pcds.jpeg'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={pcdsLogo}
                alt="Perfection Care Disability Services logo"
                className="h-9 w-9 rounded-lg object-cover"
              />
              <span className="font-semibold text-white">Perfection Care Disability Services</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Trusted disability support partner for end-to-end care. We help you deliver better experiences for the people you support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-primary-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              <li><Link to="/contact" className="text-sm hover:text-primary-300 transition-colors">Contact us</Link></li>
              <li><Link to="/settings" className="text-sm hover:text-primary-300 transition-colors">Settings</Link></li>
              <li><Link to="/signup" className="text-sm hover:text-primary-300 transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Level 12, 200 Market St</li>
              <li>Melbourne VIC 3000</li>
              <li>Phone: +61 3 9000 1234</li>
              <li>
                <a href="mailto:hello@perfectioncare.co" className="hover:text-primary-300 transition-colors">
                  hello@perfectioncare.co
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Perfection Care Disability Services. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-slate-400 transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-slate-400 transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
