'use client'

const PLAYERS = [
  {
    role: "Market agent",
    emoji: "🏪",
    color: "#1D9E75",
    tagline: "Submit prices, connect suppliers to buyers",
    gains: ["Submit prices faster", "Verify abnormal price changes", "Earn from verified listings", "Connect local suppliers to buyers"],
    data_access: "Live prices + RFQ board + supplier directory"
  },
  {
    role: "Aggregator",
    emoji: "🚛",
    color: "#185FA5",
    tagline: "Know what's coming before it hits market",
    gains: ["See harvest 2-4 weeks ahead by region", "Match supply to open RFQs", "Plan warehouse capacity", "Avoid overbidding at peak"],
    data_access: "Harvest forecast + heatmap + aggregation points"
  },
  {
    role: "Farmer / supplier",
    emoji: "🌱",
    color: "#0F6E56",
    tagline: "Know when to sell and to whom",
    gains: ["See predicted yield from soil + activity data", "Get best time to sell signal", "Find buyers before harvest", "Pre-sell via WhatsApp"],
    data_access: "My harvest estimate + sell signal + buyer RFQs"
  },
  {
    role: "Buyer / exporter",
    emoji: "📦",
    color: "#534AB7",
    tagline: "Source verified supply weeks in advance",
    gains: ["Post RFQs matched to real supply", "See incoming volume by region", "Lock prices pre-harvest", "AI activates 10K+ suppliers"],
    data_access: "RFQ matching + supply forecast + price signal"
  },
  {
    role: "Market trader",
    emoji: "💹",
    color: "#854F0B",
    tagline: "Trade faster with better market intelligence",
    gains: ["Know where prices are rising", "Find cheaper supply before competitors", "Decide store vs sell with price signal", "Avoid bad buyers with verification"],
    data_access: "Price trends + supply trend + direction signal"
  },
  {
    role: "Supermarket / factory",
    emoji: "🏭",
    color: "#993C1D",
    tagline: "Secure consistent supply at scale",
    gains: ["Volume forecasts for procurement planning", "Weekly / monthly demand posting", "Multi-region supply matching", "Compliance grade filtering"],
    data_access: "Demand board + harvest forecast + aggregation points"
  },
  {
    role: "Warehouse operator",
    emoji: "🏗",
    color: "#444441",
    tagline: "Fill capacity with matched incoming supply",
    gains: ["See harvest volume heading your way", "Alert aggregators of available space", "Track utilization vs incoming", "WRS financing signal"],
    data_access: "Aggregation points + regional forecast"
  }
]

function hexWithOpacity(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export default function ValueChainPlayers() {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-3">Who uses harvest intelligence</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {PLAYERS.map((p) => (
          <div key={p.role} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-sm hover:border-gray-200 transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: hexWithOpacity(p.color, 0.12) }}
              >
                {p.emoji}
              </div>
              <span className="text-xs font-medium text-gray-800 leading-tight">{p.role}</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed mb-3">{p.tagline}</p>
            <div className="space-y-1">
              {p.gains.map((g, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-[10px] text-gray-600">{g}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 text-[9px] text-gray-400 leading-relaxed">{p.data_access}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
