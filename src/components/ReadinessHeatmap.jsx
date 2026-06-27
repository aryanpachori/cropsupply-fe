'use client'

import Card from './ui/Card'

function cellBg(pct) {
  if (pct >= 80) return '#085041'
  if (pct >= 60) return '#0F6E56'
  if (pct >= 40) return '#1D9E75'
  if (pct >= 20) return '#5DCAA5'
  return '#E1F5EE'
}

const LEGEND_COLORS = ['#E1F5EE', '#5DCAA5', '#1D9E75', '#0F6E56', '#085041', '#04342C']

export default function ReadinessHeatmap({ heatmap }) {
  return (
    <Card className="p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-gray-700">Region readiness heatmap</span>
        <span className="text-[10px] text-gray-400">% of farmers at activity step 14+ (near harvest)</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {heatmap.map((item) => (
          <div
            key={item.region}
            className="rounded-xl h-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 hover:scale-105 hover:shadow-sm"
            style={{ background: cellBg(item.readiness_pct) }}
          >
            <span
              className="text-[8px] font-medium text-center leading-tight px-1"
              style={{ color: item.readiness_pct >= 20 ? 'white' : '#085041' }}
            >
              {item.region}
            </span>
            <span
              className="text-[8px] mt-0.5"
              style={{ color: item.readiness_pct >= 20 ? 'rgba(255,255,255,0.75)' : '#085041' }}
            >
              {item.readiness_pct}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-[9px] text-gray-400">Low supply</span>
        {LEGEND_COLORS.map((c, i) => (
          <div key={i} className="rounded-sm" style={{ width: 20, height: 8, background: c }} />
        ))}
        <span className="text-[9px] text-gray-400">High — harvest imminent</span>
      </div>

      <div className="flex gap-2 mt-3">
        <span className="text-[10px] font-medium px-3 py-1.5 rounded-full" style={{ background: '#E1F5EE', color: '#085041' }}>
          Morogoro + Mbeya — harvest starts in 11 days
        </span>
        <span className="text-[10px] font-medium px-3 py-1.5 rounded-full" style={{ background: '#FAEEDA', color: '#854F0B' }}>
          Mwanza Groundnuts — low confidence, 33 days out
        </span>
      </div>
    </Card>
  )
}
