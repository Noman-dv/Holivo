'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'
import { searchFlights } from '../../services/flightService'
import { useStore } from '../../store/useStore'

export default function FlightsPage() {
  const { searchResults, updateSearchResults } = useStore()
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: 1,
  })
  const hasLoadedRef = useRef(false)

  // Load mock results on component mount (only once)
  useEffect(() => {
    // Only load if flights haven't been loaded yet
    if (!hasLoadedRef.current && (!searchResults.flights || searchResults.flights.length === 0)) {
      hasLoadedRef.current = true
      const loadMockFlights = async () => {
        setLoading(true)
        try {
          const results = await searchFlights({})
          updateSearchResults('flights', results)
        } catch (error) {
          console.error('Error loading flights:', error)
        } finally {
          setLoading(false)
        }
      }
      loadMockFlights()
    }
  }, []) // Empty dependency array - only run once on mount

  const handleSearch = async (e) => {
    e.preventDefault()
    if (loading) return // Prevent multiple simultaneous searches
    
    setLoading(true)
    try {
      const results = await searchFlights(searchParams)
      updateSearchResults('flights', results)
    } catch (error) {
      console.error('Error searching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-2 md:mb-4">Search Flights</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Compare flight prices and find the best deals for your next trip
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Flight Search</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={searchParams.departureDate}
                  onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Searching...' : 'Search Flights'}
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
              <p className="mt-2 text-gray-600">Loading flights...</p>
            </div>
          </Card>
        )}

        {!loading && searchResults.flights && searchResults.flights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Available Flights ({searchResults.flights.length})
            </h2>
            <div className="space-y-4">
              {searchResults.flights.map((flight) => (
                <Card key={flight.id} className="border-teal-200 hover:border-teal-400 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                        <span className="text-base sm:text-lg font-semibold text-teal-600">{flight.airline}</span>
                        <span className="text-xs sm:text-sm text-gray-500">{flight.class}</span>
                        {flight.stops === 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Direct</span>
                        )}
                        {flight.stops > 0 && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            {flight.stops} Stop{flight.stops > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-500">Departure</p>
                          <p className="font-semibold text-gray-800">{formatTime(flight.departure.time)}</p>
                          <p className="text-gray-600">{flight.departure.airport}</p>
                          <p className="text-gray-500 text-xs">{flight.departure.city}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-800">{flight.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Arrival</p>
                          <p className="font-semibold text-gray-800">{formatTime(flight.arrival.time)}</p>
                          <p className="text-gray-600">{flight.arrival.airport}</p>
                          <p className="text-gray-500 text-xs">{flight.arrival.city}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-800">{formatDate(flight.departure.time)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2 md:min-w-[140px]">
                      <div className="text-left sm:text-center md:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-teal-600">${flight.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">per person</p>
                      </div>
                      <Button variant="primary" size="sm" className="w-full sm:w-auto md:w-full">
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && (!searchResults.flights || searchResults.flights.length === 0) && (
          <Card className="bg-teal-50 border-teal-200">
            <h3 className="text-xl font-semibold mb-2 text-teal-800">How it works</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Enter your departure and destination cities</li>
              <li>Select your travel dates</li>
              <li>Choose number of passengers</li>
              <li>Compare prices from multiple airlines</li>
              <li>Book your preferred flight</li>
            </ul>
          </Card>
        )}
      </div>
    </Layout>
  )
}
