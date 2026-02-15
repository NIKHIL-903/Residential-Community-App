import { useState, useEffect } from 'react'

/**
 * Mock news/announcements – sliding carousel. Data in component state only.
 */
const MOCK_ITEMS = [
  { id: 1, title: 'Community meeting this Saturday', summary: 'Join us at 10 AM in the clubhouse.' },
  { id: 2, title: 'Water supply maintenance', summary: 'Block B – 9–11 AM tomorrow.' },
  { id: 3, title: 'New gym hours', summary: '6 AM – 10 PM from next week.' },
]

export default function NewsCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % MOCK_ITEMS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const item = MOCK_ITEMS[index]

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">News & Announcements</h2>
      <div className="relative overflow-hidden rounded-xl bg-card shadow-soft p-6 md:p-8 min-h-[120px]">
        <div key={item.id} className="animate-fade-in">
          <h3 className="font-medium text-primary">{item.title}</h3>
          <p className="mt-2 text-slate-600">{item.summary}</p>
        </div>
        <div className="flex gap-2 mt-6">
          {MOCK_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                i === index ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
