// Flight API service using Amadeus API
// Switch between mock data and real API by changing USE_MOCK_DATA in lib/apiConfig.js

import flightsData from '../mock/flights.json'
import { USE_MOCK_DATA, AMADEUS_CONFIG } from '../lib/apiConfig'

// Token cache for Amadeus API
let cachedToken = null
let tokenExpiry = null

/**
 * Get Amadeus access token (with caching)
 * Token is valid for 30 minutes
 */
const getAmadeusToken = async () => {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken
  }

  try {
    const response = await fetch(`${AMADEUS_CONFIG.BASE_URL}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${AMADEUS_CONFIG.API_KEY}&client_secret=${AMADEUS_CONFIG.API_SECRET}`,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Failed to get Amadeus token: ${data.error_description || data.error}`)
    }

    cachedToken = data.access_token
    // Token expires in 30 minutes, refresh 1 minute early
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000

    return cachedToken
  } catch (error) {
    console.error('Error getting Amadeus token:', error)
    throw error
  }
}

/**
 * Transform Amadeus API response to app format
 */
const transformAmadeusFlights = (amadeusData) => {
  if (!amadeusData.data || !Array.isArray(amadeusData.data)) {
    return []
  }

  const carriers = amadeusData.dictionaries?.carriers || {}
  const aircraft = amadeusData.dictionaries?.aircraft || {}

  return amadeusData.data.map((offer, index) => {
    const itinerary = offer.itineraries[0]
    const segments = itinerary.segments
    const firstSegment = segments[0]
    const lastSegment = segments[segments.length - 1]
    const price = offer.price

    return {
      id: offer.id || `flight-${index}`,
      airline: {
        name: carriers[firstSegment.carrierCode] || firstSegment.carrierCode,
        code: firstSegment.carrierCode,
        logo: `https://pics.avs.io/200/80/${firstSegment.carrierCode}.png`,
      },
      flightNumber: `${firstSegment.carrierCode}${firstSegment.number}`,
      departure: {
        airport: firstSegment.departure.iataCode,
        terminal: firstSegment.departure.terminal || '',
        time: firstSegment.departure.at,
        city: amadeusData.dictionaries?.locations?.[firstSegment.departure.iataCode]?.cityCode || firstSegment.departure.iataCode,
      },
      arrival: {
        airport: lastSegment.arrival.iataCode,
        terminal: lastSegment.arrival.terminal || '',
        time: lastSegment.arrival.at,
        city: amadeusData.dictionaries?.locations?.[lastSegment.arrival.iataCode]?.cityCode || lastSegment.arrival.iataCode,
      },
      duration: itinerary.duration.replace('PT', '').toLowerCase(),
      stops: segments.length - 1,
      stopDetails: segments.length > 1 ? segments.slice(0, -1).map(seg => ({
        airport: seg.arrival.iataCode,
        duration: seg.duration,
      })) : [],
      price: {
        amount: parseFloat(price.total),
        currency: price.currency,
        formatted: `${price.currency} ${parseFloat(price.total).toFixed(2)}`,
      },
      cabin: (offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || 'ECONOMY').replace(/_/g, ' '),
      seatsAvailable: offer.numberOfBookableSeats || 0,
      aircraft: aircraft[firstSegment.aircraft?.code] || firstSegment.aircraft?.code || 'Unknown',
      bookingClass: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.class || '',
      raw: offer, // Keep raw data for booking
    }
  })
}

/**
 * Fetch flights based on search criteria
 * @param {Object} searchParams - Search parameters (origin, destination, date, etc.)
 * @returns {Promise<Array>} Array of flight options
 */
export const searchFlights = async (searchParams = {}) => {
  try {
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let results = flightsData.flights
      
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
    }

    // Real Amadeus API call
    const token = await getAmadeusToken()

    // Build query parameters
    const queryParams = new URLSearchParams({
      originLocationCode: searchParams.origin?.toUpperCase() || 'LHR',
      destinationLocationCode: searchParams.destination?.toUpperCase() || 'DXB',
      departureDate: searchParams.departureDate || new Date().toISOString().split('T')[0],
      adults: searchParams.adults || 1,
      max: searchParams.maxResults || 200,
      currencyCode: searchParams.currency || 'USD',
    })

    // Add optional parameters
    if (searchParams.returnDate) {
      queryParams.append('returnDate', searchParams.returnDate)
    }
    if (searchParams.travelClass) {
      const mapClass = (cls) => {
        const c = (cls || '').toLowerCase()
        if (c === 'economy') return 'ECONOMY'
        if (c === 'premium-economy') return 'PREMIUM_ECONOMY'
        if (c === 'business') return 'BUSINESS'
        if (c === 'first') return 'FIRST'
        return (cls || '').toUpperCase()
      }
      queryParams.append('travelClass', mapClass(searchParams.travelClass))
    }
    if (searchParams.nonStop) {
      queryParams.append('nonStop', 'true')
    }
    if (searchParams.children) {
      queryParams.append('children', searchParams.children)
    }
    if (searchParams.infants) {
      queryParams.append('infants', searchParams.infants)
    }

    const response = await fetch(
      `${AMADEUS_CONFIG.BASE_URL}/v2/shopping/flight-offers?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Amadeus API error: ${data.errors?.[0]?.detail || response.statusText}`)
    }

    return transformAmadeusFlights(data)
  } catch (error) {
    console.error('Error searching flights:', error)
    throw error
  }
}

/**
 * Get flight details by ID
 * For Amadeus, we store the flight in the search results
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
    }
    
    // For real API, flights should be cached from search results
    // Amadeus doesn't have a direct get-by-id endpoint
    throw new Error('Flight details should be retrieved from search results')
  } catch (error) {
    console.error('Error fetching flight:', error)
    throw error
  }
}

/**
 * Search airports/cities for autocomplete
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of locations
 */
export const searchLocations = async (keyword) => {
  try {
    if (USE_MOCK_DATA || !keyword || keyword.length < 2) {
      return []
    }

    const token = await getAmadeusToken()

    const response = await fetch(
      `${AMADEUS_CONFIG.BASE_URL}/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${encodeURIComponent(keyword)}&page[limit]=10`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return []
    }

    return data.data?.map(location => ({
      code: location.iataCode,
      name: location.name,
      city: location.address?.cityName || location.name,
      country: location.address?.countryName || '',
      type: location.subType,
    })) || []
  } catch (error) {
    console.error('Error searching locations:', error)
    return []
  }
}
