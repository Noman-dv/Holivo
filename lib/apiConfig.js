/**
 * API Configuration
 * Centralized API endpoints configuration
 * 
 * To switch from mock data to real APIs:
 * 1. Set USE_MOCK_DATA to false
 * 2. Update the API_BASE_URL to your backend URL
 * 3. Update individual endpoint URLs if needed
 */

// Toggle between mock data and real API
export const USE_MOCK_DATA = true

// Base URL for your backend API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.holivo.com'

// API Endpoints
export const API_ENDPOINTS = {
  FLIGHTS: {
    SEARCH: '/api/flights/search',
    GET_BY_ID: (id) => `/api/flights/${id}`,
  },
  HOTELS: {
    SEARCH: '/api/hotels/search',
    GET_BY_ID: (id) => `/api/hotels/${id}`,
  },
  CARS: {
    SEARCH: '/api/cars/search',
    GET_BY_ID: (id) => `/api/cars/${id}`,
  },
  AI_HOLIDAY: {
    GENERATE: '/api/ai-holiday/generate',
  },
}

/**
 * Helper function to build full API URL
 */
export const getApiUrl = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint // Already a full URL
  }
  return `${API_BASE_URL}${endpoint}`
}

