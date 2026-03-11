import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWebPageContent } from '../erp_services/erp'

function TermsAndConditions() {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getWebPageContent('terms-and-conditions').then((res) => {
      if (!mounted) return
      if (res?.success && res.data) setPage(res.data)
      else setPage(null)
      setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      <header className="text-center py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white rounded-2xl sm:rounded-3xl border border-slate-100 -mx-1 px-4 sm:-mx-2 sm:px-6 md:-mx-6 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">Terms and Conditions</h1>
        <p className="text-slate-500 text-sm">
          {loading
            ? 'Loading…'
            : page?.modified
              ? `Last updated: ${new Date(page.modified).toLocaleDateString('en-AU')}`
              : `Last updated: ${new Date().toLocaleDateString('en-AU')}`}
        </p>
      </header>

      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-glass p-5 sm:p-6 md:p-8">
        {loading ? (
          <div className="space-y-3">
            <div className="h-5 w-48 bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-11/12 bg-slate-100 rounded animate-pulse" />
            <div className="h-3 w-10/12 bg-slate-100 rounded animate-pulse" />
          </div>
        ) : page?.content ? (
          <div className="prose max-w-none prose-slate text-sm sm:text-base [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-disc [&_ol]:ml-5 [&_li]:marker:text-primary-500">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ) : (
          <div className="space-y-2 text-slate-600 text-sm">
            <p>Terms and Conditions page content is not available.</p>
            <p>
              Please ensure a published Web Page exists with route{' '}
              <span className="font-medium text-slate-800">terms-and-conditions</span>.
            </p>
          </div>
        )}
      </div>

      <p className="text-sm text-slate-600">
        Your use is also governed by our{' '}
        <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

export default TermsAndConditions
