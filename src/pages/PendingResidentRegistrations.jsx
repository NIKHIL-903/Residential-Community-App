import { useAuth } from '../context/AuthContext'

/**
 * Admin: Pending Resident Registrations. View details, Approve (generate Resident Code), Reject.
 */
export default function PendingResidentRegistrations() {
  const { pendingRegistrations, approveResident, rejectResident, lastApproved } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink">Pending Resident Registrations</h1>
      {lastApproved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          <strong>Last approved:</strong> {lastApproved.email} — Resident Code: <span className="font-mono font-bold">{lastApproved.residentCode}</span> (share with resident for family sign-ups)
        </div>
      )}
      {pendingRegistrations.length === 0 ? (
        <div className="bg-card rounded-xl shadow-soft p-6 text-slate-500">No pending registrations.</div>
      ) : (
        <div className="grid gap-4">
          {pendingRegistrations.map((reg) => (
            <div key={reg.id} className="bg-card rounded-xl shadow-soft p-5 border border-slate-200">
              <div className="grid gap-2 text-sm">
                <p><span className="text-slate-500">Name</span> {reg.fullName}</p>
                <p><span className="text-slate-500">Phone</span> {reg.phone}</p>
                <p><span className="text-slate-500">Email</span> {reg.email}</p>
                <p><span className="text-slate-500">Block / Floor / Flat</span> {reg.block} / {reg.floor} / {reg.flatNumber}</p>
                <p><span className="text-slate-500">Family members</span> {reg.familyMembers}</p>
                <p><span className="text-slate-500">Vehicle numbers</span> {Array.isArray(reg.vehicles) ? reg.vehicles.join(', ') : reg.vehicles || '—'}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => approveResident(reg.id)}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => rejectResident(reg.id)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
