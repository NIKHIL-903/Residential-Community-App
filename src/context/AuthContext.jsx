import { createContext, useContext, useState, useCallback } from 'react'

/**
 * Auth + app state – in-memory only. No persistence.
 * Supports: Resident (with/without Resident Code), Technician, Admin.
 * Pending resident approvals, Resident Code generation, complaints list.
 */

const ROLES = { RESIDENT: 'Resident', TECHNICIAN: 'Technician', ADMIN: 'Admin' }

/** Demo login: these emails get fixed roles (no registration). */
const DEMO_ROLE_EMAILS = {
  'admin@sunriseheights.com': ROLES.ADMIN,
  'tech@sunriseheights.com': ROLES.TECHNICIAN,
  'resident@sunriseheights.com': ROLES.RESIDENT,
}

const emptyUser = {
  name: '',
  email: '',
  role: '',
  communityName: 'Sunrise Heights',
  residentCode: null,
  phone: '',
  block: '',
  floor: '',
  flatNumber: '',
  familyMembers: '',
  vehicles: [],
}

const AuthContext = createContext(null)

function generateResidentCode() {
  return 'RC-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(emptyUser)
  const [pendingUser, setPendingUser] = useState(null)
  const [pendingApprovalUser, setPendingApprovalUser] = useState(null)
  const [profile, setProfile] = useState(null)

  // Pending resident registrations (no Resident Code) – Admin approves/rejects
  const [pendingRegistrations, setPendingRegistrations] = useState([])
  // After approval: email -> { residentCode, familyMembersCount }
  const [approvedRegistrations, setApprovedRegistrations] = useState({})
  // residentCode -> familyMembersCount (max accounts for this code)
  const [residentCodes, setResidentCodes] = useState({})
  // residentCode -> current usage count
  const [codeUsageCount, setCodeUsageCount] = useState({})

  // Complaints (UI-only). Status: Pending | In Progress | Resolved
  const [complaints, setComplaints] = useState([])
  // Last approved resident (so Admin can see the generated code to share)
  const [lastApproved, setLastApproved] = useState(null)

  const login = useCallback((email, _password) => {
    const role = DEMO_ROLE_EMAILS[email]
    if (role === ROLES.ADMIN) {
      setUser({
        ...emptyUser,
        email,
        name: 'Admin',
        role: ROLES.ADMIN,
        communityName: 'Sunrise Heights',
      })
      setIsLoggedIn(true)
      return true
    }
    if (role === ROLES.TECHNICIAN) {
      setUser({
        ...emptyUser,
        email,
        name: 'Technician',
        role: ROLES.TECHNICIAN,
        communityName: 'Sunrise Heights',
      })
      setIsLoggedIn(true)
      return true
    }
    if (role === ROLES.RESIDENT) {
      setUser({
        ...emptyUser,
        email,
        name: 'Demo Resident',
        role: ROLES.RESIDENT,
        communityName: 'Sunrise Heights',
        residentCode: 'RC-DEMO01',
        phone: '+91 1234567890',
        block: 'A',
        floor: '2',
        flatNumber: '101',
        familyMembers: '3',
        vehicles: ['MH 12 AB 1234'],
      })
      setProfile({
        basicInfo: { username: 'demoresident', occupation: 'Software Engineer', about: 'Demo resident account for testing.', achievements: '' },
        domainsWithSkills: [{ domain: 'Technology & Digital', skillsText: 'React L-4, JavaScript L-5' }],
        openToMentor: true,
        mentorSkills: ['Technology & Digital::React L-4'],
        openToLearn: false,
        learnerProfile: null,
      })
      setIsLoggedIn(true)
      return true
    }
    return false
  }, [])

  /** Resident registration WITH valid Resident Code → go to profile-setup. */
  const registerWithResidentCode = useCallback((formData, residentCode) => {
    setPendingUser({
      name: formData.fullName,
      email: formData.email,
      role: ROLES.RESIDENT,
      communityName: 'Sunrise Heights',
      residentCode,
      phone: formData.phone || '',
      block: formData.block || '',
      floor: formData.floor || '',
      flatNumber: formData.flatNumber || '',
      familyMembers: formData.familyMembers || '',
      vehicles: formData.vehicles || [],
    })
    setPendingApprovalUser(null)
    return true
  }, [])

  /** Resident registration WITHOUT Resident Code → add to pending, show pending-approval page. */
  const registerWithoutResidentCode = useCallback((formData) => {
    const id = Date.now().toString()
    const vehicles = typeof formData.vehicles === 'string'
      ? formData.vehicles.split(',').map((v) => v.trim()).filter(Boolean)
      : (formData.vehicles || [])
    setPendingRegistrations((prev) => [
      ...prev,
      {
        id,
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone || '',
        block: formData.block || '',
        floor: formData.floor || '',
        flatNumber: formData.flatNumber || '',
        familyMembers: formData.familyMembers || '',
        vehicles,
      },
    ])
    setPendingApprovalUser({
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      block: formData.block,
      floor: formData.floor,
      flatNumber: formData.flatNumber,
      familyMembers: formData.familyMembers,
      vehicles,
    })
    setPendingUser(null)
    return false
  }, [])

  /**
   * Validate Resident Code (frontend-only): code must exist and usage < familyMembersCount.
   * Returns { valid: boolean, error?: string }.
   */
  const validateResidentCode = useCallback((code) => {
    if (!code || !code.trim()) return { valid: false, error: 'Code is required when provided.' }
    const trimmed = code.trim().toUpperCase()
    const meta = residentCodes[trimmed]
    if (!meta) return { valid: false, error: 'Invalid or expired Resident Code.' }
    const used = codeUsageCount[trimmed] || 0
    if (used >= meta.familyMembersCount) return { valid: false, error: 'This Resident Code has reached maximum family members.' }
    return { valid: true }
  }, [residentCodes, codeUsageCount])

  /**
   * Register resident. If valid Resident Code: go to profile-setup. Else: add to pending, go to pending-approval.
   */
  const registerResident = useCallback((formData) => {
    const residentCodeInput = (formData.residentCode || '').trim().toUpperCase()
    if (residentCodeInput) {
      const { valid, error } = validateResidentCode(residentCodeInput)
      if (!valid) return { success: false, error }
      registerWithResidentCode(formData, residentCodeInput)
      setCodeUsageCount((prev) => ({ ...prev, [residentCodeInput]: (prev[residentCodeInput] || 0) + 1 }))
      return { success: true, needsApproval: false }
    }
    registerWithoutResidentCode(formData)
    return { success: true, needsApproval: true }
  }, [validateResidentCode, registerWithResidentCode, registerWithoutResidentCode])

  /** Admin approves a pending registration: generate Resident Code, move to approved. */
  const approveResident = useCallback((registrationId) => {
    const reg = pendingRegistrations.find((r) => r.id === registrationId)
    if (!reg) return
    const code = generateResidentCode()
    const familyMembersCount = Math.max(1, parseInt(reg.familyMembers, 10) || 1)
    setResidentCodes((prev) => ({ ...prev, [code]: { familyMembersCount } }))
    setCodeUsageCount((prev) => ({ ...prev, [code]: 1 }))
    setApprovedRegistrations((prev) => ({ ...prev, [reg.email]: { residentCode: code, familyMembersCount } }))
    setPendingRegistrations((prev) => prev.filter((r) => r.id !== registrationId))
    setLastApproved({ email: reg.email, residentCode: code })
  }, [pendingRegistrations])

  const rejectResident = useCallback((registrationId) => {
    setPendingRegistrations((prev) => prev.filter((r) => r.id !== registrationId))
  }, [])

  /** Resident on pending-approval page checks status. If approved, set pendingUser and return true. */
  const checkApprovalStatus = useCallback((email) => {
    const approved = approvedRegistrations[email]
    if (!approved) return false
    setPendingUser({
      name: pendingApprovalUser?.fullName || email,
      email,
      role: ROLES.RESIDENT,
      communityName: 'Sunrise Heights',
      residentCode: approved.residentCode,
      phone: pendingApprovalUser?.phone || '',
      block: pendingApprovalUser?.block || '',
      floor: pendingApprovalUser?.floor || '',
      flatNumber: pendingApprovalUser?.flatNumber || '',
      familyMembers: pendingApprovalUser?.familyMembers || '',
      vehicles: pendingApprovalUser?.vehicles || [],
    })
    setPendingApprovalUser(null)
    return true
  }, [approvedRegistrations, pendingApprovalUser])

  const completeProfileSetup = useCallback((profileData) => {
    if (pendingUser) {
      setUser({ ...pendingUser })
      setPendingUser(null)
    }
    setProfile(profileData)
    setIsLoggedIn(true)
  }, [pendingUser])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUser(emptyUser)
    setPendingUser(null)
    setPendingApprovalUser(null)
    setProfile(null)
  }, [])

  const addComplaint = useCallback((complaint) => {
    const id = 'c-' + Date.now()
    setComplaints((prev) => [
      ...prev,
      {
        id,
        type: complaint.type,
        description: complaint.description,
        photoNames: complaint.photoNames || [],
        residentName: user?.name || '',
        residentPhone: user?.phone || '',
        block: user?.block || '',
        floor: user?.floor || '',
        flat: user?.flatNumber || '',
        status: 'Pending',
      },
    ])
  }, [user])

  const updateComplaintStatus = useCallback((complaintId, status) => {
    setComplaints((prev) => prev.map((c) => (c.id === complaintId ? { ...c, status } : c)))
  }, [])

  const value = {
    isLoggedIn,
    user,
    pendingUser,
    pendingApprovalUser,
    profile,
    pendingRegistrations,
    approvedRegistrations,
    lastApproved,
    complaints,
    login,
    logout,
    registerResident,
    validateResidentCode,
    checkApprovalStatus,
    approveResident,
    rejectResident,
    completeProfileSetup,
    addComplaint,
    updateComplaintStatus,
    ROLES,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
