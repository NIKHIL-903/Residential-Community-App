import { useAuth } from '../context/AuthContext'
import ComplaintCard from '../components/complaints/ComplaintCard'

/**
 * Technician/Admin: complaints to resolve (Pending + In Progress). Actions: Mark In Progress, Mark Resolved.
 */
export default function ComplaintsToResolve() {
  const { complaints } = useAuth()
  const toResolve = complaints.filter((c) => c.status === 'Pending' || c.status === 'In Progress')

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">Complaints to Resolve</h1>
      {toResolve.length === 0 ? (
        <div className="bg-card rounded-xl shadow-soft p-6 text-slate-500">No complaints to resolve.</div>
      ) : (
        <div className="grid gap-4">
          {toResolve.map((c) => (
            <ComplaintCard key={c.id} complaint={c} showActions={true} />
          ))}
        </div>
      )}
    </div>
  )
}
