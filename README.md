# Yashika's Super World Portfolio 🍄

A Mario-style 2D pixel-art platformer portfolio website for **Yashika Agrawal** — B.Tech CSE at GLA University, Cloud/DevOps/AI focus.

Built with **React 18 + Vite + React Router v6**, plain CSS Modules, Zustand for state management, and Web Audio API for retro sound effects.

## 🎮 Live Demo

> **Deploy to:** GitHub Pages / Netlify / Vercel / AWS S3 + CloudFront  
> **URL:** `https://REPLACE_ME.github.io/yashika-portfolio/` (update after deploy)

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Preloader** | Cinematic loading with orbiting character & mystery block sync |
| **Start Screen** | Welcome avatar, speech bubble with clue, START ADVENTURE / VIEW RESUME |
| **Guess Minigame** | 6 ? blocks (AWS, Python, Docker, React, Terraform, GenAI) — AWS wins! |
| **Unlocked Screen** | Confetti, fanfare, +30 coins, enter overworld map |
| **Overworld Map** | 4 green pipes → project detail levels |
| **Project Detail** | Tabs: Overview, Tech Stack, Metrics, Journey — mark cleared for coins |
| **Skills (Power-Ups)** | 18 skills across 4 categories with proficiency bars |
| **Achievements (Trophy Room)** | 17 achievements: certs, projects, hackathons, contributions, special |
| **Contact Form** | Real API integration (AWS Lambda + API Gateway + SES) |
| **Pause Menu** | Persistent overlay: Resume, View Resume, Map, GitHub, LinkedIn, Contact |
| **Persistence** | localStorage for coins, visited/cleared levels, sound preference |
| **Sound FX** | Coin, beep, bump, fanfare — muted by default |
| **Accessibility** | Semantic HTML, ARIA labels, focus-visible, prefers-reduced-motion, skip links |

## 🛠 Tech Stack

- **React 18** + **Vite 5** + **React Router v6**
- **Zustand** + persist middleware for global state
- **Plain CSS Modules** with CSS Custom Properties design system
- **Web Audio API** for retro sound effects
- **Google Fonts:** Press Start 2P (headings), Fredoka/Nunito Sans (body), Material Symbols
- **ESLint** + **Prettier** configured

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/REPLACE_ME/yashika-portfolio.git
cd yashika-portfolio
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your VITE_CONTACT_API_URL

# Development server
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview

# Lint
npm run lint
```

## 📁 Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Routes + persistent HUD/PauseMenu
├── config/
│   └── gameConfig.js        # FAVORITE_TECH, HINTS, COIN_REWARDS
├── content/
│   ├── projects.js          # 4 project definitions
│   ├── skills.js            # 18 skills across 4 categories
│   ├── achievements.js      # 17 achievements
│   └── links.js             # Social/project URLs
├── hooks/
│   └── useGameStore.js      # Zustand store with localStorage persistence
├── screens/
│   ├── Preloader.jsx        # Cinematic loading screen
│   ├── Start.jsx            # Welcome screen
│   ├── Guess.jsx            # Mystery block minigame
│   ├── Unlocked.jsx         # Celebration screen
│   ├── About.jsx            # Profile & bio
│   ├── Skills.jsx           # Power-Ups collection
│   ├── Achievements.jsx     # Trophy Room
│   ├── Map.jsx              # Overworld with 4 pipes
│   ├── ProjectDetail.jsx    # Dynamic :slug project view
│   └── Contact.jsx          # Form with validation + API
├── components/
│   ├── PixelButton.jsx      # Reusable 3D bevel button
│   ├── PixelPanel.jsx       # Panel wrapper variants
│   ├── TopBar.jsx           # Persistent HUD
│   ├── QuestionBlock.jsx    # Mario ? block component
│   ├── Coin.jsx             # Animated coin counter
│   ├── Modal.jsx            # Accessible modal overlay
│   └── PauseMenu.jsx        # Full-screen pause overlay
└── styles/
    └── theme.css            # 400+ lines: design tokens, animations, utilities
```

## 🔧 Configuration

### Required Placeholders (Replace All `REPLACE_ME`)

