'use client'

const REGIONS = [
  'Arusha','Dar es Salaam','Dodoma','Geita','Iringa','Kagera','Katavi','Kigoma',
  'Kilimanjaro','Lindi','Manyara','Mara','Mbeya','Morogoro','Mtwara','Mwanza',
  'Njombe','Pemba North','Pemba South','Pwani','Rukwa','Ruvuma','Shinyanga',
  'Simiyu','Singida','Tabora','Tanga','Zanzibar',
]

const CROPS = [
  'Maize','Rice','Sugarcane','Tomato','Onion','Sunflower','Beans','Groundnuts',
  'Cassava','Sweet Potato','Sorghum','Millet','Avocado','Banana','Watermelon',
  'Chickpeas','Cowpeas','Cotton','Sesame','Tobacco',
]

export default function ViewSwitcher({ activeView, onViewChange, regionFilter, onRegionChange, cropFilter, onCropChange }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-[112px] z-40 px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex bg-gray-100 rounded-xl p-0.5 gap-0.5">
        {['Aggregator / Buyer', 'Farmer / Supplier'].map((label) => {
          const view = label === 'Aggregator / Buyer' ? 'aggregator' : 'farmer'
          return (
            <button
              key={label}
              onClick={() => onViewChange(view)}
              className={`text-xs font-medium px-4 py-2 rounded-[10px] transition-all duration-150 ${
                activeView === view
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeView === view ? { background: '#0F6E56' } : {}}
            >
              {label}
            </button>
          )
        })}
      </div>

      {activeView === 'aggregator' && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={regionFilter}
              onChange={e => onRegionChange(e.target.value)}
              className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] transition-colors appearance-none pr-6"
            >
              <option value="">All locations</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
          </div>
          <div className="relative">
            <select
              value={cropFilter}
              onChange={e => onCropChange(e.target.value)}
              className="text-[11px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#1D9E75] transition-colors appearance-none pr-6"
            >
              <option value="">All crops</option>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▾</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            <span className="text-[10px] text-gray-400">Live · MazaoHub</span>
          </div>
        </div>
      )}
    </div>
  )
}
