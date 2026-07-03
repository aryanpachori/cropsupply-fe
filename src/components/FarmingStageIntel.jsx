'use client'

import { useState } from 'react'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'
import ContractFarmingForm from './ContractFarmingForm'
import DealFlow from './DealFlow'
import { useStageVolume } from '@/hooks/useHarvestData'

function formatTonnes(t) {
  if (!t && t !== 0) return '—'
  if (t >= 1000000) return (t / 1000000).toFixed(1) + 'M T'
  return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'T'
}

const STAGE_NUMBER = {
  'Field inspection': 1, 'Soil Testing and Analysis': 2, 'Land Preparation': 3,
  'Farm Clearing': 3, 'Improving soil fertility': 4, 'Main field prep': 5,
  'Harrowing': 5, 'Water harvesting structures': 7, 'Making ridges': 8,
  'Planting / Sowing': 10, 'Germination Stage': 10, 'Irrigation': 11,
  'Weed Control': 12, 'Fertilizer application': 13, 'Pest & Disease Management': 14,
  'Flowering Stage': 15, 'Maturity Stage': 16, 'Harvesting': 17,
  'Post-Harvest Handling': 18, 'Mavuno': 17, 'Mavuno na maandalizi': 17,
}

function stageAccent(n) {
  if (n <= 9) return '#185FA5'
  if (n <= 15) return '#1D9E75'
  if (n <= 17) return '#EDA100'
  return '#888780'
}

function ActionBadge({ action, large }) {
  if (action === 'contract_farming') {
    return large
      ? <span className="bg-[#185FA5] text-white px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap">🤝 Contract farming window</span>
      : <span className="bg-[#E6F1FB] text-[#185FA5] text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap">Contract farming</span>
  }
  return large
    ? <span className="bg-[#1D9E75] text-white px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap">📦 Book supply now</span>
    : <span className="bg-[#E1F5EE] text-[#085041] text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap">Book supply</span>
}

