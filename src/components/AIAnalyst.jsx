'use client'

import { useState, useRef, useEffect } from 'react'

const QUICK_CHIPS = [
  { label: "Best crop to buy?", text: "Which crop has the best buying opportunity right now?" },
  { label: "Price forecast", text: "What are price forecasts for maize and onion?" },
  { label: "Harvest timeline", text: "Which crops are harvesting soonest?" },
  { label: "Supply risk?", text: "What supply risks should I be aware of this season?" },
  { label: "Contract window", text: "Which crops are still in the contract farming window?" },
  { label: "Top regions?", text: "Which regions have the highest forecasted supply?" },
]

function simulateAnalyst(msg) {
  const m = msg.toLowerCase()

  const isMaize      = /maize|mahindi/.test(m)
  const isRice       = /rice|mpunga/.test(m)
  const isOnion      = /onion|vitunguu/.test(m)
  const isAvocado    = /avocado|parachichi/.test(m)
  const isHarvest    = /harvest|vuna|timeline|soon|earliest/.test(m)
  const isPrice      = /price|forecast|bei|predict/.test(m)
  const isSupplyRisk = /risk|supply|shortage|surplus/.test(m)
  const isContract   = /contract|stage 1|stage 2|window/.test(m)
  const isRegion     = /region|where|dodoma|mwanza|arusha|iringa|morogoro/.test(m)
  const isBest       = /best|top|recommend|opportunity/.test(m)

  if (isBest && !isPrice) {
    return `Based on current stage and demand signals:\n\n🥇 **Onion** — Supply is 31% below seasonal average. Price forecast: +16% by August. High buyer demand from Kariakoo and export markets.\n\n🥈 **Maize** — 284 farmers harvesting in July. Large volume opportunity for forward contracts right now (Stage 7 contract window open).\n\n🥉 **Avocado** — Bumper season (+51% YoY), ideal for volume buying at current low spot price before export demand peaks.\n\nOther crops look balanced this season with normal margins.`
  }

  if (isHarvest) {
    return `Nearest harvest windows based on current forecasts:\n\n📅 **Onion (Singida)** — 8 days · 2,100T · High confidence\n📅 **Maize (Mwanza)** — 12 days · 8,400T · High confidence\n📅 **Rice (Morogoro)** — 18 days · 3,200T · Medium confidence\n📅 **Tomato (Arusha)** — 22 days · 1,800T · High confidence\n📅 **Avocado (Iringa)** — 31 days · 4,900T · High confidence\n\nClick any harvest card in the Countdown section to see buyer demand and pricing.`
  }

  if (isSupplyRisk) {
    return `Current supply risk flags for this season:\n\n⚠️ **Maize oversupply risk** — 284 Mwanza farmers harvesting in the same 2-week window. Expect spot price to drop ~12% by late July if not pre-sold.\n\n⚠️ **Avocado surge** — +51% above last year. Export logistics at Dar Port are key. Book transport early.\n\n✅ **Onion — tight supply** — 31% below average. Positive for buyers who pre-contracted. Spot buyers will pay premium.\n\n✅ **Rice — balanced** — Morogoro and Mbeya supply aligns well with Dar market demand. Stable margins expected.`
  }

  if (isContract) {
    return `Contract farming window is currently **Stages 1–9** of the 19-stage farming cycle.\n\nCurrently active crop/region opportunities:\n\n🔵 **Maize** — Stage 7 (Leaf development) · Mwanza, Dodoma · 42,000T forecasted\n🔵 **Rice** — Stage 5 (Transplanting) · Morogoro, Mbeya · 18,000T forecasted\n🔵 **Sorghum** — Stage 3 (Germination) · Shinyanga, Tabora · 6,200T forecasted\n\nUse the **Farming Stage Intel** section above to open a contract form for any of these crops.`
  }

  if (isRegion) {
    return `Top regions by forecasted harvest volume this season:\n\n📍 **Mwanza** — 48,200T · Maize dominant · High farmer activity\n📍 **Dodoma** — 31,400T · Maize + Sorghum · Contract window open\n📍 **Morogoro** — 26,800T · Rice + Cassava\n📍 **Arusha** — 19,100T · Tomato + Onion + Avocado\n📍 **Iringa** — 15,600T · Maize + Potato + Avocado\n\nAll 14 regions are tracked. Use the Readiness Heatmap to see per-region soil and stage breakdown.`
  }

  if (isMaize && isPrice) {
    return `Maize price forecast:\n\n📊 Today: TZS 500/kg (Tandale DSM)\n📉 Jul 15: ~TZS 460/kg (supply peak from Mwanza & Dodoma harvest)\n📈 Aug 10: TZS 510–520/kg (post-peak tightening)\n\n**Buyer advice:** Lock supply at current price before Jul 12 harvest window opens. Spot prices will dip ~12% at peak supply.\n\n**Seller advice:** Pre-contract at TZS 490–500 now rather than wait for spot market post-harvest.`
  }

  if (isOnion && isPrice) {
    return `Onion price forecast:\n\n📊 Today: TZS 950/kg (Singida)\n📈 Aug: ~TZS 1,100/kg (+16%) · Low supply season\n📊 Kariakoo wholesale: TZS 810,000/T\n\n**Buyer advice:** Buy forward contracts now. Singida supply is 31% below seasonal average — prices will spike August onwards.\n\n**Seller/farmer:** Hold stock if you can. August–September is the price peak window.`
  }

  if (isRice && isPrice) {
    return `Rice price forecast:\n\n📊 Magomeni (DSM): TZS 2,500/kg\n📊 Mpanda wholesale: TZS 1,150/kg\n📊 Trend: Stable ↔ this month, slight uptick (+5%) September\n\n**Buyer advice:** Stable market. No urgency to rush — buy at your normal procurement cycle. Regional price variation is high, so source from Morogoro or Mbeya for best margins.`
  }

  if (isAvocado && isPrice) {
    return `Avocado price forecast:\n\n📊 Today: TZS 10,000/T (Buguruni DSM)\n📉 Aug: ~TZS 7,500/T (bumper season, +51% YoY volume)\n📈 Oct: Recovery as export season begins\n\n**Buyer advice:** Great bulk-buying window now — high supply, low prices. Export-grade volume available in Iringa and Arusha.\n\n**Seller advice:** Move product early. August spot price will fall. Lock export contracts now for October delivery.`
  }

  if (isPrice) {
    return `Crop price summary (today, Dar es Salaam markets):\n\n• Maize: TZS 500/kg · Forecast: -12% Jul, recover Aug\n• Rice: TZS 2,500/kg · Stable this month\n• Onion: TZS 950/kg · Forecast: +16% by August\n• Avocado: TZS 10,000/T · Forecast: -25% at Aug peak\n• Groundnuts: TZS 2,500/kg · Trending up (+8%)\n• Tomato: TZS 1,200/kg · Stable\n\nAsk me about a specific crop for a detailed forecast.`
  }

  return `I'm your CropSupply analyst. I can help with:\n\n• 📈 Price forecasts for any crop\n• 🌾 Harvest timeline and volumes\n• ⚠️ Supply risk alerts\n• 🤝 Contract farming windows\n• 📍 Regional supply breakdown\n• 💡 Best buying/selling opportunities\n\nTry: "Which crop has the best buying opportunity?" or "What are onion price forecasts?"`
}

