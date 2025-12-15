/**
 * Route constants for the application
 * Centralized route definitions for easier maintenance
 */

export const ROUTES = {
  HOME: '/',
  FLIGHTS: '/flights',
  HOTELS: '/hotels',
  CARS: '/cars',
  COMPARE: '/compare',
}

/**
 * Navigation items configuration
 */
export const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.FLIGHTS, label: 'Flights' },
  { href: ROUTES.HOTELS, label: 'Hotels' },
  { href: ROUTES.CARS, label: 'Cars' },
  { href: ROUTES.COMPARE, label: 'Compare' },
]

