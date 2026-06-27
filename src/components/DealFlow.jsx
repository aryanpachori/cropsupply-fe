'use client'

import { useState } from 'react'
import ProgressBar from './ui/ProgressBar'

function fmt(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function randomDealId() {
  return 'CS-' + Math.floor(100000 + Math.random() * 900000)
}

export default function DealFlow({ type, buyerData, supplierData, onClose }) {
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [phone, setPhone] = useState('')
  const [dealId] = useState(randomDealId)

  const qty = buyerData?.qty_tonnes ?? 0
  const price = buyerData?.price_tzs ?? 0
  const total = fmt(qty * price)

  function canConfirm() {
    return agreed && phone.trim().length >= 9
  }

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* ── STEP 1 — Deal summary ── */}
        {step === 1 && (
          <>
            <div className="p-5 flex-shrink-0" style={{ background: '#0F6E56' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wide mb-1">Deal summary</div>
                  <div className="text-xl font-medium text-white">
                    {buyerData?.crop} · {qty}T
                  </div>
                  <div className="text-[11px] text-white/70 mt-1">
                    Between {buyerData?.name} and {supplierData?.name}
                  </div>
                </div>
                <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none mt-0.5">×</button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto">
              {/* Buyer / Supplier cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3" style={{ background: '#E6F1FB' }}>
                  <div className="text-[9px] uppercase font-medium mb-1" style={{ color: '#185FA5' }}>Buyer</div>
                  <div className="text-xs font-medium text-gray-800">{buyerData?.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{buyerData?.location}</div>
                  <div className="text-[10px] text-gray-600 mt-1.5">
                    {qty}T · Grade {buyerData?.grade} · TZS {fmt(price)}/kg
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: '#E1F5EE' }}>
                  <div className="text-[9px] uppercase font-medium mb-1" style={{ color: '#085041' }}>Supplier</div>
                  <div className="text-xs font-medium text-gray-800">{supplierData?.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{supplierData?.location}</div>
                  <div className="text-[10px] text-gray-600 mt-1.5">
                    {supplierData?.harvest_window} · {supplierData?.confidence && (
                      <span className="font-medium" style={{ color: '#0F6E56' }}>✓ {supplierData.confidence} confidence</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Match quality */}
              <div>
                <div className="text-[10px] text-gray-500 mb-1">Match quality</div>
                <ProgressBar value={92} height={6} color="#1D9E75" />
                <div className="text-[9px] text-gray-500 mt-1">
                  92% match — volume, grade, location, and timing all align
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 rounded-xl p-3 mt-3 text-[10px] text-gray-600 space-y-1">
                <div>Volume: {qty}T of {buyerData?.crop}</div>
                <div>Price: TZS {fmt(price)}/kg (TZS {total} total)</div>
                <div>Delivery: {buyerData?.delivery_window || buyerData?.needed_by || '—'}</div>
                <div>Frequency: {buyerData?.frequency || '—'}</div>
                <div>Grade: {buyerData?.grade || '—'}</div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#0F6E56] text-white text-sm font-medium py-3 rounded-xl mt-4 hover:bg-[#085041] transition-colors"
              >
                Proceed to confirm →
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2 — Confirm ── */}
        {step === 2 && (
          <div className="p-5 overflow-y-auto">
            <div className="text-sm font-medium text-gray-900 mb-4">Confirm this deal</div>

            <label className="flex items-start gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
                style={{ accentColor: '#0F6E56' }}
              />
              <span className="text-[11px] text-gray-700 leading-relaxed">
                I confirm the volume, price, and delivery terms above are acceptable
              </span>
            </label>

            <div className="mb-4">
              <label className="block text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                Your WhatsApp number for deal confirmation
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+255 7XX XXX XXX"
                className="w-full text-[11px] border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0F6E56]"
              />
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!canConfirm()}
              className="w-full text-white text-sm font-medium py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: '#0F6E56' }}
            >
              Confirm deal →
            </button>
            <div
              onClick={() => setStep(1)}
              className="text-[11px] text-gray-400 text-center mt-2 cursor-pointer hover:text-gray-600"
            >
              ← Back
            </div>
          </div>
        )}

        {/* ── STEP 3 — Done ── */}
        {step === 3 && (
          <div className="p-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
              style={{ background: '#E1F5EE', color: '#0F6E56' }}
            >
              ✓
            </div>
            <div className="text-lg font-medium text-gray-900 mb-1">Deal initiated</div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
              Both parties will receive WhatsApp confirmation shortly. CropSupply will facilitate the transaction.
            </p>
            <div className="text-[10px] text-gray-400">Deal ID: {dealId}</div>
            <button
              onClick={onClose}
              className="bg-[#0F6E56] text-white text-sm font-medium px-8 py-3 rounded-xl mt-4 hover:bg-[#085041] transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
