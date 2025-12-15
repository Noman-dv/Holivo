// Car rental API service
// Switch between mock data and real API by changing USE_MOCK_DATA in lib/apiConfig.js

import carsData from '../mock/cars.json'
import { USE_MOCK_DATA, getApiUrl, API_ENDPOINTS } from '../lib/apiConfig'

/**
 * Fetch car rentals based on search criteria
 * @param {Object} searchParams - Search parameters (location, pickupDate, dropoffDate, etc.)
 * @returns {Promise<Array>} Array of car rental options
 */
export const searchCars = async (searchParams = {}) => {
  try {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Filter mock data based on search params
      let results = carsData.cars
      
      if (searchParams.location) {
        results = results.filter(car => 
          car.location.pickup.toLowerCase().includes(searchParams.location.toLowerCase())
        )
      }
      
      if (searchParams.vehicleType) {
        results = results.filter(car => car.vehicle.type === searchParams.vehicleType)
      }
      
      return results
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.CARS.SEARCH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cars: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data.cars || data
    }
  } catch (error) {
    console.error('Error searching cars:', error)
    throw error
  }
}

/**
 * Get car rental details by ID
 * @param {string} carId - Car rental identifier
 * @returns {Promise<Object>} Car rental details
 */
export const getCarById = async (carId) => {
  try {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const car = carsData.cars.find(car => car.id === carId)
      if (!car) {
        throw new Error(`Car with ID ${carId} not found`)
      }
      return car
    } else {
      // Real API call
      const response = await fetch(getApiUrl(API_ENDPOINTS.CARS.GET_BY_ID(carId)), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Car not found: ${response.statusText}`)
      }
      
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching car:', error)
    throw error
  }
}

