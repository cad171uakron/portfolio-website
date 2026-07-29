export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship' | 'part-time';
  current: boolean;
  description: string;
  bullets: string[];
  skills: string[];
  color: string;
}

export const experiences: Experience[] = [
  {
    id: 'hilscher-clarke',
    role: 'IT Intern',
    company: 'Hilscher-Clarke',
    period: 'June 2026 – Present',
    type: 'internship',
    current: true,
    description:
      'Providing technical support and building automation tools for a professional services firm. Focused on end-user support, Windows and Apple device management, and PowerShell-based IT automation.',
    bullets: [
      'Automated routine IT tasks using PowerShell, reducing manual intervention for common support workflows',
      'Provided end-user technical support across hardware, software, and connectivity issues',
      'Managed Google Workspace administration including account provisioning and access control',
      'Supported Windows and Apple device management including imaging and configuration',
      'Assisted with Active Directory account management and group policy troubleshooting',
      'Configured and troubleshot VPN access for remote users',
      'Maintained documentation and supported ticket management workflows',
      'Collaborated with IT and data teams on cross-functional projects',
    ],
    skills: ['PowerShell', 'Windows Administration', 'Active Directory', 'Google Workspace', 'Device Management', 'VPN', 'IT Support'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'allied-universal',
    role: 'Security Officer',
    company: 'Allied Universal Security Services',
    period: 'Sep 2025 – June 2026',
    type: 'full-time',
    current: false,
    description:
      'Maintained site security and incident response in fast-paced environments, developing strong documentation, communication, and operational discipline skills.',
    bullets: [
      'Coordinated incident reporting and maintained compliance documentation in fast-paced environments',
      'Strengthened communication and multitasking skills through public-facing operations',
      'Enforced site security protocols and access control procedures',
      'Maintained accurate shift logs and incident reports',
    ],
    skills: ['Documentation', 'Communication', 'Compliance', 'Incident Response'],
    color: 'from-slate-500 to-gray-400',
  },
  {
    id: 'walmart',
    role: 'Online Grocery Associate',
    company: 'Walmart',
    period: 'Jun 2023 – Jul 2024',
    type: 'part-time',
    current: false,
    description:
      'Managed high-volume order fulfillment while developing workflow prioritization and customer service skills.',
    bullets: [
      'Delivered customer-focused support while managing workflow prioritization and operational efficiency',
      'Processed high-volume online orders with accuracy and speed',
      'Collaborated with team members to meet daily performance targets',
    ],
    skills: ['Customer Service', 'Workflow Management', 'Team Collaboration'],
    color: 'from-slate-500 to-gray-400',
  },
];

export const education = {
  school: 'University of Akron',
  degree: 'B.S. Computer Information Systems',
  track: 'Software Development',
  graduated: 'May 2026',
  gpa: '3.6',
  honors: ['Dean\'s List', 'Magna Cum Laude'],
  coursework: [
    'Database Management',
    'Advanced Unix and Linux',
    'Business Data Networks and Security',
    'Programming in Cybersecurity',
    'Web Development',
    'Software Development',
    'Systems Analysis',
    'Networking',
  ],
  activities: ['NSLS Member', 'Football', 'Lacrosse'],
};
