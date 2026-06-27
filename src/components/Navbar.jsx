'use client'

import { useState, useEffect } from 'react'
import GlobalSearch from './GlobalSearch'
import { useNav } from '@/context/NavContext'

const TICKER_ITEMS = [
  { text: 'Maize · TZS 500/kg', arrow: '▼ 9.1%', type: 'down' },
  { text: 'Rice · TZS 1,150/kg', arrow: '▲ 4.5%', type: 'up' },
  { text: 'Onion · TZS 950/kg', arrow: '▲ 18.8%', type: 'up' },
  { text: 'Avocado · TZS 10,000/T', arrow: '▬ Stable', type: 'stable' },
  { text: 'Groundnuts · TZS 2,500/kg', arrow: '▲ 25.0%', type: 'up' },
  { text: 'Watermelon · TZS 500/pc', arrow: '▲ 2.3%', type: 'up' },
  { text: 'Chickpeas · TZS 1,200/kg', arrow: '▼ 5.1%', type: 'down' },
  { text: 'Chinese cabbage · TZS 30,000/100kg', arrow: '▲ 8.4%', type: 'up' },
]

const NAV_LINKS = [
  { key: 'on-trends',     label: 'On Trends' },
  { key: 'on-demand',     label: 'On Demand' },
  { key: 'harvest-intel', label: 'Harvest Intel' },
  { key: 'warehouses',    label: 'Warehouses' },
]

function arrowClass(type) {
  if (type === 'up') return 'text-[#5DCAA5]'
  if (type === 'down') return 'text-[#F09595]'
  return 'text-white/50'
}

export default function Navbar() {
  const { activeNav, setActiveNav } = useNav()
  const onNavChange = setActiveNav
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleNav(key) {
    onNavChange?.(key)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Top bar */}
        <div className="h-12 px-4 flex items-center justify-between" style={{ background: '#0F6E56' }}>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium text-sm tracking-tight">CropSupply</span>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <span className="text-[10px] text-white/90 border border-white/20 px-2 py-0.5 rounded-full hidden sm:inline" style={{ background: 'rgba(255,255,255,0.1)' }}>
              Harvest Intelligence
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ key, label }) => {
                const isActive = activeNav === key
                return (
                  <button
                    key={key}
                    onClick={() => handleNav(key)}
                    className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-white font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    style={isActive ? { color: '#0F6E56' } : {}}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors ml-1"
              title="Search (⌘K)"
            >
              🔍
            </button>

            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-medium ml-1">
              AG
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden w-7 h-7 flex items-center justify-center text-white text-xl ml-1"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ background: '#0F6E56' }} className="md:hidden border-t border-white/10">
            {NAV_LINKS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`block w-full text-left py-3 px-4 border-b border-white/10 text-sm ${
                  activeNav === key ? 'text-white font-medium' : 'text-white/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Ticker */}
        <div className="h-[30px] overflow-hidden flex items-center" style={{ background: '#085041' }}>
          <div className="flex whitespace-nowrap animate-marquee text-[11px] text-white/70">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="mr-8">
                {item.text}&nbsp;&nbsp;<span className={arrowClass(item.type)}>{item.arrow}</span>
              </span>
            ))}
          </div>
        </div>
      </nav>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
