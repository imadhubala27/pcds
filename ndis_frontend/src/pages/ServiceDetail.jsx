import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getService, getErpFileUrl } from '../erp_services/erp'

function ServiceDetail() {
  const { name } = useParams()
  const decodedName = name ? decodeURIComponent(name) : ''
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!decodedName) {
      setError('Service not found')
      setLoading(false)
      return
    }
    let mounted = true
    setLoading(true)
    setError('')
    getService(decodedName).then((res) => {
      if (!mounted) return
      if (res?.success && res.data) {
        setService(res.data)
      } else {
        setError(res?.error || 'Service not found')
      }
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [decodedName])

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-600">
        Loading service…
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-lg text-slate-700 font-semibold">Service not found</p>
        <p className="text-slate-500 text-sm">{error}</p>
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-500 transition-colors"
        >
          Back to services
        </Link>
      </div>
    )
  }

  const imageUrl = service.image ? getErpFileUrl(service.image) : ''

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/services" className="hover:text-primary-600 transition-colors">Services</Link>
        <span className="mx-1">/</span>
        <span className="text-slate-700">{service.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          {service.title}
        </h1>
        {service.subtitle && (
          <p className="text-slate-600 text-lg max-w-2xl">
            {service.subtitle}
          </p>
        )}
      </header>

      {imageUrl && (
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={imageUrl}
            alt={service.title || ''}
            className="w-full max-h-[440px] object-cover"
          />
        </div>
      )}

      {service.description && (
        <section className="prose max-w-none prose-slate [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-disc [&_ol]:ml-6 [&_li]:marker:text-slate-600">
          <div dangerouslySetInnerHTML={{ __html: service.description }} />
        </section>
      )}
    </div>
  )
}

export default ServiceDetail

