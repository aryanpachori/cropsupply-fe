'use client'

import { useState, useEffect } from 'react'

const DATA_ISSUES = [
  { id: 1, severity: "high", area: "Warehouses", issue: "62 warehouses showing Reg No: false and GPS 000000", fix: "Rajab to run data validation script before Tuesday" },
  { id: 2, severity: "high", area: "Warehouses", issue: "Country field mismatches — Mbeya warehouses labeled as Poland, Morocco", fix: "Fix region_id → country mapping in warehouse seed data" },
  { id: 3, severity: "medium", area: "On Demand", issue: "RFQ counter shows 847 but only 3-4 visible — filter bug or stale data", fix: "Check RFQ status filter — likely showing all-time vs active" },
  { id: 4, severity: "medium", area: "On Demand", issue: "Expired RFQs still showing active (Jun 5, Jun 8, Jun 18 deadlines)", fix: "Add auto-expiry job or status=expired filter on load" },
  { id: 5, severity: "low", area: "Warehouses", issue: "All warehouses showing 0% occupied despite capacity listed", fix: "Inventory not connected to warehouse records yet" },
  { id: 6, severity: "low", area: "On Trends", issue: "7d trend column empty across all price rows", fix: "Historical price data not being pulled into trend column" },
]

function severityColor(s) {
  if (s === 'high') return '#E24B4A'
  if (s === 'medium') return '#EDA100'
  return '#888780'
}

export default function DataQualityBanner() {
  const [open, setOpen] = useState(false)
  const [fixed, setFixed] = useState({})
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development'
    const hasDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true'
    setShow(isDev || hasDebug)
  }, [])

  if (!show) return null

  const openCount = DATA_ISSUES.filter(i => !fixed[i.id]).length

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-20 right-5 z-40 text-[10px] font-medium px-3 py-1.5 rounded-full shadow-sm cursor-pointer border"
        style={{ background: '#FAEEDA', borderColor: '#FAC775', color: '#854F0B' }}
      >
        ⚠ {openCount} data issues
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-32 right-5 z-40 w-[360px] max-h-[70vh] bg-white rounded-2xl border border-[#FAC775] shadow-xl overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-shrink-0">
            <span className="text-xs font-medium text-gray-800">Data quality issues — fix before Tuesday</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-lg leading-none">×</button>
          </div>
          <div className="overflow-y-auto p-4 space-y-0 divide-y divide-gray-50">
            {DATA_ISSUES.map(issue => (
              <div key={issue.id} className="flex items-start gap-3 py-2.5">
                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: fixed[issue.id] ? '#1D9E75' : severityColor(issue.severity) }} />
                <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0 h-fit">{issue.area}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-700" style={{ textDecoration: fixed[issue.id] ? 'line-through' : 'none' }}>{issue.issue}</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">{issue.fix}</div>
                </div>
                <button
                  onClick={() => setFixed(f => ({ ...f, [issue.id]: !f[issue.id] }))}
                  className="text-[9px] flex-shrink-0 px-2 py-0.5 rounded-full border transition-colors"
                  style={fixed[issue.id]
                    ? { background: '#E1F5EE', color: '#085041', borderColor: '#9FE1CB' }
                    : { background: '#F5F4F0', color: '#888780', borderColor: '#E5E7EB' }
                  }
                >
                  {fixed[issue.id] ? '✓ Fixed' : 'Fix'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
