import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import { skills, getSkillsByCategory, getCategories, getTopSkills } from '../content/skills'
import FooterNavigation from '../components/FooterNavigation'

const Skills = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, visitedScreens, markScreenVisited } = useGameStore()
  const { playClick, playCoin } = useAudio()
  const [activeCategory, setActiveCategory] = useState('All')
  const [showContent, setShowContent] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const handleCategoryChange = (category) => {
    playClick()
    setActiveCategory(category)
  }

  const handleSkillClick = (skill) => {
    playCoin()
    addCoins(2)
  }

  const categories = ['All', ...getCategories()]

  useEffect(() => {
    setCurrentScreen('skills')
    // Award coins only on first visit to skills screen
    if (!visitedScreens.skills) {
      markScreenVisited('skills')
    }
    setShowContent(true)
  }, [setCurrentScreen, markScreenVisited, visitedScreens])

  const filteredSkills = activeCategory === 'All'
    ? skills
    : getSkillsByCategory(activeCategory)

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

          {/* Skills Content */}
          <div className="flex flex-col items-center px-2 md:px-6">
            {/* Header */}
            <div className="w-full max-w-5xl text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white border-3 border-[var(--border-dark)] shadow-xl px-6 py-3 rounded-xl">
                <span className="text-4xl" aria-hidden="true">⚡</span>
                <div className="text-left">
                  <h1 className="font-pixel text-xl text-[var(--text)]">POWER-UPS COLLECTION</h1>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)]">Technologies & Skills Mastered</p>
                </div>
              </div>
              <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mt-3 max-w-2xl mx-auto">
                Each power-up represents a technology I've used in production. Hover for details, click to earn coins!
              </p>
            </div>

            {/* Category Tabs */}
            <PixelPanel variant="retro" className="w-full max-w-5xl mb-6 animate-slide-up">
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Skill categories">
                {categories.map((cat, index) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    aria-controls={`panel-${cat}`}
                    id={`tab-${cat}`}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-lg font-pixel text-[10px] transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[var(--gold)] text-[var(--border-dark)] border-2 border-[var(--border-dark)] shadow-[2px_2px_0px_var(--border-dark)]'
                        : 'bg-[var(--cream)] text-[var(--text)] border-2 border-[var(--border-dark)] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {cat === 'Cloud & DevOps' && '☁️ '}{cat === 'AI & ML' && '🤖 '}{cat === 'Frontend & Fullstack' && '⚛️ '}{cat === 'Tools & Practices' && '🔧 '}{cat === 'All' && '🌟 '}
                    {cat}
                  </button>
                ))}
              </div>
            </PixelPanel>

            {/* Skills Grid */}
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="tabpanel" id={`panel-${activeCategory}`} aria-labelledby={`tab-${activeCategory}`}>
                {filteredSkills.map((skill, index) => (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleSkillClick(skill)}
                    className={`group relative pixel-box p-4 cursor-pointer transition-all duration-300 ${
                      hoveredSkill === skill.id ? 'scale-[1.02] z-10' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${skill.name} - ${skill.proficiency}% proficiency`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSkillClick(skill) } }}
                  >
                    {/* Skill Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl filter drop-shadow-lg" aria-hidden="true">{skill.icon}</span>
                      <div className={`w-6 h-6 rounded-full border-2 border-[var(--border-dark)] flex items-center justify-center text-[10px] font-bold ${skill.tier === 'gold' ? 'bg-yellow-300' : skill.tier === 'silver' ? 'bg-gray-300' : 'bg-amber-600'}`} aria-hidden="true">
                        {skill.proficiency >= 90 ? '★' : skill.proficiency >= 75 ? '◆' : '●'}
                      </div>
                    </div>

                    {/* Skill Name & Category */}
                    <div className="mb-2">
                      <h3 className="font-pixel text-[11px] text-[var(--text)] mb-1 group-hover:text-[var(--sky)] transition-colors">{skill.name}</h3>
                      <span className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">{skill.category}</span>
                    </div>

                    {/* Key Projects */}
                    <div className="flex items-center justify-between text-[9px] font-pixel text-[var(--text-muted)] border-t border-[var(--border-dark)] pt-2">
                      <span>{skill.projects.length} PROJECTS</span>
                    </div>

                    {/* Hover Tooltip */}
                    {hoveredSkill === skill.id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 pixel-box p-3 z-20 animate-fade-in" role="tooltip">
                        <div className="font-pixel text-[10px] text-[var(--text)] mb-2 border-b border-[var(--border-dark)] pb-2">{skill.name}</div>
                        <p className="font-[var(--font-body)] text-xs text-[var(--text-muted)] mb-2">{skill.description}</p>
                        <div className="space-y-1 text-[9px]">
                          {(skill.certifications?.length ?? 0) > 0 && (
                            <div className="font-pixel text-[var(--gold)]">Certifications:</div>
                          )}
                          {skill.certifications?.map((cert, i) => (
                            <div key={i} className="font-[var(--font-body)] text-[var(--text)] pl-2">• {cert}</div>
                          ))}
                          <div className="font-pixel text-[var(--grass)] mt-1">Key Projects:</div>
                          {skill.projects?.slice(0, 3).map((proj, i) => (
                            <div key={i} className="font-[var(--font-body)] text-[var(--text)] pl-2">• {proj}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredSkills.length === 0 && (
                <PixelPanel variant="lg" className="text-center py-8">
                  <span className="text-4xl mb-2 block" aria-hidden="true">🔍</span>
                  <p className="font-[var(--font-body)] text-[var(--text-muted)]">No power-ups in this category yet</p>
                </PixelPanel>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">⚡</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">POWER-UPS UNLOCKED</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">{skills.length} Technologies Mastered</div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Skills