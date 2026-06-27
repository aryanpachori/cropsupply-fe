'use client'

import Card from './ui/Card'
import StatDelta from './ui/StatDelta'
import { CROP_EMOJI } from '@/styles/tokens'
import { GLOBAL_CROPS } from '@/lib/dummy'

const SEASON_CONFIG = {
  peak: { label: "Peak season", color: "#1D9E75", bg: "#E1F5EE" },
  rising: { label: "Rising", color: "#185FA5", bg: "#E6F1FB" },
  low: { label: "Low season", color: "#A32D2D", bg: "#FCEBEB" },
}

function priceOutlook(yoy) {
  if (yoy < -5) return { char: '▲', label: 'Price rising', color: '#0F6E56' }
  if (yoy > 5) return { char: '▼', label: 'Price softening', color: '#A32D2D' }
  return { char: '▬', label: 'Stable', color: '#888780' }
}

export default function GlobalTrends() {
  return (
    <Card className="p-5 mb-6">
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-700">Global crop supply outlook</div>
        <div className="text-[10px] text-gray-400 mt-0.5">Aggregated from MazaoHub + partner sources across 37+ countries</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead style={{ background: '#F5F4F0' }}>
            <tr>
              {['Crop', 'Season status', 'Top supply regions', 'Global volume', 'YoY change', 'Price outlook'].map(h => (
                <th key={h} className="text-[9px] font-medium text-gray-400 uppercase tracking-wide text-left px-4 py-2.5 border-b border-gray-100 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GLOBAL_CROPS.map((c) => {
              const season = SEASON_CONFIG[c.season_status]
              const outlook = priceOutlook(c.yoy_change)
              return (
                <tr key={c.crop} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span>{CROP_EMOJI[c.crop] || CROP_EMOJI.default}</span>
                      <span className="font-medium text-gray-800">{c.crop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: season.bg, color: season.color }}>
                      {season.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {c.top_regions.map(r => (
                        <span key={r} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">{c.global_volume_kt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}KT</td>
                  <td className="px-4 py-3"><StatDelta value={c.yoy_change} suffix="%" /></td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium" style={{ color: outlook.color }}>{outlook.char} {outlook.label}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-400">
        Partner API integration coming — data will include agritechs, cooperatives, government boards, NGOs, outgrowers, and agricultural ministries across Africa, India, and Latin America.
      </div>
    </Card>
  )
}
