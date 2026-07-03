'use client'

import { fmtTonnes } from '@/lib/utils'

export default function RFQMatches({ rfqs }) {
  const all = rfqs || []
  const matched   = all.filter(r => r.match_status === 'matched')
  const available = all.filter(r => r.match_status === 'available')
  const noMatch   = all.filter(r => r.match_status === 'no_match')

  const future  = all.filter(r => r.demand_type === 'Future')
  const current = all.filter(r => r.demand_type === 'Current')

  const avgSupply  = all.length > 0 ? all.reduce((s, r) => s + (r.matched_tonnes || 0), 0) / all.length : 0
  const maxSuppliers = all.length > 0 ? Math.max(...all.map(r => r.matched_supplier_count || 0)) : 0

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#534AB7' }} />
          <span className="text-[11px] font-medium text-gray-600">
            Demand &amp; supply matching · {all.length} demand records
          </span>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl p-4 border" style={{ background: '#E1F5EE', borderColor: '#9FE1CB' }}>
          <div className="text-[9px] uppercase tracking-wide font-medium mb-1" style={{ color: '#085041' }}>Matched</div>
          <div className="text-2xl font-medium" style={{ color: '#0F6E56' }}>{matched.length}</div>
          <div className="text-[10px] mt-0.5" style={{ color: '#085041' }}>demand records fully matched</div>
        </div>
        <div className="rounded-2xl p-4 border" style={{ background: '#E6F1FB', borderColor: '#B8D4F5' }}>
          <div className="text-[9px] uppercase tracking-wide font-medium mb-1" style={{ color: '#185FA5' }}>Avg supply per RFQ</div>
          <div className="text-2xl font-medium" style={{ color: '#185FA5' }}>{fmtTonnes(avgSupply)}</div>
          <div className="text-[10px] mt-0.5" style={{ color: '#185FA5' }}>supply available in system</div>
        </div>
        <div className="rounded-2xl p-4 border" style={{ background: '#EEEDFE', borderColor: '#C4C0F5' }}>
          <div className="text-[9px] uppercase tracking-wide font-medium mb-1" style={{ color: '#534AB7' }}>Active suppliers</div>
          <div className="text-2xl font-medium" style={{ color: '#534AB7' }}>{maxSuppliers.toLocaleString()}</div>
          <div className="text-[10px] mt-0.5" style={{ color: '#534AB7' }}>farmers at harvest stage 14+</div>
        </div>
      </div>

      {/* Match status breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium mb-3">Match status breakdown</div>
        {[
          { label: 'Matched',          count: matched.length,   color: '#1D9E75', note: 'Supply found and linked to demand' },
          { label: 'Supply available', count: available.length, color: '#185FA5', note: 'Supply exists — crop specificity pending' },
          { label: 'No match',         count: noMatch.length,   color: '#E24B4A', note: 'No supply at stage 14+ for this demand' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[11px] font-medium text-gray-800 w-36 flex-shrink-0">{item.label}</span>
            <span className="text-[11px] font-semibold w-8" style={{ color: item.color }}>{item.count}</span>
            <span className="text-[10px] text-gray-400">{item.note}</span>
          </div>
        ))}
      </div>

      {/* Demand type split */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="text-[10px] uppercase text-gray-400 tracking-wide font-medium mb-3">Demand type split</div>
        <div className="flex gap-6">
          <div>
            <div className="text-xl font-medium text-gray-900">{future.length}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Future demand</div>
          </div>
          <div>
            <div className="text-xl font-medium text-gray-900">{current.length}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Current demand</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: '#F1EFE8' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${all.length > 0 ? (future.length / all.length * 100).toFixed(0) : 0}%`, background: '#185FA5' }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 mt-1">
          <span>Future ({all.length > 0 ? (future.length / all.length * 100).toFixed(0) : 0}%)</span>
          <span>Current ({all.length > 0 ? (current.length / all.length * 100).toFixed(0) : 0}%)</span>
        </div>
      </div>

      {/* The matched record — highlight it */}
      {matched.length > 0 && (
        <div className="rounded-2xl p-4 mb-3 border" style={{ background: '#E1F5EE', borderColor: '#1D9E75' }}>
          <div className="text-[9px] uppercase tracking-wide font-medium mb-2" style={{ color: '#085041' }}>✓ Confirmed match</div>
          {matched.map(r => (
            <div key={r.id} className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-medium text-gray-800">Demand #{r.id} · {r.demand_type}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">{r.match_text}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium" style={{ color: '#0F6E56' }}>{fmtTonnes(r.matched_tonnes)}</div>
                <div className="text-[9px] text-gray-500">{r.matched_supplier_count} suppliers</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data quality note */}
      <div className="rounded-xl p-3 border" style={{ background: '#FAEEDA', borderColor: '#FAC775' }}>
        <div className="text-[10px] font-medium mb-1" style={{ color: '#854F0B' }}>⚠ Matching accuracy improving</div>
        <div className="text-[9px] leading-relaxed" style={{ color: '#854F0B' }}>
          Most demand records have <code className="font-mono">crop_id=null</code> and <code className="font-mono">yield_estimate=null</code>.
          Full crop-to-supply matching activates once the demand API links crop IDs.
          Currently {available.length} records show available supply without crop specificity.
        </div>
      </div>
    </div>
  )
}
