'use client'

export default function EmptyState({ icon, title, subtitle, cta, onCta }) {
  return (
    <div className="py-16 text-center">
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>
      {subtitle && (
        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto">{subtitle}</p>
      )}
      {cta && onCta && (
        <button
          onClick={onCta}
          className="mt-4 text-xs text-white px-4 py-2 rounded-xl inline-block cursor-pointer transition-colors hover:opacity-90"
          style={{ background: '#0F6E56' }}
        >
          {cta}
        </button>
      )}
    </div>
  )
}
