'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, ExternalLink, Mail, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function ResumePage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-3">
              <span className="text-slate-600">//</span> resume
            </div>
            <h1 className="text-4xl font-bold text-white">
              Online <span className="gradient-text">Résumé</span>
            </h1>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all whitespace-nowrap"
          >
            <Download size={16} /> Download PDF
          </a>
        </motion.div>

        {/* Resume card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111827] rounded-2xl overflow-hidden card-glow print:shadow-none"
        >
          {/* Name banner */}
          <div className="bg-gradient-to-r from-[#0d1f3c] to-[#111827] px-8 py-10 border-b border-white/5">
            <h2 className="text-4xl font-bold text-white mb-2">Carter Dockery</h2>
            <p className="text-cyan-400 font-semibold mb-4">
              Software Developer · Data & BI Developer · IT Professional
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <a href="mailto:cad171@uakron.edu" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Mail size={14} /> cad171@uakron.edu
              </a>
              <span className="flex items-center gap-1.5">
                📍 Copley, OH
              </span>
              <span className="flex items-center gap-1.5">
                📞 330-605-0037
              </span>
              <a
                href="https://www.linkedin.com/in/carter-dockery-924741350/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon size={14} /> LinkedIn
              </a>
              <a
                href="https://github.com/cad171uakron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon size={14} /> GitHub
              </a>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* Summary */}
            <Section icon={<Code2 size={16} />} title="Professional Summary">
              <p className="text-slate-400 leading-relaxed">
                Computer Information Systems graduate with experience in IT, data analysis, and technical problem solving. Skilled in SQL, Power BI, Python, Excel, and database management with a strong interest in using data to solve business problems and support informed decision-making. Experienced collaborating with cross-functional teams and building technical solutions through automation, reporting, and software development.
              </p>
            </Section>

            {/* Education */}
            <Section icon={<GraduationCap size={16} />} title="Education">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <p className="text-white font-semibold">University of Akron</p>
                  <p className="text-slate-400 text-sm">B.S. Computer Information Systems (Software Development)</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Coursework: Programming, Database Management, Unix/Linux Administration, Networking, Systems Analysis
                  </p>
                  <div className="flex gap-2 mt-2">
                    {['Dean\'s List', 'Magna Cum Laude', 'GPA: 3.6'].map((h) => (
                      <span key={h} className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-slate-500 text-sm flex-shrink-0">May 2026</span>
              </div>
            </Section>

            {/* Skills */}
            <Section icon={<Code2 size={16} />} title="Technical Skills">
              <div className="space-y-2">
                {[
                  { label: 'Data & Analytics', skills: 'SQL, Power BI, DAX, Excel, Database Management, Data Visualization, Data Analysis, ETL Pipelines, Azure Data Factory' },
                  { label: 'Languages', skills: 'Python, JavaScript, TypeScript, C++, HTML, CSS, Java, PowerShell, Bash' },
                  { label: 'Frameworks & Tools', skills: 'Node.js, Express.js, Next.js, REST APIs, Git, Azure SQL, MySQL' },
                  { label: 'IT & Systems', skills: 'Active Directory, Windows Administration, Microsoft 365, Google Workspace, Device Management, VPN, Linux' },
                  { label: 'Platforms', skills: 'Azure, Vercel, GitHub, VS Code' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 text-sm">
                    <span className="text-white font-semibold flex-shrink-0 w-36">{row.label}:</span>
                    <span className="text-slate-400">{row.skills}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Projects */}
            <Section icon={<Code2 size={16} />} title="Selected Projects">
              <div className="space-y-6">
                {[
                  {
                    title: 'Azure Retail Data Pipeline',
                    slug: 'azure-retail-pipeline',
                    tags: ['Azure SQL', 'Python', 'pandas', 'SQLAlchemy', 'Power BI'],
                    bullets: [
                      'Built an end-to-end retail analytics pipeline: CSV → pandas ETL → SQLAlchemy → Azure SQL Database → Power BI dashboard.',
                      'Created three named SQL reporting views (vw_SalesSummary, vw_CustomerLifetimeValue, vw_ProductPerformance) for dashboard consumption.',
                      'Delivered a 3-page Power BI dashboard: Executive Overview, Customer Insights, and Product Performance with 360K+ records.',
                    ],
                  },
                  {
                    title: 'FullStack Casino Platform',
                    slug: 'casino-platform',
                    tags: ['Node.js', 'MySQL', 'Express.js', 'JavaScript', 'Chart.js'],
                    bullets: [
                      'Built a 12-game online casino (Blackjack, Roulette, Baccarat, Craps, Texas Hold\'em, Slots, Mines, Keno, and more) with MVC + Service Layer architecture.',
                      'Game engines are pure functions isolated from the DB — 67 unit tests on Card, Hand, Deck, and Shoe classes.',
                      'Security hardened: prepared statements, helmet CSP, bcrypt, session fixation prevention, timing-attack-safe auth, SELECT FOR UPDATE atomic chip transactions.',
                    ],
                  },
                  {
                    title: 'HC Systems Toolkit',
                    slug: 'hc-it-toolkit',
                    tags: ['PowerShell', 'Windows', 'HTML', 'Batch'],
                    bullets: [
                      'Built HC Systems Toolkit v2.0.0 — a menu-driven PowerShell support console with 9 module categories deployed at Hilscher-Clarke.',
                      'Modules cover diagnostics, remote support, networking, Windows repair (SFC/DISM/Winget), Office, hardware, printers, utilities, and reports.',
                      'Includes validation test suite (Validate-Toolkit.ps1, Smoke-Toolkit.ps1, Test-Launch.ps1) and ScreenConnect remote deployment support.',
                    ],
                  },
                  {
                    title: 'Construction Project Analytics',
                    slug: 'construction-analytics',
                    tags: ['Power BI', 'DAX', 'Power Query'],
                    bullets: [
                      'Designed a two-page Power BI dashboard for a fictional construction project portfolio demonstrating data modeling and DAX calculations.',
                      'Built project health scoring model using weighted DAX measures and a star schema data model with Power Query transformations.',
                      'Produced executive-ready KPI cards, trend analysis, and interactive filtering with cross-visual highlighting.',
                    ],
                  },
                  {
                    title: 'StratForge AI',
                    slug: 'stratforge-ai',
                    tags: ['Next.js', 'TypeScript', 'Prisma', 'Vitest', 'Vercel'],
                    bullets: [
                      'Built a live CS2 tactical intelligence platform with deterministic game-state analysis and economy prediction — deployed on Vercel.',
                      'Implemented CS2 radar maps with accurately remapped 1024×1024 callout zone overlays and team profile management via Prisma ORM.',
                      'TypeScript throughout (99.4% of codebase); round outcome workflow tests with Vitest.',
                    ],
                  },
                  {
                    title: 'Robotics E-Commerce Platform',
                    slug: 'robotics-ecommerce',
                    tags: ['Node.js', 'Express.js', 'MySQL', 'JWT', 'React'],
                    bullets: [
                      'Built a full-stack robotics e-commerce site with product catalog, cart, and checkout backed by MySQL and a Node.js/Express REST API.',
                      'Implemented JWT authentication with bcryptjs password hashing and protected routes for user account management.',
                      'Designed relational MySQL schema with products, orders, and users tables; all queries use parameterized statements.',
                    ],
                  },
                ].map((proj) => (
                  <div key={proj.slug}>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-semibold">{proj.title}</h4>
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                      >
                        Case Study <ExternalLink size={11} />
                      </Link>
                      <div className="flex gap-1 ml-auto flex-wrap">
                        {proj.tags.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {proj.bullets.map((b, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-cyan-400 flex-shrink-0">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Experience */}
            <Section icon={<Briefcase size={16} />} title="Experience">
              <div className="space-y-6">
                {[
                  {
                    role: 'IT Intern',
                    company: 'Hilscher-Clarke',
                    period: 'June 2026 – Present',
                    bullets: [
                      'Automated IT tasks using PowerShell to improve efficiency and streamline routine administrative tasks.',
                      'Provided technical support while assisting with Google Workspace administration and device management.',
                      'Managed Windows and Apple devices, Active Directory accounts, and VPN configuration.',
                    ],
                  },
                  {
                    role: 'Security Officer',
                    company: 'Allied Universal Security Services',
                    period: 'Sep 2025 – June 2026',
                    bullets: [
                      'Coordinated incident reporting and maintained compliance documentation in fast-paced environments.',
                      'Strengthened communication and multitasking skills through public-facing operations.',
                    ],
                  },
                  {
                    role: 'Online Grocery Associate',
                    company: 'Walmart',
                    period: 'Jun 2023 – Jul 2024',
                    bullets: [
                      'Delivered customer-focused support while managing workflow prioritization and operational efficiency.',
                    ],
                  },
                ].map((exp) => (
                  <div key={exp.role + exp.company}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                      <div>
                        <span className="text-white font-semibold">{exp.role}</span>
                        <span className="text-slate-500"> · </span>
                        <span className="text-cyan-400">{exp.company}</span>
                      </div>
                      <span className="text-slate-500 text-sm flex-shrink-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-cyan-400 flex-shrink-0">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Leadership */}
            <Section icon={<Award size={16} />} title="Leadership & Activities">
              <p className="text-slate-400">
                NSLS Member · Magna Cum Laude Graduate · Dean's List · Football · Lacrosse
              </p>
            </Section>
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          Prefer a traditional format?{' '}
          <a href="/resume.pdf" download className="text-cyan-400 hover:underline">
            Download the PDF version
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-cyan-400">{icon}</div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex-1 h-px bg-white/5 ml-2" />
      </div>
      {children}
    </div>
  );
}
