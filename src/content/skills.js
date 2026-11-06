// Skills Data for Power-Ups Screen
// Replace with actual skill proficiency levels and details

export const skills = [
  // Cloud & DevOps
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: '#FF9900',
    certifications: ['AWS Certified AI Practitioner', 'AWS Solutions Architect Associate (in progress)'],
    description: 'Core cloud platform for all projects. Expert in Lambda, API Gateway, DynamoDB, CloudFront, Step Functions, Bedrock, SageMaker, IAM, CDK.',
    projects: ['EduCloudPlatform', 'PitchPerfect'],
    keywords: ['Serverless', 'Infrastructure as Code', 'CI/CD', 'Multi-region', 'Cost Optimization']
  },
  {
    id: 'oci',
    name: 'Oracle Cloud Infrastructure',
    category: 'Cloud & DevOps',
    icon: '🔶',
    color: '#F80000',
    certifications: ['OCI Multicloud Architect Professional', 'OCI Foundations Associate'],
    description: 'Multi-cloud strategy implementation. Strong in Compute, Networking, Object Storage, OKE, and Terraform provider.',
    projects: ['EduCloudPlatform'],
    keywords: ['Multi-cloud', 'Terraform Provider', 'OKE', 'Networking']
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'Cloud & DevOps',
    icon: '🏗️',
    color: '#7B42BC',
    certifications: ['HashiCorp Certified: Terraform Associate (planned)'],
    description: 'Primary IaC tool. Modules, workspaces, remote state, custom providers, testing with Terratest.',
    projects: ['EduCloudPlatform', 'PitchPerfect', 'AushDrishti', 'IntentSwitch'],
    keywords: ['Modules', 'Workspaces', 'Remote State', 'Testing', 'Custom Providers']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'Cloud & DevOps',
    icon: '⚓',
    color: '#326CE5',
    certifications: ['CKA (planned)'],
    description: 'Container orchestration for microservices. Helm, Kustomize, Operators, ArgoCD, Istio service mesh.',
    projects: ['AushDrishti', 'IntentSwitch'],
    keywords: ['Helm', 'ArgoCD', 'Operators', 'Service Mesh', 'GitOps']
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'Cloud & DevOps',
    icon: '🐳',
    color: '#2496ED',
    description: 'Containerization, multi-stage builds, BuildKit, Docker Compose, security scanning, distroless images.',
    projects: ['All Projects'],
    keywords: ['Multi-stage Builds', 'BuildKit', 'Security Scanning', 'Distroless']
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipelines',
    category: 'Cloud & DevOps',
    icon: '🔄',
    color: '#2088FF',
    description: 'GitHub Actions, GitLab CI, CodePipeline, Argo Workflows. Automated testing, security scanning, progressive delivery.',
    projects: ['All Projects'],
    keywords: ['GitHub Actions', 'Progressive Delivery', 'Security Scanning', 'Automated Testing']
  },

  // AI & ML
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'AI & ML',
    icon: '🤖',
    color: '#8B5CF6',
    certifications: ['AWS Certified AI Practitioner'],
    description: 'LLM integration with Bedrock, Claude, GPT. RAG pipelines, prompt engineering, agentic workflows, function calling.',
    projects: ['PitchPerfect'],
    keywords: ['Bedrock', 'RAG', 'Prompt Engineering', 'Agents', 'Function Calling']
  },
  {
    id: 'python-ml',
    name: 'Python & ML Stack',
    category: 'AI & ML',
    icon: '🐍',
    color: '#3776AB',
    description: 'PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy. MLOps with MLflow, Kubeflow, SageMaker Pipelines.',
    projects: ['PitchPerfect', 'AushDrishti'],
    keywords: ['PyTorch', 'MLOps', 'SageMaker', 'Feature Engineering', 'Model Deployment']
  },
  {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    category: 'AI & ML',
    icon: '🛏️',
    color: '#FF9900',
    description: 'Managed foundation models (Claude, Titan, Llama). Knowledge bases, agents, guardrails, model evaluation.',
    projects: ['PitchPerfect'],
    keywords: ['Claude 3', 'Knowledge Bases', 'Agents', 'Guardrails', 'Evaluation']
  },

  // Frontend & Fullstack
  {
    id: 'react',
    name: 'React & TypeScript',
    category: 'Frontend & Fullstack',
    icon: '⚛️',
    color: '#61DAFB',
    description: 'Modern React with hooks, context, suspense. TypeScript strict mode. Next.js, Vite, Tailwind CSS, testing with Vitest/RTL.',
    projects: ['PitchPerfect', 'AushDrishti', 'IntentSwitch', 'This Portfolio'],
    keywords: ['Hooks', 'TypeScript', 'Next.js', 'Tailwind', 'Testing']
  },
  {
    id: 'nodejs',
    name: 'Node.js & Backend',
    category: 'Frontend & Fullstack',
    icon: '🟢',
    color: '#339933',
    description: 'Express, Fastify, NestJS. GraphQL with Apollo, REST APIs, WebSocket servers, authentication (JWT, OAuth2, Cognito).',
    projects: ['PitchPerfect', 'AushDrishti', 'IntentSwitch'],
    keywords: ['Express', 'GraphQL', 'WebSockets', 'Authentication', 'Microservices']
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: 'Frontend & Fullstack',
    icon: '🐹',
    color: '#00ADD8',
    description: 'High-performance services, gRPC, CLI tools, Kubernetes operators. Standard library mastery, concurrency patterns.',
    projects: ['IntentSwitch', 'AushDrishti'],
    keywords: ['gRPC', 'Concurrency', 'Operators', 'CLI Tools', 'Standard Library']
  },

  // Tools & Practices
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'Tools & Practices',
    icon: '🐙',
    color: '#181717',
    description: 'Advanced workflows: trunk-based development, monorepos, GitHub Actions, Dependabot, Codespaces, security advisories.',
    projects: ['All Projects'],
    keywords: ['Trunk-based', 'Monorepos', 'Actions', 'Security', 'Codespaces']
  },
  {
    id: 'monitoring',
    name: 'Observability',
    category: 'Tools & Practices',
    icon: '📊',
    color: '#E6522C',
    description: 'Prometheus, Grafana, OpenTelemetry, CloudWatch, X-Ray, Loki, Tempo. SLI/SLO definition, alerting, distributed tracing.',
    projects: ['EduCloudPlatform', 'AushDrishti', 'IntentSwitch'],
    keywords: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Distributed Tracing', 'SLI/SLO']
  },
  {
    id: 'security',
    name: 'Cloud Security',
    category: 'Tools & Practices',
    icon: '🔒',
    color: '#DC2626',
    description: 'Zero-trust architecture, IAM least privilege, WAF, GuardDuty, Security Hub, compliance (SOC2, ISO27001), threat modeling.',
    projects: ['EduCloudPlatform', 'IntentSwitch'],
    keywords: ['Zero Trust', 'IAM', 'WAF', 'Compliance', 'Threat Modeling']
  },
  {
    id: 'linux-networking',
    name: 'Linux & Networking',
    category: 'Tools & Practices',
    icon: '🐧',
    color: '#FCC624',
    description: 'Linux internals, systemd, eBPF, TCP/IP, DNS, TLS, VPC design, transit gateways, VPN, load balancing, CDN.',
    projects: ['All Projects'],
    keywords: ['eBPF', 'VPC Design', 'Transit Gateway', 'Load Balancing', 'CDN']
  }
]

export const getSkillsByCategory = (category) => {
  return skills.filter(s => s.category === category)
}

export const getSkillById = (id) => {
  return skills.find(s => s.id === id)
}

export const getCategories = () => {
  return [...new Set(skills.map(s => s.category))]
}

// Returns first N skills (alphabetically by name) since proficiency is no longer tracked
export const getTopSkills = (count = 6) => {
  return [...skills].sort((a, b) => a.name.localeCompare(b.name)).slice(0, count)
}