// Console Sweep Script
// Visits all routes and captures console errors, warnings, and logs
// Run: npx playwright test scripts/console-sweep.mjs --headed

import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

const routes = [
  { path: '/preloader', name: 'Preloader' },
  { path: '/', name: 'Start' },
  { path: '/guess', name: 'Guess' },
  { path: '/unlocked', name: 'Unlocked' },
  { path: '/about', name: 'About' },
  { path: '/skills', name: 'Skills' },
  { path: '/achievements', name: 'Achievements' },
  { path: '/world', name: 'World Map' },
  { path: '/projects/educloudplatform', name: 'Project: EduCloud' },
  { path: '/projects/pitchperfect', name: 'Project: PitchPerfect' },
  { path: '/projects/aushdrishti', name: 'Project: AushDrishti' },
  { path: '/projects/intentswitch', name: 'Project: IntentSwitch' },
  { path: '/contact', name: 'Contact' },
  { path: '/nonexistent', name: '404' },
];

test.describe('Console Sweep - All Routes', () => {
  for (const route of routes) {
    test(`${route.name} (${route.path}) - no console errors`, async ({ page }) => {
      const consoleMessages = [];
      const consoleErrors = [];
      const consoleWarnings = [];

      // Capture all console messages
      page.on('console', msg => {
        const entry = {
          type: msg.type(),
          text: msg.text(),
          location: msg.location(),
        };
        consoleMessages.push(entry);

        if (msg.type() === 'error') {
          consoleErrors.push(entry);
        } else if (msg.type() === 'warning') {
          consoleWarnings.push(entry);
        }
      });

      // Capture page errors (uncaught exceptions)
      page.on('pageerror', error => {
        consoleErrors.push({
          type: 'pageerror',
          text: error.message,
          stack: error.stack,
        });
      });

      // Navigate to route
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000); // Allow time for any async errors

      // Report results
      console.log(`\n=== ${route.name} (${route.path}) ===`);
      console.log(`Total console messages: ${consoleMessages.length}`);
      console.log(`Errors: ${consoleErrors.length}`);
      console.log(`Warnings: ${consoleWarnings.length}`);

      if (consoleErrors.length > 0) {
        console.log('\nERRORS:');
        consoleErrors.forEach(e => console.log(`  - ${e.text}`));
      }

      if (consoleWarnings.length > 0) {
        console.log('\nWARNINGS:');
        consoleWarnings.forEach(w => console.log(`  - ${w.text}`));
      }

      // Save detailed report
      const report = {
        route: route.path,
        name: route.name,
        timestamp: new Date().toISOString(),
        summary: {
          total: consoleMessages.length,
          errors: consoleErrors.length,
          warnings: consoleWarnings.length,
        },
        errors: consoleErrors,
        warnings: consoleWarnings,
        allMessages: consoleMessages,
      };

      const reportDir = 'test-results/console-sweep';
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }
      const reportPath = `${reportDir}/${route.name.replace(/[^a-zA-Z0-9]/g, '-')}.json`;
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

      // Assert no errors (warnings are OK)
      expect(consoleErrors, `Console errors found on ${route.path}`).toHaveLength(0);
    });
  }
});