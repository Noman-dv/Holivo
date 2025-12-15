'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'
import { searchHotels } from '../../services/hotelService'
import { useStore } from '../../store/useStore'

export default function HotelsPage() {
  const { searchResults, updateSearchResults } = useStore()
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  })
  const hasLoadedRef = useRef(false)

  // Load mock results on component mount (only once)
  useEffect(() => {
    if (!hasLoadedRef.current && (!searchResults.hotels || searchResults.hotels.length === 0)) {
      hasLoadedRef.current = true
      const loadMockHotels = async () => {
        setLoading(true)
        try {
          const results = await searchHotels({})
          updateSearchResults('hotels', results)
        } catch (error) {
          console.error('Error loading hotels:', error)
        } finally {
          setLoading(false)
        }
      }
      loadMockHotels()
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    try {
      const results = await searchHotels(searchParams)
      updateSearchResults('hotels', results)
    } catch (error) {
      console.error('Error searching hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>)
    }
    
    return stars
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-2 md:mb-4">Search Hotels</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Find the perfect accommodation for your trip at the best prices
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hotel Search</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or Address"
                  value={searchParams.city}
                  onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Searching...' : 'Search Hotels'}
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">Back to Home</Button>
              </Link>
            </div>
          </form>
        </Card>

        {/* Results Section */}
        {loading && (
          <Card className="mb-8 border-teal-200">
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-2 text-gray-600">Loading hotels...</p>
            </div>
          </Card>
        )}

        {!loading && searchResults.hotels && searchResults.hotels.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Available Hotels ({searchResults.hotels.length})
            </h2>
            <div className="space-y-4">
              {searchResults.hotels.map((hotel) => (
                <Card key={hotel.id} className="border-teal-200 hover:border-teal-400 transition-colors">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-full md:w-64 flex-shrink-0">
                      <div className="w-full h-48 md:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Hotel Image</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{hotel.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{hotel.location.address}, {hotel.location.city}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xl sm:text-2xl font-bold text-teal-600">${hotel.pricePerNight.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {renderStars(hotel.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
                        <span className="text-sm text-gray-500">({hotel.rating > 4.5 ? 'Excellent' : hotel.rating > 4 ? 'Very Good' : 'Good'})</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded border border-teal-200"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {hotel.available ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Unavailable</span>
                          )}
                        </div>
                        <Button variant="primary" size="sm" className="w-full sm:w-auto">
                          Select Hotel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && (!searchResults.hotels || searchResults.hotels.length === 0) && (
          <Card className="bg-teal-50 border-teal-200">
            <h3 className="text-xl font-semibold mb-2 text-teal-800">Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Search by location, dates, and number of guests</li>
              <li>Filter by price range, ratings, and amenities</li>
              <li>Compare multiple hotel options</li>
              <li>View detailed hotel information and reviews</li>
              <li>Book directly through our platform</li>
            </ul>
          </Card>
        )}
      </div>
    </Layout>
  )
}
