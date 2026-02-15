import { useState, useRef, useEffect } from 'react'

/**
 * AI Community Chatbot – chat UI, user messages right, bot left.
 * Static/mock AI replies only; no persistence.
 */
const MOCK_REPLIES = [
  "Hello! I'm your community assistant. How can I help today?",
  "I can help with complaints, events, and general community info.",
  "For maintenance issues, please use the Smart Complaints section.",
  "Thanks for reaching out. Is there anything else?",
]

function getMockReply() {
  return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)]
}

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your community chatbot. Ask me anything.", fromBot: true },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const userMsg = { id: Date.now(), text, fromBot: false }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, text: getMockReply(), fromBot: true }])
    }, 600)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">AI Community Chatbot</h1>
      <div className="bg-card rounded-xl shadow-soft overflow-hidden flex flex-col max-h-[500px]">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 scroll-smooth min-h-[300px]"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.fromBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                  msg.fromBot
                    ? 'bg-surface text-ink'
                    : 'bg-primary text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
