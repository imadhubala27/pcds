import { useEffect, useState } from 'react'
import { getWebsiteSettings, submitContactEnquiry } from '../erp_services/erp'

function Contact() {
  const [websiteSettings, setWebsiteSettings] = useState(null)
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    mobile: '',
    country: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    getWebsiteSettings().then(setWebsiteSettings)
  }, [])

  const address = websiteSettings?.address ?? ''
  const phoneNo = websiteSettings?.phone_no ?? ''
  const email = websiteSettings?.email ?? ''
  const addressLines = address ? address.trim().split('\n').filter(Boolean) : []
  const fullName = [form.first_name, form.middle_name, form.last_name].filter((x) => x && x.trim()).join(' ')

  const updateField = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setFeedback(null)
    try {
      const payload = { ...form, full_name: fullName }
      const res = await submitContactEnquiry(payload)
      if (res?.success) {
        setFeedback({ type: 'success', message: res.message || 'Thank you for your enquiry. We will contact you soon.' })
        setForm({
          first_name: '',
          middle_name: '',
          last_name: '',
          email: '',
          mobile: '',
          country: '',
          message: '',
        })
      } else {
        setFeedback({ type: 'error', message: res?.error || 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      <header className="text-center py-6 sm:py-8 md:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">Contact us</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Share a few details and we&apos;ll connect you with the right member of our team.
        </p>
      </header>

      <section>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    First Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={updateField('first_name')}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="middle_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Middle Name
                  </label>
                  <input
                    id="middle_name"
                    type="text"
                    placeholder="Middle Name (Optional)"
                    value={form.middle_name}
                    onChange={updateField('middle_name')}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Last Name<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={updateField('last_name')}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    readOnly
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your Email<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your email"
                    value={form.email}
                    onChange={updateField('email')}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Mobile Number<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="+91 1234567890"
                    value={form.mobile}
                    onChange={updateField('mobile')}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Country<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={updateField('country')}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  >
                    <option value="">Select Country</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Your Request / Inquiry<span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Type your message"
                  value={form.message}
                  onChange={updateField('message')}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm md:text-base text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-y"
                />
              </div>

              {feedback && (
                <div
                  className={`text-sm ${
                    feedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto min-h-[44px] px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation"
              >
                {submitting ? 'Submitting...' : 'Submit enquiry'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Our details</h2>
              <ul className="space-y-2 text-slate-600">
                {addressLines.length > 0 ? addressLines.map((line, i) => <li key={i}>{line.trim()}</li>) : (
                  <>
                    <li>Level 12, 200 Market Street</li>
                    <li>Melbourne VIC 3000, Australia</li>
                  </>
                )}
                {phoneNo ? <li>Phone: {phoneNo}</li> : <li>Phone: +61 3 9000 1234</li>}
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {email}
                    </a>
                  </li>
                ) : (
                  <li>
                    <a href="mailto:hello@perfectioncare.co" className="text-primary-600 hover:text-primary-700 font-medium">
                      hello@perfectioncare.co
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Map</h2>
              <div className="h-48 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm border border-slate-200/60">
                Map placeholder
              </div>
              <p className="text-slate-500 text-xs mt-3">Integrate Google Maps or your preferred mapping provider here.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
