export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'proficient' | 'experienced' | 'familiar';
  projectIds: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Software Development',
    icon: '💻',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'JavaScript', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
      { name: 'TypeScript', level: 'experienced', projectIds: ['stratforge-ai'] },
      { name: 'Next.js', level: 'experienced', projectIds: ['stratforge-ai'] },
      { name: 'Node.js', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
      { name: 'Express.js', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
      { name: 'Python', level: 'proficient', projectIds: ['azure-retail-pipeline'] },
      { name: 'Java', level: 'experienced', projectIds: [] },
      { name: 'C++', level: 'familiar', projectIds: [] },
      { name: 'HTML', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
      { name: 'CSS', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
      { name: 'REST APIs', level: 'proficient', projectIds: ['casino-platform', 'robotics-ecommerce'] },
    ],
  },
  {
    title: 'Data & Analytics',
    icon: '📊',
    color: 'from-purple-500 to-indigo-400',
    skills: [
      { name: 'SQL', level: 'proficient', projectIds: ['azure-retail-pipeline', 'construction-analytics', 'robotics-ecommerce'] },
      { name: 'Power BI', level: 'proficient', projectIds: ['azure-retail-pipeline', 'construction-analytics'] },
      { name: 'DAX', level: 'proficient', projectIds: ['azure-retail-pipeline', 'construction-analytics'] },
      { name: 'pandas', level: 'experienced', projectIds: ['azure-retail-pipeline'] },
      { name: 'Azure SQL Database', level: 'proficient', projectIds: ['azure-retail-pipeline'] },
      { name: 'Azure Data Factory', level: 'experienced', projectIds: ['azure-retail-pipeline'] },
      { name: 'Data Modeling', level: 'proficient', projectIds: ['azure-retail-pipeline', 'construction-analytics'] },
      { name: 'ETL Pipelines', level: 'experienced', projectIds: ['azure-retail-pipeline'] },
      { name: 'Excel', level: 'proficient', projectIds: ['construction-analytics'] },
      { name: 'Data Visualization', level: 'proficient', projectIds: ['azure-retail-pipeline', 'construction-analytics'] },
    ],
  },
  {
    title: 'IT & Systems',
    icon: '🖥️',
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: 'PowerShell', level: 'proficient', projectIds: ['hc-it-toolkit'] },
      { name: 'Active Directory', level: 'experienced', projectIds: ['hc-it-toolkit'] },
      { name: 'Windows Administration', level: 'proficient', projectIds: ['hc-it-toolkit'] },
      { name: 'Microsoft 365', level: 'proficient', projectIds: ['hc-it-toolkit'] },
      { name: 'Device Management', level: 'experienced', projectIds: ['hc-it-toolkit'] },
      { name: 'VPN Troubleshooting', level: 'experienced', projectIds: ['hc-it-toolkit'] },
      { name: 'Linux / Bash', level: 'experienced', projectIds: [] },
      { name: 'Hardware Troubleshooting', level: 'proficient', projectIds: ['hc-it-toolkit'] },
      { name: 'Network Diagnostics', level: 'experienced', projectIds: ['hc-it-toolkit'] },
      { name: 'User Account Support', level: 'proficient', projectIds: ['hc-it-toolkit'] },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠️',
    color: 'from-orange-500 to-amber-400',
    skills: [
      { name: 'Git / GitHub', level: 'proficient', projectIds: ['casino-platform', 'azure-retail-pipeline'] },
      { name: 'Azure', level: 'experienced', projectIds: ['azure-retail-pipeline'] },
      { name: 'MySQL', level: 'proficient', projectIds: ['robotics-ecommerce', 'casino-platform'] },
      { name: 'VS Code', level: 'proficient', projectIds: [] },
      { name: 'Vercel', level: 'experienced', projectIds: ['stratforge-ai'] },
      { name: 'Prisma', level: 'familiar', projectIds: ['stratforge-ai'] },
      { name: 'Vitest', level: 'familiar', projectIds: ['stratforge-ai'] },
      { name: 'Chart.js', level: 'experienced', projectIds: ['casino-platform'] },
      { name: 'Google Workspace', level: 'proficient', projectIds: [] },
      { name: 'Linux', level: 'experienced', projectIds: [] },
    ],
  },
];
