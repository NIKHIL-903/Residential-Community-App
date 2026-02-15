import { useState } from 'react'
import { INTEREST_DOMAINS } from '../../../constants/domains'

/**
 * Peer Match – select skill/interest (domains), show matching users as cards (static mock array).
 */
const MOCK_USERS = [
  { id: 1, name: 'Priya S.', skill: 'Home, Gardening & Sustainability', block: 'A', interest: 'Organic veggies' },
  { id: 2, name: 'Raj K.', skill: 'Cooking & Food', block: 'B', interest: 'Indian cuisine' },
  { id: 3, name: 'Meera L.', skill: 'Fitness, Sports & Wellness', block: 'A', interest: 'Morning sessions' },
  { id: 4, name: 'Vikram P.', skill: 'Filming & Videography', block: 'C', interest: 'Nature & events' },
  { id: 5, name: 'Sana A.', skill: 'Technology & Digital', block: 'B', interest: 'Web & apps' },
  { id: 6, name: 'Rahul M.', skill: 'Music & Performing Arts', block: 'A', interest: 'Guitar & vocals' },
]

export default function PeerMatch() {
  const [selectedSkill, setSelectedSkill] = useState('')
  const displayed = selectedSkill
    ? MOCK_USERS.filter((u) => u.skill === selectedSkill)
    : MOCK_USERS

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Select skill or interest</label>
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="w-full max-w-xs px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-card text-ink"
        >
          <option value="">All</option>
          {INTEREST_DOMAINS.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {displayed.map((user) => (
          <div
            key={user.id}
            className="p-4 rounded-lg bg-surface border border-slate-200 hover:border-accent/50 transition-colors focus-within:ring-2 focus-within:ring-accent/30"
          >
            <div className="font-medium text-ink">{user.name}</div>
            <div className="text-sm text-primary mt-0.5">{user.skill}</div>
            <div className="text-xs text-slate-500 mt-1">Block {user.block} · {user.interest}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
