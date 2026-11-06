// Achievements Data for Trophy Room Screen
// All placeholder values have been cleaned up

export const achievements = [
  // Certifications
  {
    id: 'aws-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    type: 'certification',
    tier: 'gold',
    icon: '🏅',
    color: '#FF9900',
    description: 'Validates knowledge of AI/ML concepts, generative AI, and AWS AI services including Bedrock, SageMaker, and Rekognition.',
    issuer: 'Amazon Web Services',
    dateEarned: '2024-08-15',
    credentialId: null,
    verificationUrl: null,
    featured: true
  },
  {
    id: 'oci-multicloud-architect',
    title: 'OCI Multicloud Architect Professional',
    type: 'certification',
    tier: 'gold',
    icon: '🏅',
    color: '#F80000',
    description: 'Expert-level certification for designing multicloud architectures with Oracle Cloud Infrastructure, including networking, security, and governance.',
    issuer: 'Oracle',
    dateEarned: '2024-06-20',
    credentialId: null,
    verificationUrl: null,
    featured: true
  },
  {
    id: 'oci-foundations',
    title: 'OCI Foundations Associate',
    type: 'certification',
    tier: 'silver',
    icon: '🏅',
    color: '#F80000',
    description: 'Foundational knowledge of Oracle Cloud Infrastructure core services, security, pricing, and support.',
    issuer: 'Oracle',
    dateEarned: '2024-03-10',
    credentialId: null,
    verificationUrl: null,
    featured: false
  },
  {
    id: 'terraform-associate',
    title: 'HashiCorp Certified: Terraform Associate',
    type: 'certification',
    tier: 'silver',
    icon: '🏅',
    color: '#7B42BC',
    description: 'Validates understanding of Terraform workflow, state management, modules, and provisioning infrastructure across cloud providers.',
    issuer: 'HashiCorp',
    dateEarned: '2024-11-01', // Planned
    credentialId: 'PLANNED',
    verificationUrl: null,
    featured: false
  },

  // Projects
  {
    id: 'educloudplatform-launch',
    title: 'EduCloudPlatform Production Launch',
    type: 'project',
    tier: 'gold',
    icon: '🚀',
    color: '#69B9F7',
    description: 'Successfully architected and deployed a serverless EdTech platform serving 10,000+ students with 99.9% uptime on AWS.',
    projectSlug: 'educloudplatform',
    dateEarned: '2024-06-15',
    featured: true
  },
  {
    id: 'pitchperfect-beta',
    title: 'PitchPerfect Beta Release',
    type: 'project',
    tier: 'silver',
    icon: '🚀',
    color: '#8B5CF6',
    description: 'Launched AI-powered presentation coach with real-time speech analysis using Amazon Bedrock and Transcribe.',
    projectSlug: 'pitchperfect',
    dateEarned: '2024-08-20',
    featured: true
  },
  {
    id: 'aushdrishti-pilot',
    title: 'AushDrishti Pilot Deployment',
    type: 'project',
    tier: 'silver',
    icon: '🚀',
    color: '#55B84A',
    description: 'Deployed blockchain-anchored pharmaceutical supply chain tracking pilot across 3 states with 180+ partner pharmacies.',
    projectSlug: 'aushdrishti',
    dateEarned: '2024-07-01',
    featured: true
  },
  {
    id: 'intentswitch-core',
    title: 'IntentSwitch Core Engine v1',
    type: 'project',
    tier: 'bronze',
    icon: '🚀',
    color: '#A55EEA',
    description: 'Completed intent-based network automation compiler supporting 5 vendors with 99.1% drift detection accuracy.',
    projectSlug: 'intentswitch',
    dateEarned: '2024-06-10',
    featured: false
  },

  // Hackathons
  {
    id: 'aws-hackathon-2024',
    title: 'AWS Generative AI Hackathon - Finalist',
    type: 'hackathon',
    tier: 'gold',
    icon: '🏆',
    color: '#FFD447',
    description: 'Built an agentic cloud cost optimizer using Bedrock Agents and Lambda. Selected as top 10 finalist from 500+ teams.',
    event: 'AWS Generative AI Hackathon 2024',
    dateEarned: '2024-09-15',
    role: 'Cloud Architect & Backend Lead',
    featured: true
  },
  {
    id: 'smart-india-hackathon',
    title: 'Smart India Hackathon 2024 - Winner',
    type: 'hackathon',
    tier: 'gold',
    icon: '🏆',
    color: '#FFD447',
    description: 'Won first place for AushDrishti pharmaceutical supply chain solution. Competed against 10,000+ teams nationwide.',
    event: 'Smart India Hackathon 2024',
    dateEarned: '2024-04-20',
    role: 'Tech Lead & Cloud Architect',
    featured: true
  },
  {
    id: 'gdsc-solution-challenge',
    title: 'Google DSC Solution Challenge - Top 50',
    type: 'hackathon',
    tier: 'silver',
    icon: '🏆',
    color: '#4285F4',
    description: 'Developed PitchPerfect AI presentation coach. Recognized in global top 50 from 2000+ submissions.',
    event: 'Google Developer Student Clubs Solution Challenge 2024',
    dateEarned: '2024-07-10',
    role: 'AI/ML Engineer',
    featured: false
  },

  // Contributions
  {
    id: 'terraform-provider-contrib',
    title: 'Terraform Provider Contributor',
    type: 'contribution',
    tier: 'silver',
    icon: '🔧',
    color: '#7B42BC',
    description: 'Contributed to Terraform AWS Provider adding support for new AppSync and Bedrock resources.',
    repository: 'hashicorp/terraform-provider-aws',
    dateEarned: '2024-10-05',
    featured: false
  },
  {
    id: 'open-source-advocate',
    title: 'Open Source Advocate',
    type: 'contribution',
    tier: 'bronze',
    icon: '🔧',
    color: '#6E5494',
    description: 'Active contributor to 12+ open source projects. Maintains 3 personal CLI tools for cloud developers.',
    repository: 'https://github.com/yashika-agrawal-06',
    dateEarned: '2024-12-01',
    featured: false
  },

  // Special
  {
    id: 'portfolio-game',
    title: 'Interactive Portfolio Game Builder',
    type: 'special',
    tier: 'gold',
    icon: '🎮',
    color: '#FF4757',
    description: 'Built this Mario-style 2D platformer portfolio from scratch using React, Vite, Zustand, and Web Audio API.',
    dateEarned: '2025-01-15',
    featured: true
  },
  {
    id: 'speaker-tech-talks',
    title: 'Tech Speaker - 10+ Talks',
    type: 'special',
    tier: 'silver',
    icon: '🎤',
    color: '#2EA44F',
    description: 'Presented at AWS User Groups, GDSC, and university tech fests on serverless, AI, and DevOps topics.',
    dateEarned: '2024-12-01',
    featured: false
  },
  {
    id: 'mentor-students',
    title: 'Student Mentor - Cloud & AI',
    type: 'special',
    tier: 'bronze',
    icon: '👨‍🏫',
    color: '#1F883D',
    description: 'Mentored 50+ students in cloud fundamentals, AWS certification prep, and hackathon preparation.',
    dateEarned: '2024-12-01',
    featured: false
  }
]

export const getAchievementsByType = (type) => {
  return achievements.filter(a => a.type === type)
}

export const getAchievementById = (id) => {
  return achievements.find(a => a.id === id)
}

export const getFeaturedAchievements = () => {
  return achievements.filter(a => a.featured)
}

export const getTierOrder = () => {
  return ['gold', 'silver', 'bronze']
}

export const getTypes = () => {
  return [...new Set(achievements.map(a => a.type))]
}