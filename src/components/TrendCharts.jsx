'use client'

import { useState } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, Cell, ResponsiveContainer,
  BarChart, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'
import Badge from './ui/Badge'
import { CROP_EMOJI } from '@/styles/tokens'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRICE_HISTORY = {
  Maize: [
    { month: "Jan", price: 480, volume: 1800 },
    { month: "Feb", price: 510, volume: 2100 },
    { month: "Mar", price: 500, volume: 1950 },
    { month: "Apr", price: 490, volume: 2300 },
    { month: "May", price: 520, volume: 2600 },
    { month: "Jun", price: 500, volume: 2750 },
    { month: "Jul (forecast)", price: 465, volume: 3100, forecast: true },
    { month: "Aug (forecast)", price: 440, volume: 3400, forecast: true },
  ],
  Rice: [
    { month: "Jan", price: 1050, volume: 900 },
    { month: "Feb", price: 1080, volume: 1100 },
    { month: "Mar", price: 1100, volume: 1050 },
    { month: "Apr", price: 1090, volume: 980 },
    { month: "May", price: 1120, volume: 1200 },
    { month: "Jun", price: 1150, volume: 1300 },
    { month: "Jul (forecast)", price: 1130, volume: 1500, forecast: true },
    { month: "Aug (forecast)", price: 1110, volume: 1600, forecast: true },
  ],
  Onion: [
    { month: "Jan", price: 880, volume: 600 },
    { month: "Feb", price: 920, volume: 580 },
    { month: "Mar", price: 950, volume: 540 },
    { month: "Apr", price: 1010, volume: 490 },
    { month: "May", price: 980, volume: 510 },
    { month: "Jun", price: 950, volume: 520 },
    { month: "Jul (forecast)", price: 1050, volume: 480, forecast: true },
    { month: "Aug (forecast)", price: 1180, volume: 420, forecast: true },
  ],
  Avocado: [
    { month: "Jan", price: 8000, volume: 120 },
    { month: "Feb", price: 8500, volume: 140 },
    { month: "Mar", price: 9000, volume: 160 },
    { month: "Apr", price: 9500, volume: 200 },
    { month: "May", price: 10000, volume: 280 },
    { month: "Jun", price: 10000, volume: 320 },
    { month: "Jul (forecast)", price: 8500, volume: 420, forecast: true },
    { month: "Aug (forecast)", price: 7200, volume: 500, forecast: true },
  ],
}

