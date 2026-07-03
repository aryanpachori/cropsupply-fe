'use client'

import { useState } from 'react'
import ProgressBar from './ui/ProgressBar'
import { CROP_EMOJI } from '@/styles/tokens'
import ContractFarmingForm from './ContractFarmingForm'
import DealFlow from './DealFlow'
import { useStageVolume } from '@/hooks/useHarvestData'
import { fmtTonnes } from '@/lib/utils'

const STAGE_NUMBER = {
  'Field inspection': 1, 'Soil Testing': 2, 'Soil Testing and Analysis': 2,
  'Land Preparation': 3, 'Farm Clearing': 3, 'Improving soil fertility': 4,
  'Improving Soil Fertility': 4, 'Harrowing': 5, 'Water harvesting structures': 7,
  'Making ridges': 8, 'Planting / Sowing': 10, 'Germination Stage': 10,
  'Irrigation': 11, 'Weed Control': 12, 'Fertilizer application': 13,
  'Fertilizer Application': 13, 'Pest Control': 14, 'Pest & Disease Management': 14,
  'Flowering Stage': 15, 'Maturity Stage': 16, 'Harvesting': 17,
  'Post-Harvest Handling': 18, 'Vegetative Growth': 11,
}

const STAGE_GROUPS = {
  'Harvesting': [
    'Harvesting','Mavuno','mavuno','MAVUNO','ANAVUNA','ANAVUNA ','Kuvuna','kuvuna',
    'KUVUNA','KUVUNA ','Amevuna','amevuna','AMESHAVUNA','KASHAVUNA','kashavuna',
    'KUVANA','Mvuno na maandalizi','Mavuno na kukua','Mavuno na maandalizi',
    'Mavuno na kupanda','Maandalizi na mavuno','Maandalizi,mavuno',
    'mavuno na kutoa maua','umechanua,Amevuna','KUKAUKA MAHINDI','KUIVA KAHAWA',
    'KUVUNA KAHAWA','KUVUNA KAHAWA ','KUVUNA\\6','Mavuno na maandalizi ya kilimo',
    'Mavuna na kukua',
  ],
  'Maturity Stage': [
    'Maturity Stage','TAYARI KWA KUVUNWA','Anakaribia kuvuna','ANAKARIBIA KUVUNA',
    'ANAKARIBIA KUVUNA KAHAWA','Anatarajia kuvuna','ANATAKA KUVUNA','ANATAKA KUVUNA ',
    'ANYTAKA KUVUNA','ANATAKA KUUVUNA','ANATAKA KUNA ','Laandalizi ya mavuno',
    'Caandalizi ya mavuno','Kaandalizi ya mavuno','umeiva','TUNDA KUIVA',
    'Maandalizi ya mavuno','Maandalizi ya kuvuna','maandalizi yakuvuna',
    'Maandalizi ya kuvuna mwezi wa tano mwishoni',
  ],
  'Post-Harvest Handling': [
    'Post-Harvest Handling','Post-harvest handling','Marketing & Distribution',
  ],
  'Land Preparation': [
    'Land Preparation','Maandalizi','MAANDALIZI','maandalizi','Maandalizi ya shamba',
    'ANAANDAA SHAMBA','ANAANDAA SHAMBA ','Anaandaa shamba','Kaandalizi','Farm Clearing',
  ],
  'Planting / Sowing': [
    'Planting / Sowing','Anapanda','Anapanda mahindi','KUPANDA MAHAGE','Amepanda',
    'Kupanda','amepanda na anafanya maandalizi ya mavuno ya mpunga',
    'Ekari 1.5 amepanda na nyingine yuko kwenye maandalizi',
    'Seed Selection','Kitalu','NYANYA ZIPO KWENYE KITALU',
  ],
  'Vegetative Growth': [
    'Vegetative Growth Stage','Kukua','kukua','KUKUA','Umestawi','bado mdogo',
    'MAZAO YAPO SHAMBANI',
  ],
  'Flowering Stage': [
    'Flowering Stage','Umechanua','umechanua','Unachanua','Kuchanua','KUTOA MAUA ',
    'KUTOA MAUWA','Yabeba','YANAZAA','KAHAWA INAZAA ','KAHAWA CHANGA',
    'Fruiting / Grain Filling Stage',
  ],
  'Irrigation': ['Irrigation','Irrigation / Water Management'],
  'Weed Control': ['Weed Control','Weeding'],
  'Fertilizer Application': [
    'Fertilizer application','Fertilizer Application',
    'Fertilizer & Nutrient Application','Plant nutrition',
  ],
  'Pest Control': [
    'Pest & Disease Management','Pest control','Pest and disease control',
  ],
  'Soil Testing': [
    'Soil Testing and Analysis','Soil Testing & Analysis','Soil testing',
  ],
  'Improving Soil Fertility': ['Improving soil fertility'],
}

