import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import Modal from '../components/Modal'
import { links, getSocialLinks } from '../content/links'
import FooterNavigation from '../components/FooterNavigation'

const Contact = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, visitedScreens, markScreenVisited } = useGameStore()
  const { playClick, playCoin, playSuccess, playError } = useAudio()
  const [showContent, setShowContent] = useState(false)
  const [formState, setFormState] = useState('idle') // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  })
  const [errors, setErrors] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' })

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    playClick()

    if (!validateForm()) {
      playError()
      setModalContent({
        title: 'VALIDATION ERROR',
        message: 'Please fix the errors in the form before submitting.',
        type: 'error'
      })
      setShowModal(true)
      return
    }

    setFormState('submitting')
    playCoin()

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL

      if (!apiUrl) {
        throw new Error('CONFIG_ERROR: VITE_CONTACT_API_URL not configured. Please set up the contact form backend.')
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Server error: ${response.status}`)
      }

      setFormState('success')
      playSuccess()
      addCoins(10)

      setModalContent({
        title: 'MESSAGE SENT!',
        message: "Thanks for reaching out! I'll get back to you within 24-48 hours. Here are 10 bonus coins!",
        type: 'success'
      })
      setShowModal(true)

      setFormData({ name: '', email: '', subject: '', message: '', website: '' })
    } catch (error) {
      setFormState('error')
      playError()

      // Log real failure to console for debugging
      console.error('[ContactForm] Submission failed:', {
        message: error.message,
        stack: error.stack,
        formState: 'error',
        timestamp: new Date().toISOString()
      })

      const isConfigError = error.message.includes('CONFIG_ERROR')
      setModalContent({
        title: isConfigError ? 'BACKEND NOT CONFIGURED' : 'SUBMISSION FAILED',
        message: isConfigError
          ? 'The contact form requires a backend API. Please configure VITE_CONTACT_API_URL in your .env file. See backend-notes/README.md for setup instructions.'
          : `Failed to send message: ${error.message}. Please try again or contact me directly via email.`,
        type: 'error'
      })
      setShowModal(true)
    } finally {
      if (formState !== 'error') {
        setFormState('idle')
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleDirectContact = (type) => {
    playClick()
    addCoins(2)
    const socialLinks = getSocialLinks()
    if (socialLinks[type]) {
      window.open(socialLinks[type], '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    setCurrentScreen('contact')
    // Award coins only on first visit to contact screen
    if (!visitedScreens.contact) {
      markScreenVisited('contact')
    }
    setShowContent(true)
  }, [setCurrentScreen, markScreenVisited, visitedScreens])

  const socialLinks = getSocialLinks()

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

          {/* Contact Content */}
          <div className="flex flex-col items-center px-2 md:px-6">
            {/* Header */}
            <div className="w-full max-w-3xl text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white border-3 border-[var(--border-dark)] shadow-xl px-6 py-3 rounded-xl">
                <span className="text-4xl" aria-hidden="true">📮</span>
                <div className="text-left">
                  <h1 className="font-pixel text-xl text-[var(--text)]">CONTACT YASHIKA</h1>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)]">Send a message or connect directly</p>
                </div>
              </div>
              <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mt-3 max-w-xl mx-auto">
                Have a project idea, collaboration proposal, or just want to say hi? Fill out the form below or reach out directly through any of the channels.
              </p>
            </div>

            {/* Contact Form */}
            <div className="w-full max-w-2xl mb-6 animate-slide-up">
              <PixelPanel variant="retro" className="p-5">
                <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">✍️</span> SEND A MESSAGE
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  <div>
                    <label htmlFor="name" className="block font-pixel text-[10px] text-[var(--text)] mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-white border-2 border-[var(--border-dark)] rounded-lg font-[var(--font-body)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your Name"
                      disabled={formState === 'submitting'}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1 font-pixel text-[9px] text-red-600" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-pixel text-[10px] text-[var(--text)] mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-white border-2 border-[var(--border-dark)] rounded-lg font-[var(--font-body)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                      disabled={formState === 'submitting'}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1 font-pixel text-[9px] text-red-600" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-pixel text-[10px] text-[var(--text)] mb-1">SUBJECT</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 bg-white border-2 border-[var(--border-dark)] rounded-lg font-[var(--font-body)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] ${errors.subject ? 'border-red-500' : ''}`}
                      disabled={formState === 'submitting'}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="">Select a subject</option>
                      <option value="project">Project Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="hiring">Hiring / Freelance</option>
                      <option value="speaking">Speaking Engagement</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p id="subject-error" className="mt-1 font-pixel text-[9px] text-red-600" role="alert">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-pixel text-[10px] text-[var(--text)] mb-1">MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-3 py-2 bg-white border-2 border-[var(--border-dark)] rounded-lg font-[var(--font-body)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] resize-y ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell me about your project, idea, or just say hello!"
                      disabled={formState === 'submitting'}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                    />
                    {errors.message && <p id="message-error" className="mt-1 font-pixel text-[9px] text-red-600" role="alert">{errors.message}</p>}
                    <p id="message-hint" className="mt-1 font-pixel text-[8px] text-[var(--text-muted)]">Minimum 10 characters</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <PixelButton
                      type="submit"
                      variant="green"
                      size="lg"
                      className="flex-1"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                          SENDING...
                        </span>
                      ) : (
                        '📤 SEND MESSAGE'
                      )}
                    </PixelButton>
                    <PixelButton
                      type="button"
                      variant="cream"
                      size="lg"
                      onClick={() => { setFormData({ name: '', email: '', subject: '', message: '', website: '' }); setErrors({}); playClick(); }}
                      className="flex-1"
                      disabled={formState === 'submitting'}
                    >
                      🔄 RESET
                    </PixelButton>
                  </div>
                </form>
              </PixelPanel>
            </div>

            {/* Direct Contact */}
            <div className="w-full max-w-3xl mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <PixelPanel variant="retro" className="p-5">
                <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">🔗</span> CONNECT DIRECTLY
                </h3>
                <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mb-4">Click any button to open the platform directly. Each click earns you 2 coins!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <PixelButton variant="cream" size="md" className="flex flex-col items-center gap-1" onClick={() => handleDirectContact('github')}>
                    <span className="text-2xl" aria-hidden="true">🐙</span>
                    <span className="font-pixel text-[9px]">GITHUB</span>
                  </PixelButton>
                  <PixelButton variant="cream" size="md" className="flex flex-col items-center gap-1" onClick={() => handleDirectContact('linkedin')}>
                    <span className="text-2xl" aria-hidden="true">💼</span>
                    <span className="font-pixel text-[9px]">LINKEDIN</span>
                  </PixelButton>
                  <PixelButton variant="gold" size="md" className="flex flex-col items-center gap-1" onClick={() => handleDirectContact('email')}>
                    <span className="text-2xl" aria-hidden="true">📧</span>
                    <span className="font-pixel text-[9px]">EMAIL</span>
                  </PixelButton>
                  <PixelButton variant="cream" size="md" className="flex flex-col items-center gap-1" onClick={() => handleDirectContact('leetcode')}>
                    <span className="text-2xl" aria-hidden="true">💡</span>
                    <span className="font-pixel text-[9px]">LEETCODE</span>
                  </PixelButton>
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
            <span className="text-xl" aria-hidden="true">📮</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">CONTACT TERMINAL</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">Ready to receive transmissions</div>
            </div>
          </>
        }
      />

      {/* Status Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        size="md"
      >
        <div className={`text-center ${modalContent.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
          <div className="text-4xl mb-3" aria-hidden="true">
            {modalContent.type === 'success' ? '🎉' : modalContent.type === 'error' ? '⚠️' : 'ℹ️'}
          </div>
          <p className="font-[var(--font-body)] text-base mb-4">{modalContent.message}</p>
          <PixelButton variant={modalContent.type === 'success' ? 'green' : 'red'} onClick={() => setShowModal(false)}>
            {modalContent.type === 'success' ? 'AWESOME!' : 'GOT IT'}
          </PixelButton>
        </div>
      </Modal>
    </div>
  )
}

export default Contact