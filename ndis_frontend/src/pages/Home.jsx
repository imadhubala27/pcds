import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { services } from '../services/services'

const featuredServices = services.slice(0, 3)

const whyChooseUs = [
  {
    icon: '💬',
    title: 'Proactive communication',
    description: 'Clear updates, shared roadmaps, and transparent reporting at every stage.',
  },
  {
    icon: '✓',
    title: 'Compliance built-in',
    description: 'Services aligned with industry standards and best-practice governance.',
  },
  {
    icon: '📈',
    title: 'Scalable delivery',
    description: 'From small teams to multi-region operations, we grow with you.',
  },
]

const stats = [
  { value: '12 min', label: 'Average response time' },
  { value: '99.9%', label: 'Service uptime' },
  { value: '93%', label: 'Client retention' },
]

const testimonials = [
  {
    quote: 'ServiceBridge has transformed how we coordinate support. Their team feels like an extension of ours.',
    name: 'Alex Roberts',
    role: 'Director, Horizon Care Group',
  },
  {
    quote: 'Professional, responsive, and deeply committed to outcomes. Our staff and participants notice the difference.',
    name: 'Priya Singh',
    role: 'Operations Lead, Northside Services',
  },
]

function Home() {
  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <p className="text-primary-200 text-sm font-semibold uppercase tracking-[0.2em]">
              Trusted Disability Support Provider
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Elevating care through{' '}
              <span className="text-white drop-shadow-sm">reliable services</span>.
            </h1>
            <p className="text-primary-100 text-lg max-w-xl leading-relaxed">
              We connect people with tailored disability support services, ensuring consistent quality, clear communication, and measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-5 py-3.5 min-h-[44px] rounded-xl font-semibold bg-white text-primary-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation"
              >
                View Services
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3.5 min-h-[44px] rounded-xl font-semibold border-2 border-white/80 text-white hover:bg-white/15 backdrop-blur-sm transition-all duration-200 touch-manipulation"
              >
                Talk to our team
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: '250+', label: 'Active clients' },
                { value: '98%', label: 'Satisfaction score' },
                { value: '10yrs', label: 'Industry experience' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl md:text-3xl font-bold">{value}</p>
                  <p className="text-sm text-primary-200">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 shadow-glass-lg text-white max-w-md ml-auto">
              <h2 className="text-xl font-bold mb-3">Service at the center</h2>
              <p className="text-white/90 text-sm mb-4">
                From onboarding to ongoing delivery, our team partners with you to design services that work in the real world.
              </p>
              <ul className="space-y-2 text-sm">
                {['Dedicated account manager', 'Transparent service reporting', '24/7 support for critical requests'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-primary-300">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services we provide */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Services we provide</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A complete suite of professional services designed for modern organisations and care providers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 border border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Why partners choose us</h2>
              <p className="text-slate-600 text-lg mb-8">
                We combine disciplined delivery with a human, relationship-led approach.
              </p>
              <ul className="space-y-6">
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 text-xl">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold">{value}</p>
                  <p className="text-sm text-primary-200 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">What our clients say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stories from organisations that rely on us to deliver quality services every day.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl bg-white p-6 md:p-8 border border-slate-200/80 shadow-glass hover:shadow-glass-lg hover:border-primary-100 transition-all duration-300"
            >
              <p className="text-slate-700 text-lg leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold text-slate-800">{t.name}</p>
              <p className="text-sm text-slate-500">{t.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white p-6 sm:p-8 md:p-12 lg:p-14 shadow-glow overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ready to modernise your services?</h2>
            <p className="text-primary-100 text-sm sm:text-base">
              Speak with our team to design a service model that fits your organisation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 shrink-0 justify-center md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 min-h-[44px] rounded-xl font-semibold bg-white text-primary-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation"
            >
              Book a conversation
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3.5 min-h-[44px] rounded-xl font-semibold border-2 border-white/80 text-white hover:bg-white/15 transition-all duration-200 touch-manipulation"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
