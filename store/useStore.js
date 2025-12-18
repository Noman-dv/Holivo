'use client'

// Global state management using React Context

import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [filters, setFilters] = useState({
    // Core flight search fields
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    travelClass: 'economy',
    // Detailed flight travelers
    flightAdults: 1,
    flightStudents: 0,
    flightSeniors: 0,
    flightYouths: 0,
    flightChildren: 0,
    flightToddlers: 0,
    flightInfants: 0,
    // Phase 1 search state fields
    departureAirports: [],
    destinationMode: 'specific', // 'specific' | 'anywhere' | 'budget-first'
    destinationText: '',
    checkInDate: '',
    checkOutDate: '',
    nights: '',
    budgetPerPerson: '',
    tripType: 'holiday',
    flightTripType: 'round-trip', // 'round-trip' | 'one-way'
    aiBrief: '',
    // Travellers (used primarily for hotels)
    adults: 2,
    children: 0,
    rooms: 1,
    // Simple recent destinations list for location dropdowns
    recentDestinations: [],
  })
  
  const [selectedItems, setSelectedItems] = useState({
    flight: null,
    hotel: null,
    car: null,
  })
  
  const [searchResults, setSearchResults] = useState({
    flights: [],
    hotels: [],
    cars: [],
    aiHolidays: [],
  })

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  // Dedicated setters for key search fields (for convenience and clarity)
  const setDepartureAirports = useCallback((departureAirports) => {
    setFilters(prev => ({ ...prev, departureAirports }))
  }, [])

  const setDestinationMode = useCallback((destinationMode) => {
    setFilters(prev => ({ ...prev, destinationMode }))
  }, [])

  const setDestinationText = useCallback((destinationText) => {
    setFilters(prev => ({ ...prev, destinationText }))
  }, [])

  const setCheckInDate = useCallback((checkInDate) => {
    setFilters(prev => ({ ...prev, checkInDate }))
  }, [])

  const setCheckOutDate = useCallback((checkOutDate) => {
    setFilters(prev => ({ ...prev, checkOutDate }))
  }, [])

  const setNights = useCallback((nights) => {
    setFilters(prev => ({ ...prev, nights }))
  }, [])

  const setBudgetPerPerson = useCallback((budgetPerPerson) => {
    setFilters(prev => ({ ...prev, budgetPerPerson }))
  }, [])

  const setTripType = useCallback((tripType) => {
    setFilters(prev => ({ ...prev, tripType }))
  }, [])

  const setFlightTripType = useCallback((flightTripType) => {
    setFilters(prev => ({ ...prev, flightTripType }))
  }, [])

  const setAiBrief = useCallback((aiBrief) => {
    setFilters(prev => ({ ...prev, aiBrief }))
  }, [])

  const setAdults = useCallback((adults) => {
    setFilters(prev => ({ ...prev, adults }))
  }, [])

  const setChildren = useCallback((children) => {
    setFilters(prev => ({ ...prev, children }))
  }, [])

  const setRooms = useCallback((rooms) => {
    setFilters(prev => ({ ...prev, rooms }))
  }, [])

  const addRecentDestination = useCallback((destination) => {
    if (!destination) return
    setFilters(prev => {
      const existing = Array.isArray(prev.recentDestinations) ? prev.recentDestinations : []
      const next = [destination, ...existing.filter((d) => d !== destination)].slice(0, 5)
      return { ...prev, recentDestinations: next }
    })
  }, [])

  const selectItem = useCallback((type, item) => {
    setSelectedItems(prev => ({ ...prev, [type]: item }))
  }, [])

  const setSelectedFlight = useCallback((flight) => {
    setSelectedItems(prev => ({ ...prev, flight }))
  }, [])

  const setSelectedHotel = useCallback((hotel) => {
    setSelectedItems(prev => ({ ...prev, hotel }))
  }, [])

  const updateSearchResults = useCallback((type, results) => {
    setSearchResults(prev => ({ ...prev, [type]: results }))
  }, [])

  const value = useMemo(() => ({
    filters,
    updateFilters,
    setDepartureAirports,
    setDestinationMode,
    setDestinationText,
    setCheckInDate,
    setCheckOutDate,
    setNights,
    setBudgetPerPerson,
    setTripType,
    setFlightTripType,
    setAiBrief,
    setAdults,
    setChildren,
    setRooms,
    addRecentDestination,
    selectedItems,
    selectItem,
    setSelectedFlight,
    setSelectedHotel,
    searchResults,
    updateSearchResults,
  }), [
    filters,
    selectedItems,
    searchResults,
    updateFilters,
    setDepartureAirports,
    setDestinationMode,
    setDestinationText,
    setCheckInDate,
    setCheckOutDate,
    setNights,
    setBudgetPerPerson,
    setTripType,
    setFlightTripType,
    setAiBrief,
    setAdults,
    setChildren,
    setRooms,
    addRecentDestination,
    selectItem,
    setSelectedFlight,
    setSelectedHotel,
    updateSearchResults,
  ])

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

