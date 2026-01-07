/**
 * Reusable Card Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-4 sm:p-5 md:p-6 border border-slate-100 ${className}`}>
      {children}
    </div>
  )
}


