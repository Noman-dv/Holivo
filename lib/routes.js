/**
 * Route constants for the application
 * Centralized route definitions for easier maintenance
 */

export const ROUTES = {
  HOME: '/',
  FLIGHTS: '/flights',
  HOTELS: '/hotels',
  CARS: '/cars',
  AI_HOLIDAY: '/ai-holiday',
  COMPARE: '/compare',
}

/**
 * Navigation items configuration
 */
export const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.FLIGHTS, label: 'Flights' },
  { href: ROUTES.HOTELS, label: 'Hotels' },
  // Cars route is kept for future use but hidden from main navigation for now
  // { href: ROUTES.CARS, label: 'Cars' },
  { href: ROUTES.AI_HOLIDAY, label: 'AI Holiday' },
  { href: ROUTES.COMPARE, label: 'Compare' },
]

