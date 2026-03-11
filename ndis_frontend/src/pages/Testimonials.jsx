import { useEffect, useMemo, useState } from 'react'
import { getTestimonials, getErpFileUrl } from '../erp_services/erp'

function StarRow({ rating = 0 }) {
  const raw = Number(rating) || 0
  // ERP Rating field is often stored as 0–1 internally (e.g. 0.6 = 3 stars, 0.8 = 4 stars).
  // If value <= 1, treat it as a fraction of 5 and scale up.
  const scaled = raw <= 1 && raw > 0 ? raw * 5 : raw
  const safe = Math.max(0, Math.min(5, scaled)) // 0–5, supports decimals like 1.5, 2.5, etc.
  const fullStars = Math.floor(safe)
  const fraction = safe - fullStars
  const hasHalf = fraction >= 0.5 // if backend sends 1.5, 2.5, etc. we show a half star
  const label = `${safe.toFixed(1)} out of 5`

  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${label}`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const isFull = idx < fullStars
        const isHalf = !isFull && idx === fullStars && hasHalf
        return (
          <div key={idx} className="relative h-4 w-4">
            {/* empty star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-slate-200"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {/* full star overlay */}
            {isFull && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute inset-0 h-4 w-4 text-primary-500"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
            {/* half star overlay */}
            {isHalf && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-primary-500"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Testimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getTestimonials().then((res) => {
      if (!mounted) return
      if (res?.success && Array.isArray(res.data)) {
        setItems(res.data)
      } else {
        setItems([])
      }
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  const hasItems = items.length > 0
  const subTitle = useMemo(() => {
    if (loading) return 'Loading testimonials…'
    if (!hasItems) return 'No testimonials available right now.'
    return 'What participants and families say about Perfection Care Disability Services.'
  }, [loading, hasItems])

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 overflow-hidden">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 px-2">Testimonials</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          {subTitle}
        </p>
      </header>

      <section className="max-w-5xl mx-auto">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-glass"
              >
                <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-4/6 bg-slate-100 rounded animate-pulse" />
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
                    <div className="mt-2 h-3 w-20 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !hasItems ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center text-slate-600">
            No testimonials found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const imageUrl = item.image ? getErpFileUrl(item.image) : ''
              return (
                <article
                  key={item.name || item.name1 || item.role || item.detail?.slice?.(0, 24)}
                  className="group rounded-2xl bg-white p-6 border border-slate-200/80 shadow-glass hover:shadow-glass-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-3xl font-serif leading-none text-primary-500/60">&ldquo;</p>
                    <StarRow rating={item.rating} />
                  </div>

                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {item.detail}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-50 border border-primary-100 overflow-hidden flex items-center justify-center text-primary-700 font-semibold">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name1 || 'Testimonial'}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        (item.name1 || '?').charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate">
                        {item.name1 || 'Anonymous'}
                      </p>
                      <p className="text-xs text-primary-600 truncate">
                        {item.role || '—'}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Testimonials
