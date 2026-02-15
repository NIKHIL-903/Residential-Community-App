import { createContext, useContext, useState } from 'react'

/**
 * Auth context – in-memory only. No persistence.
 * Refreshing the page resets isLoggedIn, user, profile, and pendingUser.
 * After user registration we set pendingUser and user must complete profile-setup before dashboard.
 */
const AuthContext = createContext(null)

const emptyUser = { name: '', email: '', role: '', communityName: '' }

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(emptyUser)
  // Set when user submits registration; cleared when they complete profile-setup. Used to "log them in" after setup.
  const [pendingUser, setPendingUser] = useState(null)
  // Skill profile – set when profile-setup is submitted. Read-only in Profile View.
  const [profile, setProfile] = useState(null)

  const login = (email, _password) => {
    setIsLoggedIn(true)
    setUser((prev) => ({ ...prev, ...emptyUser, email, name: email.split('@')[0] || 'User', communityName: 'Sunrise Heights', role: 'Resident' }))
  }

  /** Call after user registration – stores pending user; caller should navigate to /profile-setup. */
  const register = (formData) => {
    setPendingUser({
      name: formData.fullName,
      email: formData.email,
      role: formData.role,
      communityName: formData.orgCode || 'Community',
    })
  }

  /** Call after profile-setup submit – logs in with pendingUser and stores profile. Caller should navigate to /dashboard. */
  const completeProfileSetup = (profileData) => {
    if (pendingUser) {
      setUser(pendingUser)
      setPendingUser(null)
    }
    setProfile(profileData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(emptyUser)
    setPendingUser(null)
    setProfile(null)
  }

  const value = {
    isLoggedIn,
    user,
    pendingUser,
    profile,
    login,
    logout,
    register,
    completeProfileSetup,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
