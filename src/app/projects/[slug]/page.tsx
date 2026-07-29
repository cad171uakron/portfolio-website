'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { getProjectBySlug, projects } from '@/data/projects';
import { use } from 'react';
import CodeBlock from '@/components/CodeBlock';
import ArchitectureFlow, { FlowNode } from '@/components/ArchitectureFlow';

// Per-project code snippets
const CODE_SNIPPETS: Record<string, { language: string; filename: string; code: string }[]> = {
  'azure-retail-pipeline': [
    {
      language: 'python',
      filename: 'etl_pipeline.py',
      code: `import pandas as pd
from sqlalchemy import create_engine, text

# Load and transform raw CSV data
df = pd.read_csv('retail_sales.csv', parse_dates=['order_date'])
df['revenue']  = df['quantity'] * df['unit_price']
df['month']    = df['order_date'].dt.to_period('M').astype(str)
df['is_repeat_customer'] = df.groupby('customer_id')['order_id'].transform('count') > 1

# Push to Azure SQL Database
engine = create_engine(AZURE_SQL_CONNECTION_STRING)
df.to_sql('sales_fact', engine, if_exists='replace', index=False, chunksize=5000)

# Create reporting views
with engine.connect() as conn:
    conn.execute(text("""
        CREATE OR REPLACE VIEW vw_SalesSummary AS
        SELECT month, SUM(revenue) AS total_revenue,
               COUNT(DISTINCT customer_id) AS unique_customers
        FROM sales_fact GROUP BY month
    """))`,
    },
  ],
  'casino-platform': [
    {
      language: 'javascript',
      filename: 'chip-transaction.service.js',
      code: `// Atomic chip operation — SELECT FOR UPDATE prevents race conditions
async function processGameResult(userId, betAmount, outcome) {
  return await db.transaction(async (trx) => {
    // Lock the row for this transaction
    const [profile] = await trx('profiles')
      .where({ user_id: userId })
      .forUpdate()  // SELECT FOR UPDATE
      .select('chips');

    if (profile.chips < betAmount)
      throw new Error('Insufficient chips');

    const payout = outcome.win ? betAmount * outcome.multiplier : 0;
    const delta  = payout - betAmount;

    await trx('profiles')
      .where({ user_id: userId })
      .increment('chips', delta);

    // Immutable audit ledger
    await trx('transactions').insert({
      user_id: userId, amount: delta,
      type: outcome.win ? 'win' : 'loss',
      game: outcome.game, created_at: new Date(),
    });

    return { newBalance: profile.chips + delta, payout };
  });
}`,
    },
    {
      language: 'javascript',
      filename: 'blackjack.engine.js',
      code: `// Pure function — no DB access, no HTTP. Fully unit-testable.
function getBasicStrategyAction(playerHand, dealerUpcard, deckCount = 6) {
  const total  = playerHand.hardTotal();
  const isSoft = playerHand.isSoft();
  const isPair = playerHand.isPair();

  if (isPair) return PAIR_STRATEGY[playerHand.cards[0].rank][dealerUpcard.rank];
  if (isSoft) return SOFT_STRATEGY[total][dealerUpcard.rank];
  return HARD_STRATEGY[total][dealerUpcard.rank];
}

function calculateEV(playerHand, dealerUpcard, betAmount) {
  const action    = getBasicStrategyAction(playerHand, dealerUpcard);
  const winProb   = WIN_PROBABILITY_TABLE[playerHand.hardTotal()][dealerUpcard.rank];
  const ev        = (winProb * betAmount) - ((1 - winProb) * betAmount);
  return { action, ev: ev.toFixed(2), winProbability: (winProb * 100).toFixed(1) };
}`,
    },
  ],
  'stratforge-ai': [
    {
      language: 'typescript',
      filename: 'strategy.engine.ts',
      code: `interface RoundState {
  teamMoney:  number;
  enemyMoney: number;
  roundPhase: 'pistol' | 'eco' | 'buy' | 'force';
  mapPosition: CalloutZone;
  aliveCount:  number;
}

// Deterministic strategy recommendation
function recommendStrategy(state: RoundState): TacticalRecommendation {
  const { teamMoney, enemyMoney, roundPhase, aliveCount } = state;

  // Economy analysis
  if (teamMoney < ECO_THRESHOLD)
    return { buy: 'eco', rifles: 0, reason: 'Save for full buy' };

  if (enemyMoney < RIFLE_THRESHOLD && roundPhase !== 'pistol')
    return { buy: 'force', rifles: Math.min(aliveCount, Math.floor(teamMoney / RIFLE_COST)) };

  // Map-position aware strategy
  const calloutSuggestions = getCalloutStrategy(state.mapPosition, aliveCount);
  return { buy: 'full', rifles: aliveCount, callouts: calloutSuggestions };
}`,
    },
  ],
  'robotics-ecommerce': [
    {
      language: 'javascript',
      filename: 'auth.middleware.js',
      code: `const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Secure login — constant-time compare via bcrypt
async function login(req, res) {
  const { email, password } = req.body;
  const [user] = await db.query(
    'SELECT * FROM users WHERE email = ?', [email]  // parameterized
  );
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}`,
    },
  ],
};

