import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import PauseMenu from './components/PauseMenu'
import ErrorBoundary from './components/ErrorBoundary'
import Preloader from './screens/Preloader'
import Start from './screens/Start'
import Guess from './screens/Guess'
import Unlocked from './screens/Unlocked'
import About from './screens/About'
import Skills from './screens/Skills'
import Achievements from './screens/Achievements'
import WorldMap from './screens/WorldMap'
import ProjectDetail from './screens/ProjectDetail'
import Contact from './screens/Contact'
import NotFound from './screens/NotFound'
import ScrollToTop from './components/ScrollToTop'
import { useGameStore } from './hooks/useGameStore'
import { useAudio } from './hooks/useAudio'

function App() {
  const { initializeGame } = useGameStore()
  useAudio() // Initialize audio on first user interaction

  // Initialize game state on app load
  React.useEffect(() => {
    initializeGame()
  }, [initializeGame])

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <TopBar />

      <ScrollToTop />

      <main id="main-content" className="flex-1 w-full">
        <ErrorBoundary>
          <Routes>
            <Route path="/preloader" element={<Preloader />} />
            <Route path="/" element={<Start />} />
            <Route path="/guess" element={<Guess />} />
            <Route path="/unlocked" element={<Unlocked />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/world" element={<WorldMap />} />
            <Route path="/map" element={<Navigate to="/world" replace />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <PauseMenu />
    </div>
  )
}

export default App