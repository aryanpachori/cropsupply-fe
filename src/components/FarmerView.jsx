'use client'

import ProgressBar from './ui/ProgressBar'
import Badge from './ui/Badge'

const FARMER = {
  id: 'MZ-10042', crop: 'Maize', region: 'Mwanza', district: 'Ilemela',
  land_ha: 2.4, planting_date: 'Apr 12, 2026',
  step: 12, total_steps: 19, current_step_name: 'Pest control',
  predicted_tonnes: 7.2, days_to_harvest: 15,
  harvest_from: 'Jul 12', harvest_to: 'Jul 22, 2026',
  confidence: 'high',
  soil: { n: 68, p: 42, k: 55, moisture: 38, score: 82 },
}

const STEPS = [
  'Field inspection','Soil testing','Farm clearing','Improving soil fertility','Main field prep',
  'Harrowing','Water harvesting structures','Making ridges','Irrigation system','Sowing seeds',
  'Irrigation','Weed control','Fertilizer application','Pest control','Other techniques',
  'Harvest preparation','Harvesting','Post-harvest handling','Crop storage',
]

const SOIL_ROWS = [
  { label: 'Nitrogen (N)', key: 'n', unit: '/100' },
  { label: 'Phosphorus (P)', key: 'p', unit: '/100' },
  { label: 'Potassium (K)', key: 'k', unit: '/100' },
  { label: 'Moisture', key: 'moisture', unit: '%' },
  { label: 'Soil score', key: 'score', unit: '/100' },
]

export default function FarmerView() {
  const f = FARMER

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* Hero */}
      <div className="rounded-2xl p-5 text-white" style={{ background: '#0F6E56' }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] text-white/60 uppercase tracking-wide mb-1">Your predicted harvest</div>
            <div className="text-5xl font-medium leading-none">{f.predicted_tonnes}<span className="text-2xl ml-1 opacity-70">T</span></div>
            <div className="text-sm text-white/70 mt-1">tonnes of {f.crop}</div>
          </div>
          <div className="text-5xl">🌽</div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-3">
          <div>
            <div className="text-[9px] text-white/50 uppercase tracking-wide">Harvest window</div>
            <div className="text-xs text-white mt-0.5 font-medium">{f.harvest_from} – {f.harvest_to}</div>
          </div>
          <div>
            <div className="text-[9px] text-white/50 uppercase tracking-wide">Days remaining</div>
            <div className="text-xs text-white mt-0.5 font-medium">{f.days_to_harvest} days</div>
          </div>
          <div>
            <div className="text-[9px] text-white/50 uppercase tracking-wide">Confidence</div>
            <div className="mt-0.5"><Badge variant="green" size="xs">{f.confidence}</Badge></div>
          </div>
        </div>
      </div>

      {/* Farmer details */}
      <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex flex-wrap gap-4 text-[10px] text-gray-500">
        <span><span className="text-gray-400">ID </span><span className="font-mono font-medium text-gray-700">{f.id}</span></span>
        <span><span className="text-gray-400">Region </span><span className="font-medium text-gray-700">{f.region}, {f.district}</span></span>
        <span><span className="text-gray-400">Land </span><span className="font-medium text-gray-700">{f.land_ha} ha</span></span>
        <span><span className="text-gray-400">Planted </span><span className="font-medium text-gray-700">{f.planting_date}</span></span>
      </div>

      {/* Activity progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-700">Activity progress</span>
          <span className="text-[10px] text-gray-400">{f.step} of {f.total_steps} steps</span>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden bg-gray-100 mb-2">
          <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${(f.step / f.total_steps) * 100}%`, background: '#1D9E75' }} />
          <div className="absolute top-0 h-full" style={{ left: `${(f.step / f.total_steps) * 100}%`, width: `${(1 / f.total_steps) * 100}%`, background: '#EDA100' }} />
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 mb-4">
          <span>Field inspection</span>
          <span className="text-amber-600 font-medium">Now: {f.current_step_name}</span>
          <span>Crop storage</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STEPS.map((step, i) => {
            let style = {}
            if (i < f.step)      style = { background: '#E1F5EE', color: '#085041' }
            else if (i === f.step) style = { background: '#FEF3C7', color: '#92400E' }
            else                  style = { background: '#F1EFE8', color: '#888780' }
            return <span key={i} className="text-[9px] font-medium px-2 py-1 rounded-full" style={style}>{step}</span>
          })}
        </div>
      </div>

      {/* Sell signals */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-amber-200 p-4" style={{ background: '#FFFBEB' }}>
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">⚠️</span>
            <div>
              <div className="text-xs font-medium text-gray-800 mb-1">Maize supply is high in Mwanza this season (+22%)</div>
              <p className="text-[10px] text-gray-600 leading-relaxed">284 farmers in your region are also harvesting Maize in July. High supply means lower prices. Consider early sale before Jul 12 or warehouse storage to wait for better prices in August.</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border p-4" style={{ background: '#E1F5EE', borderColor: '#9FE1CB' }}>
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">🤝</span>
            <div>
              <div className="text-xs font-medium text-gray-800 mb-1">2 active buyers looking for Maize in your area</div>
              <p className="text-[10px] text-gray-600 leading-relaxed">RFQ for 400kg Grade A Maize in Arusha is open. Your harvest quality matches. Connect now to lock a price before your crop is ready.</p>
              <button className="mt-2 text-[11px] font-medium text-white px-3 py-1.5 rounded-xl hover:opacity-90 transition-colors" style={{ background: '#0F6E56' }}>
                View buyer RFQs →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Soil */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="text-xs font-medium text-gray-700 mb-4">Soil data used in your prediction</div>
        <div className="space-y-3">
          {SOIL_ROWS.map(row => {
            const val = f.soil[row.key]
            const color = val >= 70 ? '#1D9E75' : val >= 40 ? '#EDA100' : '#E24B4A'
            return (
              <div key={row.key} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-28 flex-shrink-0">{row.label}</span>
                <div className="flex-1"><ProgressBar value={val} height={5} color={color} /></div>
                <span className="text-[10px] font-medium text-gray-700 w-14 text-right flex-shrink-0">{val}{row.unit}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50 text-[9px] text-gray-400">
          Land: {f.land_ha} ha · Crop: {f.crop} · Planted: {f.planting_date}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="text-xs font-medium text-gray-700 mb-3">Next steps for you</div>
        <div className="space-y-2.5">
          {[
            { icon: '📱', text: 'Update your activity log via WhatsApp to improve prediction accuracy' },
            { icon: '🏪', text: 'Mwanza Village Store has 380T of free storage — pre-book now' },
            { icon: '💰', text: 'Maize price expected to drop after Jul 12 — consider pre-selling' },
            { icon: '🌱', text: 'Soil score 82/100 is strong — maintain current irrigation schedule' },
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-base flex-shrink-0">{tip.icon}</span>
              <span className="text-[11px] text-gray-600 leading-relaxed">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
