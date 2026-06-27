'use client'

export default function AnalyticsSummary() {
  return (
    <div className="rounded-2xl p-4 mb-4" style={{ background: '#085041' }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/10">

        {/* Quadrant 1 — Imminent harvest */}
        <div className="px-4 first:pl-0">
          <div className="text-[9px] text-white/50 uppercase tracking-wide mb-1">Imminent harvest</div>
          <div className="text-2xl font-medium text-white leading-none">1,240T</div>
          <div className="text-[10px] mt-1" style={{ color: '#5DCAA5' }}>ready in ≤ 14 days</div>
          <div className="flex gap-1 flex-wrap mt-2">
            <span className="text-[9px] text-white/70 px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>900T Rice</span>
            <span className="text-[9px] text-white/70 px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>340T Maize</span>
          </div>
        </div>

        {/* Quadrant 2 — Price alerts */}
        <div className="px-4">
          <div className="text-[9px] text-white/50 uppercase tracking-wide mb-1">Price alerts</div>
          <div className="text-2xl font-medium text-white leading-none">2 crops</div>
          <div className="mt-1">
            <div className="text-[10px]" style={{ color: '#5DCAA5' }}>Onion ▲ spike warning</div>
            <div className="text-[10px]" style={{ color: '#F09595' }}>Maize ▼ drop expected</div>
          </div>
        </div>

        {/* Quadrant 3 — Open RFQs */}
        <div className="px-4">
          <div className="text-[9px] text-white/50 uppercase tracking-wide mb-1">Open RFQs</div>
          <div className="text-2xl font-medium text-white leading-none">3 active</div>
          <div className="text-[10px] text-white/60 mt-1">1 matched · 1 partial · 1 unmatched</div>
          <div className="mt-2 h-1 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ width: '33%', background: '#1D9E75' }} />
            <div style={{ width: '33%', background: '#EDA100' }} />
            <div style={{ width: '34%', background: '#E24B4A' }} />
          </div>
        </div>

        {/* Quadrant 4 — Confidence */}
        <div className="px-4 last:pr-0">
          <div className="text-[9px] text-white/50 uppercase tracking-wide mb-1">Prediction confidence</div>
          <div className="text-2xl font-medium text-white leading-none">74%</div>
          <div className="text-[10px] text-white/60 mt-1">of 1,136 farming plans · High confidence</div>
          <div
            className="w-8 h-8 rounded-full mt-2"
            style={{ background: 'conic-gradient(#1D9E75 0% 74%, #E24B4A 74% 100%)' }}
          />
        </div>

      </div>
    </div>
  )
}
