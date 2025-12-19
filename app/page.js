import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Link from 'next/link'
import AiHolidayPrompt from '../components/AiHolidayPrompt'
import WeekendDeals from '../components/WeekendDeals'
import TopUniqueProperties from '../components/TopUniqueProperties'
import HomesGuestsLove from '../components/HomesGuestsLove'
import PopularDestinations from '../components/PopularDestinations'

export const metadata = {
  title: 'Holivo - Travel Comparison Platform',
  description: 'Compare and find the best travel deals for flights, hotels, and car rentals',
}

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with AI helper entry point */}
        <section className="mb-10 md:mb-14 py-8 md:py-10">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 mb-3 md:mb-4">
              Where to next with Holivo?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Start with stays, flights, or let our AI-style helper suggest holiday ideas using mock
              data that will later be powered by live partner prices.
            </p>
          </div>

          <div className="w-full space-y-4">
            <Card className="border-teal-200 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
                    Quick search
                  </p>
                  <p className="text-sm text-gray-600">
                    Jump straight into flights or stays to explore the Booking.com-style layouts.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                  <Link href="/flights">
                    <Button variant="primary" size="sm">Search flights</Button>
                  </Link>
                  <Link href="/hotels">
                    <Button variant="outline" size="sm">Search stays</Button>
                  </Link>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                All results are mock-only for this phase. In production, selecting a deal will take
                you to our partner sites to complete your booking.
              </p>
            </Card>

            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white w-full">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-wide text-teal-700 font-semibold">
                  New · AI holiday helper
                </p>
                <p className="text-sm text-gray-700">
                  Prefer to start with an idea instead of dates and destinations? Describe your ideal
                  break and we&apos;ll show AI-style mock matches.
                </p>
                <AiHolidayPrompt />
              </div>
            </Card>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2 md:mb-4">Book Everything You Need</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 md:mb-12">One platform for all your travel needs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="hover:border-teal-300 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center flex flex-col">
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">✈️</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Flights</h3>
              <p className="text-gray-600 mb-6 flex-grow">Compare prices from hundreds of airlines and find the best flight deals for your journey.</p>
              <Link href="/flights" className="mt-auto">
                <Button variant="primary" size="md" className="w-full">Search Flights</Button>
              </Link>
            </Card>
            
            <Card className="hover:border-teal-300 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center flex flex-col">
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">🏨</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Hotels</h3>
              <p className="text-gray-600 mb-6 flex-grow">Discover the perfect accommodation with our extensive selection of hotels and resorts worldwide.</p>
              <Link href="/hotels" className="mt-auto">
                <Button variant="primary" size="md" className="w-full">Search Hotels</Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Weekend Deals Section */}
        <WeekendDeals />

        {/* Top Unique Properties Section */}
        <TopUniqueProperties />

        {/* Homes Guests Love Section */}
        <HomesGuestsLove />

        {/* Features Section */}
        <section className="mb-12 md:mb-16 bg-teal-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-teal-800 mb-2 md:mb-4">Why Choose Holivo?</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 md:mb-12">Everything you need for seamless travel planning</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">💰</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Compare prices from multiple providers to ensure you get the best deal</p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">⚡</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast & Easy</h3>
              <p className="text-sm text-gray-600">Search and compare in seconds with our intuitive interface</p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">🔒</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure redirect</h3>
              <p className="text-sm text-gray-600">
                We&apos;ll send you to trusted partner sites over secure connections to complete your
                booking.
              </p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">🌍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Worldwide</h3>
              <p className="text-sm text-gray-600">Access to destinations and providers around the globe</p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-12 md:mb-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">1000+</div>
              <div className="text-xs sm:text-sm md:text-base text-teal-100">Destinations</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-teal-100">Airlines</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">10K+</div>
              <div className="text-xs sm:text-sm md:text-base text-teal-100">Hotels</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">50K+</div>
              <div className="text-xs sm:text-sm md:text-base text-teal-100">Happy Travelers</div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-12 md:mb-16">
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-300 text-center py-8 md:py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-3 md:mb-4">Ready to Start Your Journey?</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto">
              Compare prices and find the best deals today. When you&apos;re ready, view booking
              options on partner sites with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/flights" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto">Search Now</Button>
              </Link>
              <Link href="/compare" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto">View Comparisons</Button>
              </Link>
            </div>
          </Card>
        </section>

        {/* Popular Destinations Section */}
        <PopularDestinations />

      </div>
    </Layout>
  )
}
