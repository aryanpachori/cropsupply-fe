'use client'

import { useState } from 'react'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'
import { STAGE_VOLUME } from '@/lib/dummy'
import ContractFarmingForm from './ContractFarmingForm'
import DealFlow from './DealFlow'

function formatTonnes(t) {
  if (t >= 1000000) return (t / 1000000).toFixed(1) + 'M T'
  return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'T'
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

      {/* Header card */}
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

      {/* Contract farming info strip */}
      {isContract && (
        <div className="rounded-xl p-3 mb-4 text-[10px] leading-relaxed" style={{ background: '#E6F1FB', color: '#185FA5' }}>
          Crops at stages 1–9 are still growing. You can lock a forward contract now — specify volume, grade, and delivery window. The system will match you with farmers at this stage in the right regions.
        </div>
      )}

      {/* Per-crop breakdown */}
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
              <ProgressBar
                value={Math.round((stage.stage / 19) * 100)}
                height={4}
                color={isContract ? '#185FA5' : '#1D9E75'}
              />
            </div>
            <button
              onClick={() => {
                if (isContract) {
                  setFormCrop(c)
                } else {
                  setBookDeal({
                    buyer: {
                      name: 'You (Aggregator)',
                      location: c.regions[0],
                      crop: c.crop,
                      qty_tonnes: Math.round(c.tonnes / 100),
                      price_tzs: 500,
                      grade: 'A',
                      frequency: 'one-time',
                      delivery_window: `Stage ${stage.stage} — imminent`,
                    },
                    supplier: {
                      name: `${c.crop} farmers in ${c.regions[0]}`,
                      location: c.regions.join(', '),
                      harvest_window: `Stage ${stage.stage} of 19`,
                      confidence: 'high',
                    },
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

export default function FarmingStageIntel() {
  const [activeStage, setActiveStage] = useState(null)

  if (activeStage !== null) {
    const stage = STAGE_VOLUME.find(s => s.stage === activeStage)
    return <DetailView stage={stage} onBack={() => setActiveStage(null)} />
  }

  return (
    <div className="mb-6">
      {/* Coming Soon Banner */}
      <div className="bg-[#085041] rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <span className="text-[9px] font-medium bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider">
              Launching Tuesday · Soft launch
            </span>
            <h2 className="text-xl font-medium text-white mt-3 mb-1">
              Harvest Intelligence
            </h2>
            <p className="text-[11px] text-white/60 max-w-lg leading-relaxed">
              The world&apos;s first ward-level crop supply intelligence platform.
              Know what&apos;s being grown, where, and when — before it reaches market.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-medium text-white leading-none">20K+</div>
            <div className="text-[10px] text-white/50 mt-1">farming plans · Simamia CRM</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
          {[
            { icon: "📍", title: "Country → Region → Ward → Crop drill-down", sub: "Tanzania, Kenya, Uganda — customized per country. Ward-level granularity nobody else has.", status: "core" },
            { icon: "🌱", title: "Forecasted volume per farming stage", sub: "See exactly how many kg of any crop is at each of the 19 stages right now — from field inspection to crop storage.", status: "core" },
            { icon: "⏱", title: "Live harvest countdown by location", sub: "Days until first supply hits each aggregation point — village warehouse, local market, port.", status: "core" },
            { icon: "📈", title: "Price direction signals", sub: "Large supply incoming → price drop flag. Low supply → spike warning. Per crop, per location, per season.", status: "core" },
            { icon: "🤝", title: "RFQ matching — demand to incoming supply", sub: "Your demand for 400kg Maize matched to incoming Arusha harvest in 12 days automatically.", status: "core" },
            { icon: "📋", title: "Contract farming — stages 1–9", sub: "Lock forward contracts with farmers still growing. Factories and exporters secure supply before it reaches market.", status: "core" },
            { icon: "📱", title: "WhatsApp & SMS pre-harvest registration", sub: "Farmers register harvest via WhatsApp in any language. NLP extracts intent. Agent verifies. Data flows into forecast.", status: "core" },
            { icon: "🤖", title: "AI buyer & supplier matching at scale", sub: "AI reaches 10,000+ targeted suppliers or buyers per day. Manages conversations. Delivers qualified leads. Closes deals.", status: "coming" },
            { icon: "🌍", title: "Global supply outlook — 37+ countries", sub: "Aggregated from MazaoHub + partner agritechs, cooperatives, government boards, NGOs across Africa, India, Latin America.", status: "coming" },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl p-3 flex gap-3 items-start ${item.status === 'coming' ? 'bg-white/5 border border-white/10' : 'bg-white/10'}`}>
              <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-medium text-white leading-tight">{item.title}</span>
                  {item.status === 'coming' && (
                    <span className="text-[8px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full flex-shrink-0">Soon</span>
                  )}
                </div>
                <p className="text-[9px] text-white/50 leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-4 text-[10px] text-white/40">
            <span>150K+ farmers tracked</span>
            <span>·</span>
            <span>14–20K Simamia CRM records</span>
            <span>·</span>
            <span>205K+ soil samples</span>
            <span>·</span>
            <span>14 Tanzania regions</span>
          </div>
          <button className="text-[11px] font-medium bg-white text-[#085041] px-5 py-2 rounded-xl hover:bg-white/90 transition-colors flex-shrink-0">
            Request early access →
          </button>
        </div>
      </div>

      {/* Header */}
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

      {/* Stage grid */}
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
              {/* Top row */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[10px] text-gray-400">Stage {s.stage}</div>
                  <div className="text-xs font-medium text-gray-800 mt-0.5">{s.name}</div>
                </div>
                <ActionBadge action={s.action} />
              </div>

              {/* Volume */}
              <div className="text-2xl font-medium text-gray-900 leading-none">
                {formatTonnes(totalTonnes)}
              </div>

              {/* Crop pills */}
              <div className="flex gap-1 flex-wrap mt-2">
                {s.crops.map((c, i) => (
                  <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {CROP_EMOJI[c.crop] || CROP_EMOJI.default} {c.crop} {c.tonnes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}T
                  </span>
                ))}
              </div>

              {/* Regions */}
              <div className="text-[9px] text-gray-400 mt-2 truncate">
                {allRegions}{hasMoreCrops ? '...' : ''}
              </div>

              {/* Bottom CTA */}
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-medium" style={{ color: '#0F6E56' }}>View breakdown →</span>
                <span className="text-[9px] text-gray-400">~{Math.round(totalTonnes / 3.5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} farmers</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
