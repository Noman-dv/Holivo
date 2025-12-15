# Holivo - Travel Comparison Platform

A Next.js-based travel comparison platform for comparing flights, hotels, and car rentals.

## Project Structure

```
Holivo/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.js          # Root layout with StoreProvider
│   ├── page.js            # Home page (/)
│   ├── globals.css        # Global styles with Tailwind
│   ├── flights/           # Flights routes
│   │   └── page.js        # Flights search page (/flights)
│   ├── hotels/            # Hotels routes
│   │   └── page.js        # Hotels search page (/hotels)
│   ├── cars/              # Car rentals routes
│   │   └── page.js        # Car rentals search page (/cars)
│   └── compare/           # Comparison routes
│       └── page.js        # Compare selections page (/compare)
├── components/            # Reusable UI components
│   ├── Button.js          # Button component with variants
│   ├── Card.js            # Card component
│   ├── Layout.js          # Main layout wrapper
│   ├── Navigation.js      # Navigation component with routing
│   └── index.js           # Central component exports
├── lib/                   # Utility libraries and constants
│   └── routes.js          # Route constants and navigation config
├── services/              # API service placeholders
│   ├── flightService.js   # Flight API service (mock)
│   ├── hotelService.js    # Hotel API service (mock)
│   ├── carService.js      # Car rental API service (mock)
│   └── index.js           # Central service exports
├── mock/                  # Mock JSON data
│   ├── flights.json       # Sample flight data
│   ├── hotels.json        # Sample hotel data
│   └── cars.json          # Sample car rental data
├── store/                 # Global state management
│   └── useStore.js        # React Context store for filters and selections
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Features

- ✅ Next.js 16 with App Router (JavaScript, no TypeScript)
- ✅ Tailwind CSS v4 configured and working
- ✅ Organized folder structure with clear separation of concerns
- ✅ **Organized routing structure** with dedicated routes for each feature
- ✅ **Navigation component** with active route highlighting
- ✅ **Route constants** centralized for easy maintenance
- ✅ Comprehensive mock data for development
- ✅ Service placeholders with error handling ready for API integration
- ✅ Global state management with React Context
- ✅ Reusable UI components with proper prop validation
- ✅ Centralized exports for cleaner imports
- ✅ Professional code structure with JSDoc comments

## Routes

The application uses Next.js App Router with the following routes:

- `/` - Home page with overview and quick links
- `/flights` - Flight search and comparison page
- `/hotels` - Hotel search and comparison page
- `/cars` - Car rental search and comparison page
- `/compare` - Compare selected flights, hotels, and car rentals

All routes are organized in the `app/` directory following Next.js App Router conventions. Route constants are centralized in `lib/routes.js` for easy maintenance.

## Future Integration

The service files in `/services` are set up with TODO comments indicating where to replace mock data with actual API calls. The structure is designed to make backend integration seamless:

1. Replace mock data imports with actual API fetch calls
2. Update service functions to handle real API responses
3. The components and store are already structured to work with real data

## Mock Data

Mock data is available in the `/mock` directory:
- `flights.json` - Sample flight options
- `hotels.json` - Sample hotel listings
- `cars.json` - Sample car rental options

These can be used for development and testing before backend integration.

