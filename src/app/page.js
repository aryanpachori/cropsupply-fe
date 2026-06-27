// LIVE DATA: replace dummy imports with API calls from src/lib/api.js

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ViewSwitcher from '@/components/ViewSwitcher'
import AggregatorView from '@/components/AggregatorView'
import SupplierView from '@/components/SupplierView'
import PriceTrends from '@/components/PriceTrends'
import GlobalTrends from '@/components/GlobalTrends'
import TrendCharts from '@/components/TrendCharts'
import DemandBoard from '@/components/DemandBoard'
import RFQMatches from '@/components/RFQMatches'
import AggregationNetwork from '@/components/AggregationNetwork'
import WhatsAppIntel from '@/components/WhatsAppIntel'
import { CropProvider } from '@/context/CropContext'
import { NavProvider, useNav } from '@/context/NavContext'
import { RFQS } from '@/lib/dummy'

function SectionTitle({ children }) {
  return <div className="text-[11px] uppercase text-gray-400 tracking-wide font-medium mb-4">{children}</div>
}

function AppContent() {
  const { activeNav } = useNav()
  const [activeView, setActiveView]     = useState('aggregator')
  const [regionFilter, setRegionFilter] = useState('')
  const [cropFilter, setCropFilter]     = useState('')

  const showViewSwitcher = activeNav === 'harvest-intel'

  return (
    <div>
      <Navbar />
      <div className="pt-[72px]">
        {showViewSwitcher && (
          <ViewSwitcher
            activeView={activeView}
            onViewChange={setActiveView}
            regionFilter={regionFilter}
            onRegionChange={setRegionFilter}
            cropFilter={cropFilter}
            onCropChange={setCropFilter}
          />
        )}

        <div className="max-w-screen-xl mx-auto px-4 py-4">

          {/* Harvest Intel */}
          {activeNav === 'harvest-intel' && activeView === 'aggregator' && (
            <AggregatorView regionFilter={regionFilter} cropFilter={cropFilter} />
          )}
          {activeNav === 'harvest-intel' && activeView === 'farmer' && <SupplierView />}

          {/* On Trends */}
          {activeNav === 'on-trends' && (
            <div>
              <SectionTitle>Live market prices</SectionTitle>
              <PriceTrends />
              <SectionTitle>Price & volume analytics</SectionTitle>
              <TrendCharts />
              <SectionTitle>Global supply outlook</SectionTitle>
              <GlobalTrends />
            </div>
          )}

          {/* On Demand */}
          {activeNav === 'on-demand' && (
            <div>
              <SectionTitle>Active buyer RFQs</SectionTitle>
              <DemandBoard />
              <SectionTitle>Supply matches</SectionTitle>
              <RFQMatches rfqs={RFQS} />
              <SectionTitle>WhatsApp & SMS pre-harvest</SectionTitle>
              <WhatsAppIntel />
            </div>
          )}

          {/* Warehouses */}
          {activeNav === 'warehouses' && (
            <div>
              <SectionTitle>Aggregation point network</SectionTitle>
              <AggregationNetwork />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <NavProvider>
      <CropProvider>
        <AppContent />
      </CropProvider>
    </NavProvider>
  )
}
