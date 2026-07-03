'use client'

import { useState } from 'react'
import Badge from './ui/Badge'
import ProgressBar from './ui/ProgressBar'
import { fmtTonnes } from '@/lib/utils'

function accentColor(days) {
  if (days <= 7) return '#0F6E56'
  if (days <= 14) return '#1D9E75'
  if (days <= 21) return '#EDA100'
  return '#E24B4A'
}

function countdownColor(days) {
  if (days <= 7) return '#085041'
  if (days <= 14) return '#0F6E56'
  if (days <= 21) return '#854F0B'
  return '#A32D2D'
}

function confidenceVariant(c) {
  if (c === 'high') return 'green'
  if (c === 'medium') return 'amber'
  return 'red'
}

function progressColor(confidence) {
  if (confidence === 'high') return '#1D9E75'
  if (confidence === 'medium') return '#EDA100'
  return '#E24B4A'
}

export default function CountdownCards({ forecast }) {
  const [showAll, setShowAll] = useState(false)
  const sorted = [...(forecast || [])].sort((a, b) => a.days_to_harvest - b.days_to_harvest)
  const displayed = showAll ? sorted : sorted.slice(0, 8)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-600">Live harvest countdown · by location</span>
        </div>
        <span className="text-[10px] text-gray-400">Sorted by days to first supply</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayed.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1D9E75] hover:shadow-sm transition-all duration-150"
          >
            <div className="w-full h-0.5" style={{ background: accentColor(item.days_to_harvest) }} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium text-gray-500 truncate pr-2 leading-tight">{item.location}</span>
                <Badge variant={confidenceVariant(item.confidence)} size="xs">{item.confidence}</Badge>
              </div>

              <div className="text-4xl font-medium leading-none tracking-tight" style={{ color: countdownColor(item.days_to_harvest) }}>
                {item.days_to_harvest}
              </div>
              <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-1">days to harvest</div>

              <div className="border-t border-gray-50 mt-3 pt-3">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                  <span>{fmtTonnes(item.total_tonnes)}</span>
                  <span>{item.farmer_count} farmers</span>
                </div>
                <ProgressBar value={Math.round((item.avg_step / 19) * 100)} height={2} color={progressColor(item.confidence)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-gray-400">
          {sorted.length} locations tracked across 28 regions
        </span>
        {sorted.length > 8 && (
          <button
            onClick={() => setShowAll(v => !v)}
            className="text-[11px] text-[#0F6E56] font-medium hover:underline"
          >
            {showAll ? '↑ Show fewer' : `↓ Show all ${sorted.length}`}
          </button>
        )}
      </div>
    </div>
  )
}
