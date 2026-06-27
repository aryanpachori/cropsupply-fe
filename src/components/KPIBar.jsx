'use client'

import Card from './ui/Card'

const CARDS = [
  { label: 'Farmers tracked', value: '150K+', unit: '', sub: 'MazaoHub active', subColor: 'text-gray-400', border: 'border-l-2 border-l-gray-200' },
  { label: 'Expected yield', value: '8,420', unit: 'T', sub: '+18% vs last season', subColor: 'text-green-600', border: 'border-l-2 border-l-[#1D9E75]' },
  { label: 'Imminent supply', value: '1,240', unit: 'T', sub: 'Ready in ≤ 14 days', subColor: 'text-green-600', border: 'border-l-2 border-l-[#1D9E75]' },
  { label: 'Regions active', value: '14', unit: '', sub: 'Tanzania covered', subColor: 'text-gray-400', border: 'border-l-2 border-l-gray-200' },
  { label: 'Confidence', value: '74', unit: '%', sub: 'High prediction accuracy', subColor: 'text-green-600', border: 'border-l-2 border-l-[#185FA5]' },
  { label: 'Soil samples', value: '205K+', unit: '', sub: 'NPK · moisture · pH', subColor: 'text-gray-400', border: 'border-l-2 border-l-[#185FA5]' },
]

export default function KPIBar({ kpis }) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {CARDS.map((card) => (
        <Card key={card.label} className={`p-3 select-none ${card.border}`}>
          <div className="flex flex-col gap-1">
            <div className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">{card.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-medium text-gray-900 leading-none">{card.value}</span>
              {card.unit && <span className="text-xs text-gray-400">{card.unit}</span>}
            </div>
            <div className={`text-[9px] mt-0.5 ${card.subColor}`}>{card.sub}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
