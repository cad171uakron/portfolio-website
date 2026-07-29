'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const categoryColors: Record<string, string> = {
    data: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    software: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    it: 'bg-green-500/15 text-green-300 border-green-500/30',
    analytics: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  };

  const categoryLabels: Record<string, string> = {
    data: 'Data Engineering',
    software: 'Software Dev',
    it: 'IT / Systems',
    analytics: 'Analytics',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group relative bg-[#111827] rounded-2xl overflow-hidden card-glow h-full flex flex-col">
        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{project.iconEmoji}</span>
              <div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border ${categoryColors[project.category]}`}
                >
                  {categoryLabels[project.category]}
                </span>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={16} />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                  aria-label="Live demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4 grid grid-cols-2 gap-2">
          {project.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="bg-white/3 rounded-lg p-2 text-center">
              <div className={`text-base font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="px-6 pb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="skill-badge text-xs">
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="skill-badge text-xs text-slate-500 border-slate-700">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto px-6 pb-6">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-cyan-400/20 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all group/btn"
          >
            View Case Study
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
