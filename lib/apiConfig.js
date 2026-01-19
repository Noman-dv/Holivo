/**
 * API Configuration
 * Centralized API endpoints configuration
 * 
 * To switch from mock data to real APIs:
 * 1. Set USE_MOCK_DATA to false
 */

// Toggle between mock data and real API
export const USE_MOCK_DATA = false

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// ===========================================
// Amadeus API Configuration (Flights)
// ===========================================
export const AMADEUS_CONFIG = {
  BASE_URL: 'https://test.api.amadeus.com',
  API_KEY: process.env.NEXT_PUBLIC_AMADEUS_API_KEY || 'htejwCgN3umLEPPLhmBzxbtVU6rVbujd',
  API_SECRET: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET || 'GojbIGtwXxhHMxq7',
}

// ===========================================
// RapidAPI Hotels Configuration (Booking.com)
// ===========================================
export const HOTELS_CONFIG = {
  BASE_URL: 'https://booking-com18.p.rapidapi.com',
  API_KEY: process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '05a9259da3msh1e557e362e58a65p1c364djsn4326af4280b8',
  API_HOST: 'booking-com18.p.rapidapi.com',
}

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
