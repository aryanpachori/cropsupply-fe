export function fmt(n, decimals = 1) {
  if (n === null || n === undefined || isNaN(parseFloat(n))) return '—'
  const num = parseFloat(n)
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  if (num >= 100) return Math.round(num).toString()
  return num.toFixed(decimals)
}

export function fmtTonnes(n) {
  const s = fmt(n)
  return s === '—' ? '—' : s + 'T'
}

export function fmtPct(n) {
  if (n === null || n === undefined) return '—'
  return Math.round(parseFloat(n)) + '%'
}

export function fmtNum(n) {
  if (n === null || n === undefined || isNaN(parseFloat(n))) return '—'
  return Math.round(parseFloat(n)).toLocaleString()
}
