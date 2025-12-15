# Holivo - Travel Comparison Platform

A modern, responsive Next.js-based travel comparison platform for comparing flights, hotels, and car rentals. Built with Next.js 16, Tailwind CSS v4, and React 19.

## 🚀 Features

- ✅ **Next.js 16** with App Router (JavaScript)
- ✅ **Tailwind CSS v4** with 100% utility-first styling
- ✅ **Fully Responsive** design optimized for mobile, tablet, and desktop
- ✅ **Organized Folder Structure** with clear separation of concerns
- ✅ **Centralized Routing** with route constants and navigation
- ✅ **Global State Management** using React Context API
- ✅ **Reusable UI Components** with consistent styling and transitions
- ✅ **Mock Data System** ready for easy API integration
- ✅ **API Configuration** for seamless switch between mock and real APIs
- ✅ **Smooth Animations** and hover transitions throughout
- ✅ **Mobile-First Design** with consistent spacing alignment

## 📁 Project Structure

```
Holivo/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.js          # Root layout with StoreProvider
│   ├── page.js            # Home page with hero, services, features
│   ├── globals.css        # Global styles (Tailwind only)
│   ├── flights/           # Flights routes
│   │   └── page.js        # Flights search page with mock results
│   ├── hotels/            # Hotels routes
│   │   └── page.js        # Hotels search page with mock results
│   ├── cars/              # Car rentals routes
│   │   └── page.js        # Car rentals search page with mock results
│   └── compare/           # Comparison routes
│       └── page.js        # Compare selections page
├── components/            # Reusable UI components
│   ├── Button.js          # Button component with variants and sizes
│   ├── Card.js            # Card component with hover effects
│   ├── Layout.js          # Main layout wrapper with Navigation
│   ├── Navigation.js      # Responsive navigation with mobile menu
│   └── index.js           # Central component exports
├── lib/                   # Utility libraries and constants
│   ├── routes.js          # Route constants and navigation config
│   └── apiConfig.js       # API configuration (mock/real toggle)
├── services/              # API service layer
│   ├── flightService.js   # Flight API service (mock/real)
│   ├── hotelService.js    # Hotel API service (mock/real)
│   ├── carService.js      # Car rental API service (mock/real)
│   └── index.js           # Central service exports
├── mock/                  # Mock JSON data
│   ├── flights.json       # Sample flight data
│   ├── hotels.json        # Sample hotel data
│   └── cars.json          # Sample car rental data
├── store/                 # Global state management
│   └── useStore.js        # React Context store with memoized functions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

Install dependencies:

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

## 🎨 Design System

### Color Scheme

The platform uses a consistent teal color scheme:
- **Primary**: Teal-600 (`#0d9488`)
- **Hover**: Teal-700 (`#0f766e`)
- **Background**: Gray-50 (`#f9fafb`)
- **Text**: Gray-800 (`#1f2937`)

### Components

All components are built with Tailwind CSS and include:
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Transitions**: Hover effects and animations
- **Consistent Spacing**: Aligned with navigation padding
- **Accessibility**: Focus states and semantic HTML

## 📱 Routes

The application uses Next.js App Router with the following routes:

- `/` - Home page with hero section, services, features, and statistics
- `/flights` - Flight search and comparison with mock results
- `/hotels` - Hotel search and comparison with mock results
- `/cars` - Car rental search and comparison with mock results
- `/compare` - Compare selected flights, hotels, and car rentals

All routes are organized in the `app/` directory following Next.js App Router conventions.

## 🔌 API Integration

The project is designed for easy API integration. The service layer uses a configuration system to toggle between mock and real APIs.

### Configuration

Edit `lib/apiConfig.js` to switch between mock data and real APIs:

```javascript
export const USE_MOCK_DATA = true // Set to false to use real APIs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
```

### Service Files

Service files in `/services` are structured to handle both mock and real API calls:
- `flightService.js` - Flight search and filtering
- `hotelService.js` - Hotel search and filtering
- `carService.js` - Car rental search and filtering

Each service includes:
- Mock data fallback
- Error handling
- Simulated loading delays
- Easy-to-replace API endpoints

### Switching to Real APIs

1. Set `USE_MOCK_DATA = false` in `lib/apiConfig.js`
2. Update `API_BASE_URL` with your backend URL
3. Modify service functions to match your API response format
4. Update environment variables if needed

## 📊 State Management

Global state is managed using React Context API in `store/useStore.js`:

- **Filters**: Search filters and preferences
- **Selected Items**: User selections for comparison
- **Search Results**: Cached search results

All store functions are memoized to prevent unnecessary re-renders.

## 🎯 Mock Data

Mock data is available in the `/mock` directory:
- `flights.json` - Sample flight options with airlines, prices, times
- `hotels.json` - Sample hotel listings with ratings and amenities
- `cars.json` - Sample car rental options with vehicle types

These can be used for development and testing before backend integration.

## 📝 Code Quality

- **ESLint** configured for code quality
- **Prettier** for consistent code formatting
- **JSDoc** comments for component documentation
- **Modular Architecture** for maintainability

## 🚧 Development Status

✅ **Completed:**
- Project setup and configuration
- Folder structure and organization
- UI components and layout
- Mock data integration
- Responsive design
- Navigation and routing
- State management
- API service layer structure

🔄 **Ready for:**
- Backend API integration
- User authentication
- Payment processing
- Booking functionality

## 📄 License

ISC

## 👤 Author

Holivo Development Team

---

Built with ❤️ using Next.js and Tailwind CSS
