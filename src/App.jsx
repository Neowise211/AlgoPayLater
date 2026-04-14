import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DifficultySelectPage from './pages/DifficultySelectPage'
import CaseBriefingPage from './pages/CaseBriefingPage'
import InvestigationPage from './pages/InvestigationPage'
import VerdictPage from './pages/VerdictPage'
import ScoreBreakdownPage from './pages/ScoreBreakdownPage'
import LeaderboardPage from './pages/LeaderboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                        element={<HomePage />} />
        <Route path="/difficulty"              element={<DifficultySelectPage />} />
        <Route path="/briefing/:caseId"        element={<CaseBriefingPage />} />
        <Route path="/investigate/:caseId"     element={<InvestigationPage />} />
        <Route path="/verdict/:caseId"         element={<VerdictPage />} />
        <Route path="/score/:caseId"           element={<ScoreBreakdownPage />} />
        <Route path="/leaderboard"             element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
