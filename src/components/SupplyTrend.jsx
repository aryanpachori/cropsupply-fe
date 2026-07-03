'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from './ui/Card'
import { CROP_EMOJI } from '@/styles/tokens'
import { fmtTonnes } from '@/lib/utils'

export default function SupplyTrend({ trends }) {
  const topTrends = (trends || [])
    .filter(t => t.crop && t.crop !== 'Unknown' && t.this_season_tonnes > 100)
    .slice(0, 8)

  const totalVarieties = (trends || []).filter(t => t.crop && t.crop !== 'Unknown').length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-gray-700">Forecasted supply volume by crop — this season</span>
          <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
            <div className="rounded-sm" style={{ width: 10, height: 6, background: '#1D9E75' }} />
            This season (live)
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topTrends} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" vertical={false} />
            <XAxis dataKey="crop" tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v} />
            <Tooltip
              contentStyle={{ background: 'white', border: '1px solid #F1EFE8', borderRadius: 12, fontSize: 11 }}
              formatter={v => [fmtTonnes(v), 'Forecast']}
            />
            <Bar dataKey="this_season_tonnes" fill="#1D9E75" radius={[4, 4, 0, 0]} name="This season" maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 pt-3 border-t border-gray-50 text-[9px] text-gray-400 italic">
          Price direction signals will activate once multi-season pre-harvest data is available.
          Currently tracking {totalVarieties} crop varieties across 5,681 farmers.
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-xs font-medium text-gray-700 mb-1">Volume by crop</div>
        <div className="text-[10px] text-gray-400 mb-3">Top 8 crops · forecasted harvest this season</div>
        {topTrends.map((t) => (
          <div key={t.crop} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-base">{CROP_EMOJI[t.crop] || CROP_EMOJI.default}</span>
              <span className="text-[11px] font-medium text-gray-800">{t.crop}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400">{t.farmer_count?.toLocaleString()} farmers</span>
              <span className="text-[11px] font-medium" style={{ color: '#0F6E56' }}>{fmtTonnes(t.this_season_tonnes)}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
