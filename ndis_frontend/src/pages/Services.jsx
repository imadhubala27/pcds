import ServiceCard from '../components/ServiceCard'
import { services } from '../services/services'

function Services() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">Our services</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          A comprehensive portfolio of services tailored to providers, coordinators, and organisations.
        </p>
      </header>

      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Services
