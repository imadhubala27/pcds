const team = [
  { initials: 'AR', name: 'Amelia Rhodes', role: 'Chief Executive Officer', bio: '15+ years leading services across community and corporate sectors, focused on quality and growth.' },
  { initials: 'JT', name: 'James Taylor', role: 'Head of Service Delivery', bio: 'Specialist in operational excellence, workforce planning, and service compliance.' },
  { initials: 'LK', name: 'Lina Kim', role: 'Director of Technology', bio: 'Builds secure, scalable platforms that keep clients and providers connected in real time.' },
]

function About() {
  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 overflow-hidden">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 px-2">About Perfection Care Disability Services</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          We exist to make high-quality services easier to deliver, easier to access, and easier to trust.
        </p>
      </header>

      <section>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Perfection Care Disability Services was founded by practitioners, coordinators, and technologists who saw first-hand how complex disability service delivery could become. We champion simple, reliable processes backed by empathetic people and robust systems.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-glass hover:shadow-glass-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Mission</h2>
              <p className="text-slate-600 text-sm">
                To empower organisations to deliver safe, consistent, and person-centred services at scale.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-glass hover:shadow-glass-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Vision</h2>
              <p className="text-slate-600 text-sm">
                A world where every person receives the support they need, without friction or uncertainty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 px-4 sm:px-6 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Our leadership team</h2>
          <p className="text-slate-600">Experienced leaders from care, operations, and technology.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member) => (
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
        </div>
      </section>
    </div>
  )
}

export default About