// Per-project architecture flow nodes
const ARCH_FLOWS: Record<string, FlowNode[]> = {
  'azure-retail-pipeline': [
    { icon: '📄', label: 'CSV Files',    sublabel: 'Raw data',      color: '#64748b' },
    { icon: '🐼', label: 'pandas ETL',   sublabel: 'Transform',     color: '#f59e0b' },
    { icon: '☁️',  label: 'Azure SQL',   sublabel: 'Database',      color: '#3b82f6' },
    { icon: '📐', label: 'SQL Views',    sublabel: '3 reporting',   color: '#8b5cf6' },
    { icon: '📊', label: 'Power BI',     sublabel: 'Dashboard',     color: '#f97316' },
  ],
  'casino-platform': [
    { icon: '🖥️',  label: 'Client',      sublabel: 'HTML/CSS/JS',   color: '#38bdf8' },
    { icon: '🚦', label: 'Express',      sublabel: 'Router',        color: '#22c55e' },
    { icon: '🎛️',  label: 'Controller',  sublabel: 'Thin layer',    color: '#a78bfa' },
    { icon: '⚙️',  label: 'Service',     sublabel: 'Business logic', color: '#f59e0b' },
    { icon: '🎮', label: 'Game Engine',  sublabel: 'Pure functions', color: '#ec4899' },
    { icon: '🗄️',  label: 'MySQL 8.0',   sublabel: 'Persistence',   color: '#0ea5e9' },
  ],
  'stratforge-ai': [
    { icon: '⚛️',  label: 'Next.js',     sublabel: 'App Router',    color: '#38bdf8' },
    { icon: '🔌', label: 'API Routes',   sublabel: 'Middleware',    color: '#a78bfa' },
    { icon: '🧠', label: 'Strategy',     sublabel: 'Engine',        color: '#f59e0b' },
    { icon: '🗃️',  label: 'Prisma ORM',  sublabel: 'Database',      color: '#22c55e' },
    { icon: '🚀', label: 'Vercel',       sublabel: 'CI/CD',         color: '#e2e8f0' },
  ],
};

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${project.gradient} mb-6`} />
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{project.iconEmoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{project.title}</h1>
              <p className="text-slate-400 mt-2 text-lg">{project.tagline}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-badge">{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:border-white/20 hover:text-white transition-all"
            >
              <GithubIcon size={15} /> View on GitHub
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm hover:bg-cyan-400/20 transition-all"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {project.stats.map((stat) => (
            <div key={stat.label} className="bg-[#111827] rounded-xl p-4 text-center card-glow">
              <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Overview */}
          <Section title="Project Overview" delay={0.2}>
            <p className="text-slate-400 leading-relaxed">{project.longDescription}</p>
          </Section>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Section title="The Problem" delay={0.25} compact>
              <p className="text-slate-400 leading-relaxed text-sm">{project.problem}</p>
            </Section>
            <Section title="The Solution" delay={0.3} compact>
              <p className="text-slate-400 leading-relaxed text-sm">{project.solution}</p>
            </Section>
          </div>

          {/* Key Highlights */}
          <Section title="Key Highlights" delay={0.35}>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-400 text-sm"
                >
                  <CheckCircle size={15} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </Section>

          {/* Architecture Flow (visual) */}
          {ARCH_FLOWS[slug] && (
            <Section title="Data / Request Flow" delay={0.37}>
              <ArchitectureFlow nodes={ARCH_FLOWS[slug]} />
            </Section>
          )}

          {/* Architecture */}
          <Section title="System Architecture" delay={0.4}>
            <div className="bg-[#070d1a] rounded-xl p-5 border border-white/5 font-mono text-sm">
              {project.architecture.map((layer, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-cyan-400 flex-shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                  <span className="text-slate-400">{layer}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Code Spotlight */}
          {CODE_SNIPPETS[slug] && (
            <Section title="Code Spotlight" delay={0.42}>
              <p className="text-slate-500 text-sm mb-4">Real snippets from the codebase demonstrating key engineering decisions.</p>
              {CODE_SNIPPETS[slug].map((snippet, i) => (
                <CodeBlock key={i} language={snippet.language} filename={snippet.filename} code={snippet.code} />
              ))}
            </Section>
          )}

          {/* Challenges & Solutions */}
          <Section title="Challenges & How I Solved Them" delay={0.45}>
            <div className="grid gap-3">
              {project.challenges.map((c, i) => (
                <div key={i} className="bg-[#111827] rounded-xl p-4 border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Results */}
          <Section title="Results" delay={0.5}>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                  <span className={`text-xs mt-1 font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>→</span>
                  {r}
                </li>
              ))}
            </ul>
          </Section>

          {/* Future improvements */}
          <Section title="Future Improvements" delay={0.55}>
            <div className="flex flex-wrap gap-2">
              {project.futureWork.map((item, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/5"
          >
            <h2 className="text-xl font-bold text-white mb-6">Other Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group flex items-center gap-4 bg-[#111827] rounded-xl p-4 card-glow transition-all"
                >
                  <span className="text-2xl">{p.iconEmoji}</span>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">{p.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{p.tagline}</p>
                  </div>
                  <ChevronRight size={15} className="ml-auto text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  delay = 0,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`bg-[#111827] rounded-2xl p-6 card-glow ${compact ? '' : ''}`}
    >
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-cyan-400 inline-block" />
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
