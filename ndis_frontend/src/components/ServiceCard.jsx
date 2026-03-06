function ServiceCard({ icon, title, description }) {
  return (
    <article className="group relative rounded-2xl bg-white p-6 md:p-7 border border-slate-200/80 shadow-glass hover:shadow-glass-lg hover:border-primary-200/80 hover:-translate-y-1 transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-2xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </article>
  )
}

export default ServiceCard
