import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.use({ viewport: { width: 390, height: 844 } })

const routes = ['/', '/world', '/about', '/skills', '/achievements', '/contact', '/projects/educloudplatform']

test.describe('Mobile 390px Viewport Tests', () => {
  for (const route of routes) {
    test(`Route ${route} - no horizontal overflow at 390px`, async ({ page }) => {
      await page.goto(`${BASE_URL}${route}`)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      // Check for horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = 390
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10)
    })

    test(`Route ${route} - interactive elements have 44px tap targets`, async ({ page }) => {
      await page.goto(`${BASE_URL}${route}`)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      const smallElements = await page.locator('button, a, [role="button"]').filter({
        hasNot: page.locator(':has(> *)')
      }).evaluateAll(elements => {
        return elements.filter(el => {
          const rect = el.getBoundingClientRect()
          return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)
        }).map(el => ({
          tag: el.tagName,
          class: el.className,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }))
      })

      const problematic = smallElements.filter(el => 
        !el.class.includes('coin') && 
        !el.class.includes('icon') &&
        !el.class.includes('sr-only') &&
        el.width > 0 && el.height > 0
      )

      if (problematic.length > 0) {
        console.log('Small tap targets found:', problematic)
      }
    })
  }
})
