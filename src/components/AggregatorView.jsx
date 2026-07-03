'use client'

import { useState, useEffect, useRef } from 'react'
import KPIBar from './KPIBar'
import FarmingStageIntel from './FarmingStageIntel'
import CountdownCards from './CountdownCards'
import SupplyTrend from './SupplyTrend'
import ReadinessHeatmap from './ReadinessHeatmap'
import PriceTrends from './PriceTrends'
import DemandBoard from './DemandBoard'
import RFQMatches from './RFQMatches'
import AggregationNetwork from './AggregationNetwork'
import ValueChainPlayers from './ValueChainPlayers'
import GlobalTrends from './GlobalTrends'
import WhatsAppIntel from './WhatsAppIntel'
import WhatsAppSimulator from './WhatsAppSimulator'
import FarmerTable from './FarmerTable'
import AIMatchingPanel from './AIMatchingPanel'
import TrendCharts from './TrendCharts'
import InsightSummaryBar from './InsightSummaryBar'
import CropDetailDrawer from './CropDetailDrawer'
import TransportPanel from './TransportPanel'
import SupplierDirectory from './SupplierDirectory'
import DataQualityBanner from './DataQualityBanner'
import { useCrop } from '@/context/CropContext'
import { useHarvestData } from '@/hooks/useHarvestData'
import EarlyAccessModal from './EarlyAccessModal'

function SectionTitle({ children }) {
  return <div className="text-[11px] uppercase text-gray-400 tracking-wide mt-6 mb-3 font-medium">{children}</div>
}

function Divider() {
  return <div className="border-t border-gray-100 my-2" />
}

export default function AggregatorView({ regionFilter, cropFilter }) {
  const [showTop, setShowTop] = useState(false)
  const [showEarlyAccess, setShowEarlyAccess] = useState(false)
  const trendChartsRef = useRef(null)
  const { activeCrop, setActiveCrop } = useCrop()
  const { kpis, forecast, heatmap, trends, rfqMatches, loading, error } = useHarvestData(regionFilter, cropFilter)

  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleInsightClick() {
    trendChartsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#1D9E75] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-[11px] text-gray-400">Loading live harvest data...</p>
        <p className="text-[9px] text-gray-300 mt-1">Powered by MazaoHub · 5,681 farmers</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="bg-[#FCEBEB] border border-[#F09595] rounded-xl p-4 m-4 text-[11px] text-[#A32D2D]">
      ⚠ Could not load harvest data — {error}
      <button onClick={() => window.location.reload()} className="ml-3 underline">Retry</button>
    </div>
  )

  const liveKpis = kpis ? {
    total_farmers: kpis.total_farmers,
    expected_yield_tonnes: kpis.expected_yield_tonnes,
    imminent_tonnes_14d: kpis.imminent_tonnes_14d,
    regions_active: kpis.regions,
    high_confidence_pct: kpis.high_confidence_pct,
    soil_samples: kpis.soil_samples,
    farmers_at_harvest: kpis.farmers_at_harvest_stage,
    open_demand: kpis.open_demand_records,
  } : null

  const liveForecast = forecast || []
  const liveHeatmap  = heatmap  || []
  const liveTrends   = trends   || []
  const liveRFQs     = rfqMatches || []

  return (
    <div>
      <InsightSummaryBar onInsightClick={handleInsightClick} />
      <FarmingStageIntel />
      <KPIBar kpis={liveKpis} />
      <Divider />
      <CountdownCards forecast={liveForecast} />

      <SectionTitle>AI analytics & charts</SectionTitle>
      <div ref={trendChartsRef}>
        <TrendCharts />
      </div>

      <SectionTitle>Intelligence layers</SectionTitle>
      <SupplyTrend trends={liveTrends} />
      <ReadinessHeatmap heatmap={liveHeatmap} />
      <PriceTrends />

      <SectionTitle>Demand & matching</SectionTitle>
      <DemandBoard />
      <RFQMatches rfqs={liveRFQs} />

      <SectionTitle>Verified suppliers</SectionTitle>
      <SupplierDirectory />

      <SectionTitle>Supply network</SectionTitle>
      <AggregationNetwork />

      <SectionTitle>Logistics</SectionTitle>
      <TransportPanel />

      <SectionTitle>Intelligence for every player</SectionTitle>
      <ValueChainPlayers />
      <GlobalTrends />

      <SectionTitle>WhatsApp & SMS channel</SectionTitle>
      <WhatsAppSimulator />
      <WhatsAppIntel />

      <SectionTitle>Farmer-level data</SectionTitle>
      <FarmerTable regionFilter={regionFilter} cropFilter={cropFilter} />

      <SectionTitle>Coming — Layer 3</SectionTitle>
      <AIMatchingPanel />

      <div className="mt-12 mb-6 rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #04342C 0%, #0F6E56 100%)' }}>
        <div className="text-white/60 text-[10px] uppercase tracking-widest mb-2">Coming soon</div>
        <div className="text-white text-lg font-medium mb-2">Full Harvest Intelligence Platform</div>
        <div className="text-white/70 text-[12px] mb-5 max-w-sm mx-auto">
          AI-driven procurement signals, contract farming windows, and regional supply forecasts — purpose-built for East African agri-buyers.
        </div>
        <button
          onClick={() => setShowEarlyAccess(true)}
          className="px-6 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: '#1D9E75', color: 'white' }}
        >
          Request early access →
        </button>
        <div className="text-white/40 text-[10px] mt-3">260K+ farmers registered · 555K+ soil tests · 644K+ farming records</div>
      </div>

      {showEarlyAccess && <EarlyAccessModal onClose={() => setShowEarlyAccess(false)} />}

      <footer className="mt-4 mb-6 text-center space-y-1">
        <div className="text-[10px] text-gray-400">CropSupply Harvest Intelligence · Powered by MazaoHub</div>
        <div className="text-[9px] text-gray-300">150K+ farmers · 205K soil samples · 14 regions · 156 markets · 37 countries</div>
        <div className="text-[9px] text-gray-300">Data updates every 6h · Predictions: agronomic model + soil NPK + 19-step activity checklist</div>
        <div className="text-[9px] text-gray-300 mt-2">Soil → Activity → Harvest → Aggregation point → Buyer. The full supply chain, intelligently connected.</div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-7 right-20 w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md transition-colors text-sm z-50 hover:opacity-90"
          style={{ background: '#0F6E56' }}
        >
          ↑
        </button>
      )}

      <DataQualityBanner />

      {activeCrop && (
        <CropDetailDrawer crop={activeCrop} onClose={() => setActiveCrop(null)} />
      )}
    </div>
  )
}
