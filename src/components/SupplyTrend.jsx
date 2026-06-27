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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-gray-700">Supply trend — this season vs last</span>
          <div className="flex gap-3 text-[9px] text-gray-400">
            <div className="flex items-center gap-1">
              <div className="rounded-sm" style={{ width: 10, height: 6, background: '#D3D1C7' }} />
              Last season
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-sm" style={{ width: 10, height: 6, background: '#1D9E75' }} />
              This season
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={trends} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" vertical={false} />
            <XAxis dataKey="crop" tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} tickFormatter={v => v + 'T'} />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #F1EFE8', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', fontSize: 11 }} />
            <Bar dataKey="last_season_tonnes" fill="#D3D1C7" radius={[4,4,0,0]} name="Last season" maxBarSize={24} />
            <Bar dataKey="this_season_tonnes" fill="#1D9E75" radius={[4,4,0,0]} name="This season" maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-5">
        <div className="text-xs font-medium text-gray-700 mb-1">Price direction signal</div>
        <div className="text-[10px] text-gray-400 mb-4">Based on incoming supply vs last season</div>
        {trends.map((t) => {
          const info = signalInfo(t.price_signal)
          return (
            <div key={t.crop} className="py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-start gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">{CROP_EMOJI[t.crop] || CROP_EMOJI.default}</span>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-gray-800 mb-0.5">{t.crop}</div>
                  <div className={`text-[10px] leading-relaxed ${info.textCls}`}>{t.price_signal_text}</div>
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: info.bg, color: info.text }}>
                  {info.arrow}
                </div>
              </div>
            </div>
          )
        })}
        <div className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-300">
          Signal derived from farming plan volume vs prior season. Not financial advice.
        </div>
      </Card>
    </div>
  )
}
