'use client'

import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Card from './Card'
import { searchHotels } from '../services/hotelService'
import { formatPriceWithCurrency } from '../lib/currency'

/**
 * Weekend Deals Section Component
 * Displays hotels with weekend deals in a SwiperJS carousel
 */
export default function WeekendDeals() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null)

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const results = await searchHotels({})
        // Use all hotels from the hotels page (same data)
        setHotels(results)
      } catch (error) {
        console.error('Error loading weekend deals:', error)
      } finally {
        setLoading(false)
      }
    }
    loadHotels()
  }, [])

  // Update navigation after swiper is initialized
  useEffect(() => {
    if (swiperRef.current && hotels.length > 0) {
      swiperRef.current.update()
    }
  }, [hotels.length])

  const getRatingLabel = (rating) => {
    if (rating >= 9) return 'Exceptional'
    if (rating >= 8) return 'Very good'
    if (rating >= 7) return 'Good'
    return 'Fair'
  }

  // Calculate discounted price for weekend deals
  // Original price should match hotel page (pricePerNight * 2 for 2 nights)
  // Discounted price is 20% off the original
  const getDisplayPrice = (hotel) => {
    const nights = hotel.weekendDeal?.nights || 2
    // Original price = price per night * number of nights (matches hotel page)
    const originalPrice = hotel.pricePerNight * nights
    // Discounted price = 20% off original
    const discountedPrice = originalPrice * 0.8
    
    return {
      discounted: discountedPrice,
      original: originalPrice
    }
  }

  if (loading) {
    return (
      <section className="mb-12 md:mb-16">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading deals...</p>
        </div>
      </section>
    )
  }

  if (hotels.length === 0) {
    return null
  }

  return (
    <section className="mb-12 md:mb-16">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Deals for the weekend</h2>
        <p className="text-sm sm:text-base text-gray-600">Save on stays for 26 December - 28 December</p>
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
              nextEl: '.swiper-button-next-weekend',
              prevEl: '.swiper-button-prev-weekend',
            }}
            className="weekend-deals-swiper"
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
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
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

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {hotel.isGenius && (
                      <span className="bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded">
                        Genius
                      </span>
                    )}
                    {hotel.weekendDeal?.hasDeal && (
                      <span className="bg-green-600 text-white text-[10px] font-semibold px-2 py-1 rounded">
                        Late Escape Deal
                      </span>
                    )}
                  </div>
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
                    <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0" style={{ backgroundColor: '#009689' }}>
                      {hotel.rating % 1 === 0 ? hotel.rating.toFixed(0) : hotel.rating.toFixed(1)}
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-gray-800">{getRatingLabel(hotel.rating)}</p>
                      <p className="text-gray-500">
                        Based on {hotel.weekendDeal?.reviewCount || 0} reviews
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">
                      {hotel.weekendDeal?.nights || 2} nights
                    </p>
                    <div className="flex items-baseline gap-2">
                      {(() => {
                        const dealPrice = getDisplayPrice(hotel)
                        return (
                          <>
                            <span className="text-lg font-bold text-teal-600">
                              {formatPriceWithCurrency(dealPrice.discounted)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPriceWithCurrency(dealPrice.original)}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          type="button"
          className="swiper-button-prev-weekend absolute left-[-10px] md:left-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
          className="swiper-button-next-weekend absolute right-[-10px] md:right-[-20px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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

