// Project Data for Portfolio
// Replace placeholder URLs and details with actual project information

export const projects = [
  {
    slug: 'educloudplatform',
    title: 'EduCloudPlatform',
    shortTitle: 'EduCloud',
    tagline: 'Serverless EdTech Platform on AWS',
    description: `A comprehensive serverless education platform built on AWS, featuring automated course delivery, real-time analytics, and AI-powered personalized learning paths. The platform serves 10,000+ students with 99.9% uptime.`,
    longDescription: `EduCloudPlatform is a full-stack serverless EdTech solution architected on AWS. It leverages Lambda for compute, API Gateway for REST/GraphQL APIs, DynamoDB for NoSQL storage, and CloudFront for global content delivery. The platform includes AI-driven course recommendations using SageMaker, automated assessment grading with Step Functions, and real-time collaboration via AppSync.`,
    techStack: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudFront', 'SageMaker', 'Step Functions', 'AppSync', 'Terraform', 'TypeScript', 'React'],
    category: 'Cloud & DevOps',
    status: 'Production',
    featured: true,
    images: {
      thumbnail: '/images/projects/educloud-thumb.jpg',
      hero: '/images/projects/educloud-hero.jpg',
      screenshots: [
        '/images/projects/educloud-1.jpg',
        '/images/projects/educloud-2.jpg',
        '/images/projects/educloud-3.jpg'
      ]
    },
    links: {
      live: 'https://REPLACE_ME.educloudplatform.com',
      github: 'https://github.com/REPLACE_ME/educloudplatform',
      docs: 'https://docs.REPLACE_ME.educloudplatform.com',
      caseStudy: 'https://REPLACE_ME.com/case-studies/educloudplatform'
    },
    timeline: [
      { date: '2024-01', event: 'Project initiated' },
      { date: '2024-03', event: 'MVP deployed to staging' },
      { date: '2024-06', event: 'Production launch' },
      { date: '2024-09', event: 'AI recommendations v2 released' }
    ],
    challenges: [
      'Scaling real-time collaboration for 10K+ concurrent users',
      'Optimizing cold starts for Lambda functions',
      'Implementing cost-effective multi-region deployment'
    ],
    learnings: [
      'Event-driven architectures reduce coupling significantly',
      'Provisioned concurrency is essential for consistent latency',
      'Terraform modules enable reusable, maintainable IaC'
    ]
  },
  {
    slug: 'pitchperfect',
    title: 'PitchPerfect',
    shortTitle: 'PitchPerfect',
    tagline: 'AI-Powered Presentation Coach',
    description: `An AI-driven presentation analysis tool that provides real-time feedback on speech pace, filler words, tone, and slide engagement. Built with generative AI for personalized coaching.`,
    longDescription: `PitchPerfect uses Amazon Bedrock (Claude 3) and Amazon Transcribe to analyze presentation recordings and live sessions. It provides actionable feedback on speaking pace, filler word detection, tonal variation, and audience engagement metrics. The frontend is a React/TypeScript SPA with real-time WebSocket updates.`,
    techStack: ['Amazon Bedrock', 'Amazon Transcribe', 'Claude 3', 'React', 'TypeScript', 'WebSocket', 'AWS Amplify', 'Tailwind CSS', 'Python', 'FastAPI'],
    category: 'AI & ML',
    status: 'Beta',
    featured: true,
    images: {
      thumbnail: '/images/projects/pitchperfect-thumb.jpg',
      hero: '/images/projects/pitchperfect-hero.jpg',
      screenshots: [
        '/images/projects/pitchperfect-1.jpg',
        '/images/projects/pitchperfect-2.jpg'
      ]
    },
    links: {
      live: 'https://REPLACE_ME.pitchperfect.app',
      github: 'https://github.com/REPLACE_ME/pitchperfect',
      docs: 'https://docs.REPLACE_ME.pitchperfect.app',
      caseStudy: null
    },
    timeline: [
      { date: '2024-02', event: 'Research & prototyping' },
      { date: '2024-05', event: 'Alpha release' },
      { date: '2024-08', event: 'Beta launch with Bedrock integration' },
      { date: '2024-11', event: 'Enterprise features in development' }
    ],
    challenges: [
      'Real-time audio processing with low latency',
      'Prompt engineering for consistent AI coaching',
      'Handling diverse accents and audio quality'
    ],
    learnings: [
      'Streaming responses improve perceived performance',
      'Fine-tuned prompts outperform generic ones for coaching',
      'User feedback loops are critical for AI products'
    ]
  },
  {
    slug: 'aushdrishti',
    title: 'AushDrishti',
    shortTitle: 'AushDrishti',
    tagline: 'Healthcare Supply Chain Visibility',
    description: `A blockchain-anchored supply chain tracking system for pharmaceutical distribution, ensuring medicine authenticity and temperature compliance from manufacturer to patient.`,
    longDescription: `AushDrishti provides end-to-end visibility for pharmaceutical supply chains using Hyperledger Fabric for immutable records and IoT sensors for temperature monitoring. The system integrates with existing ERP systems via REST APIs and provides a consumer-facing verification app. Built with a microservices architecture on Kubernetes.`,
    techStack: ['Hyperledger Fabric', 'Kubernetes', 'Docker', 'Go', 'React Native', 'Node.js', 'PostgreSQL', 'InfluxDB', 'Grafana', 'Prometheus', 'Helm', 'ArgoCD'],
    category: 'Frontend & Fullstack',
    status: 'Pilot',
    featured: true,
    images: {
      thumbnail: '/images/projects/aushdrishti-thumb.jpg',
      hero: '/images/projects/aushdrishti-hero.jpg',
      screenshots: [
        '/images/projects/aushdrishti-1.jpg',
        '/images/projects/aushdrishti-2.jpg',
        '/images/projects/aushdrishti-3.jpg'
      ]
    },
    links: {
      live: 'https://REPLACE_ME.aushdrishti.health',
      github: 'https://github.com/REPLACE_ME/aushdrishti',
      docs: 'https://docs.REPLACE_ME.aushdrishti.health',
      caseStudy: 'https://REPLACE_ME.com/case-studies/aushdrishti'
    },
    timeline: [
      { date: '2023-09', event: 'Requirements gathering with pharma partners' },
      { date: '2024-01', event: 'Blockchain network deployed' },
      { date: '2024-04', event: 'IoT sensor integration complete' },
      { date: '2024-07', event: 'Pilot launch in 3 states' }
    ],
    challenges: [
      'Integrating legacy ERP systems with blockchain',
      'Ensuring GDPR/HIPAA compliance for health data',
      'Offline-first mobile app for areas with poor connectivity'
    ],
    learnings: [
      'Permissioned blockchains suit regulated industries well',
      'IoT data pipelines need robust edge buffering',
      'Stakeholder alignment is harder than technical implementation'
    ]
  },
  {
    slug: 'intentswitch',
    title: 'IntentSwitch',
    shortTitle: 'IntentSwitch',
    tagline: 'Intent-Based Network Automation',
    description: `A declarative network automation platform that translates high-level business intent into device configurations across multi-vendor infrastructure using intent-based networking principles.`,
    longDescription: `IntentSwitch allows network operators to define desired network state in YAML (intent), which the platform compiles into vendor-specific configurations (Cisco, Juniper, Arista). It includes drift detection, automated remediation, and a GitOps workflow. The core engine is written in Go with a React-based policy designer.`,
    techStack: ['Go', 'React', 'TypeScript', 'gRPC', 'NATS', 'Kubernetes', 'Terraform', 'Ansible', 'NetBox', 'Prometheus', 'OpenTelemetry'],
    category: 'Tools & Practices',
    status: 'Development',
    featured: false,
    images: {
      thumbnail: '/images/projects/intentswitch-thumb.jpg',
      hero: '/images/projects/intentswitch-hero.jpg',
      screenshots: [
        '/images/projects/intentswitch-1.jpg',
        '/images/projects/intentswitch-2.jpg'
      ]
    },
    links: {
      live: null,
      github: 'https://github.com/REPLACE_ME/intentswitch',
      docs: 'https://docs.REPLACE_ME.intentswitch.io',
      caseStudy: null
    },
    timeline: [
      { date: '2023-11', event: 'Architecture design' },
      { date: '2024-02', event: 'Core compiler engine v1' },
      { date: '2024-06', event: 'Multi-vendor support added' },
      { date: '2024-10', event: 'GitOps workflow integration' }
    ],
    challenges: [
      'Normalizing vendor-specific configuration semantics',
      'Building a reliable drift detection engine',
      'Designing an intuitive intent DSL for network engineers'
    ],
    learnings: [
      'Declarative models reduce configuration errors by 80%+',
      'GitOps is essential for network change management',
      'Vendor SDKs vary wildly in quality and coverage'
    ]
  }
]

export const getProjectBySlug = (slug) => {
  return projects.find(p => p.slug === slug)
}

export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured)
}

export const getProjectsByCategory = (category) => {
  return projects.filter(p => p.category === category)
}