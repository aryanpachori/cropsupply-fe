'use client'

import { useState } from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import { CROP_EMOJI } from '@/styles/tokens'
import { LIVE_PRICES } from '@/lib/dummy'

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Legumes']

const CATEGORY_MAP = {
  Vegetables: ['Onion', 'Chinese cabbage', 'Sweet Pepper', 'Tomato', 'Potato'],
  Fruits: ['Watermelon', 'Avocado'],
  Grains: ['Maize', 'Rice'],
  Legumes: ['Chickpeas', 'Groundnuts'],
}

function gradeVariant(g) {
  if (g === 'A') return 'green'
  if (g === 'B') return 'amber'
  return 'gray'
}

function ChangeCell({ value }) {
  if (value > 0) return <span className="text-green-600 font-medium">▲ +{value}%</span>
  if (value < 0) return <span className="text-red-500 font-medium">▼ {value}%</span>
  return <span className="text-gray-400">▬ 0%</span>
}

export default function PriceTrends() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? LIVE_PRICES
    : LIVE_PRICES.filter(p => (CATEGORY_MAP[activeCategory] || []).includes(p.crop))

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">Live price trends</span>
        <span className="text-[10px] text-gray-400">Updated 28 min ago · 156 markets · 37 countries</span>
      </div>

      <div className="flex gap-1 mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? 'text-white'
                : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200'
            }`}
            style={activeCategory === cat ? { background: '#0F6E56' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden mb-3">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead style={{ background: '#F5F4F0' }}>
              <tr>
                {['#', 'Crop', 'Market', 'Region', 'Qty available', 'Price', 'Unit', 'Grade', 'Season', '24h change', 'Trend'].map(h => (
                  <th key={h} className="text-[9px] font-medium text-gray-400 uppercase tracking-wide text-left px-4 py-2.5 border-b border-gray-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-[10px]">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span>{CROP_EMOJI[p.crop] || CROP_EMOJI.default}</span>
                      <span className="font-medium text-gray-800">{p.crop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.market}</td>
                  <td className="px-4 py-3 text-gray-600">{p.region}</td>
                  <td className="px-4 py-3 text-gray-600">{p.qty}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td className="px-4 py-3 text-gray-500">{p.currency}/{p.unit}</td>
                  <td className="px-4 py-3"><Badge variant={gradeVariant(p.grade)} size="xs">{p.grade}</Badge></td>
                  <td className="px-4 py-3 text-gray-500">{p.season}</td>
                  <td className="px-4 py-3 text-[11px]"><ChangeCell value={p.change_24h} /></td>
                  <td className="px-4 py-3">
                    <div className="w-16 h-6 bg-gray-50 rounded flex items-center justify-center text-[9px] text-gray-300">7d chart</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-[10px] text-gray-400">
        Prices sourced from verified market agents across 156 markets. Data updates every 30 minutes.
      </p>
    </div>
  )
}
