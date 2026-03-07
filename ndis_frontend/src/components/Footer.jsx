import { Link } from 'react-router-dom'
import pcdsLogo from '../assets/img/pcds.jpeg'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          <div className="lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={pcdsLogo}
                alt="Perfection Care Disability Services logo"
                className="h-9 w-9 rounded-lg object-cover flex-shrink-0"
              />
              <span className="font-semibold text-white text-sm sm:text-base">Perfection Care Disability Services</span>
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
                  <Link to={to} className="text-sm hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-0">
              <li><Link to="/contact" className="text-sm hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0">Contact us</Link></li>
              <li><Link to="/settings" className="text-sm hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0">Settings</Link></li>
              <li><Link to="/signup" className="text-sm hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0">Register</Link></li>
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
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span className="max-w-xs sm:max-w-none">© {new Date().getFullYear()} Perfection Care Disability Services. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-slate-400 transition-colors py-2 sm:py-0 touch-manipulation min-h-[44px] flex items-center justify-center sm:min-h-0">Privacy</span>
            <span className="cursor-pointer hover:text-slate-400 transition-colors py-2 sm:py-0 touch-manipulation min-h-[44px] flex items-center justify-center sm:min-h-0">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
