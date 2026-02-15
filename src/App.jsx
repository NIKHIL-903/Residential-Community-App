import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Auth pages
import Login from './pages/Login'
import OrgRegister from './pages/OrgRegister'
import UserRegister from './pages/UserRegister'
import ProfileSetup from './pages/ProfileSetup'

// Dashboard (protected)
import Dashboard from './pages/Dashboard'

/**
 * Protects dashboard routes – redirects to login if not authenticated.
 * Auth state is in-memory only; refresh resets it.
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register-org" element={<OrgRegister />} />
      <Route path="/register-user" element={<UserRegister />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
