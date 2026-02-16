import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')

  const validate = () => {
    const next = {}
    if (!EMAIL_REGEX.test(email)) next.email = 'Please enter a valid email.'
    if (password.length < MIN_PASSWORD_LENGTH)
      next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginError('')
    if (!validate()) return

    const success = login(email, password)
    if (success) {
      navigate('/dashboard', { replace: true })
    } else {
      setLoginError(
        'No account found. Use demo accounts or register first.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* LEFT: Enterprise Info */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 bg-surface">
          <h1 className="text-4xl font-bold text-ink mb-4">
            Residential Community Management System
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-xl">
            A unified platform to manage residents, complaints, and community
            collaboration — designed for modern apartments and gated societies.
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-xl">
            <Feature title="Smart Complaints">
              Track, assign, and resolve household and vehicle complaints.
            </Feature>
            <Feature title="Role-Based Dashboards">
              Separate views for Residents, Technicians, and Admins.
            </Feature>
            <Feature title="Skill & Mentor Network">
              Connect residents through skills, learning, and mentorship.
            </Feature>
            <Feature title="Approval-Based Access">
              Secure onboarding with admin-controlled approvals.
            </Feature>
          </div>
        </div>

        {/* RIGHT: Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-10">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-xl shadow-soft p-8 md:p-10">
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Welcome back
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Sign in to your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="admin@sunriseheights.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {loginError && (
                  <p className="text-sm text-amber-600">
                    {loginError} <br />
                    <span className="text-xs">
                      Demo: admin@sunriseheights.com, tech@sunriseheights.com,
                      resident@sunriseheights.com
                    </span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-8 pt-6 space-y-3 text-center text-sm">
                <Link
                  to="/register-user"
                  className="text-primary hover:text-primary-dark"
                >
                  Create resident / staff account
                </Link>
                <br />
                <Link
                  to="/register-org"
                  className="text-primary hover:text-primary-dark"
                >
                  Register your community (Admin)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Residential Community Management System ·
        Support: support@residentialcommunity.com · +91-1234567890
      </footer>
    </div>
  )
}

/* Small reusable feature block */
function Feature({ title, children }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="font-semibold text-ink mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  )
}
