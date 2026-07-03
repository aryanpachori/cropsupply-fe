'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from './ui/Card'
import { CROP_EMOJI } from '@/styles/tokens'

function signalInfo(signal) {
  if (signal === 'up') return { arrow: '▲', bg: '#E1F5EE', text: '#085041', textCls: 'text-[#0F6E56]' }
  if (signal === 'down') return { arrow: '▼', bg: '#FCEBEB', text: '#A32D2D', textCls: 'text-[#A32D2D]' }
  return { arrow: '▬', bg: '#F1EFE8', text: '#888780', textCls: 'text-gray-500' }
}

export default function SupplyTrend({ trends }) {
  const topTrends = (trends || [])
    .filter(t => t.crop !== 'Unknown' && t.this_season_tonnes > 100)
    .slice(0, 8)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-gray-700">Supply trend — forecasted volume by crop</span>
          <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
            <div className="rounded-sm" style={{ width: 10, height: 6, background: '#1D9E75' }} />
            This season (live)
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topTrends} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" vertical={false} />
            <XAxis dataKey="crop" tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v/1000).toFixed(0)+'K' : v} />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #F1EFE8', borderRadius: 12, fontSize: 11 }} formatter={v => [v.toLocaleString() + 'T', 'Forecast']} />
            <Bar dataKey="this_season_tonnes" fill="#1D9E75" radius={[4,4,0,0]} name="This season" maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-5">
        <div className="text-xs font-medium text-gray-700 mb-1">Volume by crop</div>
        <div className="text-[10px] text-gray-400 mb-4">Top crops forecasted this season · MazaoHub farming plans</div>
        {topTrends.map((t) => (
          <div key={t.crop} className="py-2.5 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-base flex-shrink-0">{CROP_EMOJI[t.crop] || CROP_EMOJI.default}</span>
              <div className="flex-1">
                <div className="text-[11px] font-medium text-gray-800">{t.crop}</div>
                <div className="text-[10px] text-gray-400">{t.total_farmers?.toLocaleString() || '—'} farmers · {t.regions_count || '—'} regions</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium" style={{ color: '#0F6E56' }}>
                  {t.this_season_tonnes >= 1000 ? (t.this_season_tonnes / 1000).toFixed(1) + 'K' : t.this_season_tonnes}T
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-gray-50 text-[9px] text-gray-400 italic">
          Price signals will activate once multi-season data is available
        </div>
      </Card>
    </div>
  )
}
