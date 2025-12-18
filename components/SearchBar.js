'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import Button from './Button'

/**
 * Shared search bar component used across flights and hotels.
 * Reads and updates global search filters from the store so that
 * search context can be reused between pages.
 *
 * @param {'flights'|'hotels'} mode - Controls which fields and labels to show
 * @param {Function} onSearch - Callback invoked on submit with current filters
 * @param {boolean} loading - Whether a search is in progress
 */
export default function SearchBar({ mode = 'flights', onSearch, loading = false }) {
  const {
    filters,
    updateFilters,
    setDestinationMode,
    setBudgetPerPerson,
    setFlightTripType,
    setAdults,
    setChildren,
    setRooms,
  } = useStore()

  const isFlights = mode === 'flights'

  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isTravellersOpen, setIsTravellersOpen] = useState(false)
  const [isDatesOpen, setIsDatesOpen] = useState(false)
  const [isOriginOpen, setIsOriginOpen] = useState(false)
  const [isDestinationOpen, setIsDestinationOpen] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (typeof onSearch === 'function') {
        onSearch(filters)
      }
      setIsLocationOpen(false)
      setIsTravellersOpen(false)
      setIsDatesOpen(false)
    },
    [filters, onSearch]
  )

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) || 0 : e.target.value
    updateFilters({ [field]: value })
  }

  const handleDestinationModeChange = (modeValue) => {
    setDestinationMode(modeValue)
  }

  const handleBudgetChange = (e) => {
    const value = Number(e.target.value) || ''
    setBudgetPerPerson(value)
  }

  const [isFlightTravellersOpen, setIsFlightTravellersOpen] = useState(false)

  // Debug: Log state changes
  useEffect(() => {
    console.log('Dropdown states:', {
      isDatesOpen,
      isFlightTravellersOpen,
      isOriginOpen,
      isDestinationOpen
    })
  }, [isDatesOpen, isFlightTravellersOpen, isOriginOpen, isDestinationOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on a button that opens a dropdown
      const target = event.target
      const isDropdownButton = target.closest('button[type="button"]') || 
                               target.closest('input[type="text"]') ||
                               target.closest('[role="dialog"]') ||
                               target.closest('.absolute')
      
      if (formRef.current && !formRef.current.contains(event.target) && !isDropdownButton) {
        console.log('Closing all dropdowns - clicked outside')
        setIsLocationOpen(false)
        setIsTravellersOpen(false)
        setIsDatesOpen(false)
        setIsFlightTravellersOpen(false)
        setIsOriginOpen(false)
        setIsDestinationOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        console.log('Closing all dropdowns - Escape key')
        setIsLocationOpen(false)
        setIsTravellersOpen(false)
        setIsDatesOpen(false)
        setIsFlightTravellersOpen(false)
        setIsOriginOpen(false)
        setIsDestinationOpen(false)
      }
    }

    // Use click event instead of mousedown to allow onClick handlers to fire first
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const locationSummary = useMemo(() => {
    if (filters.destinationMode === 'anywhere') return 'Anywhere'
    if (filters.destinationText) return filters.destinationText
    return 'City, region or property'
  }, [filters.destinationMode, filters.destinationText])

  const dateSummary = useMemo(() => {
    if (filters.checkInDate && filters.checkOutDate) {
      return `${filters.checkInDate} — ${filters.checkOutDate}`
    }
    if (filters.checkInDate) {
      return `${filters.checkInDate} — Select check-out`
    }
    return 'Select dates'
  }, [filters.checkInDate, filters.checkOutDate])

  const travellersSummary = useMemo(() => {
    const adults = filters.adults ?? 1
    const children = filters.children ?? 0
    const rooms = filters.rooms ?? 1
    const adultLabel = `${adults} adult${adults === 1 ? '' : 's'}`
    const childrenLabel =
      children > 0 ? ` · ${children} child${children === 1 ? '' : 'ren'}` : ''
    const roomLabel = ` · ${rooms} room${rooms === 1 ? '' : 's'}`
    return `${adultLabel}${childrenLabel}${roomLabel}`
  }, [filters.adults, filters.children, filters.rooms])

  const renderModeChips = (
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
      <button
        type="button"
        onClick={() => handleDestinationModeChange('specific')}
        className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm ${
          filters.destinationMode === 'specific'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
        }`}
      >
        Specific destination
      </button>
      <button
        type="button"
        onClick={() => handleDestinationModeChange('anywhere')}
        className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm ${
          filters.destinationMode === 'anywhere'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
        }`}
      >
        Anywhere
      </button>
      <button
        type="button"
        onClick={() => handleDestinationModeChange('budget-first')}
        className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm ${
          filters.destinationMode === 'budget-first'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
        }`}
      >
        Budget first
      </button>
    </div>
  )

  // Flights layout - Booking.com style
  const flightTripType = filters.flightTripType || 'round-trip'
  const isRoundTrip = flightTripType === 'round-trip'

  // Mock airport/city suggestions for flights
  const staticAirportSuggestions = [
    { value: 'Lahore', label: 'Lahore, Pakistan', code: 'LHE', airport: 'Allama Iqbal International' },
    { value: 'Islamabad', label: 'Islamabad, Pakistan', code: 'ISB', airport: 'Islamabad International' },
    { value: 'Karachi', label: 'Karachi, Pakistan', code: 'KHI', airport: 'Jinnah International' },
    { value: 'Dubai', label: 'Dubai, United Arab Emirates', code: 'DXB', airport: 'Dubai International' },
    { value: 'Jeddah', label: 'Jeddah, Saudi Arabia', code: 'JED', airport: 'King Abdulaziz Intl' },
    { value: 'Riyadh', label: 'Riyadh, Saudi Arabia', code: 'RUH', airport: 'King Khalid International' },
    { value: 'London', label: 'London, United Kingdom', code: 'LHR', airport: 'Heathrow' },
    { value: 'New York', label: 'New York, United States', code: 'JFK', airport: 'John F. Kennedy International' },
    { value: 'Los Angeles', label: 'Los Angeles, United States', code: 'LAX', airport: 'Los Angeles International' },
    { value: 'Toronto', label: 'Toronto, Canada', code: 'YYZ', airport: 'Pearson International' },
  ]

  const originQuery = (filters.origin || '').trim().toLowerCase()
  const destinationQuery = (filters.destination || '').trim().toLowerCase()

  const originSuggestions = useMemo(() => {
    if (!originQuery) return staticAirportSuggestions.slice(0, 5) // Show popular when empty
    return staticAirportSuggestions.filter((item) => {
      const searchText = `${item.label} ${item.code} ${item.airport}`.toLowerCase()
      return searchText.includes(originQuery)
    })
  }, [originQuery])

  const destinationSuggestions = useMemo(() => {
    if (!destinationQuery) return staticAirportSuggestions.slice(0, 5) // Show popular when empty
    return staticAirportSuggestions.filter((item) => {
      const searchText = `${item.label} ${item.code} ${item.airport}`.toLowerCase()
      return searchText.includes(destinationQuery)
    })
  }, [destinationQuery])

  const handleSwapOriginDestination = () => {
    const temp = filters.origin
    updateFilters({ origin: filters.destination, destination: temp })
  }

  const handleOriginInputChange = (e) => {
    const value = e.target.value
    updateFilters({ origin: value })
    setIsOriginOpen(true)
    setIsDestinationOpen(false)
    setIsDatesOpen(false)
    setIsFlightTravellersOpen(false)
  }

  const handleDestinationInputChange = (e) => {
    const value = e.target.value
    updateFilters({ destination: value })
    setIsDestinationOpen(true)
    setIsOriginOpen(false)
    setIsDatesOpen(false)
    setIsFlightTravellersOpen(false)
  }

  const flightTravellersSummary = useMemo(() => {
    const adults = filters.flightAdults || 0
    const students = filters.flightStudents || 0
    const seniors = filters.flightSeniors || 0
    const youths = filters.flightYouths || 0
    const children = filters.flightChildren || 0
    const toddlers = filters.flightToddlers || 0
    const infants = filters.flightInfants || 0
    
    const totalTravelers = adults + students + seniors + youths + children + toddlers + infants
    const travelClass = filters.travelClass || 'economy'
    const classLabel = travelClass.charAt(0).toUpperCase() + travelClass.slice(1).replace('-', ' ')
    
    if (totalTravelers === 0) {
      return `1 traveler, ${classLabel}`
    }
    
    return `${totalTravelers} ${totalTravelers === 1 ? 'traveler' : 'travelers'}, ${classLabel}`
  }, [
    filters.flightAdults,
    filters.flightStudents,
    filters.flightSeniors,
    filters.flightYouths,
    filters.flightChildren,
    filters.flightToddlers,
    filters.flightInfants,
    filters.travelClass
  ])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}`
  }

  const dateRangeDisplay = useMemo(() => {
    if (!filters.departureDate) return 'Departure'
    if (isRoundTrip && filters.returnDate) {
      return `${formatDate(filters.departureDate)} – ${formatDate(filters.returnDate)}`
    }
    return formatDate(filters.departureDate)
  }, [filters.departureDate, filters.returnDate, isRoundTrip])

  if (isFlights) {
    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-100 p-4 md:p-5 lg:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          {renderModeChips}
        </div>

        {/* Trip type selector */}
        <div className="mb-3">
          <select
            value={flightTripType}
            onChange={(e) => setFlightTripType(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="round-trip">Round-trip</option>
            <option value="one-way">One-way</option>
          </select>
        </div>

        {/* Unified horizontal search bar container */}
        <div className={`flex flex-col md:flex-row items-stretch border rounded-lg bg-white transition-colors ${
          isOriginOpen || isDestinationOpen || isDatesOpen || isFlightTravellersOpen
            ? 'border-teal-500 ring-2 ring-teal-500'
            : 'border-slate-200 hover:border-teal-500'
        }`}>
          {/* From field */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="From?"
              value={filters.origin}
              onChange={handleOriginInputChange}
              onFocus={() => {
                console.log('Origin field focused')
                setIsOriginOpen(true)
                setIsDestinationOpen(false)
                setIsDatesOpen(false)
                setIsFlightTravellersOpen(false)
              }}
              onClick={(e) => {
                e.stopPropagation()
                console.log('Origin field clicked')
                setIsOriginOpen(true)
                setIsDestinationOpen(false)
                setIsDatesOpen(false)
                setIsFlightTravellersOpen(false)
              }}
              className={`w-full px-4 py-3 text-sm focus:outline-none border-0 ${
                isOriginOpen ? 'bg-teal-50' : 'bg-transparent'
              }`}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={isOriginOpen}
            />
            {isOriginOpen && (
              <div className="absolute z-50 top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 p-3 text-sm max-h-64 overflow-y-auto" style={{ position: 'absolute', display: 'block' }}>
                {originQuery && originSuggestions.length > 0 && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-2 text-xs">Search results</p>
                    <div className="flex flex-col">
                      {originSuggestions.map((item) => (
                        <button
                          key={`${item.code}-origin`}
                          type="button"
                          className="px-3 py-2 text-left rounded hover:bg-slate-50 flex items-start gap-3"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateFilters({ origin: item.value })
                            setIsOriginOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{item.label}</span>
                              <span className="text-xs text-slate-500">{item.code}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{item.airport}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {originQuery && originSuggestions.length === 0 && (
                  <p className="text-xs text-slate-500 py-2">No airports match your search.</p>
                )}
                {!originQuery && originSuggestions.length > 0 && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-2 text-xs">Popular destinations</p>
                    <div className="flex flex-col">
                      {originSuggestions.map((item) => (
                        <button
                          key={`${item.code}-popular-origin`}
                          type="button"
                          className="px-3 py-2 text-left rounded hover:bg-slate-50 flex items-start gap-3"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateFilters({ origin: item.value })
                            setIsOriginOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{item.label}</span>
                              <span className="text-xs text-slate-500">{item.code}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{item.airport}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-200 self-stretch"></div>

          {/* Swap button */}
          <button
            type="button"
            onClick={handleSwapOriginDestination}
            className="px-2 flex items-center justify-center bg-white hover:bg-slate-50 focus:outline-none transition-colors"
            aria-label="Swap origin and destination"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px bg-slate-200 self-stretch"></div>

          {/* To field */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="To?"
              value={filters.destination}
              onChange={handleDestinationInputChange}
              onFocus={() => {
                console.log('Destination field focused')
                setIsDestinationOpen(true)
                setIsOriginOpen(false)
                setIsDatesOpen(false)
                setIsFlightTravellersOpen(false)
              }}
              onClick={(e) => {
                e.stopPropagation()
                console.log('Destination field clicked')
                setIsDestinationOpen(true)
                setIsOriginOpen(false)
                setIsDatesOpen(false)
                setIsFlightTravellersOpen(false)
              }}
              className={`w-full px-4 py-3 text-sm focus:outline-none border-0 ${
                isDestinationOpen ? 'bg-teal-50' : 'bg-transparent'
              }`}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={isDestinationOpen}
            />
            {isDestinationOpen && (
              <div className="absolute z-50 top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 p-3 text-sm max-h-64 overflow-y-auto" style={{ position: 'absolute', display: 'block' }}>
                {destinationQuery && destinationSuggestions.length > 0 && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-2 text-xs">Search results</p>
                    <div className="flex flex-col">
                      {destinationSuggestions.map((item) => (
                        <button
                          key={`${item.code}-destination`}
                          type="button"
                          className="px-3 py-2 text-left rounded hover:bg-slate-50 flex items-start gap-3"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateFilters({ destination: item.value })
                            setIsDestinationOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{item.label}</span>
                              <span className="text-xs text-slate-500">{item.code}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{item.airport}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {destinationQuery && destinationSuggestions.length === 0 && (
                  <p className="text-xs text-slate-500 py-2">No airports match your search.</p>
                )}
                {!destinationQuery && destinationSuggestions.length > 0 && (
                  <div>
                    <p className="font-semibold text-slate-700 mb-2 text-xs">Popular destinations</p>
                    <div className="flex flex-col">
                      {destinationSuggestions.map((item) => (
                        <button
                          key={`${item.code}-popular-destination`}
                          type="button"
                          className="px-3 py-2 text-left rounded hover:bg-slate-50 flex items-start gap-3"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateFilters({ destination: item.value })
                            setIsDestinationOpen(false)
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{item.label}</span>
                              <span className="text-xs text-slate-500">{item.code}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{item.airport}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-200 self-stretch"></div>

          {/* Date field */}
          <div className="flex-1 relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Date button clicked, current state:', isDatesOpen)
                const newState = !isDatesOpen
                console.log('Setting dates open to:', newState)
                setIsDatesOpen(newState)
                setIsOriginOpen(false)
                setIsDestinationOpen(false)
                setIsFlightTravellersOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-sm text-slate-700 focus:outline-none border-0 ${
                isDatesOpen ? 'bg-teal-50' : 'bg-transparent hover:bg-slate-50'
              }`}
            >
              {dateRangeDisplay}
            </button>
            {isDatesOpen && (
              <div 
                className="absolute z-50 top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 min-w-[280px]"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log('Date dropdown clicked')
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">Departure</label>
                    <input
                      type="date"
                      value={filters.departureDate}
                      onChange={(e) => {
                        handleChange('departureDate')(e)
                        if (!isRoundTrip) {
                          setIsDatesOpen(false)
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    />
                  </div>
                  {isRoundTrip && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-600">Return</label>
                      <input
                        type="date"
                        value={filters.returnDate}
                        onChange={(e) => {
                          handleChange('returnDate')(e)
                          if (filters.departureDate) {
                            setIsDatesOpen(false)
                          }
                        }}
                        min={filters.departureDate}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-200 self-stretch"></div>

          {/* Travellers field */}
          <div className="flex-1 relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Travellers button clicked, current state:', isFlightTravellersOpen)
                const newState = !isFlightTravellersOpen
                console.log('Setting travellers open to:', newState)
                setIsFlightTravellersOpen(newState)
                setIsOriginOpen(false)
                setIsDestinationOpen(false)
                setIsDatesOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-sm text-slate-700 focus:outline-none border-0 ${
                isFlightTravellersOpen ? 'bg-teal-50' : 'bg-transparent hover:bg-slate-50'
              }`}
            >
              {flightTravellersSummary}
            </button>
            {isFlightTravellersOpen && (
              <div 
                className="absolute z-50 top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-4 min-w-[320px]"
                onClick={(e) => {
                  e.stopPropagation()
                  console.log('Travellers dropdown clicked')
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                }}
                style={{ position: 'absolute', display: 'block' }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Travelers</h3>
                    {[
                      { id: 'adults', label: 'Adults', helper: '18-64', min: 1 },
                      { id: 'students', label: 'Students', helper: 'over 18', min: 0 },
                      { id: 'seniors', label: 'Seniors', helper: 'over 65', min: 0 },
                      { id: 'youths', label: 'Youths', helper: '12-17', min: 0 },
                      { id: 'children', label: 'Children', helper: '2-11', min: 0 },
                      { id: 'toddlers', label: 'Toddlers in own seat', helper: 'under 2', min: 0 },
                      { id: 'infants', label: 'Infants on lap', helper: 'under 2', min: 0 },
                    ].map((row) => {
                      // Map row.id to filter field name
                      const fieldMap = {
                        'adults': 'flightAdults',
                        'students': 'flightStudents',
                        'seniors': 'flightSeniors',
                        'youths': 'flightYouths',
                        'children': 'flightChildren',
                        'toddlers': 'flightToddlers',
                        'infants': 'flightInfants',
                      }
                      
                      const fieldName = fieldMap[row.id] || 'flightAdults'
                      const count = filters[fieldName] || 0
                      
                      return (
                        <div
                          key={row.id}
                          className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0"
                        >
                          <div>
                            <p className="text-sm text-slate-800">{row.label}</p>
                            <p className="text-xs text-slate-500">{row.helper}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 transition-colors"
                              onClick={() => {
                                const newValue = Math.max(row.min, count - 1)
                                const updates = { [fieldName]: newValue }
                                // Also update passengers for backward compatibility if adults
                                if (row.id === 'adults') {
                                  updates.passengers = newValue
                                }
                                updateFilters(updates)
                                console.log(`Decreased ${row.id} to ${newValue}`, updates)
                              }}
                              disabled={count <= row.min}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-slate-800">{count}</span>
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 transition-colors"
                              onClick={() => {
                                const newValue = count + 1
                                const updates = { [fieldName]: newValue }
                                // Also update passengers for backward compatibility if adults
                                if (row.id === 'adults') {
                                  updates.passengers = newValue
                                }
                                updateFilters(updates)
                                console.log(`Increased ${row.id} to ${newValue}`, updates)
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Cabin Class</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['economy', 'premium-economy', 'business', 'first'].map((cls) => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => updateFilters({ travelClass: cls })}
                          className={`px-3 py-2 rounded-lg border text-sm ${
                            filters.travelClass === cls
                              ? 'border-teal-600 bg-teal-50 text-teal-700 font-medium'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {cls.charAt(0).toUpperCase() + cls.slice(1).replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-200 self-stretch"></div>

          {/* Search button */}
          <div className="flex items-stretch">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm whitespace-nowrap rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    )
  }

  // Hotels layout with Booking.com-style interactions
  const handleTravellersAdjust = (field, delta) => {
    if (field === 'adults') {
      const next = Math.min(6, Math.max(1, (filters.adults ?? 1) + delta))
      setAdults(next)
    }
    if (field === 'children') {
      const next = Math.min(6, Math.max(0, (filters.children ?? 0) + delta))
      setChildren(next)
    }
    if (field === 'rooms') {
      const next = Math.min(6, Math.max(1, (filters.rooms ?? 1) + delta))
      setRooms(next)
    }
  }

  const staticDestinationSuggestions = [
    { value: 'Lahore', label: 'Lahore, Pakistan' },
    { value: 'Islamabad', label: 'Islamabad, Pakistan' },
    { value: 'Dubai', label: 'Dubai, United Arab Emirates' },
    { value: 'London', label: 'London, United Kingdom' },
    { value: 'Los Angeles', label: 'Los Angeles, United States' },
  ]

  const recentDestinations =
    Array.isArray(filters.recentDestinations) && filters.recentDestinations.length > 0
      ? filters.recentDestinations
      : []

  const locationQuery = (filters.destinationText || '').trim().toLowerCase()

  const typedSuggestions = useMemo(() => {
    if (!locationQuery) return []
    const recent = recentDestinations.map((city) => ({ value: city, label: city }))
    const pool = [...recent, ...staticDestinationSuggestions]
    const seen = new Set()
    return pool.filter((item) => {
      const key = item.value
      if (seen.has(key)) return false
      seen.add(key)
      return item.label.toLowerCase().includes(locationQuery)
    })
  }, [locationQuery, recentDestinations, staticDestinationSuggestions])

  const handleLocationInputChange = (e) => {
    const value = e.target.value
    updateFilters({ destinationText: value, destinationMode: 'specific' })
    setIsLocationOpen(true)
    setIsTravellersOpen(false)
    setIsDatesOpen(false)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-100 p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {renderModeChips}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2.2fr)_minmax(0,2.2fr)_minmax(0,1.6fr)_auto] gap-3 md:gap-4 items-stretch">
        {/* Location */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-semibold text-slate-700">Where are you going?</label>
          <input
            type="text"
            value={filters.destinationText}
            onChange={handleLocationInputChange}
            onFocus={() => {
              setIsLocationOpen(true)
              setIsTravellersOpen(false)
              setIsDatesOpen(false)
            }}
            placeholder={locationSummary}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={isLocationOpen}
          />

          {isLocationOpen && (
            <div className="absolute z-20 top-full left-0 mt-2 w-full md:w-[360px] bg-white rounded-xl shadow-xl border border-slate-100 p-3 text-xs sm:text-sm">
              {locationQuery && typedSuggestions.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold text-slate-700 mb-1">Search results</p>
                  <div className="flex flex-col">
                    {typedSuggestions.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className="px-2 py-1.5 text-left rounded hover:bg-slate-50"
                        onClick={() => {
                          updateFilters({
                            destinationText: item.value,
                            destinationMode: 'specific',
                          })
                          setIsLocationOpen(false)
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!locationQuery && recentDestinations.length > 0 && (
                <div className="mb-3">
                  <p className="font-semibold text-slate-700 mb-1">Your recent searches</p>
                  <div className="flex flex-col">
                    {recentDestinations.map((city) => (
                      <button
                        key={city}
                        type="button"
                        className="px-2 py-1.5 text-left rounded hover:bg-slate-50"
                        onClick={() => {
                          updateFilters({ destinationText: city, destinationMode: 'specific' })
                          setIsLocationOpen(false)
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!locationQuery && (
                <div>
                  <p className="font-semibold text-slate-700 mb-1">Trending destinations</p>
                  <div className="flex flex-col">
                    {staticDestinationSuggestions.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className="px-2 py-1.5 text-left rounded hover:bg-slate-50"
                        onClick={() => {
                          updateFilters({
                            destinationText: item.value,
                            destinationMode: 'specific',
                          })
                          setIsLocationOpen(false)
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {locationQuery && typedSuggestions.length === 0 && (
                <p className="text-[11px] text-slate-500">No mock destinations match your search.</p>
              )}
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-semibold text-slate-700">Check-in — Check-out</label>
          <button
            type="button"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-left text-sm text-slate-700 bg-white hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => {
              setIsDatesOpen(true)
              setIsLocationOpen(false)
              setIsTravellersOpen(false)
            }}
            aria-haspopup="dialog"
            aria-expanded={isDatesOpen}
          >
            {dateSummary}
          </button>

          {isDatesOpen && (
            <div
              className="absolute z-20 top-full left-0 mt-2 w-full md:w-[420px] bg-white rounded-xl shadow-xl border border-slate-100 p-3 text-xs sm:text-sm"
              role="dialog"
              aria-label="Select dates"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">Check-in</span>
                  <input
                    type="date"
                    value={filters.checkInDate}
                    onChange={handleChange('checkInDate')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">Check-out</span>
                  <input
                    type="date"
                    value={filters.checkOutDate}
                    onChange={handleChange('checkOutDate')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm"
                  />
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Dates are mock-only for this MVP. In production, you&apos;ll see real availability
                from partner sites.
              </p>
            </div>
          )}
        </div>

        {/* Travellers */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-semibold text-slate-700">Travellers</label>
          <button
            type="button"
            className={`w-full px-3 py-2 rounded-lg border text-left text-sm text-slate-700 bg-white hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              isTravellersOpen ? 'border-teal-500 ring-2 ring-teal-500' : 'border-slate-200'
            }`}
            onClick={() => {
              setIsTravellersOpen((open) => !open)
              setIsLocationOpen(false)
              setIsDatesOpen(false)
            }}
            aria-haspopup="dialog"
            aria-expanded={isTravellersOpen}
          >
            {travellersSummary}
          </button>

          {/* Travellers Dropdown - positioned below the field */}
          {isTravellersOpen && (
            <div
              className="absolute z-20 top-full left-0 mt-2 w-full md:w-[380px] bg-white rounded-xl shadow-xl border border-slate-100 p-4 text-xs sm:text-sm"
              role="dialog"
              aria-label="Select travellers"
            >
              {[
                { id: 'adults', label: 'Adults', helper: 'Ages 18+' },
                { id: 'children', label: 'Children', helper: 'Ages 0–17' },
                { id: 'rooms', label: 'Rooms', helper: '' },
              ].map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{row.label}</p>
                    {row.helper && <p className="text-xs text-slate-500 mt-0.5">{row.helper}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 transition-colors"
                      onClick={() => handleTravellersAdjust(row.id, -1)}
                      disabled={
                        (row.id === 'adults' && (filters.adults ?? 1) <= 1) ||
                        (row.id === 'children' && (filters.children ?? 0) <= 0) ||
                        (row.id === 'rooms' && (filters.rooms ?? 1) <= 1)
                      }
                    >
                      <span className="text-lg leading-none">−</span>
                    </button>
                    <span className="w-8 text-center text-base font-medium text-slate-800">
                      {row.id === 'adults'
                        ? filters.adults ?? 1
                        : row.id === 'children'
                        ? filters.children ?? 0
                        : filters.rooms ?? 1}
                    </span>
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-slate-300 text-slate-700 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 transition-colors"
                      onClick={() => handleTravellersAdjust(row.id, 1)}
                      disabled={
                        (row.id === 'adults' && (filters.adults ?? 1) >= 6) ||
                        (row.id === 'children' && (filters.children ?? 0) >= 6) ||
                        (row.id === 'rooms' && (filters.rooms ?? 1) >= 6)
                      }
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
              ))}

              <p className="mt-3 text-xs text-slate-500">
                Traveller details are used only for mock filtering in this MVP. Final availability
                and pricing will come from partner sites.
              </p>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => setIsTravellersOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="flex flex-col gap-1 justify-end">
          <div className="h-5"></div>
          <button
            type="submit"
            disabled={loading}
            className="w-full whitespace-nowrap px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

