import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Car Rentals - Holivo',
  description: 'Search and compare car rental prices',
}

export default function CarsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">Search Car Rentals</h1>
          <p className="text-lg text-gray-600">
            Find the perfect rental car for your travel needs
          </p>
        </div>

        <Card className="mb-8 border-teal-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Car Rental Search</h2>
          <p className="text-gray-600 mb-4">
            Car rental search functionality will be implemented here. This page is ready for integration with the car service.
          </p>
          <div className="flex gap-4">
            <Button variant="primary">Search Cars</Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </Card>

        <Card className="bg-teal-50 border-teal-200">
          <h3 className="text-xl font-semibold mb-2 text-teal-800">Available Options</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Search by pickup and drop-off locations</li>
            <li>Filter by vehicle type, size, and features</li>
            <li>Compare prices from multiple rental companies</li>
            <li>View vehicle details and specifications</li>
            <li>Book your rental car in advance</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

