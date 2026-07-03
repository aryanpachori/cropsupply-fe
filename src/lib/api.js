const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://smartfarming.mazaohub.co.tz'

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return res.json()
}

function qs(params) {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v != null && v !== '') p.set(k, v) })
  const s = p.toString()
  return s ? '?' + s : ''
}

export const api = {
  health:      ()                          => get('/health'),
  kpis:        ()                          => get('/api/harvest/kpis'),
  stageVolume: (region, crop, ward)        => get('/api/harvest/stage-volume' + qs({ region, crop, ward })),
  forecast:    (region, crop)              => get('/api/harvest/forecast' + qs({ region, crop })),
  heatmap:     ()                          => get('/api/harvest/heatmap'),
  trends:      (crop)                      => get('/api/harvest/trends' + qs({ crop })),
  rfqMatch:    (crop)                      => get('/api/rfq/match' + qs({ crop })),
  farmers:     (region, crop, stage, limit = 100) => get('/api/harvest/farmers' + qs({ region, crop, stage, limit })),
}