| File | Placeholders |
|------|--------------|
| `.env` | `VITE_CONTACT_API_URL` |
| `src/config/gameConfig.js` | `FAVORITE_TECH` (default: "AWS") |
| `src/content/projects.js` | All project URLs (live, github, docs, caseStudy) |
| `src/content/skills.js` | Certification credential IDs |
| `src/content/achievements.js` | Credential IDs, verification URLs, repo links |
| `src/content/links.js` | All social, project, and API URLs |
| `src/components/PauseMenu.jsx` | GitHub/LinkedIn profile URLs |

### Search & Replace Commands

```bash
# Find all placeholders
grep -r "REPLACE_ME" src/ --include="*.js" --include="*.jsx"

# Replace globally (example)
sed -i 's|REPLACE_ME|your-github-username|g' src/content/links.js
```

## 🎨 Design System (CSS Custom Properties)

```css
/* Colors */
--sky: #69B9F7;
--grass: #55B84A;
--gold: #FFD447;
--brick: #D1495B;
--cream: #FFF5DC;
--border-dark: #1E282D;

/* Typography */
--font-pixel: "Press Start 2P", cursive;
--font-body: "Fredoka", "Nunito Sans", sans-serif;

/* Spacing (4px grid) */
--space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;

/* Shadows */
--shadow-sm: 2px 2px 0 var(--border-dark);
--shadow-md: 4px 4px 0 var(--border-dark);
--shadow-lg: 6px 6px 0 var(--border-dark);
--shadow-xl: 8px 8px 0 var(--border-dark);

/* Animations */
coinSpin, cloudFloat, blockBump, coinEject, shakeHoriz, questionGleam, bounceIdle, pulseGentle, fadeIn, slideUp
```

## 🎯 Routes

| Path | Screen |
|------|--------|
| `/` | Preloader → Start |
| `/guess` | Guess My Favorite Tech minigame |
| `/unlocked` | Celebration (auto-redirect from Guess) |
| `/about` | About Yashika |
| `/skills` | Power-Ups collection |
| `/achievements` | Trophy Room |
| `/map` | Overworld map (4 pipes) |
| `/project/:slug` | Project detail (educloudplatform, pitchperfect, aushdrishti, intentswitch) |
| `/contact` | Contact form |

## 📦 Deployment

### GitHub Pages

```bash
# Build with correct base path
npm run build

# Deploy dist/ folder to gh-pages branch
npx gh-pages -d dist
```

### Netlify / Vercel

1. Connect repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable: `VITE_CONTACT_API_URL`

### AWS S3 + CloudFront (Static Website)

```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Note:** `vite.config.js` has `base: './'` for relative paths (works on any static host).

## 🧪 Testing Checklist

- [ ] All 10 routes load without console errors
- [ ] Preloader → Start transition works (Space/Enter)
- [ ] Guess minigame: 5 wrong blocks shake, AWS triggers confetti + unlock
- [ ] Unlocked screen shows +30 coins, fanfare, Enter Map button
- [ ] Map: 4 pipes clickable, hover tooltips show project info
- [ ] ProjectDetail tabs switch, Mark Cleared awards coins
- [ ] Skills: category filter works, hover tooltips show details
- [ ] Achievements: filter by type, click to unlock awards points
- [ ] Contact form: validation works, success/error modals appear
- [ ] Pause menu opens on every screen (TopBar button + Escape key)
- [ ] TopBar: coin counter spins, sound toggle persists, quick-nav works
- [ ] localStorage: refresh preserves coins, visited, cleared, sound
- [ ] Sound: muted by default, toggle works, all SFX play
- [ ] Accessibility: Tab navigation, ARIA labels, focus visible, reduced motion
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1440px)
- [ ] Build passes: `npm run build` (no errors)
- [ ] Lint passes: `npm run lint` (no errors)

## 📝 Backend Setup (Contact Form)

See **[backend-notes/README.md](backend-notes/README.md)** for complete AWS Lambda + API Gateway + SES setup instructions.

## 🎓 Credits

- **Design:** Created with Stitch (Google)
- **Fonts:** Google Fonts (Press Start 2P, Fredoka, Nunito Sans, Material Symbols)
- **Icons:** Unicode emoji + inline SVG
- **Inspiration:** Super Mario Bros. 3 overworld aesthetics

## 📄 License

MIT License — feel free to fork and customize for your own portfolio!

---

**Built with ❤️ by Yashika Agrawal**  
B.Tech CSE • GLA University • AWS AI Practitioner • OCI Multicloud Architect  
[GitHub](https://github.com/REPLACE_ME) • [LinkedIn](https://linkedin.com/in/REPLACE_ME)