import { useState, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'

/**
 * Vehicle complaint form – adds to app state (complaints). Image upload UI only.
 */
export default function VehicleComplaint() {
  const { addComplaint } = useAuth()
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [notes, setNotes] = useState('')
  const [fileNames, setFileNames] = useState([])
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = e.target.files
    if (!files?.length) return
    setFileNames(Array.from(files).map((f) => f.name))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const description = [vehicleNumber && `Vehicle: ${vehicleNumber}`, notes].filter(Boolean).join(' · ')
    addComplaint({
      type: 'Vehicle',
      description: description || 'Vehicle complaint',
      photoNames: fileNames,
    })
    setVehicleNumber('')
    setNotes('')
    setFileNames([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Vehicle number</label>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
          placeholder="e.g. MH 12 AB 1234"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Vehicle image (UI only)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-accent/15 file:text-accent-dark cursor-pointer focus:outline-none"
        />
        {fileNames.length > 0 && (
          <p className="mt-1.5 text-sm text-slate-500">Selected: {fileNames.join(', ')}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Notes / location</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none text-ink placeholder:text-slate-400"
          placeholder="Any additional notes or location details..."
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
      >
        Submit
      </button>
    </form>
  )
}
