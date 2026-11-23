// قرارداد اتصال به بک‌اند FastAPI پروژه.
// در مرحله فعلی UI از داده نمایشی داخل App.jsx استفاده می‌کند.
// وقتی بک‌اند آماده شد، این توابع را به stateهای App متصل می‌کنیم.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) throw new Error(`API ${response.status}: ${path}`)
  return response.json()
}

export const api = {
  health: () => request('/health'),
  overview: () => request('/api/dashboard/overview'),
  vehicles: () => request('/api/vehicles'),
  vehicle: (vehicleId) => request(`/api/vehicles/${encodeURIComponent(vehicleId)}`),
  sessions: (vehicleId) => request(`/api/sessions${vehicleId ? `?vehicle_id=${encodeURIComponent(vehicleId)}` : ''}`),
  session: (sessionId) => request(`/api/sessions/${encodeURIComponent(sessionId)}`),
  samples: (sessionId, limit = 1000) => request(`/api/sessions/${encodeURIComponent(sessionId)}/samples?limit=${limit}`),
  dtcs: (sessionId) => request(`/api/sessions/${encodeURIComponent(sessionId)}/dtcs`),
  supportedPids: (sessionId) => request(`/api/sessions/${encodeURIComponent(sessionId)}/supported-pids`),
}

export { API_BASE_URL }
