import { Link } from 'react-router-dom'

function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">Terms and Conditions</h1>
        <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString('en-AU')}</p>
      </header>

      <div className="space-y-8 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Acceptance of terms</h2>
          <p className="text-sm leading-relaxed">
            By using Perfection Care Disability Services and this website, you agree to these Terms and Conditions. If you do not agree, you must not use our services or website.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Description of services</h2>
          <p className="text-sm leading-relaxed">
            We provide disability support services in line with the NDIS. Services include daily living support, community access, support coordination, and tailored support plans, subject to your plan and our capacity.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">3. Your obligations</h2>
          <p className="text-sm leading-relaxed">
            You agree to provide accurate information, keep your login details confidential, and notify us of changes to your NDIS plan or contact details. You must not use our services for any unlawful purpose.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">4. Fees and payment</h2>
          <p className="text-sm leading-relaxed">
            Fees are charged in line with the NDIS Price Guide and your service agreement. You are responsible for ensuring your plan has sufficient funds. Invoices and statements are provided as set out in your agreement.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">5. Privacy</h2>
          <p className="text-sm leading-relaxed">
            Your use is also governed by our <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</Link>. We collect, use, and disclose personal information in accordance with that policy and applicable law.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">6. Contact</h2>
          <p className="text-sm leading-relaxed">
            Questions about these terms? Contact us at <a href="mailto:hello@perfectioncare.co" className="text-primary-600 hover:text-primary-700">hello@perfectioncare.co</a> or visit our <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact</Link> page.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions
