const testimonials = [
  {
    quote: 'Perfection Care made the NDIS process straightforward. My support worker is reliable and genuinely cares — I feel in control of my plan.',
    author: 'James M.',
    role: 'NDIS Participant',
    location: 'Melbourne',
  },
  {
    quote: 'As a parent, finding a provider that listens and adapts to our family was life-changing. The team goes above and beyond.',
    author: 'Sarah L.',
    role: 'Family representative',
    location: 'Sydney',
  },
  {
    quote: 'Professional, transparent, and person-centred. I refer my participants here with confidence and always get positive feedback.',
    author: 'David K.',
    role: 'Support Coordinator',
    location: 'Brisbane',
  },
  {
    quote: 'The community access programs helped me build confidence and make new friends. I look forward to my outings every week.',
    author: 'Emma R.',
    role: 'NDIS Participant',
    location: 'Perth',
  },
]

function Testimonials() {
  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 overflow-hidden">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 px-2">Testimonials</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          What participants and families say about Perfection Care Disability Services.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((item) => (
          <article
            key={item.author}
            className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-glass hover:shadow-glass-lg transition-all duration-300"
          >
            <p className="text-3xl font-serif leading-none text-primary-500/60">&ldquo;</p>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.quote}</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="font-semibold text-slate-800">{item.author}</p>
              <p className="text-xs text-primary-600">{item.role}</p>
              <p className="text-xs text-slate-500">{item.location}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Testimonials
