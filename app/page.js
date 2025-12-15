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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-teal-600 mb-4">
            Welcome to Holivo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your travel comparison platform is ready for development!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:border-teal-300 transition-colors">
            <div className="text-3xl mb-3">✈️</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Flights</h2>
            <p className="text-gray-600 mb-4">Compare flight prices and find the best deals</p>
            <Link href="/flights">
              <Button variant="primary" size="sm" className="w-full">Search Flights</Button>
            </Link>
          </Card>
          
          <Card className="hover:border-teal-300 transition-colors">
            <div className="text-3xl mb-3">🏨</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Hotels</h2>
            <p className="text-gray-600 mb-4">Find the perfect accommodation for your trip</p>
            <Link href="/hotels">
              <Button variant="primary" size="sm" className="w-full">Search Hotels</Button>
            </Link>
          </Card>
          
          <Card className="hover:border-teal-300 transition-colors">
            <div className="text-3xl mb-3">🚗</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Car Rentals</h2>
            <p className="text-gray-600 mb-4">Rent a car for your travel needs</p>
            <Link href="/cars">
              <Button variant="primary" size="sm" className="w-full">Search Cars</Button>
            </Link>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Link href="/compare">
            <Button variant="secondary" size="lg">Compare Selections</Button>
          </Link>
        </div>

        <Card className="bg-teal-50 border-teal-200">
          <h3 className="text-lg font-semibold mb-2 text-teal-800">Project Status</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Next.js project initialized</li>
            <li>Tailwind CSS configured</li>
            <li>Folder structure created</li>
            <li>Mock data and services ready</li>
            <li>Global state management set up</li>
            <li>Organized routing structure</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

