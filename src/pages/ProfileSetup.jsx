import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { INTEREST_DOMAINS } from '../constants/domains'

/**
 * Parses "React L-4, Python L-5" into ["React L-4", "Python L-5"].
 */
function parseSkillsText(text) {
  if (!text?.trim()) return []
  return text.split(',').map((s) => s.trim()).filter(Boolean)
}

/**
 * Builds list of mentor skill options from base profile: { domain, skillLabel }[].
 */
function getMentorSkillOptions(domainSkills) {
  const options = []
  Object.entries(domainSkills).forEach(([domain, skillsText]) => {
    parseSkillsText(skillsText).forEach((skill) => {
      options.push({ key: `${domain}::${skill}`, domain, skill })
    })
  })
  return options
}

/**
 * Skill Profile Setup – mandatory after registration. State only; no persistence.
 * On submit → navigate to Dashboard.
 */
export default function ProfileSetup() {
  const navigate = useNavigate()
  const { pendingUser, completeProfileSetup } = useAuth()
  const [basicInfo, setBasicInfo] = useState({ username: '', occupation: '', about: '' })
  const [selectedDomains, setSelectedDomains] = useState([])
  const [domainSkills, setDomainSkills] = useState({})
  const [openToMentor, setOpenToMentor] = useState(false)
  const [mentorSelected, setMentorSelected] = useState([])
  const [openToLearn, setOpenToLearn] = useState(false)
  const [learnerDomains, setLearnerDomains] = useState([])
  const [learnerSkills, setLearnerSkills] = useState('')
  const [learnerProficiency, setLearnerProficiency] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!pendingUser) navigate('/register-user', { replace: true })
  }, [pendingUser, navigate])

  const toggleDomain = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    )
    if (!selectedDomains.includes(domain)) setDomainSkills((s) => ({ ...s, [domain]: '' }))
  }

  const setSkillsForDomain = (domain, value) => {
    setDomainSkills((s) => ({ ...s, [domain]: value }))
  }

  const mentorOptions = useMemo(() => getMentorSkillOptions(domainSkills), [domainSkills])
  const toggleMentorSkill = (key) => {
    setMentorSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const toggleLearnerDomain = (d) => {
    setLearnerDomains((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))
  }

  const validate = () => {
    const next = {}
    if (!basicInfo.username.trim()) next.username = 'Username is required.'
    if (selectedDomains.length === 0) next.domains = 'Select at least one interest domain.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  if (!pendingUser) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const baseDomainsWithSkills = selectedDomains.map((d) => ({
      domain: d,
      skillsText: domainSkills[d] || '',
    }))
    const profileData = {
      basicInfo: { ...basicInfo },
      domainsWithSkills: baseDomainsWithSkills,
      openToMentor,
      mentorSkills: mentorSelected,
      openToLearn,
      learnerProfile: openToLearn
        ? {
            domains: learnerDomains,
            skillsText: learnerSkills,
            proficiencyExpectation: learnerProficiency,
          }
        : null,
    }
    completeProfileSetup(profileData)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface py-8 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl shadow-soft p-6 md:p-10">
          <h1 className="text-2xl font-semibold text-ink mb-2">Skill Profile Setup</h1>
          <p className="text-slate-500 text-sm mb-8">Complete your profile to access the dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Profile */}
            <section>
              <h2 className="text-lg font-medium text-ink mb-4">Basic Profile</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Username</label>
                  <input
                    type="text"
                    value={basicInfo.username}
                    onChange={(e) => setBasicInfo((b) => ({ ...b, username: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                    placeholder="e.g. jane_doe"
                  />
                  {errors.username && <p className="mt-1.5 text-sm text-red-600">{errors.username}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Occupation</label>
                  <input
                    type="text"
                    value={basicInfo.occupation}
                    onChange={(e) => setBasicInfo((b) => ({ ...b, occupation: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">About (short bio)</label>
                  <textarea
                    value={basicInfo.about}
                    onChange={(e) => setBasicInfo((b) => ({ ...b, about: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none text-ink placeholder:text-slate-400"
                    placeholder="A short bio, similar to Instagram..."
                  />
                </div>
              </div>
            </section>

            {/* Interest Domains & Skills */}
            <section>
              <h2 className="text-lg font-medium text-ink mb-2">Interest Domains & Skills</h2>
              <p className="text-sm text-slate-500 mb-4">Select one or more domains. For each, add skills (e.g. React L-4, Python L-5).</p>
              {errors.domains && <p className="text-sm text-red-600 mb-2">{errors.domains}</p>}
              <div className="space-y-3">
                {INTEREST_DOMAINS.map((domain) => (
                  <div key={domain} className="border border-slate-200 rounded-lg p-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDomains.includes(domain)}
                        onChange={() => toggleDomain(domain)}
                        className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                      />
                      <span className="text-sm font-medium text-ink">{domain}</span>
                    </label>
                    {selectedDomains.includes(domain) && (
                      <input
                        type="text"
                        value={domainSkills[domain] || ''}
                        onChange={(e) => setSkillsForDomain(domain, e.target.value)}
                        className="mt-3 w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                        placeholder="e.g. React L-4, Python L-5"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Mentor / Learner */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium text-ink">Mentor / Learner Preferences</h2>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openToMentor}
                    onChange={(e) => setOpenToMentor(e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <span className="font-medium text-ink">Open to Mentor</span>
                </label>
                {openToMentor && mentorOptions.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {mentorOptions.map(({ key, skill }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mentorSelected.includes(key)}
                          onChange={() => toggleMentorSkill(key)}
                          className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                        />
                        <span className="text-sm text-slate-600">{skill}</span>
                      </label>
                    ))}
                  </div>
                )}
                {openToMentor && mentorOptions.length === 0 && (
                  <p className="mt-2 text-sm text-slate-500">Add skills in your interest domains above to select mentoring skills.</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openToLearn}
                    onChange={(e) => setOpenToLearn(e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <span className="font-medium text-ink">Open to Learn</span>
                </label>
                {openToLearn && (
                  <div className="mt-4 p-5 bg-surface rounded-lg space-y-4">
                    <p className="text-sm font-medium text-ink">Learner profile</p>
                    <div>
                      <span className="block text-sm text-slate-600 mb-2">Learning domains</span>
                      <div className="flex flex-wrap gap-3">
                        {INTEREST_DOMAINS.map((d) => (
                          <label key={d} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={learnerDomains.includes(d)}
                              onChange={() => toggleLearnerDomain(d)}
                              className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                            />
                            <span className="text-sm text-ink">{d}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">Skills / topics to learn (comma-separated)</label>
                      <input
                        type="text"
                        value={learnerSkills}
                        onChange={(e) => setLearnerSkills(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                        placeholder="e.g. React L-2, System Design L-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-2">Proficiency expectation (optional)</label>
                      <input
                        type="text"
                        value={learnerProficiency}
                        onChange={(e) => setLearnerProficiency(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none text-ink placeholder:text-slate-400"
                        placeholder="e.g. Beginner, L-1 to L-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Complete & go to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
