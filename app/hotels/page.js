import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Hotels - Holivo',
  description: 'Search and compare hotel prices',
}

export default function HotelsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">Search Hotels</h1>
          <p className="text-lg text-gray-600">
            Find the perfect accommodation for your trip at the best prices
          </p>
        </div>

        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hotel Search</h2>
          <p className="text-gray-600 mb-4">
            Hotel search functionality will be implemented here. This page is ready for integration with the hotel service.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Search Hotels</Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </Card>

        <Card className="bg-teal-50 border-teal-200">
          <h3 className="text-xl font-semibold mb-2 text-teal-800">Features</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Search by location, dates, and number of guests</li>
            <li>Filter by price range, ratings, and amenities</li>
            <li>Compare multiple hotel options</li>
            <li>View detailed hotel information and reviews</li>
            <li>Book directly through our platform</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

