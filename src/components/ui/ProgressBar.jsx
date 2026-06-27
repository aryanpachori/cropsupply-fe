'use client'

export default function ProgressBar({ value = 0, color = '#1D9E75', height = 4, showLabel = false }) {
  return (
    <div>
      <div className="w-full bg-gray-100 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
        />
      </div>
      {showLabel && <div className="text-[10px] text-gray-500 mt-0.5">{value}%</div>}
    </div>
  )
}
