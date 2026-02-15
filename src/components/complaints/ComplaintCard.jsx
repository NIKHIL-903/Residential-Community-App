import { useAuth } from '../../context/AuthContext'

/**
 * Reusable complaint card: type, description, photos, resident details, status.
 * Technician/Admin: show actions Mark In Progress / Mark Resolved.
 */
export default function ComplaintCard({ complaint, showActions = false }) {
  const { user, updateComplaintStatus } = useAuth()
  const canAct = showActions && (user?.role === 'Technician' || user?.role === 'Admin')

  return (
    <div className="bg-card rounded-xl shadow-soft p-4 md:p-5 border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium uppercase text-slate-500">{complaint.type}</span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            complaint.status === 'Resolved'
              ? 'bg-green-100 text-green-800'
              : complaint.status === 'In Progress'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {complaint.status}
        </span>
      </div>
      <p className="text-ink mb-3">{complaint.description}</p>
      {complaint.photoNames?.length > 0 && (
        <p className="text-sm text-slate-500 mb-2">Photos: {complaint.photoNames.join(', ')}</p>
      )}
      <div className="text-sm text-slate-600 space-y-0.5">
        <p>Resident: {complaint.residentName} · {complaint.residentPhone}</p>
        <p>Block {complaint.block} / Floor {complaint.floor} / Flat {complaint.flat}</p>
      </div>
      {canAct && complaint.status !== 'Resolved' && (
        <div className="mt-4 flex gap-2">
          {complaint.status === 'Pending' && (
            <button
              type="button"
              onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}
              className="px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Mark In Progress
            </button>
          )}
          <button
            type="button"
            onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Mark Resolved
          </button>
        </div>
      )}
    </div>
  )
}
