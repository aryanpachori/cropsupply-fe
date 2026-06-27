'use client'

import { useState } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, Cell, ResponsiveContainer,
  BarChart, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'
import Badge from './ui/Badge'
import { CROP_EMOJI } from '@/styles/tokens'
import { PRICE_HISTORY, AI_INSIGHTS, HARVEST_TIMELINE, SOIL_DATA } from '@/lib/dummy'

const CROP_TABS = ['Maize', 'Rice', 'Onion', 'Avocado']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function severityDot(severity) {
  if (severity === 'high' || severity === 'urgent') return 'bg-red-400'
  if (severity === 'medium') return 'bg-amber-400'
  return 'bg-gray-300'
}

function barColor(days) {
  if (days <= 14) return '#1D9E75'
  if (days <= 21) return '#EDA100'
  return '#E24B4A'
}

function fmtNum(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// ─── Custom Tooltips ─────────────────────────────────────────────────────────

function PriceTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const isForecast = payload[0]?.payload?.forecast
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 text-[11px]">
      <div className="font-medium text-gray-700 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }} className="mb-0.5">
          {p.name}: {p.name.includes('Price') ? `TZS ${fmtNum(p.value)}` : `${fmtNum(p.value)}T`}
        </div>
      ))}
      {isForecast && (
        <div className="text-amber-600 mt-1 text-[10px]">⚠ Predicted — not actual</div>
      )}
    </div>
  )
}

function TimelineTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 text-[11px]">
      <div className="font-medium text-gray-800 mb-1">{CROP_EMOJI[d.crop] || '🌱'} {d.crop} · {d.region}</div>
      <div className="text-gray-600">Days to harvest: <strong>{d.days}</strong></div>
      <div className="text-gray-600">Expected: <strong>{fmtNum(d.tonnes)}T</strong></div>
      <div className="text-gray-600">Activity step: <strong>{d.step}/19</strong></div>
      <div className="text-gray-600">Confidence: <strong>{d.confidence}</strong></div>
    </div>
  )
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium mb-3">{children}</div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TrendCharts() {
  const [activeCrop, setActiveCrop] = useState('Maize')
  const [activeInsight, setActiveInsight] = useState(null)

  const chartData = PRICE_HISTORY[activeCrop]

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#534AB7] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-600">AI analytics & trend insights</span>
        </div>
        <span className="text-[10px] text-gray-400">Powered by agronomic model + price-volume correlation</span>
      </div>

      {/* ── AI Insight Cards ── */}
      <SectionLabel>AI-generated insights</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {AI_INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            onClick={() => setActiveInsight(activeInsight?.id === insight.id ? null : insight)}
            className="rounded-2xl p-4 border cursor-pointer transition-all duration-150 hover:shadow-md"
            style={{ background: insight.bg, borderColor: insight.color + '40' }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-medium px-2 py-0.5 rounded-full text-white" style={{ background: insight.color }}>
                {insight.tag}
              </span>
              <div className={`w-2 h-2 rounded-full mt-0.5 ${severityDot(insight.severity)}`} />
            </div>
            <div className="text-lg mb-1">{insight.icon}</div>
            <div className="text-xs font-medium text-gray-900 leading-snug mb-1">{insight.title}</div>
            <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{insight.body}</p>
            <div className="text-[9px] font-medium mt-2" style={{ color: insight.color }}>→ Recommended action</div>
          </div>
        ))}
      </div>

      {/* Insight detail panel */}
      {activeInsight && (
        <div className="bg-white rounded-2xl border-2 p-5 mb-6" style={{ borderColor: activeInsight.color }}>
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium text-gray-900 flex-1 pr-4">{activeInsight.title}</div>
            <button onClick={() => setActiveInsight(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none flex-shrink-0">×</button>
          </div>
          <div className="flex gap-2 mt-1 mb-3">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: activeInsight.bg, color: activeInsight.color }}>
              {activeInsight.crop}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {activeInsight.region}
            </span>
          </div>
          <p className="text-[11px] text-gray-700 leading-relaxed mb-4">{activeInsight.body}</p>
          <div className="rounded-xl p-3" style={{ background: activeInsight.bg, border: `1px solid ${activeInsight.color}40` }}>
            <div className="text-[9px] uppercase tracking-wide font-medium mb-1" style={{ color: activeInsight.color }}>
              Recommended action
            </div>
            <div className="text-[11px] text-gray-800">{activeInsight.action}</div>
          </div>
        </div>
      )}

      {/* ── Price & Volume Chart ── */}
      <SectionLabel>Price & volume trends</SectionLabel>

      <div className="flex gap-1 mb-4">
        {CROP_TABS.map(crop => (
          <button
            key={crop}
            onClick={() => setActiveCrop(crop)}
            className={`text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
              activeCrop === crop ? 'text-white' : 'bg-white border border-gray-100 text-gray-500 hover:border-gray-200'
            }`}
            style={activeCrop === crop ? { background: '#0F6E56' } : {}}
          >
            {CROP_EMOJI[crop] || '🌱'} {crop}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-2">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={{ top: 10, right: 40, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} />
            <YAxis
              yAxisId="price"
              orientation="left"
              tick={{ fontSize: 10, fill: '#888780' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'TZS/unit', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#888780', dy: 40 }}
            />
            <YAxis
              yAxisId="volume"
              orientation="right"
              tick={{ fontSize: 10, fill: '#888780' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Tonnes', angle: 90, position: 'insideRight', fontSize: 10, fill: '#888780', dy: -30 }}
            />
            <Tooltip content={<PriceTooltip />} />
            <ReferenceLine
              yAxisId="price"
              x="Jul (forecast)"
              stroke="#E24B4A"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{ value: 'Forecast →', fontSize: 9, fill: '#E24B4A', position: 'top' }}
            />
            <Bar yAxisId="volume" dataKey="volume" radius={[4, 4, 0, 0]} name="Volume (T)" maxBarSize={32}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.forecast ? '#F1EFE8' : '#E1F5EE'} />
              ))}
            </Bar>
            <Line
              yAxisId="price"
              dataKey="price"
              stroke="#0F6E56"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props
                return (
                  <circle
                    key={`dot-${props.index}`}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={payload.forecast ? '#5DCAA5' : '#0F6E56'}
                    stroke="none"
                  />
                )
              }}
              strokeDasharray={(d) => d?.forecast ? '5 5' : undefined}
              name="Price (TZS)"
              type="monotone"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-2 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5"><div className="w-6 h-0.5 rounded" style={{ background: '#0F6E56' }} /> Actual price</div>
          <div className="flex items-center gap-1.5"><div className="w-6 h-0.5 rounded border-t-2 border-dashed" style={{ borderColor: '#5DCAA5' }} /> Forecast price</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#E1F5EE' }} /> Actual volume</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#F1EFE8' }} /> Forecast volume</div>
        </div>
      </div>

      {/* ── Harvest Timeline ── */}
      <SectionLabel>Supply timeline — all crops, next 35 days</SectionLabel>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={HARVEST_TIMELINE}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" horizontal={false} />
            <YAxis
              dataKey="region"
              type="category"
              width={130}
              tick={{ fontSize: 10, fill: '#888780' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val, i) => `${CROP_EMOJI[HARVEST_TIMELINE[i]?.crop] || '🌱'} ${HARVEST_TIMELINE[i]?.crop} · ${val}`}
            />
            <XAxis
              type="number"
              domain={[0, 40]}
              tick={{ fontSize: 10, fill: '#888780' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Days until harvest', position: 'insideBottom', fontSize: 10, fill: '#888780', dy: 12 }}
            />
            <Tooltip content={<TimelineTooltip />} />
            <ReferenceLine
              x={14}
              stroke="#1D9E75"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{ value: '14d', fontSize: 9, fill: '#1D9E75', position: 'top' }}
            />
            <Bar dataKey="days" radius={[0, 4, 4, 0]} maxBarSize={18}>
              {HARVEST_TIMELINE.map((entry, i) => (
                <Cell key={i} fill={barColor(entry.days)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Soil Health ── */}
      <SectionLabel>Soil health distribution</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Radar — soil score by region */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Avg soil score by region</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius={90} data={SOIL_DATA}>
              <PolarGrid stroke="#F1EFE8" />
              <PolarAngleAxis dataKey="region" tick={{ fontSize: 9, fill: '#888780' }} />
              <Radar
                name="Soil score"
                dataKey="avg_score"
                stroke="#0F6E56"
                fill="#0F6E56"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12, border: '1px solid #F1EFE8' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Grouped bar — NPK by region */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-2">Avg NPK by region</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SOIL_DATA} barGap={2} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1EFE8" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#888780' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12, border: '1px solid #F1EFE8' }} />
              <Bar dataKey="avg_n" name="N (Nitrogen)" fill="#1D9E75" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="avg_p" name="P (Phosphorus)" fill="#185FA5" radius={[2, 2, 0, 0]} maxBarSize={12} />
              <Bar dataKey="avg_k" name="K (Potassium)" fill="#534AB7" radius={[2, 2, 0, 0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#1D9E75' }} /> N</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#185FA5' }} /> P</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#534AB7' }} /> K</div>
          </div>
        </div>
      </div>
    </div>
  )
}
