'use client'

import { useState } from 'react'
import Card from './ui/Card'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'
import { NETWORK_DATA } from '@/lib/dummy'

const TIER_CONFIG = [
  { key: "village_warehouses", label: "Village warehouses", color: "#1D9E75", icon: "🏘" },
  { key: "local_markets", label: "Local markets", color: "#185FA5", icon: "🏪" },
  { key: "grain_storage", label: "Grain storage", color: "#854F0B", icon: "🌾" },
  { key: "cold_storage", label: "Cold storage", color: "#534AB7", icon: "❄" },
  { key: "port_warehouses", label: "Port warehouses", color: "#993C1D", icon: "⚓" },
  { key: "fulfillment_centers", label: "Fulfillment centers", color: "#444441", icon: "📦" },
]

const FLOW_NODES = ["Village", "Local market", "Grain/Cold store", "Port warehouse", "Fulfillment center", "Buyer / Exporter"]
const TIER_TO_FLOW = {
  village_warehouses: "Village",
  local_markets: "Local market",
  grain_storage: "Grain/Cold store",
  cold_storage: "Grain/Cold store",
  port_warehouses: "Port warehouse",
  fulfillment_centers: "Fulfillment center",
}

function utilBadge(pct) {
  if (pct >= 80) return { label: 'Near full', bg: '#FCEBEB', color: '#A32D2D' }
  if (pct >= 40) return { label: `${pct}% full`, bg: '#FAEEDA', color: '#854F0B' }
  return { label: 'Space available', bg: '#E1F5EE', color: '#085041' }
}

export default function AggregationNetwork() {
  const [activeTier, setActiveTier] = useState('village_warehouses')
  const tierConfig = TIER_CONFIG.find(t => t.key === activeTier)
  const activeNode = TIER_TO_FLOW[activeTier]

  return (
    <Card className="p-5 mb-6">
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-700">Aggregation point network</div>
        <div className="text-[10px] text-gray-400 mt-0.5">Where supply meets demand across the value chain</div>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap overflow-x-auto">
        {TIER_CONFIG.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTier(t.key)}
            className="text-[10px] font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors flex-shrink-0"
            style={activeTier === t.key
              ? { background: t.color, color: 'white', borderColor: t.color }
              : { background: 'white', color: '#5F5E5A', borderColor: '#F1EFE8' }
            }
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {(NETWORK_DATA[activeTier] || []).map((loc, i) => {
          const pct = Math.round((loc.stock_t / loc.capacity_t) * 100)
          const badge = utilBadge(pct)
          return (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all relative">
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>
              </div>
              <div className="text-xs font-medium text-gray-800 mb-0.5 pr-20">{loc.name}</div>
              <div className="text-[10px] text-gray-400 mb-3">{loc.region}</div>
              <ProgressBar value={pct} height={5} color={tierConfig.color} />
              <div className="flex justify-between mt-1 text-[9px] text-gray-400">
                <span>{loc.stock_t}T used</span>
                <span>{loc.capacity_t}T capacity</span>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {loc.crops.map(c => (
                  <span key={c} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50 overflow-x-auto">
        {FLOW_NODES.map((node, i) => (
          <div key={node} className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[9px] px-2 py-1 rounded-lg whitespace-nowrap"
              style={node === activeNode
                ? { background: tierConfig.color, color: 'white' }
                : { background: '#F1EFE8', color: '#5F5E5A' }
              }
            >
              {node}
            </span>
            {i < FLOW_NODES.length - 1 && <span className="text-gray-300 text-[10px]">→</span>}
          </div>
        ))}
      </div>
    </Card>
  )
}
