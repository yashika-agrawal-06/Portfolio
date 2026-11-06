# Portfolio Submission Write-up

## Creative Feature

**Interactive Mario-Style 2D Platformer Portfolio**

This portfolio is built as an interactive 2D platformer game where visitors navigate through "worlds" representing projects. The creative feature is a fully playable web-based game with:
- Character movement and animation (Yashika sprite with idle/bounce animations)
- 4 project "pipes" on an overworld map that navigate to detailed project views
- Coin collection system with sound effects (coins earned for visits, clicks, interactions)
- Persistent game state using Zustand + localStorage (visited levels, cleared levels, sound preferences)
- Web Audio API singleton for chiptune background music and sound effects
- Touch/mouse support for all interactions
- Preloader screen with animated coin counter

**Why this approach:** Instead of a traditional static portfolio, the game metaphor makes exploring projects engaging and memorable, demonstrating both frontend engineering skills and creative problem-solving.

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| **AWS Amplify** | Hosting for the React SPA with automatic builds from Git |
| **AWS Lambda** | Contact form backend (Node.js 20.x runtime) |
| **Amazon API Gateway (HTTP API)** | REST endpoint for contact form submissions |
| **Amazon SES** | Sending contact form emails to verified recipient |
| **Amazon CloudFront** | CDN via Amplify for global low-latency delivery |
| **AWS IAM** | Least-privilege role for Lambda (SES send, CloudWatch logs) |
| **AWS SAM** | Infrastructure as Code for deploying the backend stack |

---

## Architecture Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   User Browser  │────▶│  AWS Amplify     │     │  React SPA      │
│  (Portfolio)    │     │  (Static Host)   │     │  (Vite/React)   │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                              ┌───────────────────────────┘
                              ▼
                    ┌──────────────────┐
                    │  Contact Form    │
                    │  (POST /contact) │
                    └────────┬─────────┘
                             │ HTTPS POST
                             ▼
                    ┌──────────────────┐
                    │  API Gateway     │
                    │  (HTTP API)      │
                    └────────┬─────────┘
                             │ Invoke
                             ▼
                    ┌──────────────────┐
                    │  Lambda Function │
                    │  (Node.js 20.x)  │
                    └────────┬─────────┘
                             │ SES SendEmail
                             ▼
                    ┌──────────────────┐
                    │  Amazon SES      │
                    │  (Verified Email)│
                    └──────────────────┘
```

**Data Flow:**
1. User fills contact form → POST to `/contact` endpoint
2. API Gateway routes to Lambda function
3. Lambda validates input (honeypot, required fields, email format)
4. Lambda sends email via SES using verified sender/recipient
5. Lambda returns 200/400/500 response
6. Frontend shows success/error modal, awards coins on success

---

## Learnings

- **React 18 + Vite + React Router v6**: Modern SPA architecture with code-splitting and lazy loading
- **Zustand for State Management**: Lightweight, persistable state with selective localStorage persistence (coins excluded)
- **Web Audio API Singleton Pattern**: Properly handling autoplay policies, visibility change events, and lazy initialization on first user gesture
- **SAM Template Design**: Resolving circular dependencies between Lambda and IAM Role using explicit `FunctionName` and wildcard log group ARNs
- **Accessibility (a11y)**: Semantic HTML, ARIA labels, focus management, reduced motion support, 44px touch targets
- **Responsive Design**: Mobile-first Tailwind CSS with 390px breakpoint testing
- **Playwright E2E Testing**: Route verification, console error detection, localStorage persistence checks, audio state validation
- **CI/CD with Amplify**: SPA rewrite rules, build specification, environment variable management

---

## Challenges

| Challenge | Solution |
|-----------|----------|
| **SAM Circular Dependency** | Lambda → Role (logs permission) → Lambda (log group ARN references Function logical ID). Fixed by explicit `FunctionName: contact-form-api` and wildcard `log-group:/aws/lambda/contact-form-api:*` |
| **Audio Autoplay Policy** | Browsers block autoplay. Implemented singleton with `attachInteractionListeners()` that initializes AudioContext on first click/keydown/touchstart |
| **localStorage Coin Persistence** | Coins should reset on refresh (not persist). Configured Zustand `partialize` to exclude `coins` from persisted state |
| **WorldMap Pipe Overlap** | Fixed info panel (z-20) overlapped hover cards (z-20). Moved info to bottom bar, raised hover cards to z-50, added edge-flip logic |
| **ProjectDetail Crash** | `project.metrics.map()` failed on undefined. Removed metrics/timeline/challenges/learnings/images sections, added `PROJECT_TECH_STACKS` constant with user-provided data |
| **Mobile Touch Targets** | 44px minimum not met on some buttons. Updated all interactive elements with `min-h-[44px] min-w-[44px]` and proper spacing |
| **Responsive Text Overflow** | Long project titles overflowed on mobile. Added `truncate` and `max-w-xs` classes, adjusted font sizes |
| **SEO for SPA** | Added meta tags, Open Graph, Twitter cards, proper favicon, semantic HTML structure |

---

## TODO (Yashika)

- [ ] Update `awsAiPractitioner` verification URL in `src/content/links.js` with actual Credly badge URL
- [ ] Update `ociMulticloudArchitect` verification URL in `src/content/links.js` with actual Oracle catalog URL
- [ ] Update `ociFoundations` verification URL in `src/content/links.js` with actual Oracle catalog URL
- [ ] Update `terraformAssociate` verification URL in `src/content/links.js` when certification is earned
- [ ] Replace placeholder project images in `public/images/projects/` with actual screenshots
- [ ] Add `og-portfolio.png` social sharing image to `public/images/`
- [ ] Deploy backend via `sam deploy --guided` and update `VITE_CONTACT_API_URL` in Amplify environment variables
- [ ] Test contact form end-to-end with real email delivery
- [ ] Verify all 4 project pipes navigate correctly on deployed Amplify URL
- [ ] Run full Playwright test suite against production URL
- [ ] Add analytics (Plausible/GA) via environment variables if desired

---

## Verification Checklist

- [x] All 23 routes load without console errors (Playwright verified)
- [x] WorldMap → ProjectDetail navigation works for all 4 projects
- [x] Coin counter resets to 0 on page refresh
- [x] Audio mute state persists in localStorage
- [x] Tab visibility pauses/resumes background music
- [x] Touch interactions work on mobile (390px viewport)
- [x] 44px minimum touch targets on all interactive elements
- [x] No text overflow on mobile viewports
- [x] SAM template validates (`sam validate --lint`)
- [x] Build succeeds (`npm run build`)
- [x] Lint passes (`npm run lint`)
- [x] 404 page shows for invalid routes without redirecting to home
- [x] Resume PDF opens in new tab from Start, Pause, Contact, TopBar
- [x] GitHub repo link in footer/About
- [x] "Skip game, view portfolio" link on Start screen to `/about`
- [x] Twitter/X removed, empty/REPLACE_ME links hidden
- [x] No live demo buttons anywhere
- [x] `.env` in `.gitignore`, `.env.example` has `VITE_CONTACT_API_URL` with no value
- [x] No secrets committed to repo