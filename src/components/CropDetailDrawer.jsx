'use client'

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import Badge from './ui/Badge'
import ProgressBar from './ui/ProgressBar'
import StatDelta from './ui/StatDelta'
import { CROP_EMOJI } from '@/styles/tokens'
import { FORECAST, FARMERS, RFQS } from '@/lib/dummy'

const LIVE_PRICES = {
  Maize: { price: 500, change: -9.1 },
  Rice: { price: 1150, change: 4.5 },
  Onion: { price: 950, change: 18.8 },
  Avocado: { price: 10000, change: 0 },
  Groundnuts: { price: 2500, change: 25.0 },
}

const PRICE_HISTORY = {
  Maize: [480, 510, 500, 490, 520, 500],
  Rice: [1050, 1080, 1100, 1090, 1120, 1150],
  Onion: [880, 920, 950, 1010, 980, 950],
  Avocado: [8000, 8500, 9000, 9500, 10000, 10000],
  Groundnuts: [2000, 2100, 2200, 2300, 2400, 2500],
}

const AI_INSIGHTS = {
  Maize: {
    icon: "📉", title: "Maize price likely to drop 8–12% by late July",
    body: "2,600T of Maize expected from Dodoma and Mwanza combined in the next 13–15 days. Based on historic price-volume correlation, expect TZS 440–465/kg by late July vs current TZS 500/kg.",
    action: "Lock sale price now or store until August when supply normalizes.",
    color: "#E24B4A", bg: "#FCEBEB",
  },
  Onion: {
    icon: "📈", title: "Onion prices set to spike — supply down 31%",
    body: "Only 520T of Onion registered in farming plans vs 754T last season. Expect TZS 1,050–1,180/kg by August.",
    action: "Buyers: secure Onion supply now before prices spike. Sellers: hold stock if possible.",
    color: "#0F6E56", bg: "#E1F5EE",
  },
  Avocado: {
    icon: "🥑", title: "Bumper Avocado season — 51% above last year",
    body: "380T of Avocado registered across Mbeya and Kilimanjaro vs 252T last season. Price softening expected by August.",
    action: "Export buyers: lock volume at current prices before competition increases.",
    color: "#185FA5", bg: "#E6F1FB",
  },
}

const SOIL_AVGS = {
  Maize: { n: 71, p: 40, k: 59, moisture: 35, score: 76 },
  Rice: { n: 55, p: 52, k: 46, moisture: 57, score: 80 },
  Onion: { n: 55, p: 60, k: 48, moisture: 45, score: 79 },
  Groundnuts: { n: 32, p: 58, k: 40, moisture: 34, score: 44 },
  Avocado: { n: 68, p: 48, k: 57, moisture: 44, score: 80 },
}