const AI_INSIGHTS = [
  {
    id: 1, type: "price_drop", severity: "high", crop: "Maize", region: "Mwanza + Dodoma",
    title: "Maize price likely to drop 8–12% by late July",
    body: "2,600T of Maize expected from Dodoma and Mwanza combined in the next 13–15 days. This is 22% above last season's supply for the same period. Based on historic price-volume correlation, expect TZS 440–465/kg by late July vs current TZS 500/kg.",
    action: "Lock sale price now or store until August when supply normalizes.",
    icon: "📉", color: "#E24B4A", bg: "#FCEBEB", tag: "Price signal",
  },
  {
    id: 2, type: "price_spike", severity: "high", crop: "Onion", region: "Arusha",
    title: "Onion prices set to spike — supply down 31%",
    body: "Only 520T of Onion registered in farming plans vs 754T last season — a 31% shortfall. Arusha is the primary supply region. With 143 farmers at step 11/19, harvest is 9 days away but volume is significantly lower than demand. Expect TZS 1,050–1,180/kg by August.",
    action: "Buyers: secure Onion supply now before prices spike. Sellers: hold stock if possible.",
    icon: "📈", color: "#0F6E56", bg: "#E1F5EE", tag: "Price signal",
  },
  {
    id: 3, type: "supply_peak", severity: "medium", crop: "Avocado", region: "Mbeya + Kilimanjaro",
    title: "Bumper Avocado season incoming — 51% above last year",
    body: "380T of Avocado registered across Mbeya and Kilimanjaro, vs 252T last season. Soil scores in Rungwe district are averaging 80/100 — optimal for yield. Price pressure likely downward from TZS 10,000 to TZS 7,000–8,500/T by August as supply peaks.",
    action: "Export buyers: best opportunity to lock volume at current prices before competition increases.",
    icon: "🥑", color: "#185FA5", bg: "#E6F1FB", tag: "Supply alert",
  },
  {
    id: 4, type: "rfq_match", severity: "urgent", crop: "Maize", region: "Arusha",
    title: "RFQ-001 can be fulfilled — 3 farmers matched",
    body: "Open RFQ for 400kg Grade A Maize from Arusha Central Market (needed by Jul 8) has 3 farmers within 50km at step 14+ with combined yield of 6.1T. RFQ requires only 0.4T — fully coverable. Farmer MZ-10509 alone has 12T expected on Jul 15.",
    action: "Connect RFQ-001 buyer with MZ-10509 immediately. Pre-harvest deal possible.",
    icon: "🤝", color: "#534AB7", bg: "#EEEDFE", tag: "RFQ match",
  },
  {
    id: 5, type: "warehouse_alert", severity: "medium", crop: "All crops", region: "Mwanza",
    title: "Mwanza Village Store at 24% capacity — 380T incoming",
    body: "Mwanza Village Store has 380T of free capacity (500T total, 120T used). Combined incoming Maize + Rice + Groundnuts from Mwanza region forecasted at 380T in next 15–33 days. Storage will reach near-full. Alert aggregators now to plan logistics.",
    action: "Notify Mwanza aggregators to pre-book transport and consider overflow to Dodoma Grain Store.",
    icon: "🏗", color: "#854F0B", bg: "#FAEEDA", tag: "Warehouse alert",
  },
  {
    id: 6, type: "data_gap", severity: "low", crop: "Groundnuts", region: "Mwanza",
    title: "Groundnut prediction confidence is low — incomplete data",
    body: "88 farmers registered for Groundnuts in Mwanza but average activity step is only 7/19. Soil data is also below average (score 44/100). Yield prediction of 310T carries low confidence. Actual supply could vary ±40%.",
    action: "Send SMS reminder to Groundnut farmers in Mwanza to update activity logs via WhatsApp.",
    icon: "⚠", color: "#888780", bg: "#F1EFE8", tag: "Data quality",
  },
]

const HARVEST_TIMELINE = [
  { crop: "Onion", region: "Arusha", days: 9, tonnes: 520, step: 11, confidence: "medium" },
  { crop: "Rice", region: "Morogoro", days: 11, tonnes: 900, step: 16, confidence: "high" },
  { crop: "Avocado", region: "Mbeya", days: 12, tonnes: 160, step: 14, confidence: "high" },
  { crop: "Maize", region: "Dodoma", days: 13, tonnes: 1400, step: 15, confidence: "high" },
  { crop: "Maize", region: "Mwanza", days: 15, tonnes: 1200, step: 14, confidence: "high" },
  { crop: "Rice", region: "Mbeya", days: 18, tonnes: 600, step: 15, confidence: "high" },
  { crop: "Maize", region: "Arusha", days: 18, tonnes: 900, step: 14, confidence: "high" },
  { crop: "Rice", region: "Mwanza", days: 31, tonnes: 400, step: 15, confidence: "high" },
  { crop: "Groundnuts", region: "Mwanza", days: 33, tonnes: 310, step: 7, confidence: "low" },
]

const SOIL_DATA = [
  { region: "Morogoro", avg_n: 52, avg_p: 54, avg_k: 46, avg_moisture: 58, avg_score: 82 },
  { region: "Mbeya", avg_n: 62, avg_p: 50, avg_k: 52, avg_moisture: 54, avg_score: 77 },
  { region: "Mwanza", avg_n: 55, avg_p: 50, avg_k: 48, avg_moisture: 40, avg_score: 68 },
  { region: "Arusha", avg_n: 62, avg_p: 53, avg_k: 53, avg_moisture: 44, avg_score: 73 },
  { region: "Dodoma", avg_n: 60, avg_p: 37, avg_k: 55, avg_moisture: 28, avg_score: 58 },
]

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
