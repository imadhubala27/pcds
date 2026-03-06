function Contact() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">Contact us</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Share a few details and we&apos;ll connect you with the right member of our team.
        </p>
      </header>

      <section>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your organisation and what you need help with."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-y"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Submit enquiry
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Our details</h2>
              <ul className="space-y-2 text-slate-600">
                <li>Level 12, 200 Market Street</li>
                <li>Melbourne VIC 3000, Australia</li>
                <li>Phone: +61 3 9000 1234</li>
                <li>
                  <a href="mailto:hello@perfectioncare.co" className="text-primary-600 hover:text-primary-700 font-medium">
                    hello@perfectioncare.co
                  </a>
                </li>
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
