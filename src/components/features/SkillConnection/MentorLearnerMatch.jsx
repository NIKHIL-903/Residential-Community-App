import { useState } from 'react'
import { INTEREST_DOMAINS } from '../../../constants/domains'

/**
 * Mentor–Learner Match – select role (Mentor/Learner), select skill/domain, show matched profiles (mock).
 */
const ROLES = ['Mentor', 'Learner']
const MOCK_MENTORS = [
  { id: 1, name: 'Anita M.', skill: 'Cooking & Food', block: 'B', sessions: 'Weekends' },
  { id: 2, name: 'Suresh T.', skill: 'Technology & Digital', block: 'A', sessions: 'Evenings' },
  { id: 3, name: 'Lina K.', skill: 'Languages & Communication', block: 'C', sessions: 'Mornings' },
]
const MOCK_LEARNERS = [
  { id: 1, name: 'Neha R.', skill: 'Cooking & Food', block: 'C', goal: 'Basics' },
  { id: 2, name: 'Arjun V.', skill: 'Technology & Digital', block: 'B', goal: 'Web dev' },
  { id: 3, name: 'Omar P.', skill: 'Creative & Arts', block: 'A', goal: 'Design' },
]

export default function MentorLearnerMatch() {
  const [role, setRole] = useState('Mentor')
  const [skill, setSkill] = useState('')
  const profiles = role === 'Mentor' ? MOCK_MENTORS : MOCK_LEARNERS
  const displayed = skill ? profiles.filter((p) => p.skill === skill) : profiles

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-card text-ink"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Skill</label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-card text-ink"
          >
            <option value="">All</option>
            {INTEREST_DOMAINS.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {displayed.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-lg bg-surface border border-slate-200 hover:border-accent/50 transition-colors"
          >
            <div className="font-medium text-ink">{p.name}</div>
            <div className="text-sm text-primary mt-0.5">{p.skill}</div>
            <div className="text-xs text-slate-500 mt-1">
              Block {p.block} · {p.sessions || p.goal}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
