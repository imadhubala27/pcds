/**
 * ERP / Frappe backend configuration.
 * Values are read from Vite env (VITE_*). See .env, .env.development, .env.production.
 */

const BASE_URL = (import.meta.env.VITE_ERP_BASE_URL || 'http://127.0.0.1:8007').replace(/\/$/, '')
const API_PREFIX = (import.meta.env.VITE_API_PREFIX || '/api/method').replace(/\/$/, '')

export const erpConfig = {
  /** Base URL of the ERPNext/Frappe site (e.g. http://127.0.0.1:8007) */
  baseURL: BASE_URL,
  /** API path prefix for method calls (e.g. /api/method) */
  apiPrefix: API_PREFIX,
  /** Full API base URL: baseURL + apiPrefix (e.g. http://127.0.0.1:8007/api/method) */
  apiBaseURL: `${BASE_URL}${API_PREFIX}`,
  /** Frappe login endpoint path (relative to baseURL) */
  loginPath: '/api/method/login',
}

export default erpConfig
