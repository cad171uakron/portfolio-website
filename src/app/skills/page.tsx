'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { skillCategories, type Skill } from '@/data/skills';
import { getProjectBySlug } from '@/data/projects';

const levelColors = {
  proficient: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
  experienced: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  familiar: 'bg-slate-500/20 border-slate-500/30 text-slate-400',
};

const levelDots = {
  proficient: 3,
  experienced: 2,
  familiar: 1,
};

function SkillItem({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  const linkedProjects = skill.projectIds
    .map((id) => getProjectBySlug(id))
    .filter(Boolean);

  return (
    <div>
      <button
        onClick={() => linkedProjects.length > 0 && setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all text-left ${
          open
            ? 'bg-white/8 border border-white/10'
            : 'hover:bg-white/5 border border-transparent'
        } ${linkedProjects.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < levelDots[skill.level] ? 'bg-cyan-400' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-slate-300 text-sm">{skill.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[skill.level]}`}>
            {skill.level}
          </span>
          {linkedProjects.length > 0 && (
            <ChevronDown
              size={14}
              className={`text-slate-600 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && linkedProjects.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-3 pr-3 pb-2 pt-1 space-y-1">
              {linkedProjects.map((p) => p && (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <span>{p.iconEmoji}</span>
                  <span>{p.title}</span>
                  <ArrowRight size={11} />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillsPage() {
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
            <span className="text-slate-600">//</span> skills
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Click any skill to see which projects it was applied in. Skills are rated by depth of real-world experience.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          {(['proficient', 'experienced', 'familiar'] as const).map((level) => (
            <div key={level} className="flex items-center gap-2 text-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < levelDots[level] ? 'bg-cyan-400' : 'bg-white/10'}`}
                  />
                ))}
              </div>
              <span className="text-slate-500 capitalize">{level}</span>
            </div>
          ))}
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111827] rounded-2xl p-6 card-glow"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg`}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-white font-bold">{cat.title}</h2>
                  <p className="text-slate-600 text-xs">{cat.skills.length} skills</p>
                </div>
              </div>

              {/* Skills list */}
              <div className="space-y-0.5">
                {cat.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#0d1628] rounded-2xl p-8 border border-white/5"
        >
          <h3 className="text-white font-bold mb-6 text-center">Skills at a Glance</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skillCategories.flatMap((c) => c.skills).map((skill) => (
              <span key={skill.name} className="skill-badge text-xs">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
