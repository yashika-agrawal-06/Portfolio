import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import { achievements, getAchievementsByType, getFeaturedAchievements, getTierOrder, getTypes } from '../content/achievements'
import FooterNavigation from '../components/FooterNavigation'

const Achievements = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, visitedScreens, markScreenVisited } = useGameStore()
  const { playClick, playSuccess } = useAudio()
  const [activeType, setActiveType] = useState('All')
  const [showContent, setShowContent] = useState(false)
  const [earnedAchievements, setEarnedAchievements] = useState(new Set())

  const handleTypeChange = (type) => {
    playClick()
    setActiveType(type)
  }

  const handleAchievementClick = (achievement) => {
    if (!earnedAchievements.has(achievement.id)) {
      playSuccess()
      setEarnedAchievements(prev => new Set([...prev, achievement.id]))
      addCoins(10)
    }
  }

  const types = ['All', ...getTypes()]

  useEffect(() => {
    setCurrentScreen('achievements')
    // Award coins only on first visit to achievements screen
    if (!visitedScreens.achievements) {
      markScreenVisited('achievements')
    }
    setShowContent(true)
  }, [setCurrentScreen, markScreenVisited, visitedScreens])

  const filteredAchievements = activeType === 'All'
    ? achievements
    : getAchievementsByType(activeType)

  const tierOrder = { gold: 0, silver: 1, bronze: 2 }
  const sortedAchievements = [...filteredAchievements].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier])

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-start items-center pt-8">
        <div className="w-full relative">
          {/* Background Scenery */}
          <div className="absolute inset-0 select-none opacity-30 -z-10" aria-hidden="true">
            <div className="flex justify-between items-center px-4 md:px-12 pt-2 pb-6">
              <div className="cloud-slow flex items-center">
                <svg className="pixelated" fill="none" height="42" viewBox="0 0 112 42" width="112">
                  <rect fill="#FFFFFF" height="12" width="48" x="24" y="0" />
                  <rect fill="#FFFFFF" height="12" width="76" x="12" y="12" />
                  <rect fill="#FFFFFF" height="12" width="104" x="0" y="24" />
                  <rect fill="#D8ECFD" height="6" width="96" x="8" y="36" />
                </svg>
              </div>
              <div className="hidden md:flex items-center">
                <svg className="pixelated" fill="none" height="34" viewBox="0 0 88 34" width="88">
                  <rect fill="#FFFFFF" height="10" width="36" x="20" y="0" />
                  <rect fill="#FFFFFF" height="10" width="60" x="8" y="10" />
                  <rect fill="#FFFFFF" height="10" width="80" x="0" y="20" />
                  <rect fill="#D8ECFD" height="4" width="74" x="6" y="30" />
                </svg>
              </div>
            </div>
          </div>

          {/* Achievements Content */}
          <div className="flex flex-col items-center px-2 md:px-6">
            {/* Header */}
            <div className="w-full max-w-5xl text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white border-3 border-[var(--border-dark)] shadow-xl px-6 py-3 rounded-xl">
                <span className="text-4xl" aria-hidden="true">🏆</span>
                <div className="text-left">
                  <h1 className="font-pixel text-xl text-[var(--text)]">TROPHY ROOM</h1>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)]">Achievements & Certifications</p>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4 flex-wrap">
                <PixelPanel variant="sm" className="px-4 py-2 text-center">
                  <div className="font-pixel text-xl text-[var(--gold)]">{earnedAchievements.size}</div>
                  <div className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">UNLOCKED</div>
                </PixelPanel>
                <PixelPanel variant="sm" className="px-4 py-2 text-center">
                  <div className="font-pixel text-xl text-[var(--grass)]">{achievements.length}</div>
                  <div className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">TOTAL TROPHIES</div>
                </PixelPanel>
              </div>
            </div>

            {/* Filter Tabs */}
            <PixelPanel variant="retro" className="w-full max-w-5xl mb-6 animate-slide-up">
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Achievement categories">
                {types.map((type) => (
                  <button
                    key={type}
                    role="tab"
                    aria-selected={activeType === type}
                    aria-controls={`panel-${type}`}
                    id={`tab-${type}`}
                    onClick={() => handleTypeChange(type)}
                    className={`px-4 py-2 rounded-lg font-pixel text-[10px] transition-all duration-200 ${
                      activeType === type
                        ? 'bg-[var(--gold)] text-[var(--border-dark)] border-2 border-[var(--border-dark)] shadow-[2px_2px_0px_var(--border-dark)]'
                        : 'bg-[var(--cream)] text-[var(--text)] border-2 border-[var(--border-dark)] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {type === 'certification' && '🏅 '}{type === 'project' && '🚀 '}{type === 'hackathon' && '🏆 '}{type === 'contribution' && '🔧 '}{type === 'special' && '✨ '}{type === 'All' && '🌟 '}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </PixelPanel>

            {/* Achievements Grid */}
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel" id={`panel-${activeType}`} aria-labelledby={`tab-${activeType}`}>
                {sortedAchievements.map((achievement, index) => {
                  const isEarned = earnedAchievements.has(achievement.id)
                  const tierColors = {
                    gold: { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700', glow: 'shadow-yellow-300' },
                    silver: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700', glow: 'shadow-gray-300' },
                    bronze: { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700', glow: 'shadow-amber-300' }
                  }
                  const colors = tierColors[achievement.tier]

                  return (
                    <div
                      key={achievement.id}
                      onClick={() => handleAchievementClick(achievement)}
                      className={`group relative pixel-box p-4 cursor-pointer transition-all duration-300 ${isEarned ? 'opacity-100' : 'opacity-70'} ${colors.bg} ${colors.border} border-2`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${achievement.title} - ${achievement.tier} tier - ${isEarned ? 'Earned' : 'Locked'}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAchievementClick(achievement) } }}
                    >
                      {/* Trophy Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-4xl filter drop-shadow-lg ${isEarned ? '' : 'grayscale'}`} aria-hidden="true">{achievement.icon}</span>
                          <div>
                            <div className={`font-pixel text-[9px] uppercase tracking-wider ${colors.text}`}>{achievement.tier.toUpperCase()}</div>
                            <div className="font-pixel text-[7px] text-[var(--text-muted)]">{achievement.type.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 border-[var(--border-dark)] flex items-center justify-center text-[10px] font-bold ${isEarned ? colors.bg : 'bg-[var(--cream)]'} ${colors.text}`} aria-hidden="true">
                          {isEarned ? '★' : '🔒'}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-pixel text-[10px] text-[var(--text)] mb-1 line-clamp-1 group-hover:text-[var(--sky)] transition-colors">{achievement.title}</h3>

                      {/* Description */}
                      <p className="font-[var(--font-body)] text-xs text-[var(--text-muted)] mb-3 line-clamp-2">{achievement.description}</p>

                      {/* Meta Info */}
                      <div className="space-y-1 text-[8px] font-pixel text-[var(--text-muted)] border-t border-[var(--border-dark)] pt-2">
                        <div className="flex justify-between">
                          <span>ISSUER</span>
                          <span className="font-[var(--font-body)] text-[var(--text)]">{achievement.issuer || achievement.event || achievement.repository || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DATE</span>
                          <span className="font-[var(--font-body)] text-[var(--text)]">{new Date(achievement.dateEarned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {/* Verification Badge */}
                      {achievement.verificationUrl && isEarned && (
                        <a
                          href={achievement.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 w-5 h-5 bg-[var(--grass)] text-white border border-[var(--border-dark)] rounded flex items-center justify-center text-[8px] font-bold hover:scale-110 transition-transform"
                          aria-label="Verify certification"
                        >
                          ✓
                        </a>
                      )}

                      {/* Locked Overlay */}
                      {!isEarned && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded border border-[var(--border-dark)]" aria-hidden="true">
                          <span className="font-pixel text-[9px] text-white bg-[var(--border-dark)]/90 px-2 py-1 rounded">LOCKED</span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {achievement.featured && isEarned && (
                        <div className="absolute top-2 left-2 w-4 h-4 bg-[var(--gold)] border border-[var(--border-dark)] rotate-45" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
              </div>

              {filteredAchievements.length === 0 && (
                <PixelPanel variant="lg" className="text-center py-8">
                  <span className="text-4xl mb-2 block" aria-hidden="true">🏆</span>
                  <p className="font-[var(--font-body)] text-[var(--text-muted)]">No trophies in this category yet</p>
                </PixelPanel>
              )}
            </div>

            {/* Legend */}
            <PixelPanel variant="retro" className="w-full max-w-5xl mt-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                <span aria-hidden="true">📜</span> LEGEND
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-200 border-2 border-yellow-500 rounded-full flex items-center justify-center text-yellow-700 font-bold text-sm">★</div>
                  <div>
                    <div className="font-pixel text-[10px] text-yellow-800">GOLD TIER</div>
                    <div className="font-[var(--font-body)] text-xs text-yellow-700">Major certifications, production launches, hackathon wins</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 border-2 border-gray-500 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm">◆</div>
                  <div>
                    <div className="font-pixel text-[10px] text-gray-800">SILVER TIER</div>
                    <div className="font-[var(--font-body)] text-xs text-gray-700">Associate certs, beta releases, notable contributions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                  <div className="w-8 h-8 bg-amber-200 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm">●</div>
                  <div>
                    <div className="font-pixel text-[10px] text-amber-800">BRONZE TIER</div>
                    <div className="font-[var(--font-body)] text-xs text-amber-700">Learning milestones, early projects, community participation</div>
                  </div>
                </div>
              </div>
            </PixelPanel>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">🏆</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">TROPHY CASE</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">{earnedAchievements.size}/{achievements.length} Unlocked</div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Achievements