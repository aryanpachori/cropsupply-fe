'use client'

import { AI_INSIGHTS } from '@/lib/dummy'

const TOP_INSIGHTS = AI_INSIGHTS.slice(0, 3).map(i => ({ id: i.id, icon: i.icon, title: i.title, severity: i.severity }))

function severityDotColor(severity) {
  if (severity === 'high' || severity === 'urgent') return '#F09595'
  if (severity === 'medium') return '#EDA100'
  return '#888780'
}

export default function InsightSummaryBar({ onInsightClick }) {
  return (
    <div className="sticky top-[108px] z-30 py-2 px-4 mb-4" style={{ background: '#085041' }}>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[9px] uppercase tracking-wide text-white/50 font-medium flex-shrink-0 mr-1">AI insights</span>
        {TOP_INSIGHTS.map((insight) => (
          <button
            key={insight.id}
            onClick={() => onInsightClick?.(insight.id)}
            className="flex-shrink-0 flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-1 cursor-pointer transition-colors hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <span className="text-sm">{insight.icon}</span>
            <span className="text-[10px] text-white/80 truncate max-w-[180px]">{insight.title}</span>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: severityDotColor(insight.severity) }} />
          </button>
        ))}
        <button className="text-[10px] text-white/50 hover:text-white cursor-pointer flex-shrink-0 ml-auto whitespace-nowrap">
          View all 6 →
        </button>
      </div>
    </div>
  )
}
