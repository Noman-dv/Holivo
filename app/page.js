import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Holivo - Travel Comparison Platform',
  description: 'Compare and find the best travel deals for flights, hotels, and car rentals',
}

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16 py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-600 mb-4 md:mb-6">
            Plan Your Perfect Trip
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
            Compare prices, find the best deals, and book everything you need for your next adventure—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/flights" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">Start Planning</Button>
            </Link>
            <Link href="/compare" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full sm:w-auto">Compare Deals</Button>
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2 md:mb-4">Book Everything You Need</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 md:mb-12">One platform for all your travel needs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
            
            <Card className="hover:border-teal-300 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center flex flex-col">
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">🚗</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Car Rentals</h3>
              <p className="text-gray-600 mb-6 flex-grow">Find the perfect rental car for your trip with competitive prices from trusted providers.</p>
              <Link href="/cars" className="mt-auto">
                <Button variant="primary" size="md" className="w-full">Search Cars</Button>
              </Link>
            </Card>
          </div>
        </section>

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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Booking</h3>
              <p className="text-sm text-gray-600">Your information is safe with our secure booking system</p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">🌍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Worldwide</h3>
              <p className="text-sm text-gray-600">Access to destinations and providers around the globe</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2 md:mb-4">How It Works</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 md:mb-12">Plan your trip in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-all duration-300 hover:bg-teal-700 hover:scale-110 hover:shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Search</h3>
              <p className="text-gray-600">Enter your travel details and preferences to find the best options</p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-all duration-300 hover:bg-teal-700 hover:scale-110 hover:shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Compare</h3>
              <p className="text-gray-600">View and compare prices, features, and reviews from multiple providers</p>
            </div>
            <div className="text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-all duration-300 hover:bg-teal-700 hover:scale-110 hover:shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Book</h3>
              <p className="text-gray-600">Select your preferred option and complete your booking securely</p>
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

        {/* Benefits Section */}
        <section className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <Card className="border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="text-3xl transition-transform duration-300 hover:scale-110">🎯</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Comparison</h3>
                  <p className="text-gray-600">Our advanced algorithm compares prices, ratings, and features to help you make the best decision.</p>
                </div>
              </div>
            </Card>
            <Card className="border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="text-3xl transition-transform duration-300 hover:scale-110">📱</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
                  <p className="text-gray-600">Plan and book your trip from anywhere, on any device, at any time.</p>
                </div>
              </div>
            </Card>
            <Card className="border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="text-3xl transition-transform duration-300 hover:scale-110">💳</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Payment</h3>
                  <p className="text-gray-600">Multiple payment options available for your convenience and security.</p>
                </div>
              </div>
            </Card>
            <Card className="border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="text-3xl transition-transform duration-300 hover:scale-110">🛡️</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Our customer support team is always ready to help you with any questions or concerns.</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-12 md:mb-16">
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-300 text-center py-8 md:py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-3 md:mb-4">Ready to Start Your Journey?</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto">
              Compare prices, find the best deals, and book your perfect trip today. Your next adventure is just a click away.
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

        {/* Project Status Section */}
        <section className="mb-8">
          <Card className="bg-teal-50 border-teal-200">
            <h3 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-teal-800">Platform Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Next.js configured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Tailwind CSS ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Mock data available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">State management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">API services ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Routing organized</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Layout>
  )
}
