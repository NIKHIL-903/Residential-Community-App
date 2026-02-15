import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * Two profiles: General (name, email, phone, block/flat, role, Resident Code, family, vehicles) and Skill (bio, domains, mentor/learner).
 * Read-only. Tabs to switch.
 */
export default function ProfileView() {
  const { user, profile } = useAuth()
  const [tab, setTab] = useState('general')

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold text-ink">My Profile</h1>

      <div className="flex gap-2 p-2 bg-surface rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setTab('general')}
          className={`px-5 py-3 rounded-md text-base font-medium transition-colors ${
            tab === 'general' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-card'
          }`}
        >
          General Profile
        </button>
        <button
          type="button"
          onClick={() => setTab('skill')}
          className={`px-5 py-3 rounded-md text-base font-medium transition-colors ${
            tab === 'skill' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-card'
          }`}
        >
          Skill Profile
        </button>
      </div>

      {tab === 'general' && (
        <div className="bg-card rounded-xl shadow-soft p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-base font-medium text-slate-500 uppercase tracking-wide mb-4">General info</h2>
            <div className="space-y-4 text-ink text-base">
              <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Name</span> {user?.name || '—'}</p>
              <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Email</span> {user?.email || '—'}</p>
              <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Phone</span> {user?.phone || '—'}</p>
              <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Block / Floor / Flat</span> {[user?.block, user?.floor, user?.flatNumber].filter(Boolean).join(' / ') || '—'}</p>
              <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Role</span> {user?.role || '—'}</p>
              {user?.residentCode && (
                <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Resident Code</span> <span className="font-mono">{user.residentCode}</span></p>
              )}
              {(user?.familyMembers != null && user?.familyMembers !== '') && (
                <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Family size</span> {user.familyMembers}</p>
              )}
              {user?.vehicles?.length > 0 && (
                <p className="leading-relaxed"><span className="text-slate-500 block text-sm mb-0.5">Vehicle numbers</span> {Array.isArray(user.vehicles) ? user.vehicles.join(', ') : user.vehicles}</p>
              )}
            </div>
          </section>
        </div>
      )}

      {tab === 'skill' && (
        <div className="bg-card rounded-xl shadow-soft p-8 md:p-10">
          {!profile ? (
            <p className="text-slate-500 text-base leading-relaxed">No skill profile data yet. Complete Skill Profile Setup after registration to see it here.</p>
          ) : (
            <SkillProfileContent profile={profile} />
          )}
        </div>
      )}
    </div>
  )
}

function SkillProfileContent({ profile }) {
  const { basicInfo, domainsWithSkills, openToMentor, mentorSkills, openToLearn, learnerProfile } = profile

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-base font-medium text-slate-500 uppercase tracking-wide mb-4">Basic (skill)</h2>
        <div className="space-y-4 text-ink text-base leading-relaxed">
          <p><span className="text-slate-500 block text-sm mb-0.5">Username</span> {basicInfo?.username || '—'}</p>
          <p><span className="text-slate-500 block text-sm mb-0.5">Occupation</span> {basicInfo?.occupation || '—'}</p>
          {basicInfo?.about && <p><span className="text-slate-500 block text-sm mb-0.5">Bio</span> {basicInfo.about}</p>}
          {profile?.achievements && <p><span className="text-slate-500 block text-sm mb-0.5">Achievements</span> {profile.achievements}</p>}
        </div>
      </section>

      <section>
        <h2 className="text-base font-medium text-slate-500 uppercase tracking-wide mb-4">Interest domains & skills</h2>
        <ul className="space-y-3 text-base leading-relaxed">
          {domainsWithSkills?.map(({ domain, skillsText }) => (
            <li key={domain} className="flex flex-wrap gap-x-2">
              <span className="font-medium text-ink">{domain}:</span>
              <span className="text-slate-600">{skillsText || '—'}</span>
            </li>
          ))}
          {(!domainsWithSkills || domainsWithSkills.length === 0) && <li className="text-slate-500">None</li>}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-medium text-slate-500 uppercase tracking-wide mb-4">Mentor</h2>
        <p className="text-ink text-base">{openToMentor ? 'Open to mentor' : 'Not open to mentor'}</p>
        {openToMentor && mentorSkills?.length > 0 && (
          <p className="mt-2 text-slate-600 text-base leading-relaxed">
            Mentoring skills: {mentorSkills.map((k) => k.split('::')[1]).join(', ')}
          </p>
        )}
      </section>

      <section>
        <h2 className="text-base font-medium text-slate-500 uppercase tracking-wide mb-4">Learner profile</h2>
        {!openToLearn || !learnerProfile ? (
          <p className="text-slate-500 text-base">Not open to learn / no learner profile</p>
        ) : (
          <div className="space-y-4 text-ink text-base leading-relaxed">
            <p><span className="text-slate-500 block text-sm mb-0.5">Learning domains</span> {learnerProfile.domains?.join(', ') || '—'}</p>
            <p><span className="text-slate-500 block text-sm mb-0.5">Skills to learn</span> {learnerProfile.skillsText || '—'}</p>
            {learnerProfile.proficiencyExpectation && (
              <p><span className="text-slate-500 block text-sm mb-0.5">Proficiency expectation</span> {learnerProfile.proficiencyExpectation}</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
