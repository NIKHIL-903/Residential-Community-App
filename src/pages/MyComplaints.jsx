import { useAuth } from '../context/AuthContext'
import ComplaintCard from '../components/complaints/ComplaintCard'

/**
 * Resident: complaint status tracking. Lists complaints submitted by current user (by name/email match).
 */
export default function MyComplaints() {
  const { user, complaints } = useAuth()
  const myComplaints = complaints.filter(
    (c) => c.residentName === user?.name || c.residentPhone === user?.phone
  )

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">My Complaints</h1>
      {myComplaints.length === 0 ? (
        <div className="bg-card rounded-xl shadow-soft p-6 text-slate-500">
          You have not submitted any complaints yet. Use Smart Complaints to submit one.
        </div>
      ) : (
        <div className="grid gap-4">
          {myComplaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} showActions={false} />
          ))}
        </div>
      )}
    </div>
  )
}
