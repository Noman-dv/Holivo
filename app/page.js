import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Holivo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your travel comparison platform is ready for development!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-semibold mb-2">Flights</h2>
            <p className="text-gray-600 mb-4">Compare flight prices and find the best deals</p>
            <Button variant="primary" size="sm">Search Flights</Button>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-2">Hotels</h2>
            <p className="text-gray-600 mb-4">Find the perfect accommodation for your trip</p>
            <Button variant="primary" size="sm">Search Hotels</Button>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-2">Car Rentals</h2>
            <p className="text-gray-600 mb-4">Rent a car for your travel needs</p>
            <Button variant="primary" size="sm">Search Cars</Button>
          </Card>
        </div>

        <Card className="bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Project Status</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Next.js project initialized</li>
            <li>Tailwind CSS configured</li>
            <li>Folder structure created</li>
            <li>Mock data and services ready</li>
            <li>Global state management set up</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

