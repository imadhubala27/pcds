import { Link } from 'react-router-dom'

function ServiceCard({ icon, imageUrl, title, subtitle, description, to }) {
  const content = (
    <article className="group relative rounded-2xl bg-white p-6 md:p-7 border border-slate-200/80 shadow-glass hover:shadow-glass-lg hover:border-primary-200/80 transition-all duration-300 h-full card-lift">
      {imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={imageUrl}
            alt={title || ''}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : icon ? (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-2xl mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {subtitle}
        </p>
      )}
      {!subtitle && description && (
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      )}
    </article>
  )

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    )
  }

  return content
}

export default ServiceCard