const KNOWN_CROPS = new Set([
  'Maize','Rice','Beans','Onion','Tomato','Coffee','Sugarcane','Sunflower',
  'Groundnuts','Avocado','Banana','Potato','Cassava','Sorghum','Cotton',
  'Sesame','Cowpeas','Pigeon peas','Watermelon','Cabbage','Carrot','Vegetables',
  'Sweet Potato','Millet','Chickpeas','Tobacco',
])

function mergeStages(stageVolume) {
  if (!stageVolume) return {}
  const reverseMap = {}
  Object.entries(STAGE_GROUPS).forEach(([group, variants]) => {
    variants.forEach(v => { reverseMap[v] = group })
  })

  const merged = {}
  Object.entries(stageVolume).forEach(([stageName, data]) => {
    const groupName = reverseMap[stageName] || stageName
    if (!merged[groupName]) {
      merged[groupName] = { total_tonnes: 0, total_farmers: 0, top_crops: {}, locations: {} }
    }
    merged[groupName].total_tonnes += data.total_tonnes || 0
    merged[groupName].total_farmers += data.total_farmers || 0

    Object.entries(data.top_crops || {}).forEach(([crop, t]) => {
      if (crop.length > 25) return
      merged[groupName].top_crops[crop] = (merged[groupName].top_crops[crop] || 0) + t
    })

    Object.entries(data.locations || {}).forEach(([loc, locData]) => {
      if (!merged[groupName].locations[loc]) {
        merged[groupName].locations[loc] = { tonnes: 0, farmer_count: 0 }
      }
      merged[groupName].locations[loc].tonnes += locData.tonnes || 0
      merged[groupName].locations[loc].farmer_count += locData.farmer_count || 0
    })
  })

  Object.keys(merged).forEach(group => {
    const sorted = Object.entries(merged[group].top_crops)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    merged[group].top_crops = Object.fromEntries(sorted)
    merged[group].total_tonnes = Math.round(merged[group].total_tonnes * 10) / 10
  })

  return merged
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

function DetailView({ stage, onBack }) {
  const isContract = stage.action === 'contract_farming'
  const [formCrop, setFormCrop] = useState(null)
  const [bookDeal, setBookDeal] = useState(null)

  const topCrops = Object.entries(stage.top_crops || {})
    .filter(([crop]) => crop.length <= 25)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  const topLocations = Object.entries(stage.locations || {})
    .sort((a, b) => b[1].tonnes - a[1].tonnes)
    .slice(0, 3)

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
          stageName={stage.stageName}
          crop={formCrop}
          onClose={() => setFormCrop(null)}
        />
      )}
      <button onClick={onBack} className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer mb-4 hover:text-gray-800">
        ← Back to all stages
      </button>

      <div className="rounded-2xl p-5 mb-4 text-white" style={{ background: '#0F6E56' }}>
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <div className="text-[10px] opacity-60 mb-1">Stage {stage.stageNum} of 19</div>
            <div className="text-xl font-medium">{stage.stageName}</div>
            <div className="text-3xl font-medium mt-2 leading-none">{fmtTonnes(stage.total_tonnes)}</div>
            <div className="text-[11px] opacity-70 mt-1">total forecasted volume · {stage.total_farmers?.toLocaleString()} farmers</div>
          </div>
          <ActionBadge action={stage.action} large />
        </div>
      </div>

      {isContract && (
        <div className="rounded-xl p-3 mb-4 text-[10px] leading-relaxed" style={{ background: '#E6F1FB', color: '#185FA5' }}>
          Crops at stages 1–9 are still growing. Lock a forward contract now — specify volume, grade, and delivery window. The system matches you with farmers at this stage in the right regions.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {topCrops.map(([crop, tonnes], i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{CROP_EMOJI[crop] || CROP_EMOJI.default}</span>
              <span className="text-sm font-medium text-gray-800">{crop}</span>
            </div>
            <div className="text-2xl font-medium mt-2" style={{ color: '#0F6E56' }}>{fmtTonnes(tonnes)}</div>
            <div className="mt-3">
              <ProgressBar value={Math.round((stage.stageNum / 19) * 100)} height={4} color={isContract ? '#185FA5' : '#1D9E75'} />
            </div>
            <button
              onClick={() => {
                if (isContract) {
                  setFormCrop(crop)
                } else {
                  setBookDeal({
                    buyer: { name: 'You (Aggregator)', location: topLocations[0]?.[0] || 'Tanzania', crop, qty_tonnes: Math.round(tonnes / 100), price_tzs: 500, grade: 'A', frequency: 'one-time', delivery_window: `Stage ${stage.stageNum} — imminent` },
                    supplier: { name: `${crop} farmers`, location: topLocations.map(l => l[0]).join(', ') || 'Tanzania', harvest_window: `Stage ${stage.stageNum} of 19`, confidence: 'high' },
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

      {topLocations.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">Top locations</div>
          <div className="space-y-2">
            {topLocations.map(([loc, data]) => (
              <div key={loc} className="flex items-center justify-between text-[11px]">
                <span className="text-gray-600">📍 {loc}</span>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>{fmtTonnes(data.tonnes)}</span>
                  <span>{data.farmer_count} farmers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FarmingStageIntel() {
  const [activeStage, setActiveStage] = useState(null)
  const [showAllStages, setShowAllStages] = useState(false)
  const { data: liveStageVolume, loading: stageLoading } = useStageVolume()

  const mergedVolume = mergeStages(liveStageVolume)
  const liveStages = Object.entries(mergedVolume)
    .map(([name, d]) => ({
      stageName: name,
      stageNum: STAGE_NUMBER[name] || 10,
      action: (STAGE_NUMBER[name] || 10) <= 9 ? 'contract_farming' : 'book_supply',
      total_tonnes: d.total_tonnes || 0,
      total_farmers: d.total_farmers || 0,
      top_crops: d.top_crops || {},
      locations: d.locations || {},
    }))
    .sort((a, b) => b.total_tonnes - a.total_tonnes)

  const displayedStages = showAllStages ? liveStages : liveStages.slice(0, 8)

  if (activeStage !== null) {
    return <DetailView stage={activeStage} onBack={() => setActiveStage(null)} />
  }

  return (
    <div className="mb-6">
      {/* Live data header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-[11px] font-medium text-gray-700">
            Live harvest intelligence · Tanzania · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 text-[10px] text-gray-400">
          <span>5,681 farmers</span>
          <span>28 regions</span>
          <span>83,855T predicted yield</span>
          <span>Updated every 6h</span>
        </div>
      </div>

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
      ) : liveStages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedStages.map((s, i) => {
              const accent = stageAccent(s.stageNum)
              const topCropPills = Object.entries(s.top_crops)
                .filter(([crop]) => crop.length <= 25)
                .slice(0, 4)
              const topLocs = Object.keys(s.locations).slice(0, 3)
              return (
                <div
                  key={i}
                  onClick={() => setActiveStage(s)}
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
                    {fmtTonnes(s.total_tonnes)}
                  </div>
                  <div className="flex gap-1 flex-wrap mt-2">
                    {topCropPills.map(([crop, tonnes], j) => (
                      <span key={j} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {CROP_EMOJI[crop] || CROP_EMOJI.default} {crop} {fmtTonnes(tonnes)}
                      </span>
                    ))}
                  </div>
                  {topLocs.length > 0 && (
                    <div className="text-[9px] text-gray-400 mt-2 truncate">
                      📍 {topLocs.join(', ')}
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-medium" style={{ color: '#0F6E56' }}>View breakdown →</span>
                    <span className="text-[9px] text-gray-400">{s.total_farmers?.toLocaleString()} farmers</span>
                  </div>
                </div>
              )
            })}
          </div>

          {liveStages.length > 8 && (
            <button
              onClick={() => setShowAllStages(v => !v)}
              className="text-[11px] text-[#0F6E56] font-medium flex items-center gap-1.5 mt-3 hover:underline"
            >
              {showAllStages ? '↑ Show fewer stages' : `↓ Show all ${liveStages.length} stages`}
            </button>
          )}
        </>
      ) : (
        <div className="py-12 text-center text-gray-400 text-[12px]">
          Stage data loading — connect to live API
        </div>
      )}
    </div>
  )
}
