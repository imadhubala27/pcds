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
  // Make Axios play nicely with Frappe's CSRF protection
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-Frappe-CSRF-Token',
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
    // Also forward CSRF token if Frappe exposes it on window (e.g. in desk/website templates)
    if (typeof window !== 'undefined' && window.csrf_token) {
      config.headers['X-Frappe-CSRF-Token'] = window.csrf_token
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
    company_description: '',
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
      company_description: msg.company_description || '',
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getWebsiteSettings failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

/**
 * Fetch home page builder data (Page Building Blocks) by route.
 * Same as krishna_royal_club get_home_page_builder?route=home.
 * @param {string} [route='home']
 * @returns {Promise<{ success: boolean, data: Array<{ web_template: string, values: object, background_image: string, add_background_image: number }>, count: number }>}
 */
export async function getHomePageBuilder(route = 'home') {
  try {
    const res = await callERPMethod('ndis_erp.ndis_erp.api.get_home_page_builder', { route }, { method: 'GET' })
    const msg = res?.message
    if (msg?.success && Array.isArray(msg.data)) {
      return { success: true, data: msg.data, count: msg.count ?? msg.data.length }
    }
    return { success: true, data: [], count: 0 }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getHomePageBuilder failed', getApiErrorMessage(err))
    }
    return { success: true, data: [], count: 0 }
  }
}

/**
 * Map one page builder block (Hero) to hero slide shape for the frontend.
 * @param {{ values: object, background_image?: string }} block
 * @returns {{ welcome_text: string, title: string, description: string, primary_button_text: string, primary_button_link: string, secondary_button_text: string, secondary_button_link: string, image: string, align: string }}
 */
function blockToHeroSlide(block) {
  const v = block?.values || {}
  return {
    welcome_text: v.welcome_text || v['Welcome Text'] || '',
    title: v.title || v.Title || '',
    description: (v.description || v.subtitle || v.Subtitle || '').trim(),
    primary_button_text: v.primary_action_label || v['Primary Action Label'] || v.primary_button_text || '',
    primary_button_link: v.primary_action_url || v['Primary Action URL'] || v.primary_button_link || '',
    secondary_button_text: v.secondary_action_label || v['Secondary Action Label'] || v.secondary_button_text || '',
    secondary_button_link: v.secondary_action_url || v['Secondary Action URL'] || v.secondary_button_link || '',
    image: block.background_image || v.image || '',
    align: v.align || v.Align || 'Left',
  }
}

/**
 * Fetch home page hero content (left text, right image). Multiple Hero blocks = slider.
 * Uses get_home_page_builder(route=home) and maps Hero blocks to slides; fallback get_home_hero.
 * @returns {Promise<{ success: boolean, slides: Array }>}
 */
export async function getHomeHero() {
  const defaultSlides = [
    {
      welcome_text: 'Welcome to Perfection Care',
      title: 'Elevating care through reliable services',
      description: 'We connect people with tailored disability support services, ensuring consistent quality, clear communication, and measurable outcomes.',
      primary_button_text: 'View Services',
      primary_button_link: '/services',
      secondary_button_text: 'Talk to Our Team',
      secondary_button_link: '/contact',
      image: '',
      align: 'Left',
    },
  ]
  try {
    const builder = await getHomePageBuilder('home')
    if (builder?.data?.length) {
      const slides = builder.data
        .filter((b) => (b.web_template || '').toLowerCase().includes('hero'))
        .map((b) => blockToHeroSlide(b))
        .filter((s) => s.title)
      if (slides.length) return { success: true, slides }
    }
    const data = await callERPMethod('ndis_erp.ndis_erp.api.get_home_hero', {}, { method: 'GET' })
    const msg = data?.message
    if (msg?.success && Array.isArray(msg.slides) && msg.slides.length > 0) {
      return { success: true, slides: msg.slides }
    }
    return { success: true, slides: defaultSlides }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getHomeHero failed', getApiErrorMessage(err))
    }
    return { success: true, slides: defaultSlides }
  }
}

// ---------------------------------------------------------------------------
// Services – list & detail (Services DocType)
// ---------------------------------------------------------------------------

/**
 * Fetch all Services records for the website.
 * Fields: name, title, subtitle, image, description.
 * @returns {Promise<{ success: boolean, data: Array }>}
 */
