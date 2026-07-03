'use client'

import Card from './ui/Card'

export default function KPIBar({ kpis }) {
  const cards = [
    { label: 'Farmers tracked',   value: kpis?.total_farmers ? kpis.total_farmers.toLocaleString() + '+' : '—',                              sub: 'MazaoHub active',         color: 'border-l-gray-200',    subColor: 'text-gray-400' },
    { label: 'Expected yield',    value: kpis?.expected_yield_tonnes ? (kpis.expected_yield_tonnes / 1000).toFixed(1) + 'K T' : '—',          sub: 'Predicted this season',   color: 'border-l-[#1D9E75]',  subColor: 'text-[#1D9E75]' },
    { label: 'Imminent supply',   value: kpis?.imminent_tonnes_14d ? (kpis.imminent_tonnes_14d / 1000).toFixed(1) + 'K T' : '—',              sub: 'Ready in ≤ 14 days',      color: 'border-l-[#1D9E75]',  subColor: 'text-[#1D9E75]' },
    { label: 'Regions active',    value: kpis?.regions_active ?? '—',                                                                          sub: 'Tanzania covered',        color: 'border-l-gray-200',    subColor: 'text-gray-400' },
    { label: 'At harvest stage',  value: kpis?.farmers_at_harvest ? kpis.farmers_at_harvest.toLocaleString() : '—',                            sub: 'Harvesting now',          color: 'border-l-[#1D9E75]',  subColor: 'text-[#1D9E75]' },
    { label: 'Soil samples',      value: kpis?.soil_samples ? kpis.soil_samples.toLocaleString() + '+' : '—',                                  sub: 'NPK · moisture · pH',     color: 'border-l-[#185FA5]',  subColor: 'text-gray-400' },
  ]

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {cards.map((card) => (
        <Card key={card.label} className={`p-3 select-none border-l-2 ${card.color}`}>
          <div className="flex flex-col gap-1">
            <div className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">{card.label}</div>
            <div className="text-xl font-medium text-gray-900 leading-none">{card.value}</div>
            <div className={`text-[9px] mt-0.5 ${card.subColor}`}>{card.sub}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}
