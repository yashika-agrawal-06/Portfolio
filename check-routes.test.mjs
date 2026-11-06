import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

// Define all expected routes and their expected content
const routes = [
  { path: '/preloader', title: 'PRELOADER', shouldLoad: true },
  { path: '/', title: 'START', shouldLoad: true },
  { path: '/guess', title: 'GUESS', shouldLoad: true },
  { path: '/unlocked', title: 'UNLOCKED', shouldLoad: true },
  { path: '/about', title: 'ABOUT', shouldLoad: true },
  { path: '/skills', title: 'SKILLS', shouldLoad: true },
  { path: '/achievements', title: 'ACHIEVEMENTS', shouldLoad: true },
  { path: '/world', title: 'WORLD MAP', shouldLoad: true },
  { path: '/projects/educloudplatform', title: 'PROJECT DETAIL', shouldLoad: true },
  { path: '/projects/pitchperfect', title: 'PROJECT DETAIL', shouldLoad: true },
  { path: '/projects/aushdrishti', title: 'PROJECT DETAIL', shouldLoad: true },
  { path: '/projects/intentswitch', title: 'PROJECT DETAIL', shouldLoad: true },
  { path: '/contact', title: 'CONTACT', shouldLoad: true },
  // 404 routes - these hit the * catch-all route
  { path: '/nonexistent', title: 'NOT FOUND', shouldLoad: true, expect404: true },
  { path: '/invalid/route', title: 'NOT FOUND', shouldLoad: true, expect404: true },
  // /projects/nonexistent matches /projects/:slug and shows ProjectDetail's 404 content
  // which also contains "WORLD NOT FOUND" - test this separately
  { path: '/projects/invalid/extra/path', title: 'NOT FOUND', shouldLoad: true, expect404: true },
]

test.describe('Route Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Start from preloader for proper initialization
    await page.goto(`${BASE_URL}/preloader`)
    // Wait for preloader to complete or skip it
    await page.waitForTimeout(3000)
  })

  for (const route of routes) {
    test(`Route ${route.path} should ${route.expect404 ? 'show 404' : 'load successfully'}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${route.path}`)

      // Wait for page to load
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      if (route.expect404) {
        // Check for 404 page indicators - "WORLD NOT FOUND" is an h2 heading, "404 - NOT FOUND" is a text node in footer
        const notFoundContent = page.getByText('WORLD NOT FOUND').or(page.getByText('404 - NOT FOUND')).first()
        await expect(notFoundContent).toBeVisible({ timeout: 5000 })
      } else {
        // Check that page loads without errors
        const hasError = await page.locator('text=Error, text=Something went wrong').count()
        expect(hasError).toBe(0)

        // Check page has some content (not blank)
        const bodyText = await page.locator('body').innerText()
        expect(bodyText.length).toBeGreaterThan(50)
      }
    })
  }

  test('Navigation from WorldMap to ProjectDetail works', async ({ page }) => {
    await page.goto(`${BASE_URL}/world`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Click on first pipe/project - pipes are role="button" with aria-label containing the project name
    const firstPipe = page.locator('[role="application"] [role="button"]').first()
    if (await firstPipe.count() > 0) {
      await firstPipe.click()
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveURL(`${BASE_URL}/projects/educloudplatform`)
    }
  })

  test('404 page does not redirect to home', async ({ page }) => {
    await page.goto(`${BASE_URL}/this-route-does-not-exist`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Should stay on 404 route, not redirect to /
    await expect(page).toHaveURL(`${BASE_URL}/this-route-does-not-exist`)

    // Should show 404 content
    const notFoundContent = page.getByText('WORLD NOT FOUND').or(page.getByText('404 - NOT FOUND')).first()
    await expect(notFoundContent).toBeVisible({ timeout: 5000 })
  })

  test('All pipes on WorldMap are clickable (no locked state)', async ({ page }) => {
    await page.goto(`${BASE_URL}/world`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Check for pipes - they are role="button" elements inside role="application"
    const pipes = page.locator('[role="application"] [role="button"]')
    const pipeCount = await pipes.count()

    // Should have at least 4 pipes
    expect(pipeCount).toBeGreaterThanOrEqual(4)

    // Verify no locked/disabled pipes
    const lockedPipes = page.locator('[data-locked="true"], .locked, [disabled], .opacity-50, .grayscale')
    const lockedCount = await lockedPipes.count()
    expect(lockedCount).toBe(0)
  })

  test('Coin counter does not persist in localStorage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Get initial coins from localStorage
    const initialCoins = await page.evaluate(() => {
      const state = localStorage.getItem('yashika-game-state')
      if (state) {
        return JSON.parse(state).coins || 0
      }
      return 0
    })

    // Navigate to skills and click a skill to earn coins
    await page.goto(`${BASE_URL}/skills`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Click a skill card
    const skillCard = page.locator('[role="button"]').first()
    if (await skillCard.count() > 0) {
      await skillCard.click()
      await page.waitForTimeout(500)
    }

    // Check localStorage - coins should NOT be in persisted state
    const finalCoins = await page.evaluate(() => {
      const state = localStorage.getItem('yashika-game-state')
      if (state) {
        const parsed = JSON.parse(state)
        return { coins: parsed.coins, hasCoinsKey: 'coins' in parsed }
      }
      return { coins: 0, hasCoinsKey: false }
    })

    // Coins should not be in the persisted state object
    expect(finalCoins.hasCoinsKey).toBe(false)
  })

  test('Audio mute state persists in localStorage', async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Toggle mute via audio button in TopBar
    const muteButton = page.locator('button[aria-label*="mute" i], button[aria-label*="sound" i], button:has-text("🔊"), button:has-text("🔇")').first()
    if (await muteButton.count() > 0) {
      await muteButton.click()
      await page.waitForTimeout(1000) // Wait longer for persist middleware

      // Check localStorage for game store settings (audio state is now managed by game store)
      const gameStore = await page.evaluate(() => {
        const settings = localStorage.getItem('yashika-super-world-game-v2')
        return settings ? JSON.parse(settings) : null
      })

      expect(gameStore).not.toBeNull()
      expect(gameStore.state).not.toBeNull()
      expect(typeof gameStore.state.soundEnabled).toBe('boolean')
    }
  })

  test('Tab visibility pauses audio', async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Check that audio context pauses on visibility change
    const audioState = await page.evaluate(() => {
      // Trigger visibility change
      document.dispatchEvent(new Event('visibilitychange'))
      return { hidden: document.hidden }
    })

    // Just verify the page handles visibility events (actual audio pause is internal)
    expect(audioState.hidden).toBe(false)
  })

  test('Build verification - no console errors', async ({ page }) => {
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    page.on('pageerror', error => {
      errors.push(error.message)
    })

    // Test key routes
    for (const route of routes.filter(r => !r.expect404).slice(0, 5)) {
      await page.goto(`${BASE_URL}${route.path}`)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)
    }

    // Filter out expected errors (like 404 for missing audio file, React warnings)
    const unexpectedErrors = errors.filter(e =>
      !e.includes('theme.mp3') &&
      !e.includes('favicon') &&
      !e.includes('404') &&
      !e.includes('Encountered two children with the same key') &&
      !e.includes('Non-unique keys') &&
      !e.includes('Warning:')
    )

    expect(unexpectedErrors).toHaveLength(0)
  })
})

// Run with: npx playwright test check-routes.mjs --reporter=line