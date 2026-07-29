'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle, ChevronRight } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { getProjectBySlug, projects } from '@/data/projects';
import { use } from 'react';

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
