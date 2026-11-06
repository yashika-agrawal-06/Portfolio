import React from 'react'
import PixelButton from './PixelButton'
import PixelPanel from './PixelPanel'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
    this.handleRetry = this.handleRetry.bind(this)
    this.handleGoHome = this.handleGoHome.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.error('ErrorBoundary caught an error:')
    console.error('Error name:', error?.name)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    console.error('Component stack:', errorInfo?.componentStack)
  }

  handleRetry() {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleGoHome() {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-center items-center pt-8">
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

              {/* Error Content */}
              <div className="flex flex-col items-center px-2 md:px-6">
                <PixelPanel variant="retro" className="w-full max-w-md text-center p-8 animate-fade-in">
                  <div className="text-6xl mb-4" aria-hidden="true">💥</div>
                  <h2 className="font-pixel text-xl text-[var(--text)] mb-2">GAME CRASHED!</h2>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mb-4">
                    Something went wrong in Yashika's Super World. Our error Koopa troopers are on it!
                  </p>

                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <div className="mb-4 p-4 bg-[var(--cream)] border-2 border-[var(--brick)] rounded-lg text-left max-h-60 overflow-auto">
                      <div className="font-pixel text-[9px] text-[var(--brick)] mb-2">ERROR DETAILS (DEV MODE):</div>
                      <pre className="font-[var(--font-body)] text-[10px] text-[var(--text)] whitespace-pre-wrap break-words">
                        {this.state.error.toString()}
                        {this.state.errorInfo?.componentStack && '\n\n' + this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <PixelButton
                      variant="green"
                      size="lg"
                      onClick={this.handleRetry}
                      className="w-full sm:w-auto"
                    >
                      🔄 RESTART GAME
                    </PixelButton>
                    <PixelButton
                      variant="gold"
                      size="lg"
                      onClick={this.handleGoHome}
                      className="w-full sm:w-auto"
                    >
                      🏠 RETURN TO START
                    </PixelButton>
                  </div>
                </PixelPanel>
              </div>
            </div>
          </main>

          <footer className="bg-[var(--cream)] border-t-4 border-[var(--border-dark)] px-4 py-4">
            <PixelPanel variant="default" className="max-w-7xl mx-auto p-4 text-center">
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">ERROR TERMINAL</div>
              <div className="font-[var(--font-body)] text-sm text-[var(--text)] mt-1">Press RESTART to reload the game</div>
            </PixelPanel>
          </footer>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary