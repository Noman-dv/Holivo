// Hotel API service
// Switch between mock data and real API by changing USE_MOCK_DATA in lib/apiConfig.js

import hotelsData from '../mock/hotels.json'
import { USE_MOCK_DATA, getApiUrl, API_ENDPOINTS } from '../lib/apiConfig'

/**
 * Fetch hotels based on search criteria
 * @param {Object} searchParams - Search parameters (location, checkIn, checkOut, guests, etc.)
 * @returns {Promise<Array>} Array of hotel options
 */
export const searchHotels = async (searchParams = {}) => {
  try {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Filter mock data based on search params
      let results = hotelsData.hotels
      
      if (searchParams.city) {
        results = results.filter(hotel => 
          hotel.location.city.toLowerCase().includes(searchParams.city.toLowerCase())
        )
      }
      
      if (searchParams.minPrice || searchParams.maxPrice) {
        results = results.filter(hotel => 
          (!searchParams.minPrice || hotel.pricePerNight >= searchParams.minPrice) &&
          (!searchParams.maxPrice || hotel.pricePerNight <= searchParams.maxPrice)
        )
      }
      
      return results
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.HOTELS.SEARCH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch hotels: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data.hotels || data
    }
  } catch (error) {
    console.error('Error searching hotels:', error)
    throw error
  }
}

/**
 * Get hotel details by ID
 * @param {string} hotelId - Hotel identifier
 * @returns {Promise<Object>} Hotel details
 */
export const getHotelById = async (hotelId) => {
  try {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const hotel = hotelsData.hotels.find(hotel => hotel.id === hotelId)
      if (!hotel) {
        throw new Error(`Hotel with ID ${hotelId} not found`)
      }
      return hotel
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.HOTELS.GET_BY_ID(hotelId)), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Hotel not found: ${response.statusText}`)
      }
      
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching hotel:', error)
    throw error
  }
}

