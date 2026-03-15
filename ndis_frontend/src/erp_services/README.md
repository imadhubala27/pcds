# ERP (ERPNext / Frappe) integration

This folder contains the **ERP service layer** that connects the React app to the ndis_erp backend.

## How React connects to ERPNext

1. **Base URL** – Set in `.env` as `VITE_ERP_BASE_URL` (e.g. `http://127.0.0.1:8007`). All API requests use this site.
2. **API path** – Frappe exposes whitelisted methods at `/api/method/<module.path.function>`. The prefix is configured via `VITE_API_PREFIX` (default `/api/method`).
3. **Session** – Login is done via `/api/method/login`. The server sets a session cookie (`sid`). The axios instance uses `withCredentials: true` so the browser sends this cookie on every request. The app can also store `sid` in `localStorage` and send it via `X-Frappe-SID` header for cross-origin setups.
4. **CORS** – The ERP app must allow the frontend origin (e.g. `http://localhost:5173`). In ndis_erp, `hooks.py` sets `allow_cors = "*"` for development.

## Main file: `erp.js`

- **Axios instance** (`erpClient`) – configured with `baseURL`, `withCredentials`, and request/response interceptors.
- **callERPMethod(method, data, options)** – calls any whitelisted Frappe method (e.g. `ndis_erp.ndis_erp.api.test_connection`). Use this for all new API calls until you add dedicated helpers.
- **Auth** – `login()`, `logout()`, `getUser()`, `isLoggedIn()` – prepare for ERPNext session auth; login uses `/api/method/login` and optional `sid` storage.
- **test_connection()** – calls the ERP `test_connection` endpoint to verify connectivity.

## How to add new APIs

1. **In the ERP app** (`ndis_erp/ndis_erp/ndis_erp/api.py`):
   - Add a function decorated with `@frappe.whitelist(allow_guest=True)` or `@frappe.whitelist()` for authenticated-only.
   - Return a dict, e.g. `{"success": True, "data": ...}` or `{"success": False, "error": "..."}`.
   - Use the error-handling template in `api.py` (try/except, rollback, log_error).

2. **In the frontend** (`erp.js` or a feature-specific module):
   - **Option A** – Call `callERPMethod('ndis_erp.ndis_erp.api.your_method', { ... })` and use the returned `message`.
   - **Option B** – Add a named function, e.g. `export async function getParticipants() { return callERPMethod('ndis_erp.ndis_erp.api.get_participants', {}, { method: 'GET' }) }`.

## Environment

- `.env` – default values (committed example).
- `.env.development` – used when running `yarn dev` / `vite`.
- `.env.production` – used when building for production. Set `VITE_ERP_BASE_URL` to your live ERP site (e.g. `https://perfectioncare.au`).

Variables:

- `VITE_ERP_BASE_URL` – ERP site URL (dev: `http://127.0.0.1:8007`, production: `https://perfectioncare.au`).
- `VITE_API_PREFIX` – API path prefix (default `/api/method`).

## Usage example

```js
import { callERPMethod, login, test_connection } from '@/erp_services/erp'

// Check connectivity
const ok = await test_connection()

// Login (ERPNext session + optional sid in localStorage)
await login({ usr: 'user@example.com', pwd: 'secret' })

// Call a custom API
const result = await callERPMethod('ndis_erp.ndis_erp.api.your_method', { id: 1 })
console.log(result.message)
```
