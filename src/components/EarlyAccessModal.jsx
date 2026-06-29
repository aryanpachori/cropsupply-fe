'use client'

import { useState } from 'react'

const ROLES = [
  { id: 'market_agent', emoji: '👩‍🌾', label: 'Market Agent' },
  { id: 'market_trader', emoji: '🛒', label: 'Market Trader' },
  { id: 'crop_supplier', emoji: '🌾', label: 'Crop Supplier' },
  { id: 'market_retailer', emoji: '🏪', label: 'Market Retailer' },
  { id: 'warehouse_op', emoji: '🏭', label: 'Warehouse Op.' },
  { id: 'factory', emoji: '🏗️', label: 'Factory' },
  { id: 'supermarket', emoji: '🏬', label: 'Supermarket' },
  { id: 'exporter', emoji: '📦', label: 'Exporter' },
  { id: 'restaurant', emoji: '🍽️', label: 'Restaurant' },
  { id: 'animal_feeds', emoji: '🐄', label: 'Animal Feeds' },
  { id: 'transporter', emoji: '🚛', label: 'Transporter' },
  { id: 'collateral_mgr', emoji: '🔒', label: 'Collateral Mgr' },
]

const CROPS = ['Maize', 'Rice', 'Onion', 'Avocado', 'Sunflower', 'Beans', 'Tomato', 'Cassava', 'Banana', 'Coffee', 'Sesame', 'Groundnuts', 'Sorghum', 'Wheat', 'Potato']

export default function EarlyAccessModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    role: '', org: '', country: '',
    crops: [], location: null
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setForm(f => ({ ...f, location: { lat: pos.coords.latitude, lng: pos.coords.longitude } })),
        () => {}
      )
    }
  }

  const toggleCrop = (crop) => {
    setForm(f => ({
      ...f,
      crops: f.crops.includes(crop) ? f.crops.filter(c => c !== crop) : [...f.crops, crop]
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const step1Valid = form.name.trim().length > 1 && (form.phone.trim().length > 7 || form.email.trim().includes('@'))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-[#085041] px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-medium bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                Early access · Full launch 30 Sept 2026
              </span>
              <h2 className="text-lg font-medium text-white mt-3">CropSupply AI</h2>
              <p className="text-[11px] text-white/60 mt-1">
                Be the first to access harvest intelligence when it launches.
              </p>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white text-xl mt-1">✕</button>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E1F5EE] flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h3 className="text-base font-medium text-gray-900 mb-2">You&apos;re on the list</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-1">
              We&apos;ll reach out to <strong>{form.phone || form.email}</strong> before 30 September 2026.
            </p>
            <p className="text-[10px] text-gray-400 mb-6">
              555K+ farmers · 260K+ farm records · 644K+ soil tests · 14 regions
            </p>
            <button onClick={onClose} className="bg-[#0F6E56] text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-[#085041] transition-colors">
              Done
            </button>
          </div>
        ) : (
          <div className="p-6">

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors ${step >= s ? 'bg-[#0F6E56] text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
                  {s < 2 && <div className={`h-px w-8 ${step > s ? 'bg-[#0F6E56]' : 'bg-gray-100'}`} />}
                </div>
              ))}
              <span className="text-[10px] text-gray-400 ml-1">{step === 1 ? 'Your details' : 'Tell us more (optional)'}</span>
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-1">
                    Full name <span className="text-[#E24B4A]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Msigwa"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-1">
                    Phone number <span className="text-[#E24B4A]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+255 7XX XXX XXX"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-1">
                    Email <span className="text-[10px] text-gray-300 normal-case">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-2">
                    I am a <span className="text-[10px] text-gray-300 normal-case">(optional)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {ROLES.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setForm(f => ({ ...f, role: f.role === r.id ? '' : r.id }))}
                        className={`text-[9px] py-2 px-1 rounded-xl border transition-all text-center ${form.role === r.id ? 'bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                      >
                        <div className="text-sm mb-0.5">{r.emoji}</div>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { requestLocation(); setStep(2) }}
                  disabled={!step1Valid}
                  className="w-full bg-[#0F6E56] disabled:opacity-40 text-white text-[11px] font-medium py-3 rounded-xl hover:bg-[#085041] transition-colors mt-2"
                >
                  Continue →
                </button>
                <p className="text-[9px] text-gray-400 text-center">
                  Name and phone required. Everything else optional. We&apos;ll call to learn more.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-1">
                    Country <span className="text-[10px] text-gray-300 normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tanzania, Kenya, India..."
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-1">
                    Organisation <span className="text-[10px] text-gray-300 normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Company or cooperative name"
                    value={form.org}
                    onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                    className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-gray-400 font-medium block mb-2">
                    Crops you work with <span className="text-[10px] text-gray-300 normal-case">(optional — pick any)</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CROPS.map(crop => (
                      <button
                        key={crop}
                        onClick={() => toggleCrop(crop)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${form.crops.includes(crop) ? 'bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                {!form.location && (
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium text-gray-700">Share your location?</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">Helps us match you to relevant supply in your region</p>
                    </div>
                    <button
                      onClick={requestLocation}
                      className="text-[10px] font-medium text-[#0F6E56] border border-[#9FE1CB] bg-[#E1F5EE] px-3 py-1.5 rounded-xl hover:bg-[#9FE1CB] transition-colors flex-shrink-0"
                    >
                      Allow
                    </button>
                  </div>
                )}
                {form.location && (
                  <div className="bg-[#E1F5EE] rounded-xl p-3 text-[10px] text-[#085041] flex items-center gap-2">
                    <span>📍</span>
                    <span>Location captured — thank you</span>
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="text-[11px] text-gray-400 border border-gray-200 px-4 py-3 rounded-xl hover:text-gray-600 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-[#0F6E56] disabled:opacity-60 text-white text-[11px] font-medium py-3 rounded-xl hover:bg-[#085041] transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Request early access →'}
                  </button>
                </div>

                <p className="text-[9px] text-gray-400 text-center">
                  Full access opens 30 September 2026. We&apos;ll call you before then.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
