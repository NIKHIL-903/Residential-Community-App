import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import NewsCarousel from '../components/dashboard/NewsCarousel'
import SmartComplaints from '../components/features/SmartComplaints/SmartComplaints'
import SkillConnection from '../components/features/SkillConnection/SkillConnection'
import AIChatbot from '../components/features/AIChatbot/AIChatbot'
import ProfileView from './ProfileView'

/**
 * Main app layout after login. Sidebar controls which feature is rendered.
 * Default view: News / Announcements carousel.
 */
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Routes>
            <Route index element={<DefaultView />} />
            <Route path="complaints" element={<SmartComplaints />} />
            <Route path="skill-connection" element={<SkillConnection />} />
            <Route path="chatbot" element={<AIChatbot />} />
            <Route path="profile" element={<ProfileView />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

function DefaultView() {
  return (
    <div>
      <NewsCarousel />
    </div>
  )
}
