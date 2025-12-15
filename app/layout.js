import './globals.css'
import { StoreProvider } from '../store/useStore'

export const metadata = {
  title: 'Holivo - Travel Comparison Platform',
  description: 'Compare and find the best travel deals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}

