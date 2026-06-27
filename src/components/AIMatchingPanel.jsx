'use client'

const MATCH_CRITERIA = ["Volume","Quality grade","Location","Price","Compliance","Storage needs","Frequency","Season","Crop variety","Delivery timeline"]

export default function AIMatchingPanel() {
  return (
    <div className="p-5 mb-6 rounded-2xl border-2 border-dashed" style={{ borderColor: '#9FE1CB', background: '#F5FAF8' }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[9px] font-medium px-2 py-0.5 rounded-full inline-block mb-2" style={{ background: '#E1F5EE', color: '#085041' }}>
            Coming soon — Layer 3
          </span>
          <div className="text-sm font-medium text-gray-900">AI matching & deal execution</div>
          <div className="text-[10px] text-gray-500 mt-1">Powered by AI agents working around the clock</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-medium leading-none" style={{ color: '#0F6E56' }}>10,000+</div>
          <div className="text-[10px] text-gray-400 mt-0.5">suppliers activated per day</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-lg mb-2">🤖</div>
          <div className="text-xs font-medium text-gray-800 mb-2">Supplier activation</div>
          <div className="space-y-1">
            {["RFQ posted by buyer","AI identifies 10K+ matching suppliers","Automated outreach via WhatsApp/SMS","Qualified leads delivered to buyer"].map((s, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[9px] text-gray-400 mt-0.5 flex-shrink-0">{i+1}.</span>
                <span className="text-[10px] text-gray-600">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-lg mb-2">📢</div>
          <div className="text-xs font-medium text-gray-800 mb-2">Buyer discovery</div>
          <div className="space-y-1">
            {["Farmer registers harvest","AI finds matching buyers by volume, grade, location","AI runs conversations at scale","Deal closed without manual work"].map((s, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[9px] text-gray-400 mt-0.5 flex-shrink-0">{i+1}.</span>
                <span className="text-[10px] text-gray-600">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="text-lg mb-2">⚖️</div>
          <div className="text-xs font-medium text-gray-800 mb-2">Match factors</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {MATCH_CRITERIA.map(c => (
              <span key={c} className="text-[9px] font-medium px-2 py-1 rounded-full" style={{ background: '#E1F5EE', color: '#085041' }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 flex flex-wrap gap-4 text-[10px] text-gray-600">
        <span><strong className="text-gray-700">Demand types:</strong> One-time · Weekly · Monthly · Annual · Seasonal</span>
        <span><strong className="text-gray-700">Supply matched to:</strong> Cold storage · Grain store · Port warehouse · Fulfillment center · Local market · Village warehouse</span>
      </div>
    </div>
  )
}