function confidenceVariant(c) {
  if (c === 'high') return 'green'
  if (c === 'medium') return 'amber'
  return 'red'
}

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function CropDetailDrawer({ crop, onClose }) {
  if (!crop) return null

  const emoji = CROP_EMOJI[crop] || CROP_EMOJI.default
  const priceData = LIVE_PRICES[crop]
  const historyRaw = PRICE_HISTORY[crop] || []
  const chartData = historyRaw.map((price, i) => ({ price }))
  const insight = AI_INSIGHTS[crop]
  const forecasts = FORECAST.filter(f => f.crop === crop)
  const rfqs = RFQS.filter(r => r.crop === crop)
  const farmers = FARMERS.filter(f => f.crop === crop)
  const soil = SOIL_AVGS[crop]

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 flex-shrink-0" style={{ background: '#0F6E56' }}>
          <div className="flex justify-between items-start">
            <span className="text-3xl">{emoji}</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="text-xl font-medium text-white mt-2">{crop}</div>
          <div className="flex gap-4 mt-1 text-[11px] text-white/70">
            <span>All regions · Tanzania</span>
            <span>Updated 6h ago</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 space-y-5">

          {/* Block 1 — Price */}
          <div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Current price</div>
            {priceData ? (
              <>
                <div className="text-2xl font-medium text-gray-900">TZS {fmtNum(priceData.price)}</div>
                <div className="mt-0.5"><StatDelta value={priceData.change} suffix="%" /></div>
                <div className="mt-3 h-20">
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={chartData}>
                      <Line dataKey="price" stroke="#0F6E56" strokeWidth={2} dot={false} type="monotone" />
                      <Tooltip
                        contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #F1EFE8' }}
                        formatter={v => [`TZS ${fmtNum(v)}`, 'Price']}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="text-[11px] text-gray-400">No price data available</div>
            )}
          </div>

          {/* Block 2 — Supply forecast */}
          <div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Incoming supply</div>
            {forecasts.length === 0 ? (
              <div className="text-[11px] text-gray-400">No forecast data for this crop</div>
            ) : (
              <div className="space-y-3">
                {forecasts.map((f, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-800">{f.region}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: '#0F6E56' }}>{f.total_tonnes}T</span>
                        <span className="text-[10px] text-gray-400">{f.days_to_harvest}d</span>
                        <Badge variant={confidenceVariant(f.confidence)} size="xs">{f.confidence}</Badge>
                      </div>
                    </div>
                    <ProgressBar value={Math.round((f.days_to_harvest / 35) * 100)} height={3} color="#1D9E75" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block 3 — AI insight */}
          <div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">AI insight</div>
            {insight ? (
              <div className="rounded-xl p-4" style={{ background: insight.bg, border: `1px solid ${insight.color}40` }}>
                <div className="text-lg mb-1">{insight.icon}</div>
                <div className="text-xs font-medium text-gray-900 mb-2">{insight.title}</div>
                <p className="text-[10px] text-gray-700 leading-relaxed mb-3">{insight.body}</p>
                <div className="text-[9px] uppercase tracking-wide font-medium mb-1" style={{ color: insight.color }}>Recommended action</div>
                <div className="text-[10px] text-gray-800">{insight.action}</div>
              </div>
            ) : (
              <div className="text-[11px] text-gray-400">No specific insight for this crop yet</div>
            )}
          </div>

          {/* Block 4 — Matched RFQs */}
          {rfqs.length > 0 && (
            <div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Matched RFQs</div>
              <div className="space-y-2">
                {rfqs.map((r, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-800">{r.rfq_id} · {r.region}</span>
                      <Badge variant={r.match_status === 'matched' ? 'green' : r.match_status === 'partial' ? 'amber' : 'red'} size="xs">
                        {r.match_status === 'matched' ? 'Matched' : r.match_status === 'partial' ? 'Partial' : 'No match'}
                      </Badge>
                    </div>
                    <div className="text-[10px] text-gray-500">{r.match_text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Block 5 — Farmer breakdown */}
          {farmers.length > 0 && (
            <div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Farmer breakdown</div>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <table className="w-full text-[10px] border-collapse">
                  <thead style={{ background: '#F5F4F0' }}>
                    <tr>
                      {['ID', 'Region', 'Step', 'Yield', 'Days'].map(h => (
                        <th key={h} className="text-left px-3 py-2 text-[9px] font-medium text-gray-400 uppercase border-b border-gray-100">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {farmers.map((f, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="px-3 py-2 font-mono text-gray-400">{f.farmer_id}</td>
                        <td className="px-3 py-2 text-gray-600">{f.region}</td>
                        <td className="px-3 py-2 text-gray-600">{f.last_activity_step}/19</td>
                        <td className="px-3 py-2 font-medium" style={{ color: '#0F6E56' }}>{f.predicted_tonnes}T</td>
                        <td className="px-3 py-2 text-gray-500">{f.days_to_harvest}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Block 6 — Soil data */}
          {soil && (
            <div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Avg soil data for {crop} regions</div>
              <div className="space-y-2">
                {[
                  { label: 'Nitrogen (N)', value: `${soil.n}/100`, pct: soil.n },
                  { label: 'Phosphorus (P)', value: `${soil.p}/100`, pct: soil.p },
                  { label: 'Potassium (K)', value: `${soil.k}/100`, pct: soil.k },
                  { label: 'Moisture', value: `${soil.moisture}%`, pct: soil.moisture },
                  { label: 'Soil score', value: `${soil.score}/100`, pct: soil.score },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-24 text-[10px] text-gray-500 flex-shrink-0">{s.label}</span>
                    <div className="flex-1">
                      <ProgressBar value={s.pct} height={4} color="#1D9E75" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 w-12 text-right flex-shrink-0">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex-shrink-0">
          <button
            className="w-full text-white text-sm font-medium py-3 rounded-xl transition-colors hover:opacity-90"
            style={{ background: '#0F6E56' }}
          >
            Find suppliers for {crop} →
          </button>
        </div>
      </div>
    </div>
  )
}
