import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Compare - Holivo',
  description: 'Compare your selected flights, hotels, and car rentals',
}

export default function ComparePage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">Compare Your Selections</h1>
          <p className="text-lg text-gray-600">
            Review and compare your selected flights, hotels, and car rentals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-teal-200 hover:border-teal-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Selected Flight</h2>
            <p className="text-gray-600 mb-4 text-sm">No flight selected yet</p>
            <Link href="/flights">
              <Button variant="outline" size="sm" className="w-full">Select Flight</Button>
            </Link>
          </Card>

          <Card className="border-teal-200 hover:border-teal-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Selected Hotel</h2>
            <p className="text-gray-600 mb-4 text-sm">No hotel selected yet</p>
            <Link href="/hotels">
              <Button variant="outline" size="sm" className="w-full">Select Hotel</Button>
            </Link>
          </Card>

          <Card className="border-teal-200 hover:border-teal-400 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Selected Car</h2>
            <p className="text-gray-600 mb-4 text-sm">No car selected yet</p>
            <Link href="/cars">
              <Button variant="outline" size="sm" className="w-full">Select Car</Button>
            </Link>
          </Card>
        </div>

        <Card className="bg-teal-50 border-teal-200">
          <h3 className="text-xl font-semibold mb-4 text-teal-800">Total Price</h3>
          <p className="text-3xl font-bold text-teal-600 mb-4">$0.00</p>
          <p className="text-gray-600 mb-4">
            Select flights, hotels, and car rentals to see your total trip cost
          </p>
          <div className="flex gap-4">
            <Button variant="primary" disabled>Complete Booking</Button>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

