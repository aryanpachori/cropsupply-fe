'use client'

import { useState } from 'react'
import DealFlow from './DealFlow'

const SUPPLIER_PROFILE = {
  id: "SP-MZ-10042",
  name: "John Msigwa",
  type: "farmer",
  region: "Mwanza",
  district: "Ilemela",
  crop: "Maize",
  land_ha: 2.4,
  current_stage: 12,
  current_stage_name: "Weed control",
  predicted_tonnes: 7.2,
  harvest_from: "2026-07-12",
  harvest_to: "2026-07-22",
  confidence: "high",
}

const MATCHED_BUYERS = [
  { id: "BY-001", name: "Kariakoo Wholesale", type: "market_trader", location: "Kariakoo, Dar es Salaam", crop: "Maize", qty_tonnes: 5, price_tzs: 520, frequency: "weekly", grade: "A", urgency: "high", days_to_deadline: 11, verified: true },
  { id: "BY-002", name: "East Africa Milling Ltd", type: "factory", location: "Industrial Area, DSM", crop: "Maize", qty_tonnes: 50, price_tzs: 490, frequency: "monthly", grade: "A", urgency: "medium", days_to_deadline: 28, verified: true },
  { id: "BY-003", name: "Nakumatt Supermarket", type: "supermarket", location: "Mlimani City, DSM", crop: "Maize", qty_tonnes: 2, price_tzs: 550, frequency: "weekly", grade: "B", urgency: "low", days_to_deadline: 45, verified: true },
  { id: "BY-004", name: "Export House Tanzania", type: "exporter", location: "DSM Port", crop: "Maize", qty_tonnes: 200, price_tzs: 480, frequency: "seasonal", grade: "Export", urgency: "medium", days_to_deadline: 60, verified: false },
]

const SELL_SIGNALS = [
  { type: "warning", title: "Maize supply is high this season (+22%)", body: "284 farmers in Mwanza are also harvesting Maize in July. Sell before Jul 12 or warehouse to wait for better August prices.", action: "Consider early sale" },
  { type: "opportunity", title: "East Africa Milling needs 50T monthly — your volume qualifies", body: "Factory demand is recurring monthly at TZS 490/kg. Consistent income vs spot market volatility.", action: "Accept monthly contract" },
  { type: "opportunity", title: "Weekly demand from Kariakoo at TZS 520/kg — 6% above market", body: "Kariakoo Wholesale is paying above market rate for Grade A Maize. Your harvest quality matches.", action: "Connect now" },
]

const CONTRACT_OFFERS = [
  { id: "CF-001", buyer: "East Africa Milling Ltd", crop: "Maize", volume_tonnes: 7, price_tzs: 495, delivery: "Jul 15–22 2026", frequency: "one-time", grade: "A", terms: "Full payment on delivery. Transport provided by buyer.", status: "new" },
  { id: "CF-002", buyer: "Kariakoo Wholesale", crop: "Maize", volume_tonnes: 2, price_tzs: 520, delivery: "Weekly from Jul 12", frequency: "weekly", grade: "A", terms: "Weekly pickup. 50% advance on signing.", status: "new" },
]

const TYPE_CONFIG = {
  market_trader: { label: "Market trader", color: "#1D9E75", bg: "#E1F5EE" },
  factory:       { label: "Factory",        color: "#185FA5", bg: "#E6F1FB" },
  supermarket:   { label: "Supermarket",    color: "#534AB7", bg: "#EEEDFE" },
  exporter:      { label: "Exporter",       color: "#854F0B", bg: "#FAEEDA" },
}

const URGENCY_COLOR = { high: '#E24B4A', medium: '#EDA100', low: '#1D9E75' }

const sortedBuyers = [...MATCHED_BUYERS].sort((a, b) => {
  const order = { high: 0, medium: 1, low: 2 }
  return order[a.urgency] - order[b.urgency]
})

