'use client'

export default function Skeleton({ className = '', width, height, rounded = 'rounded' }) {
  return (
    <div
      className={`animate-pulse bg-gray-100 ${rounded} ${className}`}
      style={{ ...(width && { width }), ...(height && { height }) }}
    />
  )
}

export function SkeletonKPI() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 space-y-2">
          <Skeleton className="h-2 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-2 w-14" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-50">
        <Skeleton className="h-4 w-40" />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-gray-50 last:border-0">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  )
}
