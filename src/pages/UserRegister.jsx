import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

/**
 * Resident registration only.
 * With valid Resident Code → Skill Profile Setup → Dashboard.
 * Without Resident Code → Pending Admin Approval; after approval → Profile Setup → Dashboard.
 */
export default function UserRegister() {
  const navigate = useNavigate()
  const { registerResident } = useAuth()
  const [form, setForm] = useState({
    orgCode: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    block: '',
    floor: '',
    flatNumber: '',
    residentCode: '',
    familyMembers: '1',
    vehicles: '',
    role: 'Resident',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.orgCode.trim()) next.orgCode = 'Organization code is required.'
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!EMAIL_REGEX.test(form.email)) next.email = 'Please enter a valid email.'
    if (form.password.length < MIN_PASSWORD_LENGTH) next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    if (!form.familyMembers || parseInt(form.familyMembers, 10) < 1) next.familyMembers = 'Number of family members must be at least 1.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const vehicles = form.vehicles ? form.vehicles.split(',').map((v) => v.trim()).filter(Boolean) : []
    const result = registerResident({ ...form, vehicles })
    if (!result.success) {
      setErrors({ residentCode: result.error })
      return
    }
    if (result.needsApproval) {
      navigate('/pending-approval', { replace: true })
    } else {
      navigate('/profile-setup', { replace: true })
    }
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 md:p-8 py-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-soft p-8 md:p-10">
          <h1 className="text-2xl font-semibold text-ink mb-2">Resident registration</h1>
          <p className="text-slate-500 text-sm mb-8">Create your resident account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Organization Code</label>
              <input
                type="text"
                value={form.orgCode}
                onChange={update('orgCode')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="Enter code from your community"
              />
              {errors.orgCode && <p className="mt-1.5 text-sm text-red-600">{errors.orgCode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Resident Code (optional)</label>
              <input
                type="text"
                value={form.residentCode}
                onChange={update('residentCode')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="e.g. RC-ABC123 — leave blank if new family"
              />
              {errors.residentCode && <p className="mt-1.5 text-sm text-red-600">{errors.residentCode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={update('fullName')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="Jane Doe"
              />
              {errors.fullName && <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="admin@sunriseheights.com"
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="+91 1234567890"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Block</label>
                <input
                  type="text"
                  value={form.block}
                  onChange={update('block')}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                  placeholder="A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Floor</label>
                <input
                  type="text"
                  value={form.floor}
                  onChange={update('floor')}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Flat No.</label>
                <input
                  type="text"
                  value={form.flatNumber}
                  onChange={update('flatNumber')}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                  placeholder="101"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Number of family members</label>
              <input
                type="number"
                min="1"
                value={form.familyMembers}
                onChange={update('familyMembers')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink"
              />
              {errors.familyMembers && <p className="mt-1.5 text-sm text-red-600">{errors.familyMembers}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Vehicle registration numbers (comma-separated)</label>
              <input
                type="text"
                value={form.vehicles}
                onChange={update('vehicles')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="MH 12 AB 1234, MH 12 CD 5678"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Register as resident
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark focus:outline-none focus:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
