import Navigation from './Navigation'

/**
 * Main Layout Component
 * Wraps pages with consistent layout structure
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      <footer className="bg-teal-600 text-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-teal-100">&copy; 2024 Holivo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