export default function AIAnalyst() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hi! I'm your CropSupply AI analyst. Ask me about crop prices, harvest timelines, supply risks, or buying opportunities.",
      time: '—',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  function now() {
    return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  function sendMessage(text) {
    const msg = (text || input).trim()
    if (!msg) return
    setInput('')

    const userMsg = { id: Date.now(), from: 'user', text: msg, time: now() }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)

    setTimeout(() => {
      const reply = simulateAnalyst(msg)
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: now() }])
    }, 800 + Math.random() * 700)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-[100] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          style={{ width: 360, height: 520, background: '#fff' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 flex-shrink-0" style={{ background: '#0F6E56' }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm text-white flex-shrink-0">🧠</div>
              <div>
                <div className="text-xs font-medium text-white leading-none">AI Analyst</div>
                <div className="text-[9px] text-white/60 mt-0.5">CropSupply Intelligence</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors text-xs"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'bot' && (
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] mr-1.5 mt-0.5 self-start" style={{ background: '#E1F5EE' }}>🧠</div>
                )}
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm whitespace-pre-line"
                  style={msg.from === 'user'
                    ? { background: '#0F6E56', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: '#fff', color: '#111', borderBottomLeftRadius: 4, border: '1px solid #F1EFE8' }
                  }
                >
                  {msg.text}
                  {msg.time !== '—' && (
                    <div className="text-[9px] mt-1 opacity-50 text-right">{msg.time}</div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] mr-1.5 self-start mt-0.5" style={{ background: '#E1F5EE' }}>🧠</div>
                <div className="bg-white rounded-2xl px-3 py-2 shadow-sm border border-gray-100" style={{ borderBottomLeftRadius: 4 }}>
                  <div className="flex gap-1 items-center h-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick chips */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-gray-100 bg-white flex-shrink-0">
            {QUICK_CHIPS.map(q => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.text)}
                className="text-[9px] whitespace-nowrap px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-colors flex-shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 bg-white flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about crops, prices, forecasts…"
              className="flex-1 text-[11px] border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:border-[#0F6E56]"
              autoFocus
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-30 flex-shrink-0"
              style={{ background: '#0F6E56' }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Trigger bubble */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-xl transition-transform hover:scale-105 active:scale-95"
        style={{ background: '#0F6E56' }}
        title="AI Analyst"
      >
        {open ? '✕' : '🧠'}
      </button>
    </>
  )
}
