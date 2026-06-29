'use client'

import { useState } from 'react'

const FEATURES = [
  { icon: '📍', title: 'Country → Region → Ward → Crop drill-down', sub: 'Tanzania, Kenya, Uganda — customized per country. Ward-level granularity nobody else has.', soon: false },
  { icon: '🌱', title: 'Forecasted volume per farming stage', sub: 'See exactly how many kg of any crop is at each of the 19 stages right now — from field inspection to crop storage.', soon: false },
  { icon: '⏱', title: 'Live harvest countdown by location', sub: 'Days until first supply hits each aggregation point — village warehouse, local market, port.', soon: false },
  { icon: '📈', title: 'Price direction signals', sub: 'Large supply incoming → price drop flag. Low supply → spike warning. Per crop, per location, per season.', soon: false },
  { icon: '🤝', title: 'RFQ matching — demand to incoming supply', sub: 'Your demand for 400kg Maize matched to incoming Arusha harvest in 12 days automatically.', soon: false },
  { icon: '📋', title: 'Contract farming — stages 1–9', sub: 'Lock forward contracts with farmers still growing. Factories and exporters secure supply before it reaches market.', soon: false },
  { icon: '📱', title: 'WhatsApp & SMS pre-harvest registration', sub: 'Farmers register harvest via WhatsApp in any language. NLP extracts intent. Agent verifies. Data flows into forecast.', soon: false },
  { icon: '🤖', title: 'AI buyer & supplier matching at scale', sub: 'AI reaches 10,000+ targeted suppliers or buyers per day. Manages conversations. Delivers qualified leads. Closes deals.', soon: true },
  { icon: '🌍', title: 'Global supply outlook — 37+ countries', sub: 'Aggregated from MazaoHub + partner agritechs, cooperatives, government boards, NGOs across Africa, India, Latin America.', soon: true },
]

export default function HarvestAnnouncementBanner() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Thin announcement strip ── */}
      <div
        className="fixed left-0 right-0 z-40 flex items-center justify-between gap-3 px-4"
        style={{ top: 78, height: 34, background: '#0a3d2e', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Left: badge + text */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="hidden sm:inline text-[8px] font-medium uppercase tracking-wider rounded-full px-2 py-0.5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}
          >
            Launching Tuesday
          </span>
          <span className="text-[11px] text-white/80 truncate">
            Harvest Intelligence —
            <span className="text-white/50 ml-1 hidden sm:inline">
              The world's first ward-level crop supply intelligence platform
            </span>
          </span>
        </div>

        {/* Right: stats + button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden md:inline text-[10px] text-white/40">
            260K+ farm records · 555K+ farmers · 14 regions
          </span>
          <button
            onClick={() => setOpen(true)}
            className="text-[10px] font-medium px-3 py-1 rounded-full transition-colors flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
          >
            See what's launching →
          </button>
        </div>
      </div>

      {/* ── Features dialog ── */}
      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            className="w-full rounded-3xl overflow-hidden shadow-2xl"
            style={{ maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', background: '#085041' }}
          >
            {/* Dialog header */}
            <div className="px-6 pt-6 pb-5">
              <div className="flex justify-between items-start mb-4">
                <span
                  className="text-[9px] font-medium uppercase tracking-wider rounded-full px-3 py-1"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  Launching Tuesday · Soft launch
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
                >
                  ✕
                </button>
              </div>

              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-medium text-white mb-1">Harvest Intelligence</h2>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 440 }}>
                    The world's first ward-level crop supply intelligence platform.
                    Know what's being grown, where, and when — before it reaches market.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-medium text-white leading-none">260K+</div>
                  <div className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    farm data · harvest forecast per stages
                  </div>
                </div>
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-6 pb-5">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 flex gap-3 items-start"
                  style={f.soon
                    ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }
                    : { background: 'rgba(255,255,255,0.1)' }
                  }
                >
                  <span className="flex-shrink-0 mt-0.5" style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-white" style={{ fontSize: 11, lineHeight: 1.35 }}>{f.title}</span>
                      {f.soon && (
                        <span
                          className="rounded-full flex-shrink-0"
                          style={{ fontSize: 8, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', padding: '2px 7px' }}
                        >
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="mb-0" style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-between flex-wrap gap-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-wrap gap-2" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                <span>555K+ farmers</span><span>·</span>
                <span>260K+ farm data records</span><span>·</span>
                <span>644K+ soil tests made to date</span><span>·</span>
                <span>14 Tanzania regions</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium rounded-xl transition-colors flex-shrink-0"
                style={{ background: '#fff', color: '#085041', padding: '8px 20px' }}
              >
                Request early access →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