export default function SupplierView() {
  const s = SUPPLIER_PROFILE
  const [selected, setSelected] = useState({})
  const [outreachDone, setOutreachDone] = useState(false)
  const [activeDeal, setActiveDeal] = useState(null)

  function toggleBuyer(id) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const selectedCount = Object.values(selected).filter(Boolean).length

  function handleOutreach() {
    if (selectedCount > 0) setOutreachDone(true)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {activeDeal && (
        <DealFlow
          type="supplier_to_buyer"
          buyerData={activeDeal.buyer}
          supplierData={activeDeal.supplier}
          onClose={() => setActiveDeal(null)}
        />
      )}

      {/* Section 1 — Harvest summary */}
      <div className="rounded-3xl p-5 text-white" style={{ background: '#0F6E56' }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] opacity-60 uppercase tracking-wide mb-2">Your predicted harvest</div>
            <div className="text-5xl font-medium leading-none">{s.predicted_tonnes}<span className="text-2xl ml-1 opacity-70">T</span></div>
            <div className="text-sm opacity-70 mt-1">tonnes of {s.crop}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] opacity-70 mb-1">Stage {s.current_stage} of 19</div>
            <div className="text-sm font-medium">{s.current_stage_name}</div>
            <div className="w-20 h-1 bg-white/20 rounded-full mt-2 ml-auto overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${(s.current_stage / 19) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap gap-4 text-[11px] opacity-80">
          <span>📍 {s.district}, {s.region}</span>
          <span>📅 Jul 12–22, 2026</span>
          <span>✓ High confidence</span>
        </div>
      </div>

      {/* Section 2 — Sell signals */}
      <div>
        <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium mb-2">Best time to sell</div>
        <div className="space-y-3">
          {SELL_SIGNALS.map((signal, i) => {
            const isWarning = signal.type === 'warning'
            return (
              <div
                key={i}
                className="rounded-2xl p-4 border flex gap-3 items-start"
                style={isWarning
                  ? { background: '#FAEEDA', borderColor: '#FAC775' }
                  : { background: '#E1F5EE', borderColor: '#9FE1CB' }
                }
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: isWarning ? 'rgba(133,79,11,0.15)' : 'rgba(15,110,86,0.15)' }}
                >
                  {isWarning ? '⚠️' : '💰'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800 mb-1">{signal.title}</div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{signal.body}</p>
                  <button
                    className="mt-2 text-[11px] font-medium px-3 py-1.5 rounded-xl text-white transition-opacity hover:opacity-90"
                    style={{ background: isWarning ? '#854F0B' : '#0F6E56' }}
                  >
                    {signal.action}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Section 3 — Contract offers */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium">Contract offers for you</div>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#E1F5EE', color: '#085041' }}>
            {CONTRACT_OFFERS.length} new
          </span>
        </div>
        <div className="space-y-3">
          {CONTRACT_OFFERS.map(offer => (
            <div key={offer.id} className="bg-white rounded-2xl border border-[#9FE1CB] p-4">
              <div className="flex justify-between items-start">
                <div className="text-xs font-medium text-gray-800">{offer.buyer}</div>
                <span className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#FCEBEB', color: '#A32D2D' }}>NEW</span>
              </div>
              <div className="text-sm font-medium mt-1" style={{ color: '#0F6E56' }}>
                {offer.volume_tonnes}T of {offer.crop} at TZS {offer.price_tzs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/kg
              </div>
              <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-500">
                <span>📅 {offer.delivery}</span>
                <span>🔄 {offer.frequency}</span>
                <span>⭐ Grade {offer.grade}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-2 italic">{offer.terms}</div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setActiveDeal({
                    buyer: {
                      name: offer.buyer,
                      location: 'Dar es Salaam',
                      crop: offer.crop,
                      qty_tonnes: offer.volume_tonnes,
                      price_tzs: offer.price_tzs,
                      grade: offer.grade,
                      frequency: offer.frequency,
                      delivery_window: offer.delivery,
                    },
                    supplier: {
                      name: s.name,
                      location: `${s.district}, ${s.region}`,
                      harvest_window: `${s.harvest_from} – ${s.harvest_to}`,
                      confidence: s.confidence,
                    },
                  })}
                  className="flex-1 text-[11px] font-medium text-white py-2 rounded-xl hover:opacity-90 transition-opacity"
                  style={{ background: '#0F6E56' }}
                >
                  Accept →
                </button>
                <button className="flex-1 text-[11px] font-medium py-2 rounded-xl border transition-colors hover:bg-gray-50" style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>
                  Negotiate
                </button>
                <button className="text-[11px] text-gray-400 px-2 py-2 cursor-pointer hover:text-red-500 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 — Matched buyers */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium">Active buyers looking for your crop</div>
          <span className="text-[10px] text-gray-400">{MATCHED_BUYERS.length} matched</span>
        </div>
        <div className="space-y-3">
          {sortedBuyers.map(buyer => {
            const typeConf = TYPE_CONFIG[buyer.type] || { label: buyer.type, color: '#888780', bg: '#F1EFE8' }
            return (
              <div
                key={buyer.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition-all cursor-pointer overflow-hidden"
                style={{ borderLeft: `3px solid ${URGENCY_COLOR[buyer.urgency]}` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-medium text-gray-800">{buyer.name}</div>
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded-full mt-1 font-medium" style={{ background: typeConf.bg, color: typeConf.color }}>
                      {typeConf.label}
                    </span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full capitalize" style={{ background: '#E6F1FB', color: '#185FA5' }}>
                    {buyer.frequency}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  {buyer.location}{buyer.verified ? ' · ✓ Verified' : ''}
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-600">
                  <span>📦 {buyer.qty_tonnes}T needed</span>
                  <span>💰 TZS {buyer.price_tzs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/kg</span>
                  <span>⭐ Grade {buyer.grade}</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: URGENCY_COLOR[buyer.urgency] }} />
                    {buyer.days_to_deadline} days to deadline
                  </div>
                  <button className="text-[11px] font-medium text-white px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity" style={{ background: '#0F6E56' }}>
                    Connect →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Section 5 — AI outreach launcher */}
      <div className="rounded-2xl p-4 border border-gray-200" style={{ background: '#F5F4F0' }}>
        <div className="flex items-start gap-2 mb-3">
          <span className="text-base flex-shrink-0">🤖</span>
          <div>
            <div className="text-xs font-medium text-gray-700">AI will run buyer conversations for you</div>
            <div className="text-[10px] text-gray-400">Select buyers, AI reaches out, qualifies, and brings you confirmed deals</div>
          </div>
        </div>

        {outreachDone ? (
          <div className="bg-white rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-xs font-medium text-gray-800 mb-1">AI outreach started</div>
            <div className="text-[10px] text-gray-500 leading-relaxed">
              AI is now reaching out to {selectedCount} buyer{selectedCount > 1 ? 's' : ''} on your behalf. You&apos;ll receive qualified responses within 24 hours.
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {MATCHED_BUYERS.map(buyer => (
                <label key={buyer.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selected[buyer.id]}
                    onChange={() => toggleBuyer(buyer.id)}
                    className="rounded"
                    style={{ accentColor: '#0F6E56' }}
                  />
                  <span className="text-[11px] text-gray-700">
                    {buyer.name} — {buyer.qty_tonnes}T at TZS {buyer.price_tzs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/kg ({buyer.frequency})
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={handleOutreach}
              disabled={selectedCount === 0}
              className="w-full text-white text-xs font-medium py-3 rounded-xl mt-3 transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#0F6E56' }}
            >
              Start AI outreach for selected buyers →
            </button>
          </>
        )}

        <div className="text-[9px] text-gray-400 mt-2 text-center">AI manages initial conversations. You approve all final deals.</div>
      </div>

    </div>
  )
}
