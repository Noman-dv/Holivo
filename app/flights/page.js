'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Link from 'next/link'
import { searchFlights } from '../../services/flightService'
import { useStore } from '../../store/useStore'
import SearchBar from '../../components/SearchBar'
import FilterSidebar from '../../components/FilterSidebar'
import FlightResultCard from '../../components/FlightResultCard'
import Pagination from '../../components/Pagination'

const ITEMS_PER_PAGE = 8

export default function FlightsPage() {
  const { filters, searchResults, updateSearchResults } = useStore()
  const [loading, setLoading] = useState(false)
  const [sidebarFilters, setSidebarFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const hasLoadedRef = useRef(false)

  // Load mock results on component mount (only once)
  useEffect(() => {
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
  }, [searchResults.flights, updateSearchResults])

  const handleSearch = async (currentFilters) => {
    if (loading) return

    setLoading(true)
    try {
      const results = await searchFlights({
        origin: currentFilters.origin,
        destination: currentFilters.destination,
        departureDate: currentFilters.departureDate,
        travelClass: (currentFilters.travelClass || 'economy'),
        adults:
          (currentFilters.flightAdults && Number(currentFilters.flightAdults) > 0
            ? currentFilters.flightAdults
            : (currentFilters.passengers && Number(currentFilters.passengers) > 0
                ? currentFilters.passengers
                : 1)),
      })
      updateSearchResults('flights', results)
    } catch (error) {
      console.error('Error searching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFlights = useMemo(() => {
    let results = searchResults.flights || []

    if (sidebarFilters.stops && sidebarFilters.stops !== 'any') {
      if (sidebarFilters.stops === 'nonstop') {
        results = results.filter((flight) => flight.stops === 0)
      } else if (sidebarFilters.stops === '1') {
        results = results.filter((flight) => flight.stops === 1)
      } else if (sidebarFilters.stops === '2plus') {
        results = results.filter((flight) => flight.stops >= 2)
      }
    }

    if (sidebarFilters.maxPrice) {
      const maxPrice = Number(sidebarFilters.maxPrice)
      results = results.filter((flight) => {
        const price = typeof flight.price === 'object' ? flight.price.amount : flight.price
        return price <= maxPrice
      })
    }

    if (
      Array.isArray(sidebarFilters.departureAirports) &&
      sidebarFilters.departureAirports.length > 0
    ) {
      results = results.filter((flight) =>
        sidebarFilters.departureAirports.includes(flight?.departure?.airport)
      )
    }

    if (
      Array.isArray(sidebarFilters.arrivalAirports) &&
      sidebarFilters.arrivalAirports.length > 0
    ) {
      results = results.filter((flight) =>
        sidebarFilters.arrivalAirports.includes(flight?.arrival?.airport)
      )
    }

    if (sidebarFilters.timeOfDay && sidebarFilters.timeOfDay !== 'any') {
      results = results.filter((flight) => {
        const departureTime = flight?.departure?.time
        if (!departureTime) return true
        const date = new Date(departureTime)
        const hour = date.getHours()

        if (sidebarFilters.timeOfDay === 'morning') {
          return hour >= 5 && hour < 12
        }
        if (sidebarFilters.timeOfDay === 'afternoon') {
          return hour >= 12 && hour < 18
        }
        if (sidebarFilters.timeOfDay === 'evening') {
          return hour >= 18 && hour < 23
        }
        if (sidebarFilters.timeOfDay === 'night') {
          return hour >= 23 || hour < 5
        }
        return true
      })
    }

    if (Array.isArray(sidebarFilters.airlines) && sidebarFilters.airlines.length > 0) {
      results = results.filter((flight) => {
        const airlineName = typeof flight.airline === 'object' ? (flight.airline.name || flight.airline.code) : flight.airline
        return sidebarFilters.airlines.includes(airlineName)
      })
    }

    if (sidebarFilters.maxDurationHours) {
      const maxMinutes = Number(sidebarFilters.maxDurationHours) * 60
      const parseDurationToMinutes = (duration) => {
        if (!duration || typeof duration !== 'string') return Infinity
        const match = duration.match(/(\d+)\s*h\s*(\d+)?/i)
        if (!match) return Infinity
        const hours = parseInt(match[1], 10) || 0
        const mins = parseInt(match[2] || '0', 10) || 0
        return hours * 60 + mins
      }

      results = results.filter((flight) => parseDurationToMinutes(flight.duration) <= maxMinutes)
    }

    return results
  }, [searchResults.flights, sidebarFilters])

  const airlineOptions = useMemo(() => {
    const list = searchResults.flights || []
    const set = new Set()
    list.forEach((flight) => {
      if (flight.airline) {
        const airlineName = typeof flight.airline === 'object' ? (flight.airline.name || flight.airline.code) : flight.airline
        set.add(airlineName)
      }
    })
    return Array.from(set)
  }, [searchResults.flights])

  const airportOptions = useMemo(() => {
    const list = searchResults.flights || []
    const depMap = new Map()
    const arrMap = new Map()

    list.forEach((flight) => {
      const depCode = flight?.departure?.airport
      const depCity = flight?.departure?.city
      if (depCode) {
        if (!depMap.has(depCode)) {
          depMap.set(depCode, { code: depCode, city: depCity || depCode, count: 0 })
        }
        depMap.get(depCode).count += 1
      }

      const arrCode = flight?.arrival?.airport
      const arrCity = flight?.arrival?.city
      if (arrCode) {
        if (!arrMap.has(arrCode)) {
          arrMap.set(arrCode, { code: arrCode, city: arrCity || arrCode, count: 0 })
        }
        arrMap.get(arrCode).count += 1
      }
    })

    return {
      departure: Array.from(depMap.values()),
      arrival: Array.from(arrMap.values()),
    }
  }, [searchResults.flights])

  const totalFlights = searchResults.flights?.length || 0

  // Pagination logic
  const totalPages = Math.ceil(filteredFlights.length / ITEMS_PER_PAGE)
  const paginatedFlights = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredFlights.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredFlights, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [sidebarFilters, searchResults.flights])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Hero / intro */}
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Flights</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Search hundreds of flight sites at once
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Compare real-time flight prices from our partner sites. We&apos;re in beta and continuously improving our platform.
          </p>
        </section>

        {/* Shared search bar */}
        <SearchBar mode="flights" onSearch={handleSearch} loading={loading} />

        {/* Results + filters layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="md:col-span-4 lg:col-span-3 order-2 md:order-1">
            <FilterSidebar
              mode="flights"
              onChange={setSidebarFilters}
              flightOptions={{
                airlines: airlineOptions,
                departureAirports: airportOptions.departure,
                arrivalAirports: airportOptions.arrival,
                totalCount: totalFlights,
                filteredCount: filteredFlights.length,
              }}
            />
          </div>

          <div className="space-y-4 md:col-span-8 lg:col-span-9 order-1 md:order-2">
            {/* Summary + sort bar */}
            <Card className="border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {filteredFlights.length > 0
                      ? `${filteredFlights.length} flights found`
                      : 'No flights match your current filters'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Live prices from partner sites. We&apos;re in beta and continuously improving our platform.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500">Sort by:</span>
                  <button className="px-3 py-1.5 rounded-full bg-teal-600 text-white font-semibold transition-colors">
                    Best
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    Cheapest
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    Quickest
                  </button>
                </div>
              </div>
            </Card>

            {/* Loading state */}
            {loading && (
              <Card className="border-slate-200">
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                  <p className="mt-2 text-slate-600 text-sm">Loading flights…</p>
                </div>
              </Card>
            )}

            {/* Results list */}
            {!loading && filteredFlights.length > 0 && (
              <>
                <div className="space-y-3">
                  {paginatedFlights.map((flight) => (
                    <FlightResultCard key={flight.id} flight={flight} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredFlights.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                  itemLabel="flights"
                />
              </>
            )}

            {/* Empty state */}
            {!loading && (!searchResults.flights || searchResults.flights.length === 0) && (
              <Card className="bg-teal-50 border-teal-200">
                <h3 className="text-lg font-semibold mb-2 text-teal-800">Start your search</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm mb-3">
                  <li>Search from any origin to any destination.</li>
                  <li>Adjust filters on the left to refine your results.</li>
                  <li>
                    When you find a flight, click &quot;View booking options&quot; to complete your booking on partner sites.
                  </li>
                </ul>
                <Link href="/" className="text-xs text-teal-700 underline">
                  Back to home
                </Link>
              </Card>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}
