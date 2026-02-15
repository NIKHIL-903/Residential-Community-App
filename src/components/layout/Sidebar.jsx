import { NavLink } from 'react-router-dom'

/**
 * Sidebar navigation – order must be exactly:
 * 1. Smart Complaints
 * 2. Skill Connection
 * 3. AI Chatbot
 */
const NAV_ITEMS = [
  { path: 'complaints', label: 'Smart Complaints' },
  { path: 'skill-connection', label: 'Skill Connection' },
  { path: 'chatbot', label: 'AI Chatbot' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 bg-card shadow-soft flex flex-col min-h-0">
      <nav className="p-4 space-y-2">
        {NAV_ITEMS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === 'complaints'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-surface hover:text-ink'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
