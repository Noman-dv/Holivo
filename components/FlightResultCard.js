import Card from './Card'
import Button from './Button'
import { formatPriceWithCurrency } from '../lib/currency'

/**
 * Rich flight result card inspired by Booking.com / Kayak layouts.
 * UI only, all data comes from mock services.
 */
export default function FlightResultCard({ flight }) {
  if (!flight) return null

  const formatTime = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isNonstop = flight.stops === 0

  return (
    <Card className="border-slate-200 hover:border-teal-400 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {flight.airline}
            </span>
            <span className="text-[11px] font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-100">
              {flight.class || 'Economy'}
            </span>
            {isNonstop ? (
              <span className="text-[11px] font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100">
                Nonstop
              </span>
            ) : (
              <span className="text-[11px] font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-100">
                {flight.stops} stop{flight.stops > 1 ? 's' : ''}
              </span>
            )}
            <span className="text-[11px] font-medium bg-teal-50 text-teal-700 px-2 py-1 rounded-full border border-teal-100">
              Beta
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-slate-700">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Departure</p>
              <p className="font-semibold text-slate-900">{formatTime(flight.departure.time)}</p>
              <p className="text-slate-600">{flight.departure.airport}</p>
              <p className="text-[11px] text-slate-500">{flight.departure.city}</p>
              
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Duration</p>
              <p className="font-semibold text-slate-900">{flight.duration}</p>
              <p className="text-[11px] text-slate-500">{isNonstop ? 'Direct flight' : 'Includes layovers'}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Arrival</p>
              <p className="font-semibold text-slate-900">{formatTime(flight.arrival.time)}</p>
              <p className="text-slate-600">{flight.arrival.airport}</p>
              <p className="text-[11px] text-slate-500">{flight.arrival.city}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Date</p>
              <p className="font-semibold text-slate-900">{formatDate(flight.departure.time)}</p>
              <p className="text-[11px] text-slate-500">Live prices from partners</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row lg:flex-col items-end gap-3 lg:min-w-[160px]">
          <div className="text-right">
            <p className="text-xl sm:text-2xl font-bold text-teal-600">{formatPriceWithCurrency(flight.price)}</p>
            <p className="text-[11px] text-slate-500">per person • redirects to partner site</p>
          </div>
          <Button variant="primary" size="sm" className="w-full lg:w-auto whitespace-nowrap">
            View booking options
          </Button>
        </div>
      </div>
    </Card>
  )
}