function StageTimeline({ activeStage }) {
  return (
    <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
      <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-3">Stage position in farming cycle</div>
      <div className="flex items-end gap-0.5">
        {STAGE_VOLUME.map((s) => {
          const isCurrent = s.stage === activeStage
          const isDone = s.stage < activeStage
          return (
            <div key={s.stage} className="flex-1 flex flex-col items-center">
              {isCurrent && <div className="w-2 h-2 rounded-full bg-[#EDA100] mb-0.5" />}
              <div
                className="w-full h-2 rounded-sm"
                style={{ background: isDone ? '#1D9E75' : isCurrent ? '#EDA100' : '#E5E7EB' }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-between text-[9px] text-gray-400 mt-1.5">
        <span>Field inspection</span>
        <span style={{ color: stageAccent(activeStage) }} className="font-medium">
          {STAGE_VOLUME.find(s => s.stage === activeStage)?.name}
        </span>
        <span>Crop storage</span>
      </div>
    </div>
  )
}

function DetailView({ stage, onBack }) {
  const totalTonnes = stage.crops.reduce((s, c) => s + c.tonnes, 0)
  const isContract = stage.action === 'contract_farming'
  const [formCrop, setFormCrop] = useState(null)
  const [bookDeal, setBookDeal] = useState(null)

  return (
    <div>
      {bookDeal && (
        <DealFlow
          type="buyer_to_supplier"
          buyerData={bookDeal.buyer}
          supplierData={bookDeal.supplier}
          onClose={() => setBookDeal(null)}
        />
      )}
      {formCrop && (
        <ContractFarmingForm
          stage={stage.stage}
          stageName={stage.name}
          crop={formCrop.crop}
          region={formCrop.regions[0]}
          onClose={() => setFormCrop(null)}
        />
      )}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer mb-4 hover:text-gray-800"
      >
        ← Back to all stages
      </button>

      <div className="rounded-2xl p-5 mb-4 text-white" style={{ background: '#0F6E56' }}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="text-[10px] opacity-60 mb-1">Stage {stage.stage} of 19</div>
            <div className="text-xl font-medium">{stage.name}</div>
            <div className="text-3xl font-medium mt-2 leading-none">
              {totalTonnes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}T
            </div>
            <div className="text-[11px] opacity-70 mt-1">total forecasted volume at this stage</div>
          </div>
          <ActionBadge action={stage.action} large />
        </div>
      </div>

      {isContract && (
        <div className="rounded-xl p-3 mb-4 text-[10px] leading-relaxed" style={{ background: '#E6F1FB', color: '#185FA5' }}>
          Crops at stages 1–9 are still growing. You can lock a forward contract now — specify volume, grade, and delivery window. The system will match you with farmers at this stage in the right regions.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {stage.crops.map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{CROP_EMOJI[c.crop] || CROP_EMOJI.default}</span>
              <span className="text-sm font-medium text-gray-800">{c.crop}</span>
            </div>
            <div className="text-2xl font-medium mt-2" style={{ color: '#0F6E56' }}>
              {c.tonnes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}T
            </div>
            <div className="flex gap-1 flex-wrap mt-3">
              {c.regions.map(r => (
                <span key={r} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📍 {r}</span>
              ))}
            </div>
            <div className="mt-3">
              <ProgressBar value={Math.round((stage.stage / 19) * 100)} height={4} color={isContract ? '#185FA5' : '#1D9E75'} />
            </div>
            <button
              onClick={() => {
                if (isContract) {
                  setFormCrop(c)
                } else {
                  setBookDeal({
                    buyer: { name: 'You (Aggregator)', location: c.regions[0], crop: c.crop, qty_tonnes: Math.round(c.tonnes / 100), price_tzs: 500, grade: 'A', frequency: 'one-time', delivery_window: `Stage ${stage.stage} — imminent` },
                    supplier: { name: `${c.crop} farmers in ${c.regions[0]}`, location: c.regions.join(', '), harvest_window: `Stage ${stage.stage} of 19`, confidence: 'high' },
                  })
                }
              }}
              className="mt-3 w-full text-xs font-medium py-2 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ background: isContract ? '#185FA5' : '#0F6E56' }}
            >
              {isContract ? 'Request contract farming →' : 'Book this supply →'}
            </button>
          </div>
        ))}
      </div>

      <StageTimeline activeStage={stage.stage} />
    </div>
  )
}

export default function FarmingStageIntel({ lastUpdated }) {
  const [activeStage, setActiveStage] = useState(null)
  const { data: liveStageVolume, loading: stageLoading } = useStageVolume()

  // Map live API response to stage cards
  const stageCards = liveStageVolume
    ? Object.entries(liveStageVolume).map(([stageName, data]) => {
        const stageNum = STAGE_NUMBER[stageName] || 10
        const action = stageNum <= 9 ? 'contract_farming' : 'book_supply'
        const topCrops = Object.entries(data.top_crops || {})
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([crop, tonnes]) => ({ crop, tonnes }))
        const topLocations = Object.keys(data.locations || {}).slice(0, 3)
        return { stageName, stageNum, action, total_tonnes: data.total_tonnes, total_farmers: data.total_farmers, topCrops, topLocations }
      }).sort((a, b) => b.total_tonnes - a.total_tonnes)
    : null

  if (activeStage !== null) {
    const stage = STAGE_VOLUME.find(s => s.stage === activeStage)
    return <DetailView stage={stage} onBack={() => setActiveStage(null)} />
  }

  return (
    <div className="mb-6">
      {/* Live data header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-600">
            Live harvest intelligence
            {lastUpdated && (
              <span className="text-gray-400 font-normal ml-1">
                · {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </span>
        </div>
        <div className="flex gap-3 text-[10px] text-gray-400 flex-wrap">
          <span>5,681 farmers tracked</span>
          <span>·</span>
          <span>28 regions</span>
          <span>·</span>
          <span>83,855T predicted yield</span>
          <span>·</span>
          <span>Updated every 6h</span>
        </div>
      </div>

      {/* Stage legend */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <div className="text-sm font-medium text-gray-700">Forecasted volume by farming stage</div>
          <div className="text-[10px] text-gray-400 mt-0.5">
            Click any stage to see crop breakdown, volume, and locations. Powered by MazaoHub activity data.
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: '#E6F1FB', color: '#185FA5' }}>
            Stages 1–9 · Contract farming window
          </span>
          <span className="text-[9px] px-2 py-1 rounded-full font-medium" style={{ background: '#E1F5EE', color: '#085041' }}>
            Stages 10–19 · Procurement window
          </span>
        </div>
      </div>

      {/* Stage grid — live data if available, dummy fallback */}
      {stageLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
              <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-7 bg-gray-100 rounded w-1/2 mb-3" />
              <div className="h-2 bg-gray-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : stageCards ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stageCards.map((s, i) => {
            const accent = stageAccent(s.stageNum)
            return (
              <div
                key={i}
                onClick={() => setActiveStage(s.stageNum)}
                className="bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer hover:shadow-md hover:border-[#1D9E75] transition-all duration-150"
                style={{ borderLeft: `3px solid ${accent}` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-gray-400">Stage {s.stageNum}</div>
                    <div className="text-xs font-medium text-gray-800 mt-0.5">{s.stageName}</div>
                  </div>
                  <ActionBadge action={s.action} />
                </div>
                <div className="text-2xl font-medium text-gray-900 leading-none">
                  {formatTonnes(s.total_tonnes)}
                </div>
                <div className="flex gap-1 flex-wrap mt-2">
                  {s.topCrops.map((c, j) => (
                    <span key={j} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {CROP_EMOJI[c.crop] || CROP_EMOJI.default} {c.crop} {formatTonnes(c.tonnes)}
                    </span>
                  ))}
                </div>
                <div className="text-[9px] text-gray-400 mt-2 truncate">
                  📍 {s.topLocations.join(', ')}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] font-medium" style={{ color: '#0F6E56' }}>View breakdown →</span>
                  <span className="text-[9px] text-gray-400">{s.total_farmers?.toLocaleString()} farmers</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Dummy fallback */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STAGE_VOLUME.map(s => {
            const totalTonnes = s.crops.reduce((sum, c) => sum + c.tonnes, 0)
            const accent = stageAccent(s.stage)
            const allRegions = s.crops[0].regions.join(', ')
            const hasMoreCrops = s.crops.length > 1
            return (
              <div
                key={s.stage}
                onClick={() => setActiveStage(s.stage)}
                className="bg-white rounded-2xl border border-gray-100 p-4 cursor-pointer hover:shadow-md hover:border-[#1D9E75] transition-all duration-150"
                style={{ borderLeft: `3px solid ${accent}` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-gray-400">Stage {s.stage}</div>
                    <div className="text-xs font-medium text-gray-800 mt-0.5">{s.name}</div>
                  </div>
                  <ActionBadge action={s.action} />
                </div>
                <div className="text-2xl font-medium text-gray-900 leading-none">{formatTonnes(totalTonnes)}</div>
                <div className="flex gap-1 flex-wrap mt-2">
                  {s.crops.map((c, i) => (
                    <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {CROP_EMOJI[c.crop] || CROP_EMOJI.default} {c.crop} {c.tonnes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}T
                    </span>
                  ))}
                </div>
                <div className="text-[9px] text-gray-400 mt-2 truncate">
                  {allRegions}{hasMoreCrops ? '...' : ''}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] font-medium" style={{ color: '#0F6E56' }}>View breakdown →</span>
                  <span className="text-[9px] text-gray-400">~{Math.round(totalTonnes / 3.5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} farmers</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
