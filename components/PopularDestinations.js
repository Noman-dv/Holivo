'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * Popular Destinations Section Component
 * Displays popular destinations with tabs for different categories
 */
export default function PopularDestinations() {
  const [activeTab, setActiveTab] = useState('domestic')

  const tabs = [
    { id: 'domestic', label: 'Domestic cities' },
    { id: 'international', label: 'International cities' },
    { id: 'regions', label: 'Regions' },
    { id: 'countries', label: 'Countries' },
    { id: 'places', label: 'Places to stay' },
  ]

  const domesticCities = [
    'Islamabad',
    'Lahore',
    'Murree',
    'Karachi',
    'Swat',
    'Gujrānwāla',
    'Rawalpindi',
    'Bahawalpur',
    'Bhurban',
    'Dina',
    'Peshawar',
    'Dera Ghāzi Khān',
    'Sialkot',
    'Muzaffarabad',
    'Nathia Gali',
  ]

  const internationalCities = [
    'Dubai',
    'London',
    'New York',
    'Paris',
    'Istanbul',
    'Bangkok',
    'Singapore',
    'Tokyo',
    'Sydney',
    'Toronto',
    'Amsterdam',
    'Barcelona',
    'Rome',
    'Berlin',
    'Vienna',
  ]

  const regions = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Kashmir',
    'FATA',
  ]

  const countries = [
    'Pakistan',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Saudi Arabia',
    'Turkey',
    'Thailand',
    'Singapore',
    'Malaysia',
    'Qatar',
    'Oman',
    'Kuwait',
    'Bahrain',
  ]

  const placesToStay = [
    'Hotels',
    'Holiday Homes',
    'Apartments',
    'Resorts',
    'Villas',
    'Hostels',
    'B&Bs',
    'Guest Houses',
    'Unique places to stay',
  ]

  const getActiveContent = () => {
    switch (activeTab) {
      case 'domestic':
        return domesticCities
      case 'international':
        return internationalCities
      case 'regions':
        return regions
      case 'countries':
        return countries
      case 'places':
        return placesToStay
      default:
        return domesticCities
    }
  }

  const getLinkPath = (item, tab) => {
    if (tab === 'places') {
      return `/hotels?type=${item.toLowerCase().replace(/\s+/g, '-')}`
    }
    if (tab === 'domestic' || tab === 'international') {
      return `/hotels?city=${item.toLowerCase().replace(/\s+/g, '-')}`
    }
    if (tab === 'regions') {
      return `/hotels?region=${item.toLowerCase().replace(/\s+/g, '-')}`
    }
    if (tab === 'countries') {
      return `/hotels?country=${item.toLowerCase().replace(/\s+/g, '-')}`
    }
    return '/hotels'
  }

  const getLinkLabel = (item, tab) => {
    if (tab === 'domestic' || tab === 'international') {
      return `${item} hotels`
    }
    return item
  }

  return (
    <section className="mb-12 md:mb-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          Popular with travellers from Pakistan
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                activeTab === tab.id
                  ? 'text-teal-600 border-2 border-teal-600 bg-white'
                  : 'text-gray-700 hover:text-gray-900 bg-transparent border-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {getActiveContent().map((item, index) => (
            <Link
              key={index}
              href={getLinkPath(item, activeTab)}
              className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
            >
              {getLinkLabel(item, activeTab)}
            </Link>
          ))}
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-200 pt-6 space-y-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <Link href="/hotels?filter=countries" className="hover:text-teal-600">
              Countries
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=regions" className="hover:text-teal-600">
              Regions
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=cities" className="hover:text-teal-600">
              Cities
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=districts" className="hover:text-teal-600">
              Districts
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=airports" className="hover:text-teal-600">
              Airports
            </Link>
            <span>•</span>
            <Link href="/hotels" className="hover:text-teal-600">
              Hotels
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=places-of-interest" className="hover:text-teal-600">
              Places of interest
            </Link>
            <span>•</span>
            <Link href="/hotels?type=holiday-homes" className="hover:text-teal-600">
              Holiday Homes
            </Link>
            <span>•</span>
            <Link href="/hotels?type=apartments" className="hover:text-teal-600">
              Apartments
            </Link>
            <span>•</span>
            <Link href="/hotels?type=resorts" className="hover:text-teal-600">
              Resorts
            </Link>
            <span>•</span>
            <Link href="/hotels?type=villas" className="hover:text-teal-600">
              Villas
            </Link>
            <span>•</span>
            <Link href="/hotels?type=hostels" className="hover:text-teal-600">
              Hostels
            </Link>
            <span>•</span>
            <Link href="/hotels?type=bbs" className="hover:text-teal-600">
              B&Bs
            </Link>
            <span>•</span>
            <Link href="/hotels?type=guest-houses" className="hover:text-teal-600">
              Guest Houses
            </Link>
            <span>•</span>
            <Link href="/hotels?type=unique" className="hover:text-teal-600">
              Unique places to stay
            </Link>
            <span>•</span>
            <Link href="/hotels" className="hover:text-teal-600">
              All destinations
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <Link href="/flights" className="hover:text-teal-600">
              All flight destinations
            </Link>
            <span>•</span>
            <Link href="/cars" className="hover:text-teal-600">
              All car hire locations
            </Link>
            <span>•</span>
            <Link href="/hotels" className="hover:text-teal-600">
              All holiday destinations
            </Link>
            <span>•</span>
            <Link href="/guides" className="hover:text-teal-600">
              Guides
            </Link>
            <span>•</span>
            <Link href="/discover" className="hover:text-teal-600">
              Discover
            </Link>
            <span>•</span>
            <Link href="/reviews" className="hover:text-teal-600">
              Reviews
            </Link>
            <span>•</span>
            <Link href="/hotels?filter=monthly-stays" className="hover:text-teal-600">
              Discover monthly stays
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

