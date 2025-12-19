/**
 * Currency Configuration and Utilities
 * Supports multi-currency with GBP as default
 */

export const CURRENCIES = {
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'en-GB', // Can be adjusted per currency
  },
}

// Default currency
export const DEFAULT_CURRENCY = CURRENCIES.GBP

/**
 * Format price with currency symbol
 * @param {number} amount - The price amount
 * @param {Object} currency - Currency object (defaults to GBP)
 * @param {Object} options - Formatting options
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, currency = DEFAULT_CURRENCY, options = {}) {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true,
  } = options

  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)

  return showSymbol ? `${currency.symbol}${formatted}` : formatted
}

/**
 * Get current currency (can be extended to use context/store)
 * @returns {Object} Current currency object
 */
export function getCurrentCurrency() {
  // In the future, this can read from context/store/user preferences
  return DEFAULT_CURRENCY
}

/**
 * Format price using current currency
 * @param {number} amount - The price amount
 * @param {Object} options - Formatting options
 * @returns {string} Formatted price string
 */
export function formatPriceWithCurrency(amount, options = {}) {
  return formatPrice(amount, getCurrentCurrency(), options)
}

