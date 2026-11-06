import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import FooterNavigation from '../components/FooterNavigation'

const About = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, visitedScreens, markScreenVisited } = useGameStore()
  const { playClick } = useAudio()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setCurrentScreen('about')
    // Award coins only on first visit to about screen
    if (!visitedScreens.about) {
      markScreenVisited('about')
    }
    setShowContent(true)
  }, [setCurrentScreen, markScreenVisited, visitedScreens])

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

          {/* About Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start px-2 md:px-6">
            {/* Left: Profile Card */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <PixelPanel variant="retro" className="w-full max-w-sm animate-fade-in">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="absolute inset-0 bg-[var(--gold)] border-4 border-[var(--border-dark)] rounded-full animate-pulse-gentle" aria-hidden="true"></div>
                    <div className="relative w-full h-full bg-white border-4 border-[var(--border-dark)] rounded-full flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_var(--border-dark)]">
                      <svg className="w-20 h-20 pixelated drop-shadow-lg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <rect fill="#1C1412" height="4" width="10" x="7" y="1" />
                        <rect fill="#1C1412" height="6" width="14" x="5" y="3" />
                        <rect fill="#1C1412" height="12" width="3" x="4" y="6" />
                        <rect fill="#1C1412" height="12" width="3" x="17" y="6" />
                        <rect fill="#E8B490" height="9" width="10" x="7" y="5" />
                        <rect fill="#1C1412" height="2" width="3" x="8" y="4" />
                        <rect fill="#1C1412" height="2" width="3" x="13" y="4" />
                        <rect fill="#1C1412" height="1" width="2" x="8" y="7" />
                        <rect fill="#1C1412" height="1" width="2" x="14" y="7" />
                        <rect fill="#1C1412" height="2" width="2" x="8" y="8" />
                        <rect fill="#1C1412" height="2" width="2" x="14" y="8" />
                        <rect fill="#FFFFFF" height="1" width="1" x="9" y="8" />
                        <rect fill="#FFFFFF" height="1" width="1" x="15" y="8" />
                        <rect fill="#FF8A80" height="1" width="2" x="7" y="10" />
                        <rect fill="#FF8A80" height="1" width="2" x="15" y="10" />
                        <rect fill="#FF8FA3" height="1.5" width="6" x="9" y="11" />
                        <rect fill="#E86A8D" height="1" width="4" x="10" y="12.5" />
                        <rect fill="#1F2328" height="7" width="12" x="6" y="14" />
                        <rect fill="#CBD5E1" height="7" width="1" x="11" y="14" />
                        <rect fill="#FF9900" height="1.5" width="4" x="13" y="16" />
                        <rect fill="#1F2328" height="4" width="3" x="4" y="15" />
                        <rect fill="#E8B490" height="3" width="2.5" x="3" y="12" />
                        <rect fill="#E8B490" height="2" width="1.5" x="3" y="11" />
                        <rect fill="#1F2328" height="4" width="2.5" x="17" y="15" />
                        <rect fill="#E8B490" height="2" width="2" x="17" y="18" />
                        <rect fill="#111417" height="1.5" width="12" x="6" y="21" />
                        <rect fill="#1A365D" height="1.5" width="4" x="7" y="22.5" />
                        <rect fill="#1A365D" height="1.5" width="4" x="13" y="22.5" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="font-pixel text-xl text-[var(--text)] mb-1">YASHIKA AGRAWAL</h2>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mb-2">B.Tech CSE • GLA University</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="bg-[var(--sky)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">AWS AI PRACTITIONER</span>
                    <span className="bg-[var(--grass)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">OCI MULTICLOUD ARCHITECT</span>
                    <span className="bg-[var(--brick)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">OCI FOUNDATIONS</span>
                  </div>
                </div>

                <div className="border-t-2 border-[var(--border-dark)] pt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[var(--cream)] border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">📍</span>
                    <div>
                      <div className="font-pixel text-[9px] text-[var(--text-muted)]">LOCATION</div>
                      <div className="font-[var(--font-body)] text-sm text-[var(--text)] font-semibold">Mathura, Uttar Pradesh, India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--cream)] border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">📧</span>
                    <div>
                      <div className="font-pixel text-[9px] text-[var(--text-muted)]">EMAIL</div>
                      <a href="mailto:yashikaagrawal1926@gmail.com" className="font-[var(--font-body)] text-sm text-[var(--brick)] hover:underline font-semibold">
                        yashikaagrawal1926@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--cream)] border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">🎓</span>
                    <div>
                      <div className="font-pixel text-[9px] text-[var(--text-muted)]">EDUCATION</div>
                      <div className="font-[var(--font-body)] text-sm text-[var(--text)] font-semibold">B.Tech Computer Science & Engineering</div>
                    </div>
                  </div>
                </div>
              </PixelPanel>
            </div>

            {/* Right: Bio & Journey */}
            <div className="lg:col-span-8 space-y-6">
              {/* Bio Section */}
              <PixelPanel variant="retro" className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h3 className="font-pixel text-[12px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">📖</span> MY STORY
                </h3>
                <div className="space-y-4 font-[var(--font-body)] text-base text-[var(--text)] leading-relaxed">
                  <p>
                    I'm a <strong>Computer Science Engineering student at GLA University</strong> with a deep passion for
                    <strong>Cloud Infrastructure, DevOps Automation, and Artificial Intelligence</strong>.
                    My journey started with curiosity about how scalable systems work behind the scenes,
                    and it evolved into building production-ready cloud architectures.
                  </p>
                  <p>
                    As an <strong>AWS Certified AI Practitioner</strong> and <strong>OCI Multicloud Architect Professional</strong>,
                    I specialize in designing <strong>serverless architectures</strong>, <strong>Infrastructure as Code</strong>
                    with Terraform/CDK, and <strong>zero-trust security models</strong>. I love automating everything&mdash;
                    from CI/CD pipelines to cloud resource provisioning.
                  </p>
                  <p>
                    Currently, I'm exploring <strong>Generative AI and Agentic Systems</strong> to build intelligent
                    cloud automation tools. When I'm not architecting cloud solutions, you'll find me contributing
                    to open-source, participating in hackathons, or leveling up my skills through interactive projects
                    like this portfolio!
                  </p>
                </div>
              </PixelPanel>

              {/* Focus Areas */}
              <PixelPanel variant="retro" className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <h3 className="font-pixel text-[12px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">🎯</span> FOCUS AREAS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--cream)] border border-[var(--border-dark)] rounded-xl group hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" aria-hidden="true">☁️</span>
                      <h4 className="font-pixel text-[11px] text-[var(--text)]">Cloud Architecture</h4>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">AWS, OCI, Multi-cloud strategies, Serverless, Container orchestration</p>
                  </div>
                  <div className="p-4 bg-[var(--cream)] border border-[var(--border-dark)] rounded-xl group hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" aria-hidden="true">⚙️</span>
                      <h4 className="font-pixel text-[11px] text-[var(--text)]">DevOps & Automation</h4>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">CI/CD, Terraform, CDK, GitHub Actions, ArgoCD, Infrastructure as Code</p>
                  </div>
                  <div className="p-4 bg-[var(--cream)] border border-[var(--border-dark)] rounded-xl group hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" aria-hidden="true">🤖</span>
                      <h4 className="font-pixel text-[11px] text-[var(--text)]">AI & Machine Learning</h4>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">Generative AI, Agentic Systems, Bedrock, SageMaker, MLOps pipelines</p>
                  </div>
                  <div className="p-4 bg-[var(--cream)] border border-[var(--border-dark)] rounded-xl group hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" aria-hidden="true">🔒</span>
                      <h4 className="font-pixel text-[11px] text-[var(--text)]">Security & Compliance</h4>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">Zero-trust, IAM, Cognito, WAF, GuardDuty, Security Hub</p>
                  </div>
                </div>
              </PixelPanel>

              {/* Fun Facts */}
              <PixelPanel variant="lg" className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h3 className="font-pixel text-[12px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">✨</span> FUN FACTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-white border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">🎮</span>
                    <span className="font-[var(--font-body)] text-sm text-[var(--text)]">Built this portfolio as a playable Mario-style game!</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">☕</span>
                    <span className="font-[var(--font-body)] text-sm text-[var(--text)]">Powered by excessive coffee & late-night debugging sessions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">📚</span>
                    <span className="font-[var(--font-body)] text-sm text-[var(--text)]">Continuous learner - currently mastering Agentic AI workflows</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border border-[var(--border-dark)] rounded-lg">
                    <span className="text-2xl" aria-hidden="true">🌱</span>
                    <span className="font-[var(--font-body)] text-sm text-[var(--text)]">Open source enthusiast - believe in building in public</span>
                  </div>
                </div>
              </PixelPanel>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">👤</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">PLAYER PROFILE</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">Yashika Agrawal</div>
            </div>
            <a
              href="https://github.com/yashika-agrawal-06/yashika-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-yellow-50 border-2 border-[var(--border-dark)] rounded shadow-sm transition text-[var(--text)] font-pixel text-[10px] ml-4"
              title="View GitHub Repository (opens in new tab)"
              aria-label="View GitHub Repository"
            >
              <span aria-hidden="true">🐙</span> GITHUB REPO
            </a>
          </>
        }
      />
    </div>
  )
}

export default About