'use client'

const VARIANTS = {
  green:  { bg: '#E1F5EE', text: '#085041' },
  amber:  { bg: '#FAEEDA', text: '#854F0B' },
  red:    { bg: '#FCEBEB', text: '#A32D2D' },
  blue:   { bg: '#E6F1FB', text: '#185FA5' },
  purple: { bg: '#EEEDFE', text: '#534AB7' },
  gray:   { bg: '#F1EFE8', text: '#888780' },
}

export default function Badge({ children, variant = 'gray', size = 'sm' }) {
  const { bg, text } = VARIANTS[variant] || VARIANTS.gray
  const sizeClass = size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClass}`}
      style={{ background: bg, color: text }}
    >
      {children}
    </span>
  )
}
