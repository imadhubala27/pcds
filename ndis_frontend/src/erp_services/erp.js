/**
 * ERPNext + React integration – ERP service layer
 *
 * HOW REACT CONNECTS TO ERPNEXT
 * ------------------------------
 * 1. Base URL is set in .env (VITE_ERP_BASE_URL). All requests go to that site.
 * 2. Frappe/ERPNext exposes whitelisted methods at /api/method/<module.path.function>.
 * 3. This module uses axios with withCredentials: true so the browser sends cookies
 *    (sid) on every request. Login is done via /api/method/login; the server sets
 *    the session cookie and we reuse it for authenticated calls.
 * 4. Add new APIs by:
 *    - Defining a whitelisted function in ndis_erp/ndis_erp/ndis_erp/api.py (module path: ndis_erp.ndis_erp.api)
 *    - Calling it from here via callERPMethod('ndis_erp.ndis_erp.api.your_method', data)
 *    - Or adding a dedicated helper (e.g. getParticipants()) that wraps callERPMethod.
 *
 * HOW TO ADD NEW APIs
 * -------------------
 * - For a one-off call: use callERPMethod(method, data, { method: 'GET' or 'POST' }).
 * - For a reusable API: add a function in this file that calls callERPMethod with the
 *   correct method path and returns the parsed response (see test_connection example).
 *
 * USAGE
 * -----
 * import { login, callERPMethod, test_connection } from '@/erp_services/erp'
 */

import axios from 'axios'
import { erpConfig } from '../config/erpConfig'
import { getApiErrorMessage } from '../utils/apiHelper'

// ---------------------------------------------------------------------------
// Axios instance – single place for base URL, credentials, and interceptors
// ---------------------------------------------------------------------------

const erpClient = axios.create({
  baseURL: erpConfig.baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
})

// Optional: send sid from localStorage for environments where cookie isn’t sent cross-origin
const sid = () => typeof localStorage !== 'undefined' ? localStorage.getItem('sid') : null

