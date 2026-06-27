'use client'

import Card from './ui/Card'
import Badge from './ui/Badge'
import ProgressBar from './ui/ProgressBar'
import EmptyState from './ui/EmptyState'
import { CROP_EMOJI } from '@/styles/tokens'

function confidenceVariant(c) {
  if (c === 'high') return 'green'
  if (c === 'medium') return 'amber'
  return 'red'
}

function formatWindow(from, to) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const f = new Date(from)
  const t = new Date(to)
  return `${months[f.getMonth()]} ${f.getDate()}–${t.getDate()}`
}

export default function FarmerTable({ farmers, regionFilter, cropFilter }) {
  let filtered = farmers
  if (regionFilter) filtered = filtered.filter(f => f.region === regionFilter)
  if (cropFilter) filtered = filtered.filter(f => f.crop === cropFilter)
  const sorted = [...filtered].sort((a, b) => a.days_to_harvest - b.days_to_harvest)

  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">Farmer-level readiness</span>
        <span className="text-[10px] text-gray-400">Showing {sorted.length} of 150,000+ farmers</span>
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon="🔍" title="No farmers match filters" subtitle="Try clearing the region or crop filter to see all predictions" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead style={{ background: '#F5F4F0' }}>
              <tr>
                {['Farmer ID','Crop','Region','Land','Activity progress','Predicted yield','Harvest window','Confidence'].map(h => (
                  <th key={h} className="text-[9px] font-medium text-gray-400 uppercase tracking-wide text-left px-4 py-2.5 border-b border-gray-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((f) => (
                <tr key={f.farmer_id} className="border-b border-gray-50 transition-colors duration-100" style={{}}>
                  <td className="px-4 py-3 align-middle text-[10px] text-gray-400 font-mono">{f.farmer_id}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-1.5">
                      <span>{CROP_EMOJI[f.crop] || CROP_EMOJI.default}</span>
                      <span className="text-[11px] text-gray-800">{f.crop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-600">{f.region}</td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-600">{f.land_ha} ha</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <ProgressBar value={Math.round((f.last_activity_step / 19) * 100)} height={4} color="#1D9E75" />
                      </div>
                      <span className="text-[10px] text-gray-400">{f.last_activity_step}/19</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-[11px] font-medium" style={{ color: '#0F6E56' }}>{f.predicted_tonnes}T</td>
                  <td className="px-4 py-3 align-middle text-[10px] text-gray-500">{formatWindow(f.harvest_from, f.harvest_to)}</td>
                  <td className="px-4 py-3 align-middle">
                    <Badge variant={confidenceVariant(f.confidence)} size="xs">{f.confidence}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
