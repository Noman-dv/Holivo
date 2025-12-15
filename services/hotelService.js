// Placeholder service for hotel API integration
// Replace mock data imports with actual API calls when backend is ready

import hotelsData from '../mock/hotels.json'

/**
 * Fetch hotels based on search criteria
 * @param {Object} searchParams - Search parameters (location, checkIn, checkOut, guests, etc.)
 * @returns {Promise<Array>} Array of hotel options
 */
export const searchHotels = async (searchParams) => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/hotels', { method: 'POST', body: JSON.stringify(searchParams) })
  // return await response.json()
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Filter mock data based on search params (basic implementation)
  let results = hotelsData.hotels
  
  if (searchParams.city) {
    results = results.filter(hotel => 
      hotel.location.city.toLowerCase().includes(searchParams.city.toLowerCase())
    )
  }
  
  return results
}

/**
 * Get hotel details by ID
 * @param {string} hotelId - Hotel identifier
 * @returns {Promise<Object>} Hotel details
 */
export const getHotelById = async (hotelId) => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch(`/api/hotels/${hotelId}`)
  // return await response.json()
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return hotelsData.hotels.find(hotel => hotel.id === hotelId) || null
}

