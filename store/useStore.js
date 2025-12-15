'use client'

// Global state management using React Context
// This is a simple implementation. Consider using Zustand, Redux, or similar for production

import { createContext, useContext, useState } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    travelClass: 'economy',
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
  })

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const selectItem = (type, item) => {
    setSelectedItems(prev => ({ ...prev, [type]: item }))
  }

  const updateSearchResults = (type, results) => {
    setSearchResults(prev => ({ ...prev, [type]: results }))
  }

  const value = {
    filters,
    updateFilters,
    selectedItems,
    selectItem,
    searchResults,
    updateSearchResults,
  }

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