export async function getServices() {
  const fallback = { success: false, data: [] }
  try {
    const res = await callERPMethod('ndis_erp.ndis_erp.api.get_services', {}, { method: 'GET' })
    const msg = res?.message
    if (msg?.success && Array.isArray(msg.data)) {
      return { success: true, data: msg.data }
    }
    return fallback
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getServices failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

/**
 * Fetch one Service by name (docname / title).
 * @param {string} name - Docname of the Service (usually same as Title).
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function getService(name) {
  const fallback = { success: false, data: null, error: 'Service not found' }
  if (!name) return fallback
  try {
    const res = await callERPMethod(
      'ndis_erp.ndis_erp.api.get_service',
      { name },
      { method: 'GET' }
    )
    const msg = res?.message
    if (msg?.success && msg.data) {
      return { success: true, data: msg.data }
    }
    return { success: false, data: null, error: msg?.error || 'Service not found' }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getService failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

// ---------------------------------------------------------------------------
// Testimonials – list (Testimonials DocType)
// ---------------------------------------------------------------------------

/**
 * Fetch all Testimonials records for the website.
 * Fields: name1, role, image, detail, rating.
 * @returns {Promise<{ success: boolean, data: Array, error?: string }>}
 */
export async function getTestimonials() {
  const fallback = { success: false, data: [], error: 'Failed to load testimonials' }
  try {
    const res = await callERPMethod('ndis_erp.ndis_erp.api.get_testimonials', {}, { method: 'GET' })
    const msg = res?.message
    if (msg?.success && Array.isArray(msg.data)) {
      return { success: true, data: msg.data }
    }
    return { success: false, data: [], error: msg?.error || fallback.error }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getTestimonials failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

// ---------------------------------------------------------------------------
// About Us – single doctype (title, subtitle, description, cards, leadership)
// ---------------------------------------------------------------------------

/**
 * Fetch About Us content from ERP (single doctype).
 * Fields: title, subtitle, description, image; aboutus_section (title, details); leadership_title, leadership_subtitle; aboutus_leadership (image, name1, designation, team_detail).
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function getAboutUs() {
  const fallback = { success: false, data: null, error: 'Failed to load about us' }
  try {
    const res = await callERPMethod('ndis_erp.ndis_erp.api.get_about_us', {}, { method: 'GET' })
    const msg = res?.message
    if (msg?.success && msg.data) {
      return { success: true, data: msg.data }
    }
    return { success: false, data: null, error: msg?.error || fallback.error }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getAboutUs failed', getApiErrorMessage(err))
    }
    return fallback
  }
}

// ---------------------------------------------------------------------------
// Web Page – content (Terms / Privacy)
// ---------------------------------------------------------------------------

/**
 * Fetch a published Web Page's rich text content by route.
 * @param {string} route
 * @returns {Promise<{ success: boolean, data?: { title: string, route: string, content: string, modified?: string }, error?: string }>}
 */
export async function getWebPageContent(route) {
  const fallback = { success: false, data: null, error: 'Page not found' }
  if (!route) return fallback
  try {
    const res = await callERPMethod('ndis_erp.ndis_erp.api.get_web_page_content', { route }, { method: 'GET' })
    const msg = res?.message
    if (msg?.success && msg.data) return { success: true, data: msg.data }
    return { success: false, data: null, error: msg?.error || fallback.error }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ERP] getWebPageContent failed', getApiErrorMessage(err))
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

/**
 * Submit Contact Us enquiry: creates a Lead in ERP.
 * @param {{ first_name: string, middle_name?: string, last_name: string, full_name?: string, email: string, mobile: string, country: string, message: string }} data
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function submitContactEnquiry(data) {
  const payload = {
    first_name: (data.first_name || '').trim(),
    middle_name: (data.middle_name || '').trim(),
    last_name: (data.last_name || '').trim(),
    full_name: (data.full_name || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    mobile: (data.mobile || '').trim(),
    country: (data.country || '').trim(),
    message: (data.message || '').trim(),
  }
  const res = await callERPMethod(
    'ndis_erp.ndis_erp.api.submit_contact_enquiry',
    payload,
    { method: 'POST' }
  )
  const msg = res?.message
  if (msg?.success) return { success: true, message: msg.message }
  return { success: false, error: msg?.error || 'Something went wrong. Please try again.' }
}

// ---------------------------------------------------------------------------
// Export axios instance for advanced use (same baseURL, withCredentials, interceptors)
// ---------------------------------------------------------------------------

export { erpClient }
export { erpConfig } from '../config/erpConfig'
