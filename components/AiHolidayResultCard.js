import Card from './Card'
import Button from './Button'

/**
 * Card used on the AI Holiday results page.
 * Combines destination, hotel and flight-style information from mock data.
 */
export default function AiHolidayResultCard({ holiday }) {
  if (!holiday) return null

  // Budget is already in USD
  const budgetUSD = holiday.estimatedBudget
  const pricePerNight = Math.round(budgetUSD / (holiday.nights || 1))

  return (
    <Card className="border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Imagery / destination */}
        <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
          <div className="relative w-full h-52 md:h-56 rounded-xl overflow-hidden bg-slate-100">
            <img
              src={holiday.image}
              alt={holiday.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="bg-teal-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                AI match
              </span>
              {holiday.badge && (
                <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                  {holiday.badge}
                </span>
              )}
            </div>
            {holiday.score && (
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wide">Match</p>
                <p className="text-lg font-bold text-teal-600 leading-none">{holiday.score}%</p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {/* Title and location */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                {holiday.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {holiday.destination}
                </span>
                <span>•</span>
                <span>{holiday.nights} {holiday.nights === 1 ? 'night' : 'nights'}</span>
                <span>•</span>
                <span className="text-teal-600 font-medium">{holiday.theme}</span>
              </div>
            </div>

            {/* Summary */}
            {holiday.summary && (
              <p className="text-sm text-slate-700 leading-relaxed">{holiday.summary}</p>
            )}

            {/* Highlights */}
            {holiday.highlights && holiday.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {holiday.highlights.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md border border-teal-100 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              <p className="mb-1">{holiday.nights} {holiday.nights === 1 ? 'night' : 'nights'}, 2 adults</p>
              <p>Mock data only. Final prices from partner sites.</p>
            </div>

            <div className="flex items-end gap-4 sm:gap-6">
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-0.5">
                  ${budgetUSD.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  ${pricePerNight.toLocaleString()} per night
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  + taxes and fees
                </p>
              </div>
              {/* <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                See availability &gt;
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}


