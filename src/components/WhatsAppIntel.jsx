'use client'

import Badge from './ui/Badge'
import { CROP_EMOJI } from '@/styles/tokens'
import { PRE_HARVEST } from '@/lib/dummy'

const STEPS = ["1. Farmer messages", "2. NLP extracts intent", "3. Agent verifies if needed", "4. Added to forecast"]

function statusVariant(s) {
  if (s === 'verified') return 'green'
  if (s === 'pending_verify') return 'amber'
  return 'red'
}

function statusLabel(s) {
  if (s === 'verified') return 'Verified'
  if (s === 'pending_verify') return 'Pending'
  return 'Flagged'
}

export default function WhatsAppIntel() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366' }}>
            📱
          </div>
          <span className="text-xs font-medium text-gray-700">WhatsApp & SMS pre-harvest registration</span>
        </div>
        <Badge variant="green">Live · Africa&apos;s Talking</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left — How it works */}
        <div>
          <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-3">Farmer sends a message</div>
          <div className="rounded-xl p-3 font-mono" style={{ background: '#ECE5DD' }}>
            {/* Farmer message */}
            <div className="flex justify-end mb-2">
              <div className="bg-white rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-gray-800 max-w-[80%]">
                Nina mahindi 3 tani, Mwanza, tayari kuvuna wiki 2
              </div>
            </div>
            {/* System reply */}
            <div className="mb-1">
              <div className="rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-gray-800 max-w-[80%]" style={{ background: '#DCF8C6' }}>
                Asante! Tumesajili: Mahindi 3T, Mwanza, ~Jul 15. Mtu wetu atakupigia ili kuthibitisha. ✅
              </div>
              <div className="text-[9px] text-gray-400 mt-1 ml-1 max-w-[80%]">
                &quot;Thank you! Registered: Maize 3T, Mwanza, ~Jul 15. Our agent will call to verify. ✅&quot;
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {STEPS.map(step => (
              <span key={step} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{step}</span>
            ))}
          </div>
        </div>

        {/* Right — Recent registrations */}
        <div>
          <div className="text-[10px] uppercase text-gray-400 tracking-wide mb-3">Recent registrations</div>
          {PRE_HARVEST.map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-mono">{r.farmer}</span>
                <span className="text-[10px] text-gray-700">{CROP_EMOJI[r.crop] || '🌱'} {r.crop} · {r.region}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] text-gray-500">{r.qty_t}T · {r.eta_days}d</span>
                <Badge variant={statusVariant(r.status)} size="xs">{statusLabel(r.status)}</Badge>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: '#E1F5EE', color: '#085041' }}>{r.channel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-[9px] text-gray-400">
        Flagged entries require human verification before going live to aggregators. AI captures, human verifies, then it&apos;s trusted data.
      </div>
    </div>
  )
}
