'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

const radarData = [
  { subject: 'JavaScript', score: 95 },
  { subject: 'SQL / DAX', score: 92 },
  { subject: 'Power BI', score: 90 },
  { subject: 'Python', score: 88 },
  { subject: 'Node.js', score: 88 },
  { subject: 'PowerShell', score: 85 },
  { subject: 'Azure', score: 80 },
  { subject: 'TypeScript', score: 78 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1628] border border-cyan-400/20 rounded-lg px-3 py-2">
        <p className="text-cyan-400 text-sm font-medium">{payload[0].payload.subject}</p>
        <p className="text-white text-xs">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#111827] rounded-2xl p-6 card-glow"
    >
      <div className="text-center mb-4">
        <h3 className="text-white font-bold text-lg">Proficiency Radar</h3>
        <p className="text-slate-500 text-xs mt-1">Self-assessed scores based on real project depth</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={radarData} margin={{ top: 10, right: 40, bottom: 10, left: 40 }}>
          <PolarGrid stroke="rgba(56,189,248,0.08)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 9 }}
            tickCount={5}
            stroke="rgba(56,189,248,0.05)"
          />
          <Radar
            name="Proficiency"
            dataKey="score"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{ fill: '#38bdf8', r: 3, strokeWidth: 0 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
