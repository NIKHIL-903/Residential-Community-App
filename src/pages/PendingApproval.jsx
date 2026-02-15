import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Shown when resident registered WITHOUT Resident Code.
 * Access blocked until Admin approves. "Check approval status" to proceed to Skill Profile Setup.
 */
export default function PendingApproval() {
  const navigate = useNavigate()
  const { pendingApprovalUser, checkApprovalStatus } = useAuth()

  useEffect(() => {
    if (!pendingApprovalUser) navigate('/register-user', { replace: true })
  }, [pendingApprovalUser, navigate])

  const handleCheckStatus = () => {
    if (!pendingApprovalUser?.email) return
    if (checkApprovalStatus(pendingApprovalUser.email)) {
      navigate('/profile-setup', { replace: true })
    }
  }

  if (!pendingApprovalUser) return null

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-soft p-8 text-center">
          <h1 className="text-xl font-semibold text-ink mb-2">Pending Admin Approval</h1>
          <p className="text-slate-600 mb-6">
            Your registration has been submitted. An admin will review and approve your account.
            Once approved, you will need to complete your Skill Profile before accessing the dashboard.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Registered as: <strong>{pendingApprovalUser.email}</strong>
          </p>
          <button
            type="button"
            onClick={handleCheckStatus}
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            Check approval status
          </button>
        </div>
      </div>
    </div>
  )
}
