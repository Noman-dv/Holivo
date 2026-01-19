// Hotel API service using RapidAPI Booking.com
// Switch between mock data and real API by changing USE_MOCK_DATA in lib/apiConfig.js

import hotelsData from '../mock/hotels.json'
import { USE_MOCK_DATA, HOTELS_CONFIG } from '../lib/apiConfig'

/**
 * Get RapidAPI headers
 */
const getRapidAPIHeaders = () => ({
  'X-RapidAPI-Key': HOTELS_CONFIG.API_KEY,
  'X-RapidAPI-Host': HOTELS_CONFIG.API_HOST,
})

/**
 * Search for destination ID (required for hotel search)
 * @param {string} query - City or location name
 * @returns {Promise<Object>} Destination info with dest_id
 */
export const searchDestination = async (query) => {
  try {
    if (USE_MOCK_DATA || !query) {
      return null
    }

    const response = await fetch(
      `${HOTELS_CONFIG.BASE_URL}/stays/auto-complete?query=${encodeURIComponent(query)}`,
      {
        headers: getRapidAPIHeaders(),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status || !data.data?.length) {
      return null
    }

    // Return first city result
    const cityResult = data.data.find(item => item.dest_type === 'city') || data.data[0]
    
    return {
      destId: cityResult.dest_id,
      destType: cityResult.dest_type,
      name: cityResult.name || cityResult.city_name,
      country: cityResult.country,
      label: cityResult.label,
      locationId: cityResult.id, // This is the encoded ID required for search
    }
  } catch (error) {
    console.error('Error searching destination:', error)
    return null
  }
}

/**
 * Transform Booking.com API response to app format
 */
const transformBookingHotels = (bookingData) => {
  if (!bookingData.data || !Array.isArray(bookingData.data)) {
    return []
  }

  return bookingData.data.map((hotel, index) => {
    // Get price from priceBreakdown
    const grossPrice = hotel.priceBreakdown?.grossPrice?.value || 0
    const currency = hotel.priceBreakdown?.grossPrice?.currency || hotel.currency || 'USD'
    const priceFormatted = hotel.priceBreakdown?.grossPrice?.amountRounded || `${currency} ${grossPrice.toFixed(0)}`
    
    // Get main photo URL - use square60 as is (Booking.com restricts other sizes)
    const photoUrl = hotel.photoUrls?.[0] || '/images/hotel-placeholder.jpg'
    
    return {
      id: hotel.id?.toString() || `hotel-${index}`,
      name: hotel.name || 'Unknown Hotel',
      description: hotel.reviewScoreWord || '',
      rating: hotel.reviewScore || 0,
      reviewScore: hotel.reviewScore || 0,
      reviewCount: hotel.reviewCount || 0,
      reviewScoreWord: hotel.reviewScoreWord || '',
      stars: hotel.propertyClass || hotel.accuratePropertyClass || 0,
      location: {
        address: '',
        city: hotel.wishlistName || '',
        country: hotel.countryCode?.toUpperCase() || '',
        latitude: hotel.latitude || 0,
        longitude: hotel.longitude || 0,
        distance: '',
      },
      images: hotel.photoUrls || [],
      mainImage: photoUrl,
      pricePerNight: grossPrice,
      price: {
        amount: grossPrice,
        currency: currency,
        formatted: priceFormatted,
      },
      amenities: ['WiFi', 'Pool', 'Parking'], // Default amenities
      checkInTime: hotel.checkin?.fromTime || '15:00',
      checkOutTime: hotel.checkout?.untilTime || '11:00',
      checkinDate: hotel.checkinDate,
      checkoutDate: hotel.checkoutDate,
      url: '',
      raw: hotel, // Keep raw data for booking
    }
  })
}

/**
 * Fetch hotels based on search criteria
 * @param {Object} searchParams - Search parameters (location, checkIn, checkOut, guests, etc.)
 * @returns {Promise<Array>} Array of hotel options
 */
export const searchHotels = async (searchParams = {}) => {
  try {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
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
    }

    // First, get destination ID
    const destination = await searchDestination(searchParams.city || searchParams.destination || 'Dubai')
    
    if (!destination) {
      throw new Error('Could not find destination. Please try a different city.')
    }

    // Build query parameters - API requires locationId (encoded), checkinDate, checkoutDate
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const checkIn = searchParams.checkIn || today.toISOString().split('T')[0]
    const checkOut = searchParams.checkOut || tomorrow.toISOString().split('T')[0]
    
    const queryParams = new URLSearchParams({
      locationId: destination.locationId, // Use encoded ID from autocomplete
      checkinDate: checkIn,
      checkoutDate: checkOut,
      adults: searchParams.adults || 2,
      rooms: searchParams.rooms || 1,
      page: searchParams.page || 1,
    })

    // Add optional filters
    if (searchParams.currency) {
      queryParams.append('currency', searchParams.currency)
    }
    if (searchParams.sortBy) {
      queryParams.append('sortBy', searchParams.sortBy)
    }

    const response = await fetch(
      `${HOTELS_CONFIG.BASE_URL}/stays/search?${queryParams}`,
      {
        headers: getRapidAPIHeaders(),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      console.error('Hotels API error:', data)
      throw new Error(`Hotels API error: ${data.message || data.errors?.location || response.statusText}`)
    }

    return transformBookingHotels(data)
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
    }

    // Get hotel details from RapidAPI
    const response = await fetch(
      `${HOTELS_CONFIG.BASE_URL}/stays/detail?hotel_id=${hotelId}&languagecode=en-us`,
      {
        headers: getRapidAPIHeaders(),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.data) {
      throw new Error(`Hotel not found: ${data.message || response.statusText}`)
    }

    const hotel = data.data

    return {
      id: hotel.hotel_id?.toString() || hotelId,
      name: hotel.hotel_name || 'Unknown Hotel',
      description: hotel.hotel_description || '',
      rating: hotel.review_score || 0,
      reviewScore: hotel.review_score || 0,
      reviewCount: hotel.review_nr || 0,
      stars: hotel.class || 0,
      location: {
        address: hotel.address || '',
        city: hotel.city || '',
        country: hotel.country_trans || '',
        latitude: hotel.latitude || 0,
        longitude: hotel.longitude || 0,
      },
      images: hotel.photos?.map(p => p.url_max || p.url_original) || [],
      mainImage: hotel.main_photo_url || '/images/hotel-placeholder.jpg',
      amenities: hotel.facilities_block?.facilities?.map(f => f.name) || [],
      checkInTime: hotel.checkin?.from || '14:00',
      checkOutTime: hotel.checkout?.until || '11:00',
      url: hotel.url || '',
      raw: hotel,
    }
  } catch (error) {
    console.error('Error fetching hotel:', error)
    throw error
  }
}

/**
 * Search destinations for autocomplete
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of destinations
 */
export const searchDestinations = async (query) => {
  try {
    if (USE_MOCK_DATA || !query || query.length < 2) {
      return []
    }

    const response = await fetch(
      `${HOTELS_CONFIG.BASE_URL}/stays/auto-complete?query=${encodeURIComponent(query)}`,
      {
        headers: getRapidAPIHeaders(),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      return []
    }

    return data.data?.map(item => ({
      destId: item.dest_id,
      destType: item.dest_type,
      name: item.name || item.city_name,
      label: item.label,
      country: item.country,
      region: item.region,
      hotels: item.nr_hotels || item.hotels,
      image: item.image_url,
    })) || []
  } catch (error) {
    console.error('Error searching destinations:', error)
    return []
  }
}

