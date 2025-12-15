# Holivo - Travel Comparison Platform

A Next.js-based travel comparison platform for comparing flights, hotels, and car rentals.

## Project Structure

```
Holivo/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.js          # Root layout with StoreProvider
│   ├── page.js            # Home page
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable UI components
│   ├── Button.js          # Button component
│   ├── Card.js            # Card component
│   └── Layout.js          # Main layout wrapper
├── services/              # API service placeholders
│   ├── flightService.js   # Flight API service (mock)
│   ├── hotelService.js    # Hotel API service (mock)
│   └── carService.js      # Car rental API service (mock)
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

- ✅ Next.js 16 with App Router
- ✅ Tailwind CSS for styling
- ✅ Organized folder structure
- ✅ Mock data for development
- ✅ Service placeholders ready for API integration
- ✅ Global state management with React Context
- ✅ Reusable UI components

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