erpClient.interceptors.request.use(
  (config) => {
    const s = sid()
    if (s) {
      config.headers['X-Frappe-SID'] = s
      config.headers.Cookie = config.headers.Cookie ? `${config.headers.Cookie}; sid=${s}` : `sid=${s}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

erpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getApiErrorMessage(error)
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP API]', error.config?.url || error.config, message)
    }
    return Promise.reject(error)
  }
)

// ---------------------------------------------------------------------------
// Reusable API call helper – calls any whitelisted Frappe method
// ---------------------------------------------------------------------------

/**
 * Call a whitelisted ERP/Frappe method.
 * @param {string} method - Full method path (e.g. 'ndis_erp.ndis_erp.api.test_connection')
 * @param {object} [data] - Payload for POST; for GET, sent as query params
 * @param {{ method?: 'GET'|'POST' }} [options] - HTTP method; default POST
 * @returns {Promise<{ message?: any }>} Frappe response (usually response.message holds the result)
 */
export async function callERPMethod(method, data = {}, options = {}) {
  const httpMethod = (options.method || 'POST').toUpperCase()
  const url = `${erpConfig.apiPrefix}/${method}`

  const config = {
    method: httpMethod,
    url,
    withCredentials: true,
  }
  if (httpMethod === 'GET' && Object.keys(data).length) {
    config.params = data
  } else if (httpMethod === 'POST') {
    config.data = data
  }

  const response = await erpClient.request(config)
  return response.data
}

// ---------------------------------------------------------------------------
// Authentication – ERPNext session login / logout / user
// ---------------------------------------------------------------------------

/**
 * Log in via Frappe /api/method/login. Uses withCredentials so the server
 * sets the session cookie (sid). Stores sid and user in localStorage for the app.
 * @param {{ usr: string, pwd: string }} credentials - usr (email) and pwd
 * @returns {Promise<{ success?: boolean, message?: string, full_name?: string }>}
 */
export async function login(credentials) {
  const url = `${erpConfig.baseURL}${erpConfig.loginPath}`
  const payload = {
    usr: credentials.usr || credentials.email,
    pwd: credentials.pwd || credentials.password,
  }
  const { data } = await erpClient.post(url, payload)
  const cookieMatch = typeof document !== 'undefined' && document.cookie
    ? document.cookie.split('; ').find((c) => c.startsWith('sid='))
    : null
  const sidValue = cookieMatch ? cookieMatch.split('=')[1] : null
  if (typeof localStorage !== 'undefined') {
    if (sidValue) localStorage.setItem('sid', sidValue)
    localStorage.setItem('isLoggedIn', 'true')
    const usr = credentials.usr || credentials.email
    const user = { email: usr, name: data?.full_name || usr }
    localStorage.setItem('user', JSON.stringify(user))
  }
  return data
}

/**
 * Log out: clear local session state. Optionally call a logout endpoint on ERP
 * if you add one. For now, clearing sid and user is sufficient for the frontend.
 */
export function logout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('sid')
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
  }
}

/**
 * Get current user from localStorage (set by your app after login).
 * For full ERP user details, implement an API that returns frappe.session.user
 * and call it here, or use callERPMethod('frappe.auth.get_logged_user').
 * @returns {object | null} Stored user object or null
 */
export function getUser() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Check if the user is considered logged in (sid or user in localStorage).
 * For stricter checks, call an ERP method that validates the session.
 * @returns {boolean}
 */
export function isLoggedIn() {
  return (
    (typeof localStorage !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') ||
    (typeof localStorage !== 'undefined' && !!localStorage.getItem('sid'))
  )
}

// ---------------------------------------------------------------------------
// Test & health – placeholder APIs
// ---------------------------------------------------------------------------

/**
 * Test connection to the ERP API (calls ndis_erp test_connection).
 * Use this to verify base URL and CORS before implementing real APIs.
 * @returns {Promise<boolean>} true if the API responded successfully
 */
export async function test_connection() {
  try {
    const data = await callERPMethod('ndis_erp.ndis_erp.api.test_connection', {}, { method: 'POST' })
    return data?.message?.status === 'success' || !!data?.message
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] test_connection failed', getApiErrorMessage(err))
    }
    return false
  }
}

// ---------------------------------------------------------------------------
// Website settings (logos, address, company contact)
// ---------------------------------------------------------------------------

/**
 * Resolve an ERP file path to a full URL (for images served from the ERP site).
 * @param {string} path - Path from ERP (e.g. /files/logo.png or empty)
 * @returns {string} Full URL or empty string
 */
export function getErpFileUrl(path) {
  if (!path || typeof path !== 'string') return ''
  const trimmed = path.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  const base = erpConfig.baseURL.replace(/\/$/, '')
  return trimmed.startsWith('/') ? `${base}${trimmed}` : `${base}/${trimmed}`
}

/**
 * Fetch website settings from ERP: app_logo, footer_logo, address, phone_no, email.
 * Used by Navbar (app_logo) and Footer (footer_logo, address, phone_no, email).
 * @returns {Promise<{ success: boolean, app_logo: string, footer_logo: string, address: string, phone_no: string, email: string }>}
 */
export async function getWebsiteSettings() {
  const fallback = {
    success: false,
    app_logo: '',
    footer_logo: '',
    address: '',
    phone_no: '',
    email: '',
  }
  try {
    const data = await callERPMethod('ndis_erp.ndis_erp.api.get_website_settings', {}, { method: 'GET' })
    const msg = data?.message
    if (!msg || msg.success !== true) return fallback
    return {
      success: true,
      app_logo: msg.app_logo || '',
      footer_logo: msg.footer_logo || '',
      address: msg.address || '',
      phone_no: msg.phone_no || '',
      email: msg.email || '',
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getWebsiteSettings failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

// ---------------------------------------------------------------------------
// Signup, Forgot password, Reset password (ERP APIs)
// ---------------------------------------------------------------------------

/**
 * Sign up: create Lead + User in ERP. Required: full_name, email, password. Optional: phone.
 * @param {{ full_name: string, email: string, password: string, phone?: string }} data
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function signup(data) {
  const payload = {
    full_name: data.full_name || data.name,
    email: (data.email || '').trim().toLowerCase(),
    password: data.password || '',
    phone: data.phone || '',
  }
  const res = await callERPMethod('ndis_erp.ndis_erp.api.signup', payload, { method: 'POST' })
  const msg = res?.message
  if (msg?.success) return { success: true, message: msg.message }
  return { success: false, error: msg?.error || 'Signup failed' }
}

/**
 * Request password reset email. Calls ERP forgot_password.
 * @param {string} email
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function forgotPassword(email) {
  const res = await callERPMethod('ndis_erp.ndis_erp.api.forgot_password', { email: (email || '').trim().toLowerCase() }, { method: 'POST' })
  const msg = res?.message
  if (msg?.success !== false && msg?.error) return { success: false, error: msg.error }
  return { success: true, message: msg?.message || 'If this email is registered, you will receive a reset link shortly.' }
}

/**
 * Reset password with key from email link. Calls ERP reset_password.
 * @param {{ key: string, new_password: string }} data
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function resetPassword(data) {
  const res = await callERPMethod('ndis_erp.ndis_erp.api.reset_password', {
    key: data.key,
    new_password: data.new_password,
  }, { method: 'POST' })
  const msg = res?.message
  if (msg?.success) return { success: true, message: msg.message }
  return { success: false, error: msg?.error || 'Reset failed' }
}

// ---------------------------------------------------------------------------
// Export axios instance for advanced use (same baseURL, withCredentials, interceptors)
// ---------------------------------------------------------------------------

export { erpClient }
export { erpConfig } from '../config/erpConfig'
