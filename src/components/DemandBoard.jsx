'use client'

import { useState } from 'react'
import { RFQS, DEMAND_DATA } from '@/lib/dummy'
import { CROP_EMOJI } from '@/styles/tokens'

const STATUS_TABS = ['All', 'Urgent', 'Active', 'Expiring soon']

function formatQty(qty) {
  if (qty >= 1000000) return (qty / 1000).toFixed(0) + 'T'
  if (qty >= 1000) return (qty / 1000).toFixed(1) + 'T'
  return qty + ' kg'
}

function daysBadge(days_left) {
  if (days_left <= 14) return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#FCEBEB', color: '#A32D2D' }}>
      Urgent · {days_left} days
    </span>
  )
  if (days_left <= 21) return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#FAEEDA', color: '#854F0B' }}>
      {days_left} days left
    </span>
  )
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#E1F5EE', color: '#085041' }}>
      {days_left} days
    </span>
  )
}

function matchText(id) {
  const rfq = RFQS.find(r => r.rfq_id === id)
  return rfq ? { text: rfq.match_text, status: rfq.match_status } : null
}

function matchColor(status) {
  if (status === 'matched') return '#0F6E56'
  if (status === 'partial') return '#854F0B'
  return '#A32D2D'
}

export default function DemandBoard() {
  const [activeTab, setActiveTab] = useState('All')
  const [frequencyFilter, setFrequencyFilter] = useState('')

  const filtered = DEMAND_DATA.filter(d => {
    if (activeTab === 'Urgent' && d.status !== 'urgent') return false
    if (activeTab === 'Active' && d.status !== 'active') return false
    if (activeTab === 'Expiring soon' && d.days_left > 14) return false
    if (frequencyFilter && d.frequency !== frequencyFilter) return false
    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">Active demand — RFQs</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400">847 total RFQs on platform</span>
          <button className="text-xs font-medium text-white px-3 py-1.5 rounded-xl transition-colors hover:opacity-90" style={{ background: '#0F6E56' }}>
            Post RFQ
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                activeTab === tab ? 'text-white' : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200'
              }`}
              style={activeTab === tab ? { background: '#0F6E56' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative ml-2">
          <select
            value={frequencyFilter}
            onChange={e => setFrequencyFilter(e.target.value)}
            className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] appearance-none pr-6"
          >
            <option value="">All types</option>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="seasonal">Seasonal</option>
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filtered.map((d) => {
          const match = matchText(d.id)
          const isUrgent = d.status === 'urgent'
          return (
            <div
              key={d.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-sm transition-all border"
              style={{ borderColor: isUrgent ? '#E24B4A' : '#1D9E75' }}
            >
              <div className="h-1 w-full" style={{ background: isUrgent ? '#E24B4A' : '#1D9E75' }} />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{CROP_EMOJI[d.crop] || CROP_EMOJI.default}</span>
                    <span className="text-sm font-medium text-gray-900">{d.crop}</span>
                  </div>
                  {daysBadge(d.days_left)}
                </div>

                <div className="mt-1">
                  <div className="text-xs text-gray-600">{d.buyer}</div>
                  <div className="text-[10px] text-gray-400">{d.location}</div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-500">
                  <span>📦 {formatQty(d.qty_kg)}</span>
                  <span>💰 {d.price_per_unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {d.currency}/unit</span>
                  <span>⭐ Grade {d.grade}</span>
                </div>

                <div className="mt-2">
                  <span className="text-[9px] font-medium px-2 py-0.5 rounded-full capitalize" style={{ background: '#E6F1FB', color: '#185FA5' }}>
                    {d.frequency} demand
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center gap-2">
                  <span className="text-[10px] flex-1" style={{ color: match ? matchColor(match.status) : '#888780' }}>
                    {match ? match.text : 'No match data available'}
                  </span>
                  <button className="text-[11px] font-medium flex-shrink-0 hover:underline" style={{ color: '#0F6E56' }}>
                    Respond
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
