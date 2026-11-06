// Game Configuration

export const FAVORITE_TECH = 'AWS'
export const CORRECT_POSITION = 2
export const OTHER_TECH = ['Python', 'Docker', 'React', 'Terraform', 'Generative AI']

// Build the six blocks in fixed order with FAVORITE_TECH inserted at CORRECT_POSITION
// Order: Python, Docker, AWS, React, Terraform, Generative AI
export const TECH_OPTIONS = [
  ...OTHER_TECH.slice(0, CORRECT_POSITION),
  FAVORITE_TECH,
  ...OTHER_TECH.slice(CORRECT_POSITION)
]

export const HINTS = [
  'It\'s something I use to build in the cloud.',
  'The logo has an orange smile.',
  'Serverless? This is the place.',
  'Infrastructure as Code works great here.',
  'Certified practitioners know this well.',
  'AI services like Bedrock live here.'
]

export const COIN_REWARDS = {
  START_ADVENTURE: 5,
  VIEW_RESUME: 2,
  GUESS_ATTEMPT: 1,
  GUESS_CORRECT: 10,
  GUESS_BONUS: 20,
  LEVEL_CLEAR: 30,
  PROJECT_VISIT: 5,
  PROJECT_CLEAR: 15,
  SKILL_VIEW: 2,
  ACHIEVEMENT_UNLOCK: 25,
  CONTACT_SUBMIT: 10
}

export const PROJECT_SLUGS = [
  'educloudplatform',
  'pitchperfect',
  'aushdrishti',
  'intentswitch'
]

export const SKILL_CATEGORIES = [
  'Cloud & DevOps',
  'AI & ML',
  'Frontend & Fullstack',
  'Tools & Practices'
]

export const ACHIEVEMENT_TYPES = [
  'certification',
  'project',
  'hackathon',
  'contribution',
  'special'
]