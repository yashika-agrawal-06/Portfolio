// Map character vs info card z-index test
// Run: npx playwright test map-z-index-test.mjs --headed

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

const PIPES = [
  { slug: 'educloudplatform', label: 'WORLD 1-1', x: '15%', bottom: '22%' },
  { slug: 'pitchperfect', label: 'WORLD 1-2', x: '35%', bottom: '50%' },
  { slug: 'aushdrishti', label: 'WORLD 1-3', x: '60%', bottom: '30%' },
  { slug: 'intentswitch', label: 'WORLD 1-4', x: '82%', bottom: '55%' }
];

test.describe('Map z-index: character vs info card', () => {
  test('hover each pipe at 1440x900 - check element at card center', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/world`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    for (const pipe of PIPES) {
      console.log(`\n--- Testing ${pipe.slug} ---`);

      // Find the pipe element and hover it
      const pipeEl = page.locator(`[aria-label*="${pipe.label}"]`).first();
      await expect(pipeEl).toBeVisible();

      // Hover the pipe to show the card
      await pipeEl.hover();
      await page.waitForTimeout(300);

      // Find the info card
      const card = page.locator('.pixel-box[role="tooltip"]').first();
      await expect(card).toBeVisible();

      // Get card bounding box
      const cardBox = await card.boundingBox();
      if (!cardBox) {
        console.log(`  Card not found for ${pipe.slug}`);
        continue;
      }

      const centerX = cardBox.x + cardBox.width / 2;
      const centerY = cardBox.y + cardBox.height / 2;

      // Use elementFromPoint to see what's at the card center
      const topElement = await page.evaluate(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return 'none';
        return {
          tag: el.tagName.toLowerCase(),
          class: el.className,
          id: el.id,
          zIndex: window.getComputedStyle(el).zIndex,
          parentZIndex: el.parentElement ? window.getComputedStyle(el.parentElement).zIndex : 'none'
        };
      }, [centerX, centerY]);

      console.log(`  Card center: (${Math.round(centerX)}, ${Math.round(centerY)})`);
      console.log(`  Top element: ${JSON.stringify(topElement)}`);

      // Also check character z-index (on the parent div, not the SVG)
      const char = page.locator('[aria-label="Yashika character"]').first();
      const charStyle = await char.evaluate(el => window.getComputedStyle(el));
      console.log(`  Character z-index: ${charStyle.zIndex}`);

      // Check card z-index
      const cardStyle = await card.evaluate(el => window.getComputedStyle(el));
      console.log(`  Card z-index: ${cardStyle.zIndex}`);

      // Take screenshot
      await page.screenshot({ path: `test-results/map-${pipe.slug}-1440x900.png`, fullPage: true });
    }
  });

  test('hover each pipe at 390x844 - check element at card center', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/world`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    for (const pipe of PIPES) {
      console.log(`\n--- Mobile Testing ${pipe.slug} ---`);

      const pipeEl = page.locator(`[aria-label*="${pipe.label}"]`).first();
      await expect(pipeEl).toBeVisible();

      await pipeEl.hover();
      await page.waitForTimeout(300);

      const card = page.locator('.pixel-box[role="tooltip"]').first();
      await expect(card).toBeVisible();

      const cardBox = await card.boundingBox();
      if (!cardBox) {
        console.log(`  Card not found for ${pipe.slug}`);
        continue;
      }

      const centerX = cardBox.x + cardBox.width / 2;
      const centerY = cardBox.y + cardBox.height / 2;

      const topElement = await page.evaluate(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return 'none';
        return {
          tag: el.tagName.toLowerCase(),
          class: el.className,
          zIndex: window.getComputedStyle(el).zIndex
        };
      }, [centerX, centerY]);

      console.log(`  Card center: (${Math.round(centerX)}, ${Math.round(centerY)})`);
      console.log(`  Top element: ${JSON.stringify(topElement)}`);

      await page.screenshot({ path: `test-results/map-${pipe.slug}-390x844.png`, fullPage: true });
    }
  });
});