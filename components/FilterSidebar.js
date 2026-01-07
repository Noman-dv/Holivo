 'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { formatPriceWithCurrency, CURRENCIES } from '../lib/currency'

/**
 * Budget range slider component with histogram visualization
 */
function BudgetRangeSlider({ minPrice, maxPrice, onMinChange, onMaxChange }) {
  const MIN_BUDGET = 0
  const MAX_BUDGET = 40000
  const STEP = 100

  const minValue = minPrice ? Number(minPrice) : MIN_BUDGET
  const maxValue = maxPrice ? Number(maxPrice) : MAX_BUDGET

  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(null) // 'min' | 'max' | null
  const [localMin, setLocalMin] = useState(minValue)
  const [localMax, setLocalMax] = useState(maxValue)

  // Mock histogram data (price distribution)
  const histogramData = Array.from({ length: 20 }, (_, i) => {
    const base = Math.random() * 100
    // More properties at lower prices
    return Math.floor(base * (1 - i / 20) + Math.random() * 20)
  })

  useEffect(() => {
    setLocalMin(minValue)
    setLocalMax(maxValue)
  }, [minValue, maxValue])

  const getPercentage = (value) => ((value - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  const getValueFromPosition = (clientX) => {
    if (!sliderRef.current) return MIN_BUDGET
    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const value = Math.round((percentage * (MAX_BUDGET - MIN_BUDGET) + MIN_BUDGET) / STEP) * STEP
    return Math.max(MIN_BUDGET, Math.min(MAX_BUDGET, value))
  }

  const handleMouseDown = (type) => (e) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return

      const value = getValueFromPosition(e.clientX)

      if (isDragging === 'min') {
        const newMin = Math.min(value, localMax - STEP)
        setLocalMin(newMin)
        onMinChange(newMin === MIN_BUDGET ? '' : newMin)
      } else if (isDragging === 'max') {
        const newMax = Math.max(value, localMin + STEP)
        setLocalMax(newMax)
        onMaxChange(newMax === MAX_BUDGET ? '' : newMax)
      }
    },
    [isDragging, localMin, localMax, onMinChange, onMaxChange]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  const handleKeyDown = (type) => (e) => {
    const step = e.shiftKey ? STEP * 10 : STEP
    let newValue

    if (type === 'min') {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        newValue = Math.min(localMin + step, localMax - STEP)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        newValue = Math.max(localMin - step, MIN_BUDGET)
      } else {
        return
      }
      e.preventDefault()
      setLocalMin(newValue)
      onMinChange(newValue === MIN_BUDGET ? '' : newValue)
    } else {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        newValue = Math.min(localMax + step, MAX_BUDGET)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        newValue = Math.max(localMax - step, localMin + STEP)
      } else {
        return
      }
      e.preventDefault()
      setLocalMax(newValue)
      onMaxChange(newValue === MAX_BUDGET ? '' : newValue)
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const formatPrice = (value) => {
    if (value >= MAX_BUDGET) return `${CURRENCIES.GBP.symbol}40,000+`
    return formatPriceWithCurrency(value)
  }

  const minPercent = getPercentage(localMin)
  const maxPercent = getPercentage(localMax)

  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-700 mb-2">Your budget (per night)</h3>
      
      {/* Price range display */}
      <div className="mb-3">
        <p className="text-sm font-medium text-slate-800">
          {formatPrice(localMin)} – {formatPrice(localMax)}
        </p>
      </div>

      {/* Histogram visualization */}
      <div className="mb-4 h-10 flex items-end gap-[1px]">
        {histogramData.map((height, index) => {
          const barPosition = (index / histogramData.length) * 100
          const isInRange = barPosition >= minPercent && barPosition <= maxPercent
          return (
            <div
              key={index}
              className="flex-1 rounded-t"
              style={{
                height: `${Math.max(15, height)}%`,
                backgroundColor: isInRange ? '#0d9488' : '#cbd5e1',
                transition: 'background-color 0.15s ease',
              }}
            />
          )
        })}
      </div>

      {/* Range slider */}
      <div className="relative h-2">
        <div
          ref={sliderRef}
          className="relative h-2 bg-slate-200 rounded-full cursor-pointer"
        >
          {/* Active range track */}
          <div
            className="absolute h-2 bg-teal-600 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          

          {/* Min handle */}
          <div
            className="absolute w-5 h-5 bg-white border-2 border-teal-600 rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
            style={{ left: `${minPercent}%` }}
            onMouseDown={handleMouseDown('min')}
            onKeyDown={handleKeyDown('min')}
            role="slider"
            aria-valuemin={MIN_BUDGET}
            aria-valuemax={MAX_BUDGET}
            aria-valuenow={localMin}
            aria-label="Minimum budget"
            tabIndex={0}
          />

          {/* Max handle */}
          <div
            className="absolute w-5 h-5 bg-white border-2 border-teal-600 rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
            style={{ left: `${maxPercent}%` }}
            onMouseDown={handleMouseDown('max')}
            onKeyDown={handleKeyDown('max')}
            role="slider"
            aria-valuemin={MIN_BUDGET}
            aria-valuemax={MAX_BUDGET}
            aria-valuenow={localMax}
            aria-label="Maximum budget"
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Generic filter sidebar used on results pages.
 * UI-first: exposes filter changes to the parent via onChange,
 * which can then filter mock results in-memory.
 *
 * @param {'flights'|'hotels'|'ai'} mode
 * @param {Function} onChange - Called with latest filter object
 * @param {Object} [flightOptions] - Optional options for flights mode (e.g. airlines list)
 */
export default function FilterSidebar({ mode = 'hotels', onChange, flightOptions = {} }) {
  const [filters, setFilters] = useState(() => {
    if (mode === 'flights') {
      return {
        stops: 'any', // any | nonstop | 1 | 2plus
        maxPrice: '',
        timeOfDay: 'any', // any | morning | afternoon | evening | night
        airlines: [],
        maxDurationHours: '',
        departureAirports: [],
        arrivalAirports: [],
      }
    }

    if (mode === 'ai') {
      return {
        maxBudget: '',
        minNights: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        propertyTypes: [],
        popularAmenities: [],
        maxDistanceKm: '',
      }
    }

    // hotels
    return {
      minPrice: '',
      maxPrice: '',
      minRating: '',
      propertyTypes: [],
      popularAmenities: [],
      maxDistanceKm: '',
    }
  })

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(filters)
    }
  }, [filters, onChange])

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) || '' : e.target.value
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleStopsChange = (value) => {
    setFilters((prev) => ({ ...prev, stops: value }))
  }

  const handleAirlineToggle = (airline) => {
    setFilters((prev) => {
      const current = Array.isArray(prev.airlines) ? prev.airlines : []
      const exists = current.includes(airline)
      const next = exists ? current.filter((a) => a !== airline) : [...current, airline]
      return { ...prev, airlines: next }
    })
  }

  const handleAirportToggle = (kind, code) => {
    const key = kind === 'arrival' ? 'arrivalAirports' : 'departureAirports'
    setFilters((prev) => {
      const current = Array.isArray(prev[key]) ? prev[key] : []
      const exists = current.includes(code)
      const next = exists ? current.filter((c) => c !== code) : [...current, code]
      return { ...prev, [key]: next }
    })
  }

  return (
    <aside className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-100 p-4 md:p-5 lg:p-6 space-y-5 md:sticky md:top-4 self-start w-full md:w-auto">
      <h2 className="text-base md:text-lg font-semibold text-slate-800 mb-1">
        {mode === 'flights' ? 'Smart filters' : 'Filter by'}
      </h2>
      {mode === 'flights' && flightOptions?.totalCount > 0 && (
        <p className="text-[11px] text-slate-500">
          {(flightOptions.filteredCount ?? flightOptions.totalCount) || 0} of{' '}
          {flightOptions.totalCount} mock flights
        </p>
      )}
      <p className="text-xs text-slate-500">
        Fine-tune your {mode === 'flights' ? 'flight search' : mode === 'ai' ? 'AI matches' : 'stay'} with
        flexible filters. All data is mock-only for this MVP.
      </p>

      {mode === 'flights' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Stops</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {[
                { value: 'any', label: 'Any' },
                { value: 'nonstop', label: 'Nonstop' },
                { value: '1', label: '1 stop' },
                { value: '2plus', label: '2+ stops' },
              ].map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stops"
                    value={option.value}
                    checked={filters.stops === option.value}
                    onChange={() => handleStopsChange(option.value)}
                    className="h-3 w-3 text-teal-600 border-slate-300 focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Maximum price (per person)</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{CURRENCIES.GBP.symbol}</span>
              <input
                type="number"
                min="0"
                step="10"
                value={filters.maxPrice}
                onChange={handleChange('maxPrice')}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Departure time</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {[
                { value: 'any', label: 'Any time' },
                { value: 'morning', label: 'Morning (05:00–12:00)' },
                { value: 'afternoon', label: 'Afternoon (12:00–18:00)' },
                { value: 'evening', label: 'Evening (18:00–23:00)' },
                { value: 'night', label: 'Night (23:00–05:00)' },
              ].map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time-of-day"
                    value={option.value}
                    checked={filters.timeOfDay === option.value}
                    onChange={handleChange('timeOfDay')}
                    className="h-3 w-3 text-teal-600 border-slate-300 focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Airlines</h3>
            <div className="max-h-40 overflow-y-auto border border-slate-100 rounded-lg p-2 space-y-1.5">
              {(flightOptions.airlines || []).length === 0 && (
                <p className="text-[11px] text-slate-400">Airlines will appear here after a search.</p>
              )}
              {(flightOptions.airlines || []).map((airline) => (
                <label key={airline} className="flex items-center justify-between gap-2 text-xs cursor-pointer">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.airlines?.includes(airline)}
                      onChange={() => handleAirlineToggle(airline)}
                      className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                    />
                    <span className="text-slate-700">{airline}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {(flightOptions.departureAirports?.length || flightOptions.arrivalAirports?.length) > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-700 mb-2">Airports</h3>
              <div className="space-y-2 text-xs">
                {flightOptions.departureAirports?.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">Departure</p>
                    <div className="space-y-1">
                      {flightOptions.departureAirports.map((ap) => (
                        <label
                          key={`dep-${ap.code}`}
                          className="flex items-center justify-between gap-2 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.departureAirports?.includes(ap.code)}
                              onChange={() => handleAirportToggle('departure', ap.code)}
                              className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                            />
                            <span className="text-slate-700">
                              {ap.city} ({ap.code})
                            </span>
                          </span>
                          {typeof ap.count === 'number' && (
                            <span className="text-[11px] text-slate-400">{ap.count}</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {flightOptions.arrivalAirports?.length > 0 && (
                  <div className="pt-1 border-t border-slate-100 mt-2">
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">Arrival</p>
                    <div className="space-y-1">
                      {flightOptions.arrivalAirports.map((ap) => (
                        <label
                          key={`arr-${ap.code}`}
                          className="flex items-center justify-between gap-2 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.arrivalAirports?.includes(ap.code)}
                              onChange={() => handleAirportToggle('arrival', ap.code)}
                              className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                            />
                            <span className="text-slate-700">
                              {ap.city} ({ap.code})
                            </span>
                          </span>
                          {typeof ap.count === 'number' && (
                            <span className="text-[11px] text-slate-400">{ap.count}</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Maximum duration</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="24"
                step="1"
                value={filters.maxDurationHours}
                onChange={handleChange('maxDurationHours')}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xs text-slate-500">hours</span>
            </div>
          </div>
        </div>
      )}

      {mode === 'hotels' && (
        <div className="space-y-4">
          <BudgetRangeSlider
            minPrice={filters.minPrice || ''}
            maxPrice={filters.maxPrice || ''}
            onMinChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value }))}
            onMaxChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
          />

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Review score</h3>
            <select
              value={filters.minRating}
              onChange={handleChange('minRating')}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs"
            >
              <option value="">Any</option>
              <option value="9">Wonderful 9+</option>
              <option value="8">Very good 8+</option>
              <option value="7">Good 7+</option>
            </select>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Popular filters</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {['Free WiFi', 'Breakfast included', 'Pool', 'Parking'].map((amenity) => (
                <label key={amenity} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.popularAmenities?.includes(amenity)}
                    onChange={() => {
                      setFilters((prev) => {
                        const current = prev.popularAmenities || []
                        const exists = current.includes(amenity)
                        const next = exists
                          ? current.filter((a) => a !== amenity)
                          : [...current, amenity]
                        return { ...prev, popularAmenities: next }
                      })
                    }}
                    className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Property type</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {['Hotel', 'Resort', 'Apartment', 'Guesthouse'].map((type) => (
                <label key={type} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.propertyTypes?.includes(type)}
                    onChange={() => {
                      setFilters((prev) => {
                        const current = prev.propertyTypes || []
                        const exists = current.includes(type)
                        const next = exists
                          ? current.filter((t) => t !== type)
                          : [...current, type]
                        return { ...prev, propertyTypes: next }
                      })
                    }}
                    className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Distance from center</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                value={filters.maxDistanceKm}
                onChange={handleChange('maxDistanceKm')}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xs text-slate-500">km max</span>
            </div>
          </div>
        </div>
      )}

      {mode === 'ai' && (
        <div className="space-y-4">
          <BudgetRangeSlider
            minPrice={filters.minPrice || ''}
            maxPrice={filters.maxPrice || ''}
            onMinChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value }))}
            onMaxChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
          />

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Review score</h3>
            <select
              value={filters.minRating}
              onChange={handleChange('minRating')}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs"
            >
              <option value="">Any</option>
              <option value="9">Wonderful 9+</option>
              <option value="8">Very good 8+</option>
              <option value="7">Good 7+</option>
            </select>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Popular filters</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {['Free WiFi', 'Breakfast included', 'Pool', 'Parking'].map((amenity) => (
                <label key={amenity} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.popularAmenities?.includes(amenity)}
                    onChange={() => {
                      setFilters((prev) => {
                        const current = prev.popularAmenities || []
                        const exists = current.includes(amenity)
                        const next = exists
                          ? current.filter((a) => a !== amenity)
                          : [...current, amenity]
                        return { ...prev, popularAmenities: next }
                      })
                    }}
                    className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-700 mb-2">Property type</h3>
            <div className="flex flex-col gap-1.5 text-xs">
              {['Hotel', 'Resort', 'Apartment', 'Guesthouse'].map((type) => (
                <label key={type} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.propertyTypes?.includes(type)}
                    onChange={() => {
                      setFilters((prev) => {
                        const current = prev.propertyTypes || []
                        const exists = current.includes(type)
                        const next = exists
                          ? current.filter((t) => t !== type)
                          : [...current, type]
                        return { ...prev, propertyTypes: next }
                      })
                    }}
                    className="h-3 w-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-600"
                  />
                  <span className="text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Distance from center</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="0"
                value={filters.maxDistanceKm}
                onChange={handleChange('maxDistanceKm')}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-slate-700 placeholder:text-slate-400 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="flex flex-col items-center justify-center min-w-[50px]">
                <span className="text-xs font-medium text-slate-600">km</span>
                <span className="text-[10px] text-slate-400">max</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Budget per person</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center min-w-[45px] px-2 py-2 bg-white rounded-lg border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">GBP</span>
              </div>
              <input
                type="number"
                min="0"
                step="5000"
                placeholder="Enter amount"
                value={filters.maxBudget}
                onChange={handleChange('maxBudget')}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-slate-700 placeholder:text-slate-400 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Minimum nights</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="21"
                placeholder="1"
                value={filters.minNights}
                onChange={handleChange('minNights')}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-slate-700 placeholder:text-slate-400 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="flex items-center justify-center min-w-[60px] px-2 py-2 bg-white rounded-lg border border-slate-200">
                <span className="text-xs font-medium text-slate-600">nights</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}


