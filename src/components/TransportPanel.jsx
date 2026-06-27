'use client'

import { useState } from 'react'
import Badge from './ui/Badge'
import { TRANSPORT_LISTINGS } from '@/lib/dummy'

const uniqueOrigins = [...new Set(TRANSPORT_LISTINGS.map(t => t.from_location))]
const uniqueDestinations = [...new Set(TRANSPORT_LISTINGS.map(t => t.to_location))]

export default function TransportPanel() {
  const [fromFilter, setFromFilter] = useState('')
  const [toFilter, setToFilter] = useState('')
  const [capacityFilter, setCapacityFilter] = useState('')

  const filtered = TRANSPORT_LISTINGS.filter(t => {
    if (fromFilter && t.from_location !== fromFilter) return false
    if (toFilter && t.to_location !== toFilter) return false
    if (capacityFilter === 'up7' && t.capacity_tonnes > 7) return false
    if (capacityFilter === '7to12' && (t.capacity_tonnes < 7 || t.capacity_tonnes > 12)) return false
    if (capacityFilter === '12plus' && t.capacity_tonnes < 12) return false
    return true
  })

  const available = filtered.filter(t => t.status === 'available').length

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base">🚛</span>
          <div>
            <div className="text-xs font-medium text-gray-700">On Transport — book logistics</div>
            <div className="text-[10px] text-gray-400">Connect incoming harvest to your warehouse or port</div>
          </div>
        </div>
        <Badge variant="green">{available} trucks available</Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative">
          <select
            value={fromFilter}
            onChange={e => setFromFilter(e.target.value)}
            className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] appearance-none pr-6"
          >
            <option value="">Any origin</option>
            {uniqueOrigins.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
        </div>
        <div className="relative">
          <select
            value={toFilter}
            onChange={e => setToFilter(e.target.value)}
            className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] appearance-none pr-6"
          >
            <option value="">Any destination</option>
            {uniqueDestinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
        </div>
        <div className="relative">
          <select
            value={capacityFilter}
            onChange={e => setCapacityFilter(e.target.value)}
            className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] appearance-none pr-6"
          >
            <option value="">Any capacity</option>
            <option value="up7">Up to 7T</option>
            <option value="7to12">7–12T</option>
            <option value="12plus">12T+</option>
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(t => {
          const isAvailable = t.status === 'available'
          return (
            <div
              key={t.id}
              className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                isAvailable ? 'border-[#1D9E75] hover:shadow-sm' : 'border-gray-200'
              }`}
            >
              <div className="h-1" style={{ background: isAvailable ? '#1D9E75' : '#E5E7EB' }} />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-medium text-gray-800">{t.driver}</div>
                  <Badge variant={isAvailable ? 'green' : 'gray'} size="xs">
                    {isAvailable ? 'Available' : 'Booked'}
                  </Badge>
                </div>
                <div className="text-[11px] text-gray-600 mt-1">{t.from_location} → {t.to_location}</div>
                <div className="text-[10px] text-gray-400">{t.distance_km}km</div>

                <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-gray-500">
                  <span>📦 {t.capacity_tonnes}T capacity</span>
                  <span>🚌 {t.vehicle}</span>
                  <span>📅 From {new Date(t.available_from).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                  <span className="text-sm font-medium text-gray-900">
                    TZS {t.price_tzs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                  <button
                    disabled={!isAvailable}
                    className="text-[11px] font-medium text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                    style={{ background: '#0F6E56' }}
                  >
                    Book →
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-[11px] text-gray-400">No trucks match your filters</div>
      )}
    </div>
  )
}
