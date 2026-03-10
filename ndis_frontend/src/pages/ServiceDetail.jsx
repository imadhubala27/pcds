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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <span className="inline-flex h-8 w-8 animate-spin items-center justify-center rounded-full border-2 border-primary-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading service details…</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="space-y-4 text-center max-w-md">
          <p className="text-lg text-slate-800 font-semibold">Service not found</p>
          <p className="text-slate-500 text-sm">{error}</p>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 hover:bg-primary-500 hover:shadow-primary-500/35 transition-all"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-white/80" />
            Back to services
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = service.image ? getErpFileUrl(service.image) : ''

  return (
    <div className="space-y-8 lg:space-y-10">
      <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500">
        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-primary-600 transition-colors">Services</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium truncate max-w-[12rem] sm:max-w-xs">
          {service.title}
        </span>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white px-5 py-7 sm:px-7 sm:py-9 md:px-9 md:py-10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-primary-700/35 blur-3xl" />
        </div>
        <div className="relative max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.17em]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary-300/95 text-[10px] text-primary-900">
              ●
            </span>
            {service.service_name ? `Service ${service.service_name}` : 'Service detail'}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {service.title}
          </h1>
          {service.service_name && (
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary-100/85">
              Service code: {service.service_name}
            </p>
          )}
          {service.subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-slate-100/85 max-w-xl">
              {service.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        <div className="space-y-6">
          {service.description && (
            <section className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 md:p-7 shadow-sm">
              <h2 className="mb-3 text-base sm:text-lg font-semibold text-slate-800">
                What this service includes
              </h2>
              <div className="prose max-w-none prose-slate text-sm sm:text-base [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-disc [&_ol]:ml-5 [&_li]:marker:text-primary-500">
                <div dangerouslySetInnerHTML={{ __html: service.description }} />
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-dashed border-primary-200/80 bg-primary-50/60 px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-900">
                Need help deciding if this service is right for you?
              </p>
              <p className="text-xs sm:text-sm text-primary-900/80">
                Our team can walk you through options based on your goals, funding and supports.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary-500/25 hover:bg-primary-500 hover:shadow-primary-500/35 transition-all mt-1 sm:mt-0"
            >
              Talk to our team
            </Link>
          </section>
        </div>

        <aside className="space-y-5">
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-md shadow-slate-900/5">
              <img
                src={imageUrl}
                alt={service.title || ''}
                className="h-56 w-full object-cover sm:h-64 md:h-72"
              />
            </div>
          )}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Quick actions
            </h3>
            <div className="space-y-2.5">
              <Link
                to="/services"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 hover:border-primary-200 hover:bg-primary-50/60 hover:text-primary-800 transition-all"
              >
                <span>Back to all services</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs">
                  ←
                </span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary-500/30 hover:shadow-primary-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Enquire about this service</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-base">
                  →
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default ServiceDetail

