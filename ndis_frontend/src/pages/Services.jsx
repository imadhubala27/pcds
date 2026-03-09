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
    <div className="space-y-12">
      <header className="text-center py-6 sm:py-8 md:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">Our services</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          A comprehensive portfolio of services tailored to providers, coordinators, and organisations.
        </p>
      </header>

      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    </div>
  )
}

export default Services
