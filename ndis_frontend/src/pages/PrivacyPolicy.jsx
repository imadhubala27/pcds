import { Link } from 'react-router-dom'

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString('en-AU')}</p>
      </header>

      <div className="space-y-8 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            Perfection Care Disability Services is committed to protecting your privacy. This policy explains how we collect, use, disclose, and safeguard your personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Information we collect</h2>
          <p className="text-sm leading-relaxed">
            We may collect name, contact details, NDIS participant number and plan information where relevant, support needs and preferences, feedback, and technical data when you use our website. We collect this from you directly, from authorised nominees or coordinators, and from our systems.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">3. How we use your information</h2>
          <p className="text-sm leading-relaxed">
            We use your information to deliver and manage supports, communicate about services and appointments, process enquiries, comply with legal and NDIS reporting requirements, and improve our services and website.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">4. Disclosure</h2>
          <p className="text-sm leading-relaxed">
            We may disclose your information to the NDIA where required, to support workers and coordinators involved in your supports, to professional advisers and service providers under confidentiality, and to government or regulatory bodies when required. We do not sell your personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">5. Security and your rights</h2>
          <p className="text-sm leading-relaxed">
            We take reasonable steps to protect your information from misuse, loss, and unauthorised access. You may request access to or correction of the information we hold. Contact us at <a href="mailto:hello@perfectioncare.co" className="text-primary-600 hover:text-primary-700">hello@perfectioncare.co</a> or via our <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact</Link> page. You may also lodge a complaint with the OAIC.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
