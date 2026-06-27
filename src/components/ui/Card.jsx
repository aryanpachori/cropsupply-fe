'use client'

export default function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 ${hover ? 'hover:border-[#1D9E75] hover:shadow-sm transition-all duration-150 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
