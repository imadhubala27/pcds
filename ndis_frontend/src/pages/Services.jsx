import { useEffect, useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import { services as fallbackServices } from '../services/services'
import { getServices, getErpFileUrl } from '../erp_services/erp'

function Services() {
  const [items, setItems] = useState(fallbackServices)

  useEffect(() => {
    let mounted = true
    getServices().then((res) => {
      if (!mounted) return
      if (res?.success && Array.isArray(res.data) && res.data.length) {
        setItems(res.data)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-10 sm:space-y-12">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 shadow-xl shadow-primary-500/25">
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-primary-600 text-sm shadow-sm">
              ★
            </span>
            Our services
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Support that moves
            <span className="block text-primary-50">with you, not around you.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-primary-50/90 max-w-xl">
            Explore disability support and coordination services designed to meet people where they are,
            then grow with them—step by step, goal by goal.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:block">
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-40 w-40 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md" />
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
            Choose the support you need
          </h2>
          <p className="hidden sm:block text-sm text-slate-500">
            {items.length} {items.length === 1 ? 'service' : 'services'} available
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((service) => (
            <ServiceCard
              key={service.name || service.id}
              imageUrl={service.image ? getErpFileUrl(service.image) : undefined}
              icon={!service.image ? service.icon : undefined}
              title={service.title}
              subtitle={service.subtitle || service.description}
              description={service.description}
              to={service.name ? `/services/${encodeURIComponent(service.name)}` : undefined}
            />
          ))}
        </div>

        <p className="mt-3 text-xs sm:text-sm text-slate-500">
          Can&apos;t find what you&apos;re looking for?{' '}
          <span className="font-medium text-primary-600">
            Talk to our team about a tailored support plan.
          </span>
        </p>
      </section>
    </div>
  )
}

export default Services
