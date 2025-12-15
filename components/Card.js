/**
 * Reusable Card Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-100 ${className}`}>
      {children}
    </div>
  )
}

