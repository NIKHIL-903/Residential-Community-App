import { useAuth } from '../context/AuthContext'

/**
 * Read-only profile view: basic info, interest domains & skills,
 * mentor status & mentoring skills (if any), learner profile (if any).
 * No persistence – data from context state only.
 */
export default function ProfileView() {
  const { user, profile } = useAuth()

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl shadow-soft p-6 md:p-8">
          <h1 className="text-xl font-semibold text-ink mb-2">My Profile</h1>
          <p className="text-slate-500">No profile data yet. Complete Skill Profile Setup after registration to see your profile here.</p>
        </div>
      </div>
    )
  }

  const { basicInfo, domainsWithSkills, openToMentor, mentorSkills, openToLearn, learnerProfile } = profile

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-ink">My Profile</h1>

      <div className="bg-card rounded-xl shadow-soft p-6 md:p-8 space-y-8">
        {/* Basic info */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">Basic info</h2>
          <div className="space-y-2 text-ink">
            <p><span className="text-slate-500">Name</span> {user?.name}</p>
            <p><span className="text-slate-500">Username</span> {basicInfo?.username || '—'}</p>
            <p><span className="text-slate-500">Occupation</span> {basicInfo?.occupation || '—'}</p>
            {basicInfo?.about && <p><span className="text-slate-500">About</span> {basicInfo.about}</p>}
          </div>
        </section>

        {/* Interest domains & skills */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">Interest domains & skills</h2>
          <ul className="space-y-2">
            {domainsWithSkills?.map(({ domain, skillsText }) => (
              <li key={domain} className="flex flex-wrap gap-x-2">
                <span className="font-medium text-ink">{domain}:</span>
                <span className="text-slate-600">{skillsText || '—'}</span>
              </li>
            ))}
            {(!domainsWithSkills || domainsWithSkills.length === 0) && <li className="text-slate-500">None</li>}
          </ul>
        </section>

        {/* Mentor */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">Mentor</h2>
          <p className="text-ink">{openToMentor ? 'Open to mentor' : 'Not open to mentor'}</p>
          {openToMentor && mentorSkills?.length > 0 && (
            <p className="mt-1.5 text-slate-600">
              Mentoring skills: {mentorSkills.map((k) => k.split('::')[1]).join(', ')}
            </p>
          )}
        </section>

        {/* Learner profile */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">Learner profile</h2>
          {!openToLearn || !learnerProfile ? (
            <p className="text-slate-500">Not open to learn / no learner profile</p>
          ) : (
            <div className="space-y-2 text-ink">
              <p><span className="text-slate-500">Learning domains</span> {learnerProfile.domains?.join(', ') || '—'}</p>
              <p><span className="text-slate-500">Skills to learn</span> {learnerProfile.skillsText || '—'}</p>
              {learnerProfile.proficiencyExpectation && (
                <p><span className="text-slate-500">Proficiency expectation</span> {learnerProfile.proficiencyExpectation}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
