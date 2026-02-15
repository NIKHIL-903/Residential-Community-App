import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

/**
 * Organization/Community registration – UI only.
 * On submit: redirect to login. No persistence.
 */
export default function OrgRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    communityName: '',
    adminName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.communityName.trim()) next.communityName = 'Community name is required.'
    if (!form.adminName.trim()) next.adminName = 'Admin name is required.'
    if (!EMAIL_REGEX.test(form.email)) next.email = 'Please enter a valid email.'
    if (form.password.length < MIN_PASSWORD_LENGTH) next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    navigate('/login', { replace: true })
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-soft p-8 md:p-10">
          <h1 className="text-2xl font-semibold text-ink mb-2">Register your community</h1>
          <p className="text-slate-500 text-sm mb-8">Create your organization (Admin)</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Community / Organization Name
              </label>
              <input
                type="text"
                value={form.communityName}
                onChange={update('communityName')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="e.g. Sunrise Heights"
              />
              {errors.communityName && <p className="mt-1.5 text-sm text-red-600">{errors.communityName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Admin Full Name</label>
              <input
                type="text"
                value={form.adminName}
                onChange={update('adminName')}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="John Doe"
              />
              {errors.adminName && <p className="mt-1.5 text-sm text-red-600">{errors.adminName}</p>}
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

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Create community
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
