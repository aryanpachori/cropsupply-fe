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
import FarmerTable from './FarmerTable'
import AIMatchingPanel from './AIMatchingPanel'
import TrendCharts from './TrendCharts'
import InsightSummaryBar from './InsightSummaryBar'
import CropDetailDrawer from './CropDetailDrawer'
import { useCrop } from '@/context/CropContext'
import { KPIS, FORECAST, FARMERS, TRENDS, HEATMAP, RFQS } from '@/lib/dummy'

function SectionTitle({ children }) {
  return <div className="text-[11px] uppercase text-gray-400 tracking-wide mt-6 mb-3 font-medium">{children}</div>
}

function Divider() {
  return <div className="border-t border-gray-100 my-2" />
}

export default function AggregatorView({ regionFilter, cropFilter }) {
  const [showTop, setShowTop] = useState(false)
  const trendChartsRef = useRef(null)
  const { activeCrop, setActiveCrop } = useCrop()

  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredForecast = FORECAST.filter(f => {
    if (regionFilter && f.region !== regionFilter) return false
    if (cropFilter && f.crop !== cropFilter) return false
    return true
  })

  function handleInsightClick() {
    trendChartsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <InsightSummaryBar onInsightClick={handleInsightClick} />
      <FarmingStageIntel />
      <KPIBar kpis={KPIS} />
      <Divider />
      <CountdownCards forecast={filteredForecast} />

      <SectionTitle>AI analytics & charts</SectionTitle>
      <div ref={trendChartsRef}>
        <TrendCharts />
      </div>

      <SectionTitle>Intelligence layers</SectionTitle>
      <SupplyTrend trends={TRENDS} />
      <ReadinessHeatmap heatmap={HEATMAP} />
      <PriceTrends />

      <SectionTitle>Demand & matching</SectionTitle>
      <DemandBoard />
      <RFQMatches rfqs={RFQS} />

      <SectionTitle>Supply network</SectionTitle>
      <AggregationNetwork />

      <SectionTitle>Intelligence for every player</SectionTitle>
      <ValueChainPlayers />
      <GlobalTrends />

      <SectionTitle>WhatsApp & SMS channel</SectionTitle>
      <WhatsAppIntel />

      <SectionTitle>Farmer-level data</SectionTitle>
      <FarmerTable farmers={FARMERS} regionFilter={regionFilter} cropFilter={cropFilter} />

      <SectionTitle>Coming — Layer 3</SectionTitle>
      <AIMatchingPanel />

      <footer className="mt-12 mb-6 text-center space-y-1">
        <div className="text-[10px] text-gray-400">CropSupply Harvest Intelligence · Powered by MazaoHub</div>
        <div className="text-[9px] text-gray-300">150K+ farmers · 205K soil samples · 14 regions · 156 markets · 37 countries</div>
        <div className="text-[9px] text-gray-300">Data updates every 6h · Predictions: agronomic model + soil NPK + 19-step activity checklist</div>
        <div className="text-[9px] text-gray-300 mt-2">Soil → Activity → Harvest → Aggregation point → Buyer. The full supply chain, intelligently connected.</div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md transition-colors text-sm z-50 hover:opacity-90"
          style={{ background: '#0F6E56' }}
        >
          ↑
        </button>
      )}

      {activeCrop && (
        <CropDetailDrawer crop={activeCrop} onClose={() => setActiveCrop(null)} />
      )}
    </div>
  )
}
