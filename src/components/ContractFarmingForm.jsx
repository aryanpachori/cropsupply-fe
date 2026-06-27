'use client'

import { useState } from 'react'
import { CROP_EMOJI } from '@/styles/tokens'

export default function ContractFarmingForm({ stage, stageName, crop, region, onClose }) {
  const [form, setForm] = useState({
    volume: '', volumeUnit: 'Tonnes', grade: 'Grade A',
    location: region || '',
    deliveryFrom: '', deliveryTo: '',
    price: '', currency: 'TZS',
    requirements: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const estimatedFarmers = Math.round((stage <= 3 ? 800 : stage <= 6 ? 500 : 300) * Math.random() * 0.4 + 200)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-5 flex-shrink-0" style={{ background: '#185FA5' }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] text-white/60 uppercase tracking-wide mb-1">Contract farming request</div>
              <div className="text-lg font-medium text-white">
                {CROP_EMOJI[crop] || CROP_EMOJI.default} {crop} — Stage {stage}: {stageName}
              </div>
              <div className="text-[11px] text-white/70 mt-1">Lock supply before it reaches market</div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none mt-0.5 flex-shrink-0 ml-4">×</button>
          </div>
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4" style={{ background: '#E1F5EE' }}>✓</div>
            <div className="text-sm font-medium text-gray-800 mb-2">Request submitted successfully</div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
              AI is matching you with ~{estimatedFarmers} farmers in {region}. You&apos;ll receive qualified supply commitments within 24 hours via WhatsApp and email.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-medium"
              style={{ background: '#0F6E56' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">

            {/* Crop (pre-filled) */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Crop</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
                <span>{CROP_EMOJI[crop] || CROP_EMOJI.default}</span>
                <span className="text-[11px] text-gray-600">{crop}</span>
              </div>
            </div>

            {/* Volume */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Volume needed</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={form.volume}
                  onChange={e => setForm(f => ({ ...f, volume: e.target.value }))}
                  placeholder="e.g. 500"
                  required
                  className="flex-1 text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                />
                <select
                  value={form.volumeUnit}
                  onChange={e => setForm(f => ({ ...f, volumeUnit: e.target.value }))}
                  className="text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                >
                  <option>kg</option>
                  <option>Tonnes</option>
                </select>
              </div>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Grade required</label>
              <select
                value={form.grade}
                onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
              >
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Export quality</option>
                <option>Any</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Preferred location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
              />
            </div>

            {/* Delivery window */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Delivery window</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={form.deliveryFrom}
                  onChange={e => setForm(f => ({ ...f, deliveryFrom: e.target.value }))}
                  required
                  className="flex-1 text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                />
                <input
                  type="date"
                  value={form.deliveryTo}
                  onChange={e => setForm(f => ({ ...f, deliveryTo: e.target.value }))}
                  required
                  className="flex-1 text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                />
              </div>
            </div>

            {/* Price offer */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Price offer <span className="normal-case text-gray-400">(optional)</span></label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="Leave blank for quotes"
                  className="flex-1 text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                />
                <select
                  value={form.currency}
                  onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
                  className="text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5]"
                >
                  <option>TZS</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              <div className="text-[9px] text-gray-400 mt-1">Leave blank to receive supplier quotes</div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">Special requirements</label>
              <textarea
                value={form.requirements}
                onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                rows={3}
                placeholder="Moisture level, packaging, certification, etc."
                className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#185FA5] resize-none"
              />
            </div>

            {/* Info box */}
            <div className="rounded-xl p-3 text-[10px] leading-relaxed" style={{ background: '#E6F1FB', color: '#185FA5' }}>
              Your request will be matched with ~{estimatedFarmers} farmers currently at stage {stage} in {region}. AI will reach out to qualified farmers and deliver confirmed supply commitments within 24–48 hours.
            </div>

            <button
              type="submit"
              className="w-full text-white text-sm font-medium py-3 rounded-xl transition-colors mt-2 hover:opacity-90"
              style={{ background: '#185FA5' }}
            >
              Submit contract farming request →
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
