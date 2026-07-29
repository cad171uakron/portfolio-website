'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { projects, getProjectsByCategory } from '@/data/projects';

const filters = [
  { value: 'all', label: 'All Projects' },
  { value: 'data', label: 'Data Engineering' },
  { value: 'software', label: 'Software Dev' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'it', label: 'IT / Systems' },
];

export default function ProjectsPage() {
  const [active, setActive] = useState('all');
  const filtered = getProjectsByCategory(active);

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
            <span className="text-slate-600">//</span> projects
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            End-to-end solutions across data engineering, software development, analytics, and IT automation. Each project includes a detailed case study.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-10 flex-wrap"
        >
          <Filter size={15} className="text-slate-600" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === f.value
                  ? 'bg-cyan-400/15 border border-cyan-400/30 text-cyan-400'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-slate-600 text-sm">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            No projects in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
