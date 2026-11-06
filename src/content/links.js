// Links Configuration
// All placeholder URLs have been replaced with actual values or set to null

export const links = {
  // Social & Professional
  github: 'https://github.com/yashika-agrawal-06/',
  linkedin: 'https://www.linkedin.com/in/yashikaagrawal19',
  email: 'mailto:yashikaagrawal1926@gmail.com',
  leetcode: 'https://leetcode.com/yashikaagrawal19',
  codeforces: 'https://codeforces.com/profile/yashikaagrawal19',

  // Portfolio & Resume
  portfolio: 'https://yashika-agrawal.dev',
  resume: 'Yashika_Agrawal_resume_o.pdf', // Ensure this file is in the public directory (case-sensitive)

  // Certifications Verification - TODO: Update with real verification URLs from resume PDF
  // AWS AI Practitioner: Update with Credly badge URL when available
  // OCI Multicloud Architect: Update with Oracle catalog URL when available
  // OCI Foundations: Update with Oracle catalog URL when available
  // HashiCorp Terraform Associate: Planned - update when earned
  awsAiPractitioner: null,
  ociMulticloudArchitect: null,
  ociFoundations: null,
  terraformAssociate: null,

  // Project Links (matching projects.js)
  // Set to null if not available - components will conditionally render
  projects: {
    educloudplatform: {
      live: null,
      github: 'https://github.com/yashika-agrawal-06/educloudplatform',
      docs: null,
      caseStudy: null
    },
    pitchperfect: {
      live: null,
      github: 'https://github.com/yashika-agrawal-06/pitchperfect',
      docs: null,
      caseStudy: null
    },
    aushdrishti: {
      live: null,
      github: 'https://github.com/yashika-agrawal-06/aushdrishti',
      docs: null,
      caseStudy: null
    },
    intentswitch: {
      live: null,
      github: 'https://github.com/yashika-agrawal-06/intentswitch',
      docs: null,
      caseStudy: null
    }
  },

  // Contact Form - Set via VITE_CONTACT_API_URL env variable
  contactApi: null,

  // External Resources
  awsCertification: 'https://aws.amazon.com/certification/',
  ociCertification: 'https://education.oracle.com/oracle-cloud-infrastructure',
  hashicorpCertification: 'https://www.hashicorp.com/certification',

  // Hackathons & Events
  awsHackathon: 'https://aws.amazon.com/blogs/machine-learning/',
  smartIndiaHackathon: 'https://www.sih.gov.in/',
  gdscSolutionChallenge: 'https://developers.google.com/community/dsc-solution-challenge'
}

export const getProjectLinks = (slug) => {
  return links.projects[slug] || {}
}

export const getSocialLinks = () => {
  return {
    github: links.github,
    linkedin: links.linkedin,
    email: links.email,
    leetcode: links.leetcode,
    codeforces: links.codeforces
  }
}