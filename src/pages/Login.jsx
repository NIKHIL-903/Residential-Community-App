import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

/**
 * Login page – client-side validation only.
 * On success: navigate to dashboard. No persistence.
 */
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
    if (password.length < MIN_PASSWORD_LENGTH) next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
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
      setLoginError('No account found. Use Admin/Technician demo emails or register as resident first.')
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-soft p-8 md:p-10">
          <h1 className="text-2xl font-semibold text-ink mb-2">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your  account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="admin@sunriseheights.com"
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-ink placeholder:text-slate-400"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
            </div>
            {loginError && (
              <p className="text-sm text-amber-600">{loginError} Demo: admin@sunriseheights.com (Admin), tech@sunriseheights.com (Technician), resident@sunriseheights.com (Resident).</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 pt-6 space-y-3 text-center text-sm text-slate-600">
            <p>
              <Link to="/register-user" className="text-primary hover:text-primary-dark focus:outline-none focus:underline">
                Create resident / staff account
              </Link>
            </p>
            <p>
              <Link to="/register-org" className="text-primary hover:text-primary-dark focus:outline-none focus:underline">
                Register your community (Admin)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
