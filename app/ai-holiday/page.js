'use client'

import { useState, useEffect, useMemo } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import { useStore } from '../../store/useStore'
import { generateAiHoliday } from '../../services/aiHolidayService'
import FilterSidebar from '../../components/FilterSidebar'
import AiHolidayResultCard from '../../components/AiHolidayResultCard'

export default function AiHolidayPage() {
  const { filters, setAiBrief, searchResults, updateSearchResults } = useStore()
  const [prompt, setPrompt] = useState(filters.aiBrief || '')
  const [loading, setLoading] = useState(false)
  const [sidebarFilters, setSidebarFilters] = useState({})

  useEffect(() => {
    if (filters.aiBrief && (!searchResults.aiHolidays || searchResults.aiHolidays.length === 0)) {
      handleSearch(filters.aiBrief, sidebarFilters.maxBudget)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async (nextPrompt, maxBudget) => {
    if (loading) return

    setLoading(true)
    try {
      const results = await generateAiHoliday({
        prompt: nextPrompt,
        maxBudget: maxBudget || sidebarFilters.maxBudget || filters.budgetPerPerson,
      })
      updateSearchResults('aiHolidays', results)
      setAiBrief(nextPrompt)
    } catch (error) {
      console.error('Error generating AI holiday suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    await handleSearch(prompt.trim(), sidebarFilters.maxBudget)
  }

  const examplePrompts = [
    '3-day budget trip from Lahore under £150 for two people',
    'Anywhere warm in March for under £350',
    'Romantic weekend beach break within 3 hours flight',
  ]

  // Filter AI holidays based on sidebar filters
  const filteredHolidays = useMemo(() => {
    let results = searchResults.aiHolidays || []

    if (sidebarFilters.minPrice) {
      const minPrice = Number(sidebarFilters.minPrice)
      results = results.filter((holiday) => {
        const pricePerNight = holiday.estimatedBudget / (holiday.nights || 1)
        return pricePerNight >= minPrice
      })
    }

    if (sidebarFilters.maxPrice) {
      const maxPrice = Number(sidebarFilters.maxPrice)
      results = results.filter((holiday) => {
        const pricePerNight = holiday.estimatedBudget / (holiday.nights || 1)
        return pricePerNight <= maxPrice
      })
    }

    if (sidebarFilters.minRating) {
      const minRating = Number(sidebarFilters.minRating)
      results = results.filter((holiday) => {
        const rating = holiday.rating || 0
        return rating >= minRating
      })
    }

    if (Array.isArray(sidebarFilters.propertyTypes) && sidebarFilters.propertyTypes.length > 0) {
      results = results.filter((holiday) =>
        sidebarFilters.propertyTypes.includes(holiday.propertyType)
      )
    }

    if (
      Array.isArray(sidebarFilters.popularAmenities) &&
      sidebarFilters.popularAmenities.length > 0
    ) {
      results = results.filter((holiday) => {
        const amenities = holiday.amenities || []
        return sidebarFilters.popularAmenities.every((a) => amenities.includes(a))
      })
    }

    if (sidebarFilters.maxDistanceKm) {
      const maxDistance = Number(sidebarFilters.maxDistanceKm)
      results = results.filter((holiday) => {
        if (typeof holiday.distanceFromCenterKm !== 'number') return true
        return holiday.distanceFromCenterKm <= maxDistance
      })
    }

    if (sidebarFilters.maxBudget) {
      const maxBudget = Number(sidebarFilters.maxBudget)
      results = results.filter((holiday) => holiday.estimatedBudget <= maxBudget)
    }

    if (sidebarFilters.minNights) {
      const minNights = Number(sidebarFilters.minNights)
      results = results.filter((holiday) => (holiday.nights || 0) >= minNights)
    }

    return results
  }, [searchResults.aiHolidays, sidebarFilters])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Hero */}
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI holiday helper</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Describe your perfect holiday. We&apos;ll match it with mock trips.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            This page demonstrates how AI-powered trip ideas will look. Results come from structured
            mock data only; in production, we&apos;ll combine AI with live partner prices.
          </p>
        </section>

        {/* Prompt input */}
        <Card className="border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">
                Tell Holivo what kind of holiday you&apos;re looking for
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: 4-night family trip from Lahore in January, near the beach, under £300 per person."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm resize-vertical"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700">Need inspiration?</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => {
                      setPrompt(text)
                      handleSearch(text, sidebarFilters.maxBudget)
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading || !prompt.trim()}
                className="w-full sm:w-auto"
              >
                {loading ? 'Thinking…' : 'Generate AI holiday ideas'}
              </Button>
              <p className="text-xs text-slate-500 sm:self-center">
                Mock-only preview. Final deals will open on partner sites.
              </p>
            </div>
          </form>
        </Card>

        {/* Layout with filters + results */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="md:col-span-4 lg:col-span-3">
            <FilterSidebar mode="ai" onChange={setSidebarFilters} />
          </div>

          <div className="space-y-4 md:col-span-8 lg:col-span-9">
            {loading && (
              <Card className="border-slate-200">
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                  <p className="mt-2 text-slate-600 text-sm">Gathering AI-style suggestions…</p>
                </div>
              </Card>
            )}

            {!loading && searchResults.aiHolidays && searchResults.aiHolidays.length > 0 && (
              <>
                {filteredHolidays.length > 0 ? (
                  <div className="space-y-3">
                    {filteredHolidays.map((holiday) => (
                      <AiHolidayResultCard key={holiday.id} holiday={holiday} />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-teal-50 border-teal-200">
                    <h3 className="text-lg font-semibold mb-2 text-teal-800">No matches found</h3>
                    <p className="text-sm text-slate-700 mb-2">
                      Try adjusting your filters to see more results.
                    </p>
                  </Card>
                )}
              </>
            )}

            {!loading &&
              (!searchResults.aiHolidays || searchResults.aiHolidays.length === 0) && (
                <Card className="bg-teal-50 border-teal-200">
                  <h3 className="text-lg font-semibold mb-2 text-teal-800">No ideas yet</h3>
                  <p className="text-sm text-slate-700 mb-2">
                    Share a short brief above or tap one of the example prompts to see how AI-matched
                    holidays will be displayed.
                  </p>
                </Card>
              )}
          </div>
        </section>
      </div>
    </Layout>
  )
}


