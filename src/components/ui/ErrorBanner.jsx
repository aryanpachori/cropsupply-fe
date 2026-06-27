'use client'

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="rounded-xl p-3 flex items-center justify-between text-[11px] mb-4" style={{ background: '#FCEBEB', border: '1px solid #F09595', color: '#A32D2D' }}>
      <span>⚠ {message}</span>
      {onRetry && (
        <button onClick={onRetry} className="underline cursor-pointer ml-4 flex-shrink-0" style={{ color: '#A32D2D' }}>
          Retry
        </button>
      )}
    </div>
  )
}
