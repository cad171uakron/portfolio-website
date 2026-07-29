'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  label: string;
}

function getScoreColor(score: number) {
  if (score >= 90) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function ScoreRing({ score, label }: ScoreRingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const color = getScoreColor(score);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-[72px] h-[72px]">
        <svg className="w-[72px] h-[72px] -rotate-90" viewBox="0 0 72 72">
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - (score / 100) * circumference } : {}}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-base font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className="text-slate-400 text-[11px] text-center leading-tight max-w-[70px]">{label}</span>
    </div>
  );
}

export default function LighthouseBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0d1628] rounded-2xl p-6 border border-white/5"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base">🔦</span>
        <div>
          <h3 className="text-white font-semibold text-sm">Lighthouse Audit</h3>
          <p className="text-slate-600 text-xs">carterdockery.com</p>
        </div>
        <a
          href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.carterdockery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors"
        >
          View report →
        </a>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <ScoreRing score={91} label="Performance" />
        <ScoreRing score={88} label="Accessibility" />
        <ScoreRing score={95} label="Best Practices" />
        <ScoreRing score={98} label="SEO" />
      </div>
    </motion.div>
  );
}
