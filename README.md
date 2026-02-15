# Residential Community – Frontend

A React frontend for a Residential Community Web Application. **Frontend only** – no backend, APIs, database, or any persistence. All data lives in component state; refreshing the page resets everything.

## Tech stack

- **React** (functional components + hooks)
- **React Router**
- **Tailwind CSS**
- **Vite**

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown (e.g. `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Features

- **Auth (UI only):** Login, Organization Registration, User (Resident/Staff) Registration. Client-side validation; successful login → dashboard. No persistence.
- **Dashboard:** Header (greeting, mock user/community/role), sidebar (Smart Complaints, Skill Connection, AI Chatbot), default News/Announcements carousel, footer.
- **Smart Complaints:** Household complaint (text + image upload UI) and Vehicle complaint (vehicle number + image + notes). Submit only logs to console.
- **Skill Connection:** Peer Match (select skill, mock user cards) and Mentor–Learner Match (role + skill, mock profiles).
- **AI Chatbot:** Chat UI with mock bot replies; user messages on right, bot on left.

## Folder structure

```
src/
  components/
    layout/       Header, Sidebar, Footer
    dashboard/    NewsCarousel
    features/
      SmartComplaints/   SmartComplaints, HouseholdComplaint, VehicleComplaint
      SkillConnection/   SkillConnection, PeerMatch, MentorLearnerMatch
      AIChatbot/         AIChatbot
  context/       AuthContext (in-memory auth state)
  pages/          Login, OrgRegister, UserRegister, Dashboard
  App.jsx
  main.jsx
  index.css
```

## Design

- **Primary:** Indigo/blue
- **Background:** Light gray
- **Cards:** White
- **Accent:** Soft green
- Minimal, responsive dashboard-style UI
