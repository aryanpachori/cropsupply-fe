'use client'

import { useState, useEffect } from 'react'
import KPIBar from './KPIBar'
import FarmingStageIntel from './FarmingStageIntel'
import CountdownCards from './CountdownCards'
import SupplyTrend from './SupplyTrend'
import ReadinessHeatmap from './ReadinessHeatmap'
import RFQMatches from './RFQMatches'
import FarmerTable from './FarmerTable'
import CropDetailDrawer from './CropDetailDrawer'
import EarlyAccessModal from './EarlyAccessModal'
import { useCrop } from '@/context/CropContext'
import { useHarvestData } from '@/hooks/useHarvestData'

export default function AggregatorView({ regionFilter, cropFilter }) {
  const [showTop, setShowTop] = useState(false)
  const [showEarlyAccess, setShowEarlyAccess] = useState(false)
  const { activeCrop, setActiveCrop } = useCrop()
  const { kpis, forecast, heatmap, trends, rfqMatches, loading, error } = useHarvestData(regionFilter, cropFilter)

  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 400) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <div>
      {/* 1 — Stage intel */}
      <FarmingStageIntel />

      {/* 2 — KPI bar */}
      <KPIBar kpis={kpis} />

      <div className="border-t border-gray-100 my-3" />

      {/* 3 — Countdown cards */}
      <CountdownCards forecast={forecast || []} />

      {/* 4 — Readiness heatmap */}
      <ReadinessHeatmap heatmap={heatmap || []} />

      {/* 5 — Supply trend */}
      <SupplyTrend trends={trends || []} />

      {/* 6 — Farmer table */}
      <div className="text-[11px] uppercase text-gray-400 tracking-wide mt-6 mb-3 font-medium">Farmer-level data</div>
      <FarmerTable regionFilter={regionFilter} cropFilter={cropFilter} />

      {/* 7 — RFQ matches */}
      <div className="text-[11px] uppercase text-gray-400 tracking-wide mt-6 mb-3 font-medium">Demand & matching</div>
      <RFQMatches rfqs={rfqMatches || []} />

      {/* 8 — Early access footer CTA */}
      <div className="mt-12 mb-6 rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #04342C 0%, #0F6E56 100%)' }}>
        <div className="text-white/60 text-[10px] uppercase tracking-widest mb-2">Expanding</div>
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
        <div className="text-[9px] text-gray-300">5,681 farmers · 28 regions · 83,855T predicted yield · Updates every 6h</div>
        <div className="text-[9px] text-gray-300 mt-2">Soil → Activity → Harvest → Aggregation point → Buyer. The full supply chain, intelligently connected.</div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-7 right-6 w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md text-sm z-50 hover:opacity-90"
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
