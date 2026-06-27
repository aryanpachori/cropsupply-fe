'use client'

import { useState, useRef, useEffect } from 'react'

const QUICK_MESSAGES = [
  { label: "Maize price?", text: "Bei ya mahindi leo ni ngapi?" },
  { label: "Rice price?", text: "Bei ya mpunga leo?" },
  { label: "Onion price?", text: "Bei ya vitunguu Singida?" },
  { label: "Avocado price?", text: "Avocado bei ngapi DSM?" },
  { label: "Register harvest", text: "Nina mahindi tani 7 — nitavuna wiki mbili" },
  { label: "Groundnuts?", text: "Bei ya karanga Mwanza?" },
]

const simulateReply = (msg) => {
  const m = msg.toLowerCase()

  const isMaize      = /mahindi|maize|mhindi|mndi/.test(m)
  const isRice       = /mpunga|mchele|rice/.test(m)
  const isOnion      = /vitunguu|onion|tunguu/.test(m)
  const isAvocado    = /avocado|parachichi/.test(m)
  const isGroundnuts = /karanga|groundnut|nut/.test(m)
  const isHarvest    = /vuna|harvest|wiki|week|tani|tonne|nina|nitavuna/.test(m)
  const isSwahili    = /bei|leo|mwanza|nina|wiki|asante|niambie|mahindi|vitunguu|mpunga/.test(m)
  const isPriceQuery = /bei|price|how much|ngapi/.test(m)

  if (isHarvest) {
    const crop = isMaize ? 'Mahindi' : isRice ? 'Mpunga' : isOnion ? 'Vitunguu' : 'Mazao'
    return isSwahili
      ? `Asante! Tumesajili: ${crop} kutoka kwako. Wakala wetu atakupigia simu leo ili kuthibitisha. ✅ CropSupply · +255 700 000 000`
      : `Registered! Our agent will call to verify your harvest registration today. ✅ CropSupply · +255 700 000 000`
  }

  if (isMaize && isPriceQuery) {
    return isSwahili
      ? `Mahindi leo: TZS 500/kg (Tandale, DSM). ⚠ Bei inatarajiwa kushuka hadi ~440/kg mwezi ujao — mazao mengi yanakuja Dodoma na Mwanza. Uza mapema kama unaweza. CropSupply · +255 700 000 000`
      : `Maize today: TZS 500/kg (Tandale DSM). ⚠ Price forecast to drop ~12% by late July — high supply incoming from Dodoma & Mwanza. Sell before Jul 15 if possible. CropSupply · +255 700 000 000`
  }

  if (isRice && isPriceQuery) {
    return isSwahili
      ? `Mpunga leo: TZS 2,500/kg (Magomeni) au TZS 1,150/kg (Mpanda). ✓ Bei inatarajiwa kukaa imara mwezi huu — usambazaji mzuri. CropSupply · +255 700 000 000`
      : `Rice today: TZS 2,500/kg (Magomeni DSM). ✓ Price expected to stay stable this month — good supply balance. CropSupply · +255 700 000 000`
  }

  if (isOnion && isPriceQuery) {
    return isSwahili
      ? `Vitunguu leo: TZS 950/kg (Singida) au TZS 810,000/T (Kariakoo). 📈 Bei inatarajiwa kupanda hadi ~1,100/kg Agosti — usambazaji mdogo msimu huu (-31%). Weka hadi bei ipande. CropSupply · +255 700 000 000`
      : `Onion today: TZS 950/kg (Singida). 📈 Price forecast to spike to ~1,100/kg by August — supply is 31% lower this season. Good time to hold stock. CropSupply · +255 700 000 000`
  }

  if (isAvocado && isPriceQuery) {
    return isSwahili
      ? `Avocado leo: TZS 10,000/T (Buguruni, DSM). ⚠ Bei inatarajiwa kushuka hadi ~7,500/T Agosti — msimu mzuri (+51% zaidi ya mwaka jana). Uza mapema. CropSupply · +255 700 000 000`
      : `Avocado today: TZS 10,000/T (Buguruni DSM). ⚠ Price forecast to drop to ~7,500/T by August — bumper season incoming (+51%). Lock price now. CropSupply · +255 700 000 000`
  }

  if (isGroundnuts && isPriceQuery) {
    return isSwahili
      ? `Karanga leo: TZS 2,500/kg (Mwanza). 📈 Bei inaendelea kupanda — usambazaji mdogo msimu huu (-18%). CropSupply · +255 700 000 000`
      : `Groundnuts today: TZS 2,500/kg (Mwanza). 📈 Price trending up — supply is 18% lower this season. CropSupply · +255 700 000 000`
  }

  // Fallback
  return isSwahili
    ? `Habari! Tuma jina la zao na eneo lako. Mfano: "Bei ya mahindi Dodoma" au "Nina mpunga tani 5 — nitavuna wiki 2". CropSupply · +255 700 000 000`
    : `Hi! Send crop name and your location. E.g. "Maize price Dodoma" or "I have 5T rice — harvest in 2 weeks". CropSupply · +255 700 000 000`
}

export default function WhatsAppSimulator() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: 'Karibu CropSupply! 🌾 Niulize bei ya mazao, au nitumie taarifa ya mavuno yako. Welcome! Ask me crop prices or send your harvest details.',
      time: '09:00',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (messages.length > 1 || typing) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing])

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
      const reply = simulateReply(msg)
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: now() }])
    }, 900 + Math.random() * 600)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100" style={{ background: '#0F6E56' }}>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-base flex-shrink-0">💬</div>
        <div>
          <div className="text-xs font-medium text-white">CropSupply WhatsApp</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
            <span className="text-[10px] text-white/70">+255 700 000 000 · Online</span>
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div
        className="px-4 py-3 space-y-2 overflow-y-auto"
        style={{ minHeight: 260, maxHeight: 340, background: '#ECE5DD' }}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm"
              style={msg.from === 'user'
                ? { background: '#DCF8C6', color: '#111', borderBottomRightRadius: 4 }
                : { background: '#fff', color: '#111', borderBottomLeftRadius: 4 }
              }
            >
              {msg.text}
              <div className="text-[9px] text-gray-400 text-right mt-1">{msg.time}{msg.from === 'user' ? ' ✓✓' : ''}</div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-3 py-2 shadow-sm" style={{ borderBottomLeftRadius: 4 }}>
              <div className="flex gap-1 items-center h-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick messages */}
      <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-gray-100 bg-white">
        {QUICK_MESSAGES.map(q => (
          <button
            key={q.label}
            onClick={() => sendMessage(q.text)}
            className="text-[10px] whitespace-nowrap px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-colors flex-shrink-0"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 bg-white">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          className="flex-1 text-[11px] border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#0F6E56]"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity disabled:opacity-40 flex-shrink-0"
          style={{ background: '#0F6E56' }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
