/**
 * API helper utilities for ERP integration.
 * Use erp_services/erp.js for actual API calls; this file is for shared helpers.
 */

/**
 * Normalize API error from ERP response or Axios error.
 * @param {Error|{ response?: { data?: { message?: string }, status?: number } }} error
 * @returns {string} User-friendly error message
 */
export function getApiErrorMessage(error) {
  if (!error) return 'An unexpected error occurred'
  if (typeof error === 'string') return error
  if (error.message) return error.message
  const data = error.response?.data
  if (data?.message) return typeof data.message === 'string' ? data.message : data.message
  if (error.response?.status) return `Request failed with status ${error.response.status}`
  return 'Network or server error'
}

/**
 * Check if the error indicates an auth failure (401 / session expired).
 * @param {Error|{ response?: { status?: number } }} error
 * @returns {boolean}
 */
export function isAuthError(error) {
  return error?.response?.status === 401
}

export default { getApiErrorMessage, isAuthError }
