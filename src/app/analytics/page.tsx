'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';
import { skillCategories } from '@/data/skills';

/* ─── Static data derived from projects + skills ─── */
const categorySkillData = skillCategories.map((cat) => ({
  name: cat.title.split(' ')[0], // "Software", "Data", "IT", "Tools"
  Proficient: cat.skills.filter((s) => s.level === 'proficient').length,
  Experienced: cat.skills.filter((s) => s.level === 'experienced').length,
  Familiar: cat.skills.filter((s) => s.level === 'familiar').length,
}));

const projectTypeData = [
  { name: 'Data Engineering', value: 2, color: '#818cf8' },
  { name: 'Software Dev', value: 2, color: '#38bdf8' },
  { name: 'Analytics / BI', value: 1, color: '#34d399' },
  { name: 'IT Systems', value: 1, color: '#fb923c' },
];

const proficiencyRadar = [
  { subject: 'JavaScript', score: 95 },
  { subject: 'SQL / DAX', score: 92 },
  { subject: 'Power BI', score: 90 },
  { subject: 'Python', score: 88 },
  { subject: 'Node.js', score: 88 },
  { subject: 'PowerShell', score: 85 },
  { subject: 'Azure', score: 80 },
  { subject: 'TypeScript', score: 78 },
];

const topSkills = [
  { skill: 'JavaScript', score: 95 },
  { skill: 'SQL / DAX', score: 92 },
  { skill: 'Power BI', score: 90 },
  { skill: 'Python / pandas', score: 88 },
  { skill: 'Node.js', score: 88 },
  { skill: 'PowerShell', score: 85 },
  { skill: 'Azure', score: 80 },
  { skill: 'TypeScript', score: 78 },
];

const siteStats = [
  { label: 'Routes / Pages', value: '9' },
  { label: 'React Components', value: '16+' },
  { label: 'Projects Showcased', value: '6' },
  { label: 'Skills Listed', value: '41' },
  { label: 'Lines of TypeScript', value: '~3,500' },
  { label: 'Lighthouse Avg', value: '~93' },
];

const lightbulbTooltip = {
  contentStyle: {
    background: '#0d1628',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '8px',
    color: '#f0f6ff',
    fontSize: '12px',
  },
  itemStyle: { color: '#94a3b8' },
  cursor: { fill: 'rgba(56,189,248,0.05)' },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4">
            <span className="text-slate-600">//</span> analytics
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Portfolio <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Data-driven view of my skills, projects, and this site itself — because every dataset tells a story.
          </p>
        </motion.div>

        {/* Site stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12"
        >
          {siteStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-[#111827] rounded-xl p-4 border border-white/5 text-center"
            >
              <div className="text-xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 1: Skills by category (bar) + Project types (pie) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Bar chart — wider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-[#111827] rounded-2xl p-6 card-glow"
          >
            <h3 className="text-white font-bold mb-1">Skills by Category</h3>
            <p className="text-slate-500 text-xs mb-6">Count of skills per proficiency level, by domain</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categorySkillData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...lightbulbTooltip} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '12px' }} />
                <Bar dataKey="Proficient" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Experienced" stackId="a" fill="#818cf8" />
                <Bar dataKey="Familiar" stackId="a" fill="#334155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart — narrower */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#111827] rounded-2xl p-6 card-glow"
          >
            <h3 className="text-white font-bold mb-1">Projects by Type</h3>
            <p className="text-slate-500 text-xs mb-4">6 featured projects across 4 domains</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  {...lightbulbTooltip}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="space-y-1.5 mt-2">
              {projectTypeData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span>{d.name}</span>
                  <span className="ml-auto text-slate-600">{d.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2: Top skills bar + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Horizontal bar — top skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] rounded-2xl p-6 card-glow"
          >
            <h3 className="text-white font-bold mb-1">Top Skill Proficiency</h3>
            <p className="text-slate-500 text-xs mb-6">Self-assessed 0–100 based on real project use</p>
            <ResponsiveContainer width="100%" height={270}>
              <BarChart
                layout="vertical"
                data={topSkills}
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip
                  {...lightbulbTooltip}
                  formatter={(val) => [`${val ?? 0}/100`, 'Proficiency']}
                />
                <Bar dataKey="score" fill="#38bdf8" fillOpacity={0.85} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] rounded-2xl p-6 card-glow"
          >
            <h3 className="text-white font-bold mb-1">Proficiency Radar</h3>
            <p className="text-slate-500 text-xs mb-2">Relative strengths across top skills</p>
            <ResponsiveContainer width="100%" height={290}>
              <RadarChart data={proficiencyRadar} margin={{ top: 10, right: 40, bottom: 10, left: 40 }}>
                <PolarGrid stroke="rgba(56,189,248,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#475569', fontSize: 9 }}
                  tickCount={5}
                  stroke="rgba(56,189,248,0.04)"
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  dot={{ fill: '#38bdf8', r: 3, strokeWidth: 0 }}
                />
                <Tooltip
                  {...lightbulbTooltip}
                  formatter={(val) => [`${val ?? 0}/100`, 'Proficiency']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Vercel Analytics placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0d1628] rounded-2xl p-8 border border-white/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/20 flex items-center justify-center text-lg flex-shrink-0">
              📈
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Live Traffic Analytics</h3>
              <p className="text-slate-400 text-sm mb-4">
                Real-time page views, visitor trends, and top pages via{' '}
                <span className="text-cyan-400">@vercel/analytics</span> — already instrumented on this site.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Page Views', hint: 'Tracked via Vercel Analytics', icon: '👁' },
                  { label: 'Top Pages', hint: '/projects leads traffic', icon: '📄' },
                  { label: 'Visitors', hint: 'Privacy-first, no cookies', icon: '🌍' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/3 rounded-xl p-4 border border-white/5">
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    <div className="text-slate-600 text-xs mt-0.5">{item.hint}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-xs mt-4">
                Live numbers visible in the{' '}
                <a
                  href="https://vercel.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400/60 hover:text-cyan-400 transition-colors"
                >
                  Vercel dashboard →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
