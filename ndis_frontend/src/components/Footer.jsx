import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pcdsLogo from '../assets/img/pcds.jpeg'
import { getWebsiteSettings, getErpFileUrl } from '../erp_services/erp'

function Footer() {
  const [websiteSettings, setWebsiteSettings] = useState(null)

  useEffect(() => {
    getWebsiteSettings().then(setWebsiteSettings)
  }, [])

  const footerLogoUrl = websiteSettings?.footer_logo ? getErpFileUrl(websiteSettings.footer_logo) : pcdsLogo
  const address = websiteSettings?.address ?? ''
  const phoneNo = websiteSettings?.phone_no ?? ''
  const email = websiteSettings?.email ?? ''

  const rawCompanyDescription = (websiteSettings?.company_description || '').toString().trim()
  const plainCompanyDescription = rawCompanyDescription
    ? rawCompanyDescription.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : ''
  const companyDescription =
    plainCompanyDescription ||
    'Trusted disability support partner for end-to-end care. We help you deliver better experiences for the people you support.'

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        <div className="grid items-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          <div className="lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={footerLogoUrl}
                alt="Perfection Care Disability Services logo"
                className="h-9 w-9 rounded-xl object-cover flex-shrink-0 ring-2 ring-slate-800/80"
                onError={(e) => { e.target.onerror = null; e.target.src = pcdsLogo }}
              />
              <span className="font-semibold text-white text-sm sm:text-base">
                Perfection Care Disability Services
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-300/90">
              {companyDescription}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-[0.22em] text-slate-200">
              Quick links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-300/90 hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-[0.22em] text-slate-200">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-300/90 hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-sm text-slate-300/90 hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-sm text-slate-300/90 hover:text-primary-300 transition-colors py-1.5 block touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:py-0"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-[0.22em] text-slate-200">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              {address ? address.split('\n').map((line, i) => <li key={i}>{line.trim()}</li>) : (
                <>
                  <li>Level 12, 200 Market St</li>
                  <li>Melbourne VIC 3000</li>
                </>
              )}
              {phoneNo && <li>Phone: <span className="text-slate-100">{phoneNo}</span></li>}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-primary-300 transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {!phoneNo && !email && (
                <li>
                  <a href="mailto:hello@perfectioncare.co" className="hover:text-primary-300 transition-colors">
                    hello@perfectioncare.co
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
          <span className="max-w-xs sm:max-w-none">© {new Date().getFullYear()} Perfection Care Disability Services. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors py-2 sm:py-0 touch-manipulation min-h-[44px] flex items-center justify-center sm:min-h-0">Privacy policy</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors py-2 sm:py-0 touch-manipulation min-h-[44px] flex items-center justify-center sm:min-h-0">Terms and Conditions</Link>
            {/* <Link to="/testimonials" className="hover:text-slate-400 transition-colors py-2 sm:py-0 touch-manipulation min-h-[44px] flex items-center justify-center sm:min-h-0">Testimonials</Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
