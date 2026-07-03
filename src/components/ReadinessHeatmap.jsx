'use client'

import Card from './ui/Card'
import { fmtTonnes } from '@/lib/utils'

function cellBg(pct) {
  if (pct >= 80) return '#085041'
  if (pct >= 60) return '#0F6E56'
  if (pct >= 40) return '#1D9E75'
  if (pct >= 20) return '#5DCAA5'
  return '#E1F5EE'
}

const LEGEND_COLORS = ['#E1F5EE', '#5DCAA5', '#1D9E75', '#0F6E56', '#085041', '#04342C']

export default function ReadinessHeatmap({ heatmap }) {
  const sorted = [...(heatmap || [])].sort((a, b) => b.readiness_pct - a.readiness_pct)
  const top = sorted[0]
  const mostFarmers = [...(heatmap || [])].sort((a, b) => b.farmer_count - a.farmer_count)[0]

  return (
    <Card className="p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-gray-700">Region readiness heatmap · 28 regions</span>
        <span className="text-[10px] text-gray-400">% farmers at stage 14+ (near harvest)</span>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-14 gap-1.5 mb-3">
        {(heatmap || []).map((item) => (
          <div
            key={item.region}
            className="rounded-xl h-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-sm"
            style={{ background: cellBg(item.readiness_pct) }}
            title={`${item.region}: ${item.readiness_pct}% ready · ${fmtTonnes(item.total_tonnes)} · ${item.farmer_count} farmers`}
          >
            <span
              className="text-[7px] font-medium text-center leading-tight px-0.5"
              style={{ color: item.readiness_pct >= 20 ? 'white' : '#085041' }}
            >
              {item.region.length > 8 ? item.region.slice(0, 7) + '…' : item.region}
            </span>
            <span
              className="text-[8px] mt-0.5"
              style={{ color: item.readiness_pct >= 20 ? 'rgba(255,255,255,0.8)' : '#085041' }}
            >
              {item.readiness_pct}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="text-[9px] text-gray-400">Low</span>
        {LEGEND_COLORS.map((c, i) => (
          <div key={i} className="rounded-sm" style={{ width: 18, height: 7, background: c }} />
        ))}
        <span className="text-[9px] text-gray-400">High — harvest imminent</span>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {top && (
          <span className="text-[9px] font-medium px-3 py-1.5 rounded-full" style={{ background: '#E1F5EE', color: '#085041' }}>
            {top.region} — {top.readiness_pct}% ready · {fmtTonnes(top.total_tonnes)}
          </span>
        )}
        {mostFarmers && (
          <span className="text-[9px] font-medium px-3 py-1.5 rounded-full" style={{ background: '#E6F1FB', color: '#185FA5' }}>
            {mostFarmers.region} — {mostFarmers.farmer_count.toLocaleString()} farmers tracked
          </span>
        )}
      </div>
    </Card>
  )
}
