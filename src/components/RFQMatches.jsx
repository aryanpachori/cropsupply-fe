'use client'

import Badge from './ui/Badge'
import { CROP_EMOJI } from '@/styles/tokens'

function statusVariant(status) {
  if (status === 'matched') return 'green'
  if (status === 'partial') return 'amber'
  return 'red'
}

function statusLabel(status) {
  if (status === 'matched') return 'Matched'
  if (status === 'partial') return 'Partial'
  return 'No match'
}

function borderColor(status) {
  if (status === 'matched') return '#1D9E75'
  if (status === 'partial') return '#EDA100'
  return '#E24B4A'
}

function matchTextColor(status) {
  if (status === 'matched') return '#0F6E56'
  if (status === 'partial') return '#854F0B'
  return '#A32D2D'
}

function formatQty(qty) {
  if (qty >= 1000000) return (qty / 1000).toFixed(0) + 'T'
  if (qty >= 1000) return (qty / 1000).toFixed(0) + 'T'
  return qty + 'kg'
}

function formatDate(d) {
  const dt = new Date(d)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[dt.getMonth()]} ${dt.getDate()}`
}

export default function RFQMatches({ rfqs }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#185FA5] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-600">Matched RFQ alerts — your demand vs incoming supply</span>
        </div>
        <Badge variant="blue">{rfqs.length} open RFQs</Badge>
      </div>

      <div className="flex flex-col gap-2">
        {rfqs.map((rfq) => (
          <div
            key={rfq.rfq_id}
            className="bg-white rounded-2xl overflow-hidden border flex flex-row transition-all duration-150 hover:shadow-sm"
            style={{ borderColor: borderColor(rfq.match_status) }}
          >
            <div className="w-1 flex-shrink-0 self-stretch" style={{ background: borderColor(rfq.match_status) }} />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CROP_EMOJI[rfq.crop] || CROP_EMOJI.default}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{rfq.crop}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{rfq.region}</div>
                  </div>
                </div>
                <Badge variant={statusVariant(rfq.match_status)}>{statusLabel(rfq.match_status)}</Badge>
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-gray-500">
                <span>📦 {formatQty(rfq.qty_kg)}</span>
                <span>{rfq.currency}</span>
                <span>Grade: {rfq.grade}</span>
                <span>Needed by {formatDate(rfq.needed_by)}</span>
              </div>

              <div className="mt-2 text-[11px] leading-relaxed font-medium" style={{ color: matchTextColor(rfq.match_status) }}>
                {rfq.match_text}
              </div>

              {rfq.match_status === 'matched' && (
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <button className="text-[11px] font-medium text-white px-4 py-2 rounded-xl transition-colors hover:opacity-90" style={{ background: '#0F6E56' }}>
                    Connect with suppliers →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
