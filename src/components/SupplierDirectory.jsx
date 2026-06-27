'use client'

import { useState } from 'react'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'
import { SUPPLIERS } from '@/lib/dummy'

const TYPE_CONFIG = {
  aggregator:   { label: "Aggregator",   color: "#185FA5", bg: "#E6F1FB" },
  market_agent: { label: "Market agent", color: "#1D9E75", bg: "#E1F5EE" },
  cooperative:  { label: "Cooperative",  color: "#534AB7", bg: "#EEEDFE" },
  agribusiness: { label: "Agribusiness", color: "#854F0B", bg: "#FAEEDA" },
}

const uniqueTypes    = [...new Set(SUPPLIERS.map(s => s.type))]
const uniqueRegions  = [...new Set(SUPPLIERS.map(s => s.region))]
const uniqueCrops    = [...new Set(SUPPLIERS.flatMap(s => s.crops))]

function Stars({ rating }) {
  const full = Math.round(rating)
  return (
    <span className="text-xs" style={{ color: '#EDA100' }}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  )
}

export default function SupplierDirectory() {
  const [typeFilter, setTypeFilter]       = useState('')
  const [regionFilter, setRegionFilter]   = useState('')
  const [cropFilter, setCropFilter]       = useState('')
  const [verifiedOnly, setVerifiedOnly]   = useState(false)

  const filtered = SUPPLIERS.filter(s => {
    if (typeFilter && s.type !== typeFilter) return false
    if (regionFilter && s.region !== regionFilter) return false
    if (cropFilter && !s.crops.includes(cropFilter)) return false
    if (verifiedOnly && !s.verified) return false
    return true
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-medium text-gray-700">On Aggregation — verified suppliers</div>
        </div>
        <span className="text-[10px] text-gray-400">167 active suppliers on platform</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { value: typeFilter, setter: setTypeFilter, placeholder: 'All types', options: uniqueTypes, labels: TYPE_CONFIG },
          { value: regionFilter, setter: setRegionFilter, placeholder: 'All regions', options: uniqueRegions },
          { value: cropFilter, setter: setCropFilter, placeholder: 'All crops', options: uniqueCrops },
        ].map(({ value, setter, placeholder, options }, idx) => (
          <div key={idx} className="relative">
            <select
              value={value}
              onChange={e => setter(e.target.value)}
              className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] appearance-none pr-6"
            >
              <option value="">{placeholder}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
          </div>
        ))}
        <button
          onClick={() => setVerifiedOnly(v => !v)}
          className="text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-colors"
          style={verifiedOnly
            ? { background: '#0F6E56', color: '#fff', borderColor: '#0F6E56' }
            : { background: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }
          }
        >
          ✓ Verified only
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(s => {
          const typeConf = TYPE_CONFIG[s.type] || { label: s.type, color: '#888780', bg: '#F1EFE8' }
          const utilPct = Math.round((s.current_stock_tonnes / s.capacity_tonnes) * 100)
          return (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm hover:border-gray-200 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-medium text-gray-900">{s.name}</div>
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded-full mt-1 font-medium" style={{ background: typeConf.bg, color: typeConf.color }}>
                    {typeConf.label}
                  </span>
                </div>
                {s.verified && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#E1F5EE', color: '#085041' }}>
                    ✓ Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <Stars rating={s.rating} />
                <span className="text-[10px] text-gray-600">{s.rating}</span>
                <span className="text-[10px] text-gray-400">({s.reviews} reviews)</span>
              </div>

              <div className="text-[10px] text-gray-500 mt-2">📍 {s.district}, {s.region}</div>

              <div className="flex gap-1 flex-wrap mt-2">
                {s.crops.map(c => (
                  <span key={c} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {CROP_EMOJI[c] || CROP_EMOJI.default} {c}
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <ProgressBar value={utilPct} height={4} color="#1D9E75" />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                  <span>{s.current_stock_tonnes}T in stock</span>
                  <span>{s.capacity_tonnes}T capacity</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                <span className="text-[10px] text-gray-500">{s.active_listings} active listings</span>
                <button className="text-[11px] font-medium hover:underline" style={{ color: '#0F6E56' }}>Contact →</button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[11px] text-gray-400">No suppliers match your filters</div>
      )}
    </div>
  )
}
