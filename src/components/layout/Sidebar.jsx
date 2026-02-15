import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Role-based sidebar. Order per role:
 * Resident: Smart Complaints, Skill Connection, AI Chatbot, My Complaints, News (default)
 * Technician: Pending Complaints, Complaints to Resolve
 * Admin: Pending Complaints, Complaints to Resolve, Pending Resident Registrations
 */
const RESIDENT_NAV = [
  { path: 'complaints', label: 'Smart Complaints' },
  { path: 'skill-connection', label: 'Skill Connection' },
  { path: 'chatbot', label: 'AI Chatbot' },
  { path: 'my-complaints', label: 'My Complaints' },
  { path: 'news', label: 'News' },
]
const TECHNICIAN_NAV = [
  { path: 'pending-complaints', label: 'Pending Complaints' },
  { path: 'resolve', label: 'Complaints to Resolve' },
]
const ADMIN_NAV = [
  { path: 'pending-complaints', label: 'Pending Complaints' },
  { path: 'resolve', label: 'Complaints to Resolve' },
  { path: 'pending-residents', label: 'Pending Resident Registrations' },
]

export default function Sidebar() {
  const { user } = useAuth()
  const role = user?.role || 'Resident'
  const navItems = role === 'Admin' ? ADMIN_NAV : role === 'Technician' ? TECHNICIAN_NAV : RESIDENT_NAV

  return (
    <aside className="w-56 bg-card shadow-soft flex flex-col min-h-0">
      <nav className="p-4 space-y-2">
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === 'complaints' || path === 'pending-complaints'}
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
