'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Star, Code2, Heart } from 'lucide-react';
import { education } from '@/data/experience';

const timeline = [
  { year: '2026', event: 'IT Intern at Hilscher-Clarke', icon: <Briefcase size={14} /> },
  { year: '2026', event: 'Graduated Magna Cum Laude, University of Akron', icon: <GraduationCap size={14} /> },
  { year: '2025', event: 'Expanded into Azure data engineering & Power BI', icon: <Star size={14} /> },
  { year: '2024', event: 'Built Casino Platform with 60+ automated tests', icon: <Code2 size={14} /> },
  { year: '2023', event: 'Started B.S. Computer Information Systems', icon: <GraduationCap size={14} /> },
];

const interests = [
  { emoji: '☁️', label: 'Cloud & Azure' },
  { emoji: '📊', label: 'Business Intelligence' },
  { emoji: '🤖', label: 'Automation' },
  { emoji: '🗄️', label: 'Data Engineering' },
  { emoji: '⚽', label: 'Sports' },
  { emoji: '🏈', label: 'Football' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4">
            <span className="text-slate-600">//</span> about-me
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Hi, I'm <span className="gradient-text">Carter</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            A Computer Information Systems graduate passionate about using technology to solve real business problems — whether that's building analytics pipelines, writing full-stack applications, or automating IT workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#111827] rounded-2xl p-8 card-glow">
              <h2 className="text-xl font-bold text-white mb-4">My Background</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I graduated from the <span className="text-white">University of Akron</span> with a B.S. in Computer Information Systems (Software Development track), earning a <span className="text-cyan-400">3.6 GPA</span> and graduating <span className="text-cyan-400">Magna Cum Laude</span>. My coursework covered database management, Unix/Linux administration, networking, systems analysis, cybersecurity, and web development.
                </p>
                <p>
                  I'm currently working as an <span className="text-white">IT Intern at Hilscher-Clarke</span>, where I build PowerShell automation tools, support end users across hardware and software issues, manage Windows and Apple devices, and assist with Google Workspace and Active Directory administration. This hands-on experience has sharpened my understanding of how enterprise IT environments operate and where automation creates real efficiency gains.
                </p>
                <p>
                  Outside of my internship, I independently build projects to expand my technical range. I've built an <span className="text-white">Azure-based retail data pipeline</span> processing 360,000+ records, a <span className="text-white">full-stack casino gaming platform</span> with 60+ automated tests and AI coaching, and <span className="text-white">Power BI dashboards</span> for construction project analytics — each project tackling a real problem with an end-to-end solution.
                </p>
                <p>
                  What drives me is turning complicated technical processes into tools people can actually use. I enjoy the full stack — from designing a normalized data model, to wiring up a REST API, to making the frontend clean and functional. I'm particularly interested in <span className="text-white">data engineering</span>, <span className="text-white">BI development</span>, and technical software roles where I can do all of the above.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-[#111827] rounded-2xl p-8 card-glow">
              <h2 className="text-xl font-bold text-white mb-6">Journey</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 to-transparent" />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 pl-10 relative"
                    >
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#0d1628] border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs text-cyan-400 font-mono">{item.year}</span>
                        <p className="text-slate-300 text-sm mt-0.5">{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center bg-[#111827] rounded-2xl p-6 card-glow"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-[#111827] mb-4">
                <Image
                  src="/headshot.jpg"
                  alt="Carter Dockery"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <p className="text-white font-semibold">Carter Dockery</p>
              <p className="text-slate-500 text-xs mt-0.5 text-center">Software Developer · Data Engineer</p>
              <span className="mt-3 text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 font-medium">
                Open to Work
              </span>
            </motion.div>

            {/* Quick facts */}
            <div className="bg-[#111827] rounded-2xl p-6 card-glow">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={15} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-400">Copley, OH</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap size={15} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-400">B.S. CIS, University of Akron</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star size={15} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-400">GPA: 3.6 · Magna Cum Laude</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase size={15} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-400">IT Intern @ Hilscher-Clarke</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-[#111827] rounded-2xl p-6 card-glow">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Education</h3>
              <div className="mb-4">
                <p className="text-white font-semibold text-sm">University of Akron</p>
                <p className="text-slate-400 text-xs mt-1">B.S. Computer Information Systems</p>
                <p className="text-slate-500 text-xs">Software Development Track · May 2026</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {education.honors.map((h) => (
                    <span key={h} className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Relevant Coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-[#111827] rounded-2xl p-6 card-glow">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Heart size={14} className="text-cyan-400" /> Interests
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-slate-400 bg-white/3 rounded-lg px-3 py-2"
                  >
                    <span>{item.emoji}</span>
                    <span className="text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work style */}
            <div className="bg-gradient-to-br from-[#0d1f3c] to-[#111827] rounded-2xl p-6 border border-cyan-400/15">
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Preferred Environment</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p>→ Problem-solving with real business impact</p>
                <p>→ Cross-functional teams (IT, data, dev)</p>
                <p>→ Hybrid or remote-friendly roles</p>
                <p>→ Continuous learning culture</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
