import { useState } from 'react'
import HouseholdComplaint from './HouseholdComplaint'
import VehicleComplaint from './VehicleComplaint'

/**
 * Smart Complaints – tabs: Household Complaint | Vehicle Complaint.
 * Submit handlers only console.log; no persistence.
 */
const TABS = [
  { id: 'household', label: 'Household Complaint' },
  { id: 'vehicle', label: 'Vehicle Complaint' },
]

export default function SmartComplaints() {
  const [activeTab, setActiveTab] = useState('household')

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-ink">Smart Complaints</h1>
      <div className="flex gap-1 p-1.5 bg-surface rounded-lg w-fit">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              activeTab === id ? 'bg-secondary text-white' : 'text-slate-600 hover:bg-card hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="bg-card rounded-xl shadow-soft p-6 md:p-8">
        {activeTab === 'household' && <HouseholdComplaint />}
        {activeTab === 'vehicle' && <VehicleComplaint />}
      </div>
    </div>
  )
}
