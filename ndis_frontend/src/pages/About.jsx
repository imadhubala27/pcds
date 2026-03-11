import { useEffect, useState } from 'react'
import { getAboutUs, getErpFileUrl } from '@/erp_services/erp'

const DEFAULT_TITLE = 'About Perfection Care Disability Services'
const DEFAULT_SUBTITLE = 'We exist to make high-quality services easier to deliver, easier to access, and easier to trust.'
const DEFAULT_DESCRIPTION = 'Perfection Care Disability Services was founded by practitioners, coordinators, and technologists who saw first-hand how complex disability service delivery could become. We champion simple, reliable processes backed by empathetic people and robust systems.'
const DEFAULT_LEADERSHIP_TITLE = 'Our leadership team'
const DEFAULT_LEADERSHIP_SUBTITLE = 'Experienced leaders from care, operations, and technology.'

function About() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cardsIndex, setCardsIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getAboutUs()
      .then((res) => {
        if (cancelled) return
        if (res.success && res.data) {
          setData(res.data)
        } else {
          setError(res.error || 'Failed to load')
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const title = data?.title?.trim() || DEFAULT_TITLE
  const subtitle = data?.subtitle?.trim() || DEFAULT_SUBTITLE
  const description = data?.description?.trim() || DEFAULT_DESCRIPTION
  const aboutTitle = data?.about_title?.trim() || 'How we make care work in the real world'
  const cards = Array.isArray(data?.aboutus_section) ? data.aboutus_section : []
  const leadershipTitle = data?.leadership_title?.trim() || DEFAULT_LEADERSHIP_TITLE
  const leadershipSubtitle = data?.leadership_subtitle?.trim() || DEFAULT_LEADERSHIP_SUBTITLE
  const leadership = Array.isArray(data?.aboutus_leadership) ? data.aboutus_leadership : []
  const showCardsSlider = cards.length > 2
  const maxCardsIndex = Math.max(0, cards.length - 2)
  const safeCardsIndex = Math.min(Math.max(0, cardsIndex), maxCardsIndex)
  const visibleCards = showCardsSlider ? cards.slice(safeCardsIndex, safeCardsIndex + 2) : cards
  const showTeamSlider = leadership.length > 3
  const maxTeamIndex = Math.max(0, leadership.length - 3)
  const safeTeamIndex = Math.min(Math.max(0, teamIndex), maxTeamIndex)
  const visibleTeam = showTeamSlider ? leadership.slice(safeTeamIndex, safeTeamIndex + 3) : leadership

  useEffect(() => {
    if (!showCardsSlider) return
    const id = setInterval(() => {
      setCardsIndex((prev) => {
        if (!cards.length) return prev
        const next = prev + 1
        return next > maxCardsIndex ? 0 : next
      })
    }, 4000)
    return () => clearInterval(id)
  }, [showCardsSlider, cards.length, maxCardsIndex])

  useEffect(() => {
    if (!showTeamSlider) return
    const id = setInterval(() => {
      setTeamIndex((prev) => {
        if (!leadership.length) return prev
        const next = prev + 1
        return next > maxTeamIndex ? 0 : next
      })
    }, 4000)
    return () => clearInterval(id)
  }, [showTeamSlider, leadership.length, maxTeamIndex])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 overflow-hidden">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 px-2">{title}</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </header>

      <section className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-primary-600">
              Mission &amp; values
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {aboutTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative">
            {showCardsSlider && cards.length > 2 && (
              <div className="flex items-center justify-end gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setCardsIndex((v) => Math.max(0, v - 1))}
                  disabled={safeCardsIndex <= 0}
                  className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-sm transition"
                  aria-label="Previous cards"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => setCardsIndex((v) => Math.min(maxCardsIndex, v + 1))}
                  disabled={safeCardsIndex >= maxCardsIndex}
                  className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-sm transition"
                  aria-label="Next cards"
                >
                  ↓
                </button>
              </div>
            )}
            <div className="space-y-4">
              {(cards.length ? visibleCards : [
                { title: 'Mission', details: 'To empower organisations to deliver safe, consistent, and person-centred services at scale.' },
                { title: 'Vision', details: 'A world where every person receives the support they need, without friction or uncertainty.' },
              ]).map((card, idx) => (
                <article
                  key={cards.length ? `${safeCardsIndex}-${idx}` : card.title}
                  className="relative rounded-2xl bg-white px-5 py-4 sm:px-6 sm:py-5 border border-slate-200/80 shadow-glass hover:shadow-glass-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="absolute -left-1 top-4 h-8 w-1 rounded-full bg-primary-500/80" />
                  <h3 className="pl-3 text-base sm:text-lg font-semibold text-slate-900 mb-1.5">
                    {card.title || ' '}
                  </h3>
                  <p className="pl-3 text-slate-600 text-sm whitespace-pre-wrap">
                    {card.details || ''}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 px-4 sm:px-6 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{leadershipTitle}</h2>
          <p className="text-slate-600">{leadershipSubtitle}</p>
          {showTeamSlider && (
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={() => setTeamIndex((v) => Math.max(0, v - 1))}
                disabled={safeTeamIndex <= 0}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                aria-label="Previous team members"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setTeamIndex((v) => Math.min(maxTeamIndex, v + 1))}
                disabled={safeTeamIndex >= maxTeamIndex}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                aria-label="Next team members"
              >
                →
              </button>
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {leadership.length > 0
            ? visibleTeam.map((member, idx) => {
                const imageUrl = member.image ? getErpFileUrl(member.image) : ''
                return (
                  <article
                    key={showTeamSlider ? `${safeTeamIndex}-${idx}` : idx}
                    className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    {imageUrl ? (
                      <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white/20 mb-4">
                        <img src={imageUrl} alt={member.name1 || 'Team member'} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-lg font-bold mb-4">
                        {(member.name1 || '?').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-1">{member.name1 || ' '}</h3>
                    <p className="text-primary-200 text-sm mb-3">{member.designation || ''}</p>
                    <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{member.team_detail || ''}</p>
                  </article>
                )
              })
            : (
              <>
                {[
                  { initials: 'AR', name: 'Amelia Rhodes', role: 'Chief Executive Officer', bio: '15+ years leading services across community and corporate sectors, focused on quality and growth.' },
                  { initials: 'JT', name: 'James Taylor', role: 'Head of Service Delivery', bio: 'Specialist in operational excellence, workforce planning, and service compliance.' },
                  { initials: 'LK', name: 'Lina Kim', role: 'Director of Technology', bio: 'Builds secure, scalable platforms that keep clients and providers connected in real time.' },
                ].map((member) => (
                  <article
                    key={member.name}
                    className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-lg font-bold mb-4">
                      {member.initials}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary-200 text-sm mb-3">{member.role}</p>
                    <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                  </article>
                ))}
              </>
            )}
        </div>
      </section>
    </div>
  )
}

export default About
