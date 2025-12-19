import Navigation from './Navigation'
import Footer from './Footer'

/**
 * Main Layout Component
 * Wraps pages with consistent layout structure
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

