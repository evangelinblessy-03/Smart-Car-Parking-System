/**
 * Smart Car Parking System - Backend API Service
 * Connects React frontend directly to the Node.js / Express backend (Port 5000)
 */

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If accessing the backend server directly on port 5000, use relative /api
    if (window.location.port === '5000') {
      return '/api';
    }
    // If running on Vite dev server (port 8080), use relative /api which Vite proxies
    if (window.location.port === '8080') {
      return '/api';
    }
    // For other ports (e.g. preview, static file server), direct connect to port 5000 with CORS
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // Resilient fallback: If relative /api failed, retry directly against http://localhost:5000/api
    if (
      API_BASE_URL === '/api' &&
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
      try {
        const directUrl = `http://localhost:5000/api${endpoint}`;
        const directResponse = await fetch(directUrl, config);
        if (directResponse.ok) {
          return await directResponse.json();
        }
      } catch {
        // Fallback also failed, re-throw original
      }
    }
    console.warn(`[Backend API Warning] ${endpoint}:`, error.message);
    throw error;
  }
}

export const apiService = {
  // Health
  checkHealth: () => request('/health'),

  // Slots
  getSlots: () => request('/slots'),
  getSlotById: (id) => request(`/slots/${id}`),
  updateSlot: (id, status, vehicle = null) =>
    request(`/slots/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, vehicle }),
    }),

  // Bookings
  getBookings: (query = {}) => {
    const params = new URLSearchParams(query).toString();
    return request(`/bookings${params ? `?${params}` : ''}`);
  },
  createBooking: (bookingData) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  cancelBooking: (id) =>
    request(`/bookings/${id}/cancel`, {
      method: 'POST',
    }),

  // Activities
  getActivities: () => request('/activities'),

  // Authentication
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  getCurrentUser: () => request('/auth/me'),

  // Simulations
  runGwoSimulation: (config = {}) =>
    request('/gwo/simulate', {
      method: 'POST',
      body: JSON.stringify(config),
    }),
  runIfogsimSimulation: () =>
    request('/simulation/ifogsim', {
      method: 'POST',
    }),

  // Reset
  resetData: () =>
    request('/reset', {
      method: 'POST',
    }),
};

export default apiService;
