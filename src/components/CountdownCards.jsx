'use client'

import { useState } from 'react'
import Badge from './ui/Badge'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'

const VISIBLE_DEFAULT = 8

function accentColor(days) {
  if (days <= 14) return '#1D9E75'
  if (days <= 21) return '#EDA100'
  return '#E24B4A'
}

function countdownColor(days) {
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
  const [expanded, setExpanded] = useState(false)
  const sorted = [...forecast].sort((a, b) => a.days_to_harvest - b.days_to_harvest)
  const visible = expanded ? sorted : sorted.slice(0, VISIBLE_DEFAULT)
  const hidden = sorted.length - VISIBLE_DEFAULT

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-600">Live harvest countdown by region</span>
        </div>
        <span className="text-[10px] text-gray-400">Sorted by days to first supply</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1D9E75] hover:shadow-sm transition-all duration-150 cursor-pointer"
          >
            <div className="w-full h-0.5" style={{ background: accentColor(item.days_to_harvest) }} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{CROP_EMOJI[item.crop] || CROP_EMOJI.default}</span>
                  <span className="text-xs font-medium text-gray-800">{item.crop}</span>
                </div>
                <Badge variant={confidenceVariant(item.confidence)} size="xs">{item.confidence}</Badge>
              </div>

              <div className="text-4xl font-medium leading-none tracking-tight" style={{ color: countdownColor(item.days_to_harvest) }}>
                {item.days_to_harvest}
              </div>
              <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-1">days to harvest</div>

              <div className="text-xs text-gray-500 mt-3">{item.location || item.region}</div>

              <div className="border-t border-gray-50 mt-3 pt-3">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                  <span>{item.total_tonnes}T expected</span>
                  <span>{item.farmer_count} farmers</span>
                </div>
                <ProgressBar value={Math.round((item.avg_step / 19) * 100)} height={2} color={progressColor(item.confidence)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {hidden > 0 && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-3 text-[11px] text-[#0F6E56] font-medium hover:underline"
        >
          {expanded ? '↑ Show less' : `↓ Show ${hidden} more`}
        </button>
      )}
    </div>
  )
}
