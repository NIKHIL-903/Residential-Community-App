import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import NewsCarousel from '../components/dashboard/NewsCarousel'
import SmartComplaints from '../components/features/SmartComplaints/SmartComplaints'
import SkillConnection from '../components/features/SkillConnection/SkillConnection'
import AIChatbot from '../components/features/AIChatbot/AIChatbot'
import ProfileView from './ProfileView'
import MyComplaints from './MyComplaints'
import PendingComplaints from './PendingComplaints'
import ComplaintsToResolve from './ComplaintsToResolve'
import PendingResidentRegistrations from './PendingResidentRegistrations'
import { useAuth } from '../context/AuthContext'

/**
 * Role-based dashboard: Resident, Technician, Admin.
 * Sidebar and content depend on user.role.
 */
export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role || 'Resident'

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Routes>
            {/* Resident routes */}
            <Route index element={<DefaultView role={role} />} />
            <Route path="complaints" element={<ResidentOnly role={role}><SmartComplaints /></ResidentOnly>} />
            <Route path="skill-connection" element={<ResidentOnly role={role}><SkillConnection /></ResidentOnly>} />
            <Route path="chatbot" element={<ResidentOnly role={role}><AIChatbot /></ResidentOnly>} />
            <Route path="my-complaints" element={<ResidentOnly role={role}><MyComplaints /></ResidentOnly>} />
            <Route path="news" element={<ResidentOnly role={role}><NewsCarousel /></ResidentOnly>} />

            {/* Technician / Admin routes */}
            <Route path="pending-complaints" element={<StaffOnly role={role}><PendingComplaints /></StaffOnly>} />
            <Route path="resolve" element={<StaffOnly role={role}><ComplaintsToResolve /></StaffOnly>} />
            <Route path="pending-residents" element={<AdminOnly role={role}><PendingResidentRegistrations /></AdminOnly>} />

            <Route path="profile" element={<ProfileView />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

function DefaultView({ role }) {
  if (role === 'Resident') return <Navigate to="/dashboard/news" replace />
  if (role === 'Technician' || role === 'Admin') return <Navigate to="/dashboard/pending-complaints" replace />
  return <NewsCarousel />
}

function ResidentOnly({ role, children }) {
  if (role !== 'Resident') return <Navigate to="/dashboard" replace />
  return children
}

function StaffOnly({ role, children }) {
  if (role !== 'Technician' && role !== 'Admin') return <Navigate to="/dashboard" replace />
  return children
}

function AdminOnly({ role, children }) {
  if (role !== 'Admin') return <Navigate to="/dashboard" replace />
  return children
}
