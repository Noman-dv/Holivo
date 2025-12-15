import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Flights - Holivo',
  description: 'Search and compare flight prices',
}

export default function FlightsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">Search Flights</h1>
          <p className="text-lg text-gray-600">
            Compare flight prices and find the best deals for your next trip
          </p>
        </div>

        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Flight Search</h2>
          <p className="text-gray-600 mb-4">
            Flight search functionality will be implemented here. This page is ready for integration with the flight service.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Search Flights</Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </Card>

        <Card className="bg-teal-50 border-teal-200">
          <h3 className="text-xl font-semibold mb-2 text-teal-800">How it works</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Enter your departure and destination cities</li>
            <li>Select your travel dates</li>
            <li>Choose number of passengers</li>
            <li>Compare prices from multiple airlines</li>
            <li>Book your preferred flight</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

