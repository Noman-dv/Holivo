'use client'

import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Card from './Card'
import Link from 'next/link'
import { searchHotels } from '../services/hotelService'
import { formatPriceWithCurrency } from '../lib/currency'

/**
 * Homes Guests Love Section Component
 * Displays popular homes/properties in a SwiperJS carousel
 */
export default function HomesGuestsLove() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null)

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const results = await searchHotels({})
        setHotels(results)
      } catch (error) {
        console.error('Error loading homes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadHotels()
  }, [])

  useEffect(() => {
    if (swiperRef.current && hotels.length > 0) {
      swiperRef.current.update()
    }
  }, [hotels.length])

  const getRatingLabel = (rating) => {
    // Rating is on 10-point scale for display
    if (rating >= 9) return 'Exceptional'
    if (rating >= 8) return 'Excellent'
    if (rating >= 7) return 'Good'
    return 'Fair'
  }

  // Get starting price (for 2 nights)
  const getStartingPrice = (hotel) => {
    // Use pricePerNight * 2 for 2 nights as starting price
    return hotel.pricePerNight * 2
  }

  if (loading) {
    return (
      <section className="mb-12 md:mb-16">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading homes...</p>
        </div>
      </section>
    )
  }

  if (hotels.length === 0) {
    return null
  }

  return (
    <section className="mb-12 md:mb-16">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Homes guests love
          </h2>
        </div>
        <Link 
          href="/hotels" 
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base transition-colors"
        >
          Discover homes
        </Link>
      </div>

      <div className="relative">
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next-homes',
              prevEl: '.swiper-button-prev-homes',
            }}
            className="homes-guests-love-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {hotels.map((hotel) => (
              <SwiperSlide key={hotel.id}>
                <Card className="border-slate-200 hover:border-teal-400 transition-all duration-300 shadow-none hover:shadow-none h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Heart Icon */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                      aria-label="Add to favorites"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {hotel.location.city}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-white rounded-md px-2.5 py-1.5 text-sm font-semibold flex-shrink-0" style={{ backgroundColor: '#009689' }}>
                        {(hotel.rating * 2).toFixed(1)}
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold text-gray-800">{getRatingLabel(hotel.rating * 2)}</p>
                        <p className="text-gray-500">
                          {hotel.weekendDeal?.reviewCount || Math.floor(Math.random() * 3000) + 50} reviews
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        Starting from {formatPriceWithCurrency(getStartingPrice(hotel))}
                      </p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="swiper-button-prev-homes absolute left-[-10px] md:left-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          className="swiper-button-next-homes absolute right-[-10px] md:right-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}

