import Card from './Card'
import Button from './Button'
import { formatPriceWithCurrency } from '../lib/currency'

/**
 * Rich hotel result card for search and AI results.
 * Uses mock hotel data only.
 */
export default function HotelResultCard({ hotel, badge, showDistance = true }) {
  if (!hotel) return null

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      )
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-sm">
          ☆
        </span>
      )
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-slate-300 text-sm">
          ★
        </span>
      )
    }

    return stars
  }

  const scoreLabel = hotel.rating >= 9 ? 'Wonderful' : hotel.rating >= 8 ? 'Very good' : 'Good'

  return (
    <Card className="border-slate-200 hover:border-teal-400 transition-colors">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Image */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="relative w-full h-44 md:h-48 rounded-lg overflow-hidden bg-slate-100">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            {badge && (
              <span className="absolute top-2 left-2 bg-amber-500 text-white text-[11px] font-semibold px-2 py-1 rounded">
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">{hotel.name}</h3>
              <p className="text-xs text-slate-600">
                {hotel.location.city} • {hotel.location.address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-teal-600 text-white rounded-md px-2 py-1 text-sm font-semibold">
                {hotel.rating.toFixed(1)}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-800">{scoreLabel}</p>
                <p className="text-slate-500">Guest reviews</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex">{renderStars(hotel.rating)}</div>
            <span className="text-slate-500">Based on sample data</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, index) => (
              <span
                key={index}
                className="text-[11px] bg-teal-50 text-teal-700 px-2 py-1 rounded-full border border-teal-100"
              >
                {amenity}
              </span>
            ))}
            <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-100">
              {hotel.available ? 'Available on partner sites' : 'Temporarily unavailable'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-1">
            <div className="text-xs text-slate-600">
              <p>2 nights • prices from partner sites</p>
            </div>

            <div className="flex items-end gap-3">
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-teal-600">
                  {formatPriceWithCurrency(hotel.pricePerNight)}
                </p>
                <p className="text-[11px] text-slate-500">per night • pay on partner site</p>
              </div>
              <Button variant="primary" size="sm" className="whitespace-nowrap">
                View deal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}


