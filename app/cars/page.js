'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'
import { searchCars } from '../../services/carService'
import { useStore } from '../../store/useStore'

export default function CarsPage() {
  const { searchResults, updateSearchResults } = useStore()
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: '',
    vehicleType: '',
  })
  const hasLoadedRef = useRef(false)

  // Load mock results on component mount (only once)
  useEffect(() => {
    if (!hasLoadedRef.current && (!searchResults.cars || searchResults.cars.length === 0)) {
      hasLoadedRef.current = true
      const loadMockCars = async () => {
        setLoading(true)
        try {
          const results = await searchCars({})
          updateSearchResults('cars', results)
        } catch (error) {
          console.error('Error loading cars:', error)
        } finally {
          setLoading(false)
        }
      }
      loadMockCars()
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    try {
      const results = await searchCars(searchParams)
      updateSearchResults('cars', results)
    } catch (error) {
      console.error('Error searching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 mb-2 md:mb-4">Search Car Rentals</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Find the perfect rental car for your travel needs
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Car Rental Search</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Airport or City"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={searchParams.vehicleType}
                  onChange={(e) => setSearchParams({ ...searchParams, vehicleType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury Sedan">Luxury Sedan</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={searchParams.pickupDate}
                  onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop-off Date
                </label>
                <input
                  type="date"
                  value={searchParams.dropoffDate}
                  onChange={(e) => setSearchParams({ ...searchParams, dropoffDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Searching...' : 'Search Cars'}
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
              <p className="mt-2 text-gray-600">Loading cars...</p>
            </div>
          </Card>
        )}

        {!loading && searchResults.cars && searchResults.cars.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Available Cars ({searchResults.cars.length})
            </h2>
            <div className="space-y-4">
              {searchResults.cars.map((car) => (
                <Card key={car.id} className="border-teal-200 hover:border-teal-400 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3">
                        <div className="text-3xl sm:text-4xl">🚗</div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {car.vehicle.make} {car.vehicle.model}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">{car.vehicle.year} • {car.vehicle.type}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Provider</p>
                          <p className="text-sm font-medium text-gray-800">{car.provider}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Pickup/Drop-off</p>
                          <p className="text-sm font-medium text-gray-800">{car.location.pickup}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Availability</p>
                          {car.available ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Unavailable</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded border border-teal-200"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2 md:min-w-[150px]">
                      <div className="text-left sm:text-center md:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-teal-600">${car.pricePerDay.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                      <Button variant="primary" size="sm" className="w-full sm:w-auto md:w-full">
                        Select Car
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && (!searchResults.cars || searchResults.cars.length === 0) && (
          <Card className="bg-teal-50 border-teal-200">
            <h3 className="text-xl font-semibold mb-2 text-teal-800">Available Options</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Search by pickup and drop-off locations</li>
              <li>Filter by vehicle type, size, and features</li>
              <li>Compare prices from multiple rental companies</li>
              <li>View vehicle details and specifications</li>
              <li>Open partner sites to reserve your rental car</li>
            </ul>
          </Card>
        )}
      </div>
    </Layout>
  )
}
