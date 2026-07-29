'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Download, Mail, ChevronDown, Database, Code, Server, BarChart3 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import ProjectCard from '@/components/ProjectCard';
import BootSequence from '@/components/BootSequence';
import { getFeaturedProjects } from '@/data/projects';

const stats = [
  { value: 360000, display: '360K+', label: 'Records Processed' },
  { value: 12, display: '12', label: 'Casino Games Built' },
  { value: 67, display: '67', label: 'Unit Tests (Casino Engine)' },
  { value: 6, display: '6', label: 'Featured Projects' },
  { value: 5, display: '5+', label: 'Languages & Platforms' },
];

function AnimatedCounter({ value, display }: { value: number; display: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const fmt = count >= 1000
    ? count >= 100000
      ? `${Math.floor(count / 1000)}K`
      : count.toLocaleString()
    : count.toString();

  return (
    <span ref={ref}>
      {inView
        ? display.includes('+')
          ? `${fmt}+`
          : fmt
        : '0'}
    </span>
  );
}

const roles = [
  'Software Developer',
  'Data & BI Developer',
  'IT Automation Engineer',
  'Full-Stack Developer',
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="gradient-text"
      style={{
        display: 'inline-block',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      }}
    >
      {roles[index]}
    </span>
  );
}

const services = [
  {
    icon: <Database size={22} />,
    title: 'Data Engineering',
    desc: 'ETL pipelines, Azure SQL, Power BI dashboards, DAX modeling',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <Code size={22} />,
    title: 'Software Development',
    desc: 'Full-stack web apps with Node.js, Express, JavaScript, REST APIs',
    color: 'from-purple-500 to-indigo-400',
  },
  {
    icon: <Server size={22} />,
    title: 'IT & Automation',
    desc: 'PowerShell automation, Windows admin, Active Directory, device management',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Analytics & BI',
    desc: 'Power BI, SQL analytics, KPI dashboards, data visualization',
    color: 'from-orange-500 to-amber-400',
  },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      <div className={`relative bg-grid transition-opacity duration-700 ${booted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-400/20 text-sm text-slate-400"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-400">~/carter-dockery</span>
          <span className="text-slate-600">·</span>
          <span>Available for opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
        >
          Carter Dockery
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10"
        >
          <RotatingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed mb-10"
        >
          I build full-stack applications, data pipelines, analytics dashboards, and IT automation tools that solve practical business problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/resume"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/5 hover:border-white/25 transition-all"
          >
            <Download size={16} /> View Résumé
          </Link>
          <a
            href="https://github.com/cad171uakron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/carter-dockery-924741350/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <Mail size={16} /> Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        >
          <span className="text-xs">Scroll down</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5 bg-[#0d1628]/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">
                  <AnimatedCounter value={stat.value} display={stat.display} />
                </div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What I <span className="gradient-text">Build</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From cloud-native data pipelines to full-stack web apps and IT automation — I design and build end-to-end technical solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#111827] rounded-2xl p-6 card-glow"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 bg-[#0d1628]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-slate-400">Real problems. Practical solutions. Measurable results.</p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all whitespace-nowrap"
            >
              All projects <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0d1f3c] to-[#111827] rounded-3xl p-12 border border-cyan-400/15 card-glow"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for a developer who <span className="gradient-text">delivers</span>?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              I'm actively seeking opportunities in software development, data engineering, BI, or technical IT roles. Let's connect.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all"
              >
                Get in Touch
              </Link>
              <Link
                href="/resume"
                className="px-7 py-3 rounded-xl border border-white/15 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
              >
                View Résumé
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}

