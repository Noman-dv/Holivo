'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import { searchHotels } from '../../services/hotelService'
import { useStore } from '../../store/useStore'
import SearchBar from '../../components/SearchBar'
import FilterSidebar from '../../components/FilterSidebar'
import HotelResultCard from '../../components/HotelResultCard'
import Pagination from '../../components/Pagination'

const ITEMS_PER_PAGE = 8

export default function HotelsPage() {
  const { filters, searchResults, updateSearchResults } = useStore()
  const [loading, setLoading] = useState(false)
  const [sidebarFilters, setSidebarFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
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
  }, [searchResults.hotels, updateSearchResults])

  const handleSearch = async (currentFilters) => {
    if (loading) return

    setLoading(true)
    try {
      const results = await searchHotels({
        city: currentFilters.destinationText || currentFilters.origin || '',
      })
      updateSearchResults('hotels', results)
    } catch (error) {
      console.error('Error searching hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredHotels = useMemo(() => {
    let results = searchResults.hotels || []

    if (sidebarFilters.minPrice) {
      const minPrice = Number(sidebarFilters.minPrice)
      results = results.filter((hotel) => hotel.pricePerNight >= minPrice)
    }

    if (sidebarFilters.maxPrice) {
      const maxPrice = Number(sidebarFilters.maxPrice)
      results = results.filter((hotel) => hotel.pricePerNight <= maxPrice)
    }

    if (sidebarFilters.minRating) {
      const minRating = Number(sidebarFilters.minRating)
      results = results.filter((hotel) => hotel.rating >= minRating)
    }

    if (Array.isArray(sidebarFilters.propertyTypes) && sidebarFilters.propertyTypes.length > 0) {
      results = results.filter((hotel) =>
        sidebarFilters.propertyTypes.includes(hotel.propertyType)
      )
    }

    if (
      Array.isArray(sidebarFilters.popularAmenities) &&
      sidebarFilters.popularAmenities.length > 0
    ) {
      results = results.filter((hotel) => {
        const amenities = hotel.amenities || []
        return sidebarFilters.popularAmenities.every((a) => amenities.includes(a))
      })
    }

    if (sidebarFilters.maxDistanceKm) {
      const maxDistance = Number(sidebarFilters.maxDistanceKm)
      results = results.filter((hotel) => {
        if (typeof hotel.distanceFromCenterKm !== 'number') return true
        return hotel.distanceFromCenterKm <= maxDistance
      })
    }

    return results
  }, [searchResults.hotels, sidebarFilters])

  // Pagination logic
  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE)
  const paginatedHotels = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredHotels, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sidebarFilters, searchResults.hotels])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Hero / intro */}
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Stays</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Find your next stay with Holivo
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Search and compare hotels from our trusted partner sites. We&apos;re in beta and continuously improving our platform.
          </p>
        </section>

        {/* Shared search bar configured for hotels */}
        <SearchBar mode="hotels" onSearch={handleSearch} loading={loading} />

        {/* Results + filters layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="md:col-span-4 lg:col-span-3">
            <FilterSidebar mode="hotels" onChange={setSidebarFilters} />
          </div>

          <div className="space-y-4 md:col-span-8 lg:col-span-9">
            {/* Summary + sort bar */}
            <Card className="border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {filteredHotels.length > 0
                      ? `${filteredHotels.length} properties found`
                      : 'No properties match your current filters'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Location:{' '}
                    <span className="font-medium">
                      {filters.destinationText || filters.origin || 'Any destination'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500">Sort by:</span>
                  <button className="px-3 py-1.5 rounded-full bg-teal-600 text-white font-semibold">
                    Our top picks
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                    Lowest price
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                    Review score
                  </button>
                </div>
              </div>
            </Card>

            {/* Loading state */}
            {loading && (
              <Card className="border-slate-200">
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                  <p className="mt-2 text-slate-600 text-sm">Loading hotels…</p>
                </div>
              </Card>
            )}

            {/* Results list */}
            {!loading && filteredHotels.length > 0 && (
              <>
                <div className="space-y-3">
                  {paginatedHotels.map((hotel, index) => (
                    <HotelResultCard
                      key={hotel.id}
                      hotel={hotel}
                      badge={currentPage === 1 && index === 0 ? 'Featured' : undefined}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredHotels.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                  itemLabel="properties"
                />
              </>
            )}

            {/* Empty state */}
            {!loading && (!searchResults.hotels || searchResults.hotels.length === 0) && (
              <Card className="bg-teal-50 border-teal-200">
                <h3 className="text-lg font-semibold mb-2 text-teal-800">Start exploring stays</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm mb-3">
                  <li>Search for Los Angeles to see a realistic list layout.</li>
                  <li>Adjust budget and review score filters on the left.</li>
                  <li>
                    When connected to partners, &quot;View deal&quot; will redirect you to complete
                    your booking on their site.
                  </li>
                </ul>
              </Card>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

