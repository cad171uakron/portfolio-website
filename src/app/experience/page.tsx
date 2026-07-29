'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ChevronRight } from 'lucide-react';
import { experiences, education } from '@/data/experience';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4">
            <span className="text-slate-600">//</span> experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Work history, education, and professional development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/60 via-blue-400/30 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      exp.current
                        ? 'bg-cyan-400/20 border-cyan-400 animate-pulse-glow'
                        : 'bg-[#111827] border-white/15'
                    }`}
                  >
                    <Briefcase size={16} className={exp.current ? 'text-cyan-400' : 'text-slate-600'} />
                  </div>
                  {exp.current && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#070d1a]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="bg-[#111827] rounded-2xl p-6 card-glow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                          {exp.current && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/15 border border-green-400/25 text-green-400">
                              Current
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            exp.type === 'internship'
                              ? 'bg-cyan-400/15 border border-cyan-400/25 text-cyan-400'
                              : exp.type === 'full-time'
                              ? 'bg-blue-400/15 border border-blue-400/25 text-blue-400'
                              : 'bg-slate-500/15 border border-slate-500/25 text-slate-500'
                          }`}>
                            {exp.type === 'internship' ? 'Internship' : exp.type === 'full-time' ? 'Full-Time' : 'Part-Time'}
                          </span>
                        </div>
                        <p className={`font-semibold mt-0.5 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-slate-500 text-sm flex-shrink-0">{exp.period}</span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                    <ul className="space-y-1.5 mb-5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                          <ChevronRight size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span key={s} className="skill-badge text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-indigo-400/15 border-2 border-indigo-400/40 flex items-center justify-center">
              <GraduationCap size={18} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Education</h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8 card-glow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{education.school}</h3>
                <p className="text-cyan-400 font-semibold mt-1">{education.degree}</p>
                <p className="text-slate-500 text-sm">{education.track} Track</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold text-xl">GPA {education.gpa}</p>
                <p className="text-slate-500 text-sm">{education.graduated}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {education.honors.map((h) => (
                <div key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm">
                  <Award size={13} />
                  {h}
                </div>
              ))}
            </div>

            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Relevant Coursework</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {education.coursework.map((c) => (
                  <div key={c} className="bg-white/4 rounded-lg px-3 py-2 text-slate-400 text-sm border border-white/5">
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Activities</p>
              <div className="flex flex-wrap gap-2">
                {education.activities.map((a) => (
                  <span key={a} className="skill-badge text-xs">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
