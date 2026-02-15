import { useAuth } from '../context/AuthContext'
import ComplaintCard from '../components/complaints/ComplaintCard'

/**
 * Technician/Admin: list of complaints with status Pending.
 */
export default function PendingComplaints() {
  const { complaints } = useAuth()
  const pending = complaints.filter((c) => c.status === 'Pending')

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">Pending Complaints</h1>
      {pending.length === 0 ? (
        <div className="bg-card rounded-xl shadow-soft p-6 text-slate-500">No pending complaints.</div>
      ) : (
        <div className="grid gap-4">
          {pending.map((c) => (
            <ComplaintCard key={c.id} complaint={c} showActions={true} />
          ))}
        </div>
      )}
    </div>
  )
}
