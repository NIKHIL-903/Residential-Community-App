import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Returns greeting based on time of day (mock).
 */
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-card shadow-soft px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <span className="text-slate-600">{getGreeting()},</span>
        <Link
          to="profile"
          className="font-medium text-ink hover:text-primary focus:outline-none focus:underline transition-colors"
        >
          {user?.name || 'User'}
        </Link>
        <span className="text-slate-400">·</span>
        <span className="text-sm text-primary font-medium">{user?.communityName || 'Community'}</span>
        {user?.residentCode && (
          <span className="text-xs bg-surface text-slate-600 px-2.5 py-1 rounded-full font-mono">
            {user.residentCode}
          </span>
        )}
        <span className="text-xs bg-accent/15 text-accent-dark px-2.5 py-1 rounded-full font-medium">
          {user?.role || 'Resident'}
        </span>
      </div>
      <button
        onClick={logout}
        className="text-sm text-slate-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors"
      >
        Sign out
      </button>
    </header>
  )
}
