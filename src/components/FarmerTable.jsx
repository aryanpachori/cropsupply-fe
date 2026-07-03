'use client'

import { useState } from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import ProgressBar from './ui/ProgressBar'
import EmptyState from './ui/EmptyState'
import { CROP_EMOJI } from '@/styles/tokens'
import { useFarmers } from '@/hooks/useHarvestData'

function confidenceVariant(c) {
  if (c === 'high') return 'green'
  if (c === 'medium') return 'amber'
  return 'red'
}

const PAGE = 50

export default function FarmerTable({ regionFilter, cropFilter }) {
  const [stage, setStage] = useState('')
  const { data: farmers, total, loading } = useFarmers(regionFilter, cropFilter, stage, PAGE)

  const sorted = [...farmers].sort((a, b) => (a.days_to_harvest ?? 999) - (b.days_to_harvest ?? 999))

  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-medium text-gray-700">Farmer-level readiness</span>
        <div className="flex items-center gap-2">
          <select
            value={stage}
            onChange={e => setStage(e.target.value)}
            className="text-[10px] border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none"
          >
            <option value="">All stages</option>
            <option value="Harvesting">Harvesting</option>
            <option value="Maturity Stage">Maturity Stage</option>
            <option value="Flowering Stage">Flowering Stage</option>
            <option value="Pest & Disease Management">Pest &amp; Disease Mgmt</option>
            <option value="Planting / Sowing">Planting / Sowing</option>
          </select>
          <span className="text-[10px] text-gray-400">
            {loading ? 'Loading…' : `Showing ${sorted.length} of ${total.toLocaleString()} farmers`}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-10 flex justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-[#1D9E75] border-t-transparent animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState icon="🔍" title="No farmers match filters" subtitle="Try clearing the region or crop filter" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead style={{ background: '#F5F4F0' }}>
              <tr>
                {['ID','Crop','Region','Ward','Land','Stage','Yield forecast','Days to harvest','Soil score','Confidence'].map(h => (
                  <th key={h} className="text-[9px] font-medium text-gray-400 uppercase tracking-wide text-left px-4 py-2.5 border-b border-gray-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((f) => (
                <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 align-middle text-[10px] text-gray-400 font-mono">{f.id}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-1.5">
                      <span>{CROP_EMOJI[f.crop_name_resolved] || CROP_EMOJI.default}</span>
                      <span className="text-[11px] text-gray-800">{f.crop_name_resolved}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-600">{f.region_name}</td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-500">{f.ward_name}</td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-600">{f.land_size ? f.land_size + ' ha' : '—'}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-1.5">
                      <div className="w-14">
                        <ProgressBar value={Math.round(((f.stage_num || 0) / 19) * 100)} height={3} color="#1D9E75" />
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{f.stage_name || '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-[11px] font-medium" style={{ color: '#0F6E56' }}>
                    {f.predicted_tonnes ? f.predicted_tonnes + 'T' : '—'}
                  </td>
                  <td className="px-4 py-3 align-middle text-[11px] text-gray-700">
                    {f.days_to_harvest != null ? f.days_to_harvest + 'd' : '—'}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {f.soil_score != null ? (
                      <span className="text-[10px] font-medium" style={{ color: f.soil_score >= 70 ? '#0F6E56' : f.soil_score >= 40 ? '#854F0B' : '#A32D2D' }}>
                        {f.soil_score}
                      </span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Badge variant={confidenceVariant(f.confidence)} size="xs">{f.confidence || '—'}</Badge>
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
