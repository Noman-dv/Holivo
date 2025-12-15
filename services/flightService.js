// Flight API service
// Switch between mock data and real API by changing USE_MOCK_DATA in lib/apiConfig.js

import flightsData from '../mock/flights.json'
import { USE_MOCK_DATA, getApiUrl, API_ENDPOINTS } from '../lib/apiConfig'

/**
 * Fetch flights based on search criteria
 * @param {Object} searchParams - Search parameters (origin, destination, date, etc.)
 * @returns {Promise<Array>} Array of flight options
 */
export const searchFlights = async (searchParams = {}) => {
  try {
    // Use mock data if enabled, otherwise call real API
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return mock data
      let results = flightsData.flights
      
      // Basic filtering on mock data
      if (searchParams.origin) {
        results = results.filter(flight => 
          flight.departure.airport.toLowerCase().includes(searchParams.origin.toLowerCase()) ||
          flight.departure.city.toLowerCase().includes(searchParams.origin.toLowerCase())
        )
      }
      
      if (searchParams.destination) {
        results = results.filter(flight => 
          flight.arrival.airport.toLowerCase().includes(searchParams.destination.toLowerCase()) ||
          flight.arrival.city.toLowerCase().includes(searchParams.destination.toLowerCase())
        )
      }
      
      return results
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.FLIGHTS.SEARCH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch flights: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data.flights || data // Handle different response formats
    }
  } catch (error) {
    console.error('Error searching flights:', error)
    throw error
  }
}

/**
 * Get flight details by ID
 * @param {string} flightId - Flight identifier
 * @returns {Promise<Object>} Flight details
 */
export const getFlightById = async (flightId) => {
  try {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const flight = flightsData.flights.find(flight => flight.id === flightId)
      if (!flight) {
        throw new Error(`Flight with ID ${flightId} not found`)
      }
      return flight
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.FLIGHTS.GET_BY_ID(flightId)), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Flight not found: ${response.statusText}`)
      }
      
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching flight:', error)
    throw error
  }
}

