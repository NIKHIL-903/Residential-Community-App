import { useState } from 'react'
import PeerMatch from './PeerMatch'
import MentorLearnerMatch from './MentorLearnerMatch'

/**
 * Skill Connection – Mode 1: Peer Match | Mode 2: Mentor–Learner Match.
 * Static mock data only; no persistence.
 */
const MODES = [
  { id: 'peer', label: 'Peer Match' },
  { id: 'mentor', label: 'Mentor–Learner Match' },
]

export default function SkillConnection() {
  const [mode, setMode] = useState('peer')

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-ink">Skill Connection</h1>
      <div className="flex gap-1 p-1.5 bg-surface rounded-lg w-fit">
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              mode === id ? 'bg-secondary text-white' : 'text-slate-600 hover:bg-card hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="bg-card rounded-xl shadow-soft p-6 md:p-8">
        {mode === 'peer' && <PeerMatch />}
        {mode === 'mentor' && <MentorLearnerMatch />}
      </div>
    </div>
  )
}
