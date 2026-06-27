'use client'

import { useState, useEffect, useRef } from 'react'
import { FORECAST, FARMERS, RFQS } from '@/lib/dummy'
import { CROP_EMOJI } from '@/styles/tokens'
import Badge from './ui/Badge'
import { useNav } from '@/context/NavContext'

const QUICK_LINKS = [
  { label: 'Maize · Mwanza', nav: 'harvest-intel', query: 'Maize' },
  { label: 'Rice · Morogoro', nav: 'harvest-intel', query: 'Rice' },
  { label: 'Onion · Arusha', nav: 'harvest-intel', query: 'Onion' },
  { label: 'RFQ-001', nav: 'on-demand', query: 'RFQ-001' },
  { label: 'Dodoma forecast', nav: 'harvest-intel', query: 'Dodoma' },
  { label: 'Mbeya heatmap', nav: 'harvest-intel', query: 'Mbeya' },
]

function matchForecast(q) {
  return FORECAST.filter(f =>
    f.region.toLowerCase().includes(q) ||
    f.crop.toLowerCase().includes(q)
  )
}

function matchFarmers(q) {
  return FARMERS.filter(f =>
    f.farmer_id.toLowerCase().includes(q) ||
    f.crop.toLowerCase().includes(q) ||
    f.region.toLowerCase().includes(q) ||
    f.district.toLowerCase().includes(q)
  )
}

function matchRFQs(q) {
  return RFQS.filter(r =>
    r.rfq_id.toLowerCase().includes(q) ||
    r.crop.toLowerCase().includes(q) ||
    r.region.toLowerCase().includes(q)
  )
}

function confidenceVariant(c) {
  if (c === 'high') return 'green'
  if (c === 'medium') return 'amber'
  return 'red'
}

function statusVariant(s) {
  if (s === 'matched') return 'green'
  if (s === 'partial') return 'amber'
  return 'red'
}

function statusLabel(s) {
  if (s === 'matched') return 'Matched'
  if (s === 'partial') return 'Partial'
  return 'No match'
}

function SectionHeader({ label, count }) {
  return (
    <div className="flex items-center gap-2 px-5 pt-3 pb-1">
      <span className="text-[9px] uppercase tracking-wide text-gray-400 font-medium">{label}</span>
      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400">{count}</span>
    </div>
  )
}

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const { setActiveNav } = useNav()

  function navigate(nav) {
    setActiveNav(nav)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  const q = query.toLowerCase().trim()
  const forecasts = q ? matchForecast(q) : []
  const farmers = q ? matchFarmers(q) : []
  const rfqs = q ? matchRFQs(q) : []
  const hasResults = forecasts.length > 0 || farmers.length > 0 || rfqs.length > 0

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <span className="text-gray-400 text-lg flex-shrink-0">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search crops, regions, farmers, RFQs..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
          />
          <span className="text-[10px] text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0">ESC</span>
        </div>

        {/* Quick links */}
        {!q && (
          <div>
            <div className="text-[9px] uppercase tracking-wide text-gray-400 px-5 pt-3 pb-1">Quick access</div>
            <div className="flex flex-wrap gap-2 px-5 pb-4">
              {QUICK_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.nav)}
                  className="text-[11px] bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl hover:bg-[#E1F5EE] hover:text-[#085041] cursor-pointer transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {q && (
          <div className="max-h-[50vh] overflow-y-auto">
            {!hasResults && (
              <div className="px-5 py-8 text-center text-[11px] text-gray-400">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {forecasts.length > 0 && (
              <div>
                <SectionHeader label="Forecasts" count={forecasts.length} />
                {forecasts.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('harvest-intel')}>
                    <span className="text-lg flex-shrink-0">{CROP_EMOJI[f.crop] || CROP_EMOJI.default}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-gray-800">{f.crop} · {f.region}</div>
                      <div className="text-[10px] text-gray-400">{f.total_tonnes}T expected · {f.farmer_count} farmers</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={confidenceVariant(f.confidence)} size="xs">{f.confidence}</Badge>
                      <span className="text-[10px] text-gray-400">{f.days_to_harvest}d</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {farmers.length > 0 && (
              <div>
                <SectionHeader label="Farmers" count={farmers.length} />
                {farmers.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer">
                    <span className="text-lg flex-shrink-0">{CROP_EMOJI[f.crop] || CROP_EMOJI.default}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-gray-800">{f.farmer_id} · {f.crop}</div>
                      <div className="text-[10px] text-gray-400">{f.region}, {f.district} · {f.land_ha} ha</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={confidenceVariant(f.confidence)} size="xs">{f.confidence}</Badge>
                      <span className="text-[10px] font-medium" style={{ color: '#0F6E56' }}>{f.predicted_tonnes}T</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {rfqs.length > 0 && (
              <div>
                <SectionHeader label="RFQs" count={rfqs.length} />
                {rfqs.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('on-demand')}>
                    <span className="text-lg flex-shrink-0">📋</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-gray-800">{r.rfq_id} · {r.crop}</div>
                      <div className="text-[10px] text-gray-400">{r.region} · {r.currency} · Needed by {r.needed_by}</div>
                    </div>
                    <Badge variant={statusVariant(r.match_status)} size="xs">{statusLabel(r.match_status)}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
